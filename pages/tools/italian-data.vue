<template>
  <div class="parquet-container">
    <header class="header">
      <h1>Local Parquet Filter & Search</h1>
      <p class="subtitle">Client-side SQL execution via DuckDB-Wasm</p>
    </header>

    <!-- Loading / Initialization Indicator -->
    <div v-if="isLoading" class="loading-state">
      <div class="spinner"></div>
      <span>{{ statusMessage }}</span>
    </div>

    <!-- Error Message -->
    <div v-else-if="errorMessage" class="error-banner">
      {{ errorMessage }}
    </div>

    <!-- Main Content -->
    <div v-else class="content">
      <!-- Search & Controls Bar -->
      <section class="controls-panel">
        <div class="control-group">
          <label for="filter-column">Filter Column:</label>
          <select id="filter-column" v-model="selectedColumn">
            <option v-for="col in availableColumns" :key="col" :value="col">
              {{ col }}
            </option>
          </select>
        </div>

        <div class="control-group search-input">
          <label for="search-query">Search Term:</label>
          <input
            id="search-query"
            type="text"
            v-model="searchQuery"
            placeholder="Type to filter..."
            @input="debounceQuery"
          />
        </div>

        <div class="control-group">
          <label for="page-size">Limit:</label>
          <select id="page-size" v-model.number="pageSize" @change="executeQuery">
            <option :value="10">10</option>
            <option :value="25">25</option>
            <option :value="50">50</option>
            <option :value="100">100</option>
          </select>
        </div>
      </section>

      <!-- Results Summary -->
      <div class="results-meta">
        <span>Showing {{ rows.length }} row(s)</span>
      </div>

      <!-- Data Table -->
      <div class="table-wrapper">
        <table v-if="rows.length > 0">
          <thead>
          <tr>
            <th v-for="col in availableColumns" :key="col">{{ col }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(row, idx) in rows" :key="idx">
            <td v-for="col in availableColumns" :key="col">
              {{ formatCell(row[col]) }}
            </td>
          </tr>
          </tbody>
        </table>
        <div v-else class="no-records">
          No records match your criteria.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

interface RowData {
  [key: string]: any
}

const PARQUET_PATH = '/data/italian.parquet'

// Reactive state
const isLoading = ref(true)
const statusMessage = ref('Initializing WebAssembly engine...')
const errorMessage = ref('')
const availableColumns = ref<string[]>([])
const selectedColumn = ref('name')
const searchQuery = ref('')
const pageSize = ref(25)
const rows = ref<RowData[]>([])

// DuckDB references
let db: any = null
let conn: any = null
let debounceTimer: ReturnType<typeof setTimeout> | null = null

onMounted(async () => {
  // Guard against SSR execution
  if (!import.meta.client) return

  try {
    await initDuckDB()
    await loadParquetMetadata()
    await executeQuery()
  } catch (err: any) {
    errorMessage.value = `Failed to load Parquet: ${err.message}`
  } finally {
    isLoading.value = false
  }
})

onBeforeUnmount(async () => {
  if (conn) await conn.close()
  if (db) await db.terminate()
})

async function initDuckDB() {
  const duckdb = await import('@duckdb/duckdb-wasm')

  statusMessage.value = 'Loading local WebAssembly binaries...'

  // 1. Resolve local URLs for worker and wasm modules via Vite
  const worker_url = new URL(
    '@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js',
    import.meta.url
  ).href

  const wasm_url = new URL(
    '@duckdb/duckdb-wasm/dist/duckdb-eh.wasm',
    import.meta.url
  ).href

  // 2. Instantiate DuckDB directly using the local bundle definition
  const worker = new Worker(worker_url, { type: 'module' })
  const logger = new duckdb.VoidLogger()

  db = new duckdb.AsyncDuckDB(logger, worker)
  await db.instantiate(wasm_url)

  statusMessage.value = 'Fetching bundled Parquet file...'
  const response = await fetch(PARQUET_PATH)
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: Failed to fetch ${PARQUET_PATH}`)
  }

  const buffer = await response.arrayBuffer()
  await db.registerFileBuffer('dataset.parquet', new Uint8Array(buffer))

  conn = await db.connect()
}

async function loadParquetMetadata() {
  statusMessage.value = 'Reading schema definitions...'

  // Inspect schema
  const schemaResult = await conn.query(`DESCRIBE SELECT * FROM 'dataset.parquet'`)
  const schemaRows = schemaResult.toArray()

  availableColumns.value = schemaRows.map((r: any) => r.column_name)

  // Fallback if 'name' doesn't exist in the parquet file
  if (!availableColumns.value.includes(selectedColumn.value) && availableColumns.value.length > 0) {
    selectedColumn.value = availableColumns.value[0]
  }
}

async function executeQuery() {
  if (!conn) return

  try {
    const term = searchQuery.value.trim()
    const col = selectedColumn.value

    let sql = `SELECT * FROM 'dataset.parquet'`

    // Filter using ILIKE for case-insensitive matching; cast to VARCHAR for numeric types (e.g., id)
    if (term) {
      const sanitizedTerm = term.replace(/'/g, "''")
      sql += ` WHERE CAST("${col}" AS VARCHAR) ILIKE '%${sanitizedTerm}%'`
    }

    sql += ` LIMIT ${pageSize.value}`

    const result = await conn.query(sql)
    rows.value = result.toArray().map((row: any) => row.toJSON())
  } catch (err: any) {
    errorMessage.value = `Query execution error: ${err.message}`
  }
}

function debounceQuery() {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    executeQuery()
  }, 250)
}

function formatCell(val: any): string {
  if (val === null || val === undefined) return '—'
  if (typeof val === 'bigint') return val.toString()
  return String(val)
}
</script>

<style scoped>
.parquet-container {
  max-width: 1100px;
  margin: 2rem auto;
  padding: 0 1.5rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #1e293b;
}

.header {
  margin-bottom: 2rem;
}

.header h1 {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.subtitle {
  color: #64748b;
  font-size: 0.95rem;
}

.controls-panel {
  display: flex;
  gap: 1rem;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 1.25rem;
  border-radius: 8px;
  align-items: flex-end;
  flex-wrap: wrap;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.control-group label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #475569;
}

select, input {
  height: 38px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  padding: 0 0.75rem;
  font-size: 0.9rem;
  outline: none;
  background-color: #fff;
}

select:focus, input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px #3b82f6;
}

.search-input {
  flex-grow: 1;
  min-width: 220px;
}

.results-meta {
  margin: 1.25rem 0 0.5rem 0;
  font-size: 0.85rem;
  color: #64748b;
}

.table-wrapper {
  overflow-x: auto;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background-color: #fff;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.875rem;
}

th {
  background-color: #f1f5f9;
  padding: 0.75rem 1rem;
  font-weight: 600;
  color: #334155;
  border-bottom: 1px solid #e2e8f0;
}

td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #f1f5f9;
}

tr:hover {
  background-color: #f8fafc;
}

.no-records {
  padding: 2.5rem;
  text-align: center;
  color: #94a3b8;
}

.loading-state {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 3rem 0;
  color: #475569;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #e2e8f0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.error-banner {
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  color: #b91c1c;
  padding: 1rem;
  border-radius: 6px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
