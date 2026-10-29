import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { AsyncDuckDB, AsyncDuckDBConnection } from '@duckdb/duckdb-wasm'

export type loadStatus =
  'not started' | 'starting db worker' | 'loading data' | 'ready'

export interface ParquetDBOptions {
  /** Path to the parquet file (e.g., '/data/sample.parquet') */
  parquetUrl: string
}

export function useParquetDB(options: ParquetDBOptions) {
  const { parquetUrl } = options

  const isLoading = ref(true)
  const statusMessage = ref<loadStatus>('not started')
  const errorMessage = ref('')

  let db: AsyncDuckDB | null = null
  let conn: AsyncDuckDBConnection | null = null

  onMounted(async () => {
    // Guard against SSR execution
    if (!import.meta.client) return

    try {
      await initEngine()
      await loadParquet()
      statusMessage.value = 'ready'
    } catch (err: any) {
      errorMessage.value = `DB setup Error: ${err.message}`
    } finally {
      isLoading.value = false
    }
  })

  onBeforeUnmount(async () => {
    try {
      if (conn) await conn.close()
      if (db) await db.terminate()
    } catch (err) {
      console.error('Error tearing down DuckDB:', err)
    } finally {
      conn = null
      db = null
    }
  })

  async function initEngine() {
    const duckdb = await import('@duckdb/duckdb-wasm')
    statusMessage.value = 'starting db worker'

    const worker_url = new URL(
      '@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js',
      import.meta.url,
    ).href

    const wasm_url = new URL(
      '@duckdb/duckdb-wasm/dist/duckdb-eh.wasm',
      import.meta.url,
    ).href

    const worker = new Worker(worker_url, { type: 'module' })
    const logger = new duckdb.VoidLogger()

    db = new duckdb.AsyncDuckDB(logger, worker)
    await db.instantiate(wasm_url)
    conn = await db.connect()
  }

  async function loadParquet() {
    statusMessage.value = 'loading data'

    const response = await fetch(parquetUrl)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} loading ${parquetUrl}`)
    }

    const buffer = await response.arrayBuffer()
    await db!.registerFileBuffer(`dataset.parquet`, new Uint8Array(buffer))
  }

  async function discoverSchema() {
    const schemaResult = await conn!.query(
      `DESCRIBE SELECT * FROM 'dataset.parquet'`,
    )
    const schemaRows = schemaResult.toArray()

    return schemaRows.map((r: any) => r.column_name)
  }

  /**
   * Helper to execute arbitrary SQL queries against the loaded parquet
   */
  async function query(sql: string) {
    if (!conn) return null
    return await conn.query(sql)
  }

  return {
    // State
    isLoading,
    statusMessage,
    errorMessage,

    // Execution helper
    query,
  }
}
