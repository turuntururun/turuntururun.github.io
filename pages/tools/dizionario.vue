<template>
  <div class="parquet-container">
    <header class="header">
      <h1>DIZIONARIO DI ITALIANO</h1>
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
        <div class="control-group search-input">
          <label for="search-query">Cerca</label>
          <input
            id="search-query"
            type="text"
            v-model="searchQuery"
            placeholder="Scrivi un po"
            @input="debounceQuery"
          />
        </div>
      </section>

      <!-- Results Summary -->
      <div class="results-meta" v-if="totalMatches > rows.length">
        <span
          >Abbiamo trovato: {{ totalMatches }}. Ecco i primi
          {{ rows.length }}</span
        >
      </div>
      <div class="results-meta" v-else>
        <span>Abbiamo trovato: {{ rows.length }}</span>
      </div>

      <section class="results" v-if="rows.length > 0">
        <FieldSelect
          :options="rows.map((row) => row.name)"
          v-model="selectedTerm"
          title="Select a term"
        />
        <pre v-if="definition">{{ definition }}</pre>
      </section>
      <div v-else class="no-records">Non abbiamo trovato parole</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface RowData {
  [key: string]: any
}

// query params
const searchQuery = ref('')
const pageSize = ref(20)

// query results
const rows = ref<RowData[]>([])
const totalMatches = ref<number>(0)

// display selection
const selectedTerm = ref('')
const definition = computed<string | undefined>(() => {
  return rows.value.find((row) => row.name === selectedTerm.value)?.defin
})

let debounceTimer: ReturnType<typeof setTimeout> | null = null

const { isLoading, statusMessage, errorMessage, query } = useParquetDB({
  parquetUrl: '/data/italian.parquet',
})

async function executeQuery() {
  try {
    const term = searchQuery.value.trim()
    if (!term) {
      rows.value = []
      totalMatches.value = 0
      return
    }

    const sanitizedTerm = term.replaceAll("'", "''")

    // Filter using ILIKE for case-insensitive matching
    // language=SQL
    const fromMatchingEntries = `FROM 'dataset.parquet' WHERE name ILIKE '${sanitizedTerm}%'`

    query(
      // language=SQL
      `SELECT count(*) as total ${fromMatchingEntries}`,
    ).then((count) => {
      totalMatches.value = count!.get(0)?.total || 0
    })

    query(
      // language=SQL
      `SELECT name, defin ${fromMatchingEntries} LIMIT ${pageSize.value}`,
    ).then((result) => {
      rows.value = result!.toArray().map((row: any) => row.toJSON())
    })
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
</script>

<style scoped>
.parquet-container {
  max-width: 1100px;
  margin: 2rem auto;
  padding: 0 1.5rem;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial,
    sans-serif;
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

select,
input {
  height: 38px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  padding: 0 0.75rem;
  font-size: 0.9rem;
  outline: none;
  background-color: #fff;
}

select:focus,
input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px #3b82f6;
}

.search-input {
  flex-grow: 1;
  min-width: 220px;
}

.results {
  display: flex;
  flex-flow: row nowrap;
  gap: 1rem;
}

.results-meta {
  margin: 1.25rem 0 0.5rem 0;
  font-size: 0.85rem;
  color: #64748b;
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
  to {
    transform: rotate(360deg);
  }
}
</style>
