<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import {
  createEmptyBoard,
  generateBag,
  createPiece,
  checkCollision,
  tryRotate,
  getGhostY,
  lockPiece,
  clearLines,
  calculateScore,
  getDropSpeed,
  BOARD_WIDTH,
  BOARD_HEIGHT,
  TETROMINO_COLORS,
  TETROMINO_SHAPES,
  type Board,
  type Piece,
  type TetrominoType,
} from '~/assets/tetris'

defineOptions({
  name: 'TetrisGame',
})

// Canvas references
const mainCanvas = ref<HTMLCanvasElement | null>(null)
const holdCanvas = ref<HTMLCanvasElement | null>(null)
const nextCanvas = ref<HTMLCanvasElement | null>(null)

// Game State
type GameStatus = 'IDLE' | 'PLAYING' | 'PAUSED' | 'GAMEOVER'
const gameStatus = ref<GameStatus>('IDLE')
const score = ref(0)
const highScore = ref(0)
const lines = ref(0)
const level = ref(1)
const soundEnabled = ref(true)

// Game Data
let board: Board = createEmptyBoard()
let currentPiece: Piece | null = null
let holdPieceType = ref<TetrominoType | null>(null)
let canHold = true
let pieceBag: TetrominoType[] = []
const nextQueue = ref<TetrominoType[]>([])

// Animation / Timing
let dropTimer: ReturnType<typeof setInterval> | null = null
let animationFrameId: number | null = null
let lineClearAnimationRows: number[] = []
let lineClearTimer: ReturnType<typeof setTimeout> | null = null

// Web Audio Synth
let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

function playSound(type: 'move' | 'rotate' | 'drop' | 'clear' | 'tetris' | 'gameover' | 'hold') {
  if (!soundEnabled.value) return
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)

    switch (type) {
      case 'move':
        osc.type = 'sine'
        osc.frequency.setValueAtTime(220, now)
        gain.gain.setValueAtTime(0.05, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04)
        osc.start(now)
        osc.stop(now + 0.04)
        break
      case 'rotate':
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(300, now)
        osc.frequency.exponentialRampToValueAtTime(500, now + 0.06)
        gain.gain.setValueAtTime(0.07, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06)
        osc.start(now)
        osc.stop(now + 0.06)
        break
      case 'drop':
        osc.type = 'square'
        osc.frequency.setValueAtTime(140, now)
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.08)
        gain.gain.setValueAtTime(0.08, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08)
        osc.start(now)
        osc.stop(now + 0.08)
        break
      case 'hold':
        osc.type = 'sine'
        osc.frequency.setValueAtTime(400, now)
        osc.frequency.linearRampToValueAtTime(600, now + 0.07)
        gain.gain.setValueAtTime(0.06, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07)
        osc.start(now)
        osc.stop(now + 0.07)
        break
      case 'clear': {
        const notes = [523.25, 659.25, 783.99] // C5, E5, G5
        notes.forEach((freq, idx) => {
          const noteOsc = ctx.createOscillator()
          const noteGain = ctx.createGain()
          noteOsc.connect(noteGain)
          noteGain.connect(ctx.destination)
          noteOsc.type = 'triangle'
          noteOsc.frequency.setValueAtTime(freq, now + idx * 0.05)
          noteGain.gain.setValueAtTime(0.08, now + idx * 0.05)
          noteGain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.15)
          noteOsc.start(now + idx * 0.05)
          noteOsc.stop(now + idx * 0.05 + 0.15)
        })
        break
      }
      case 'tetris': {
        const fanfare = [523.25, 659.25, 783.99, 1046.5] // C5, E5, G5, C6
        fanfare.forEach((freq, idx) => {
          const noteOsc = ctx.createOscillator()
          const noteGain = ctx.createGain()
          noteOsc.connect(noteGain)
          noteGain.connect(ctx.destination)
          noteOsc.type = 'sine'
          noteOsc.frequency.setValueAtTime(freq, now + idx * 0.07)
          noteGain.gain.setValueAtTime(0.12, now + idx * 0.07)
          noteGain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.25)
          noteOsc.start(now + idx * 0.07)
          noteOsc.stop(now + idx * 0.07 + 0.25)
        })
        break
      }
      case 'gameover': {
        const downNotes = [400, 350, 300, 200]
        downNotes.forEach((freq, idx) => {
          const noteOsc = ctx.createOscillator()
          const noteGain = ctx.createGain()
          noteOsc.connect(noteGain)
          noteGain.connect(ctx.destination)
          noteOsc.type = 'sawtooth'
          noteOsc.frequency.setValueAtTime(freq, now + idx * 0.1)
          noteGain.gain.setValueAtTime(0.08, now + idx * 0.1)
          noteGain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.12)
          noteOsc.start(now + idx * 0.1)
          noteOsc.stop(now + idx * 0.1 + 0.12)
        })
        break
      }
    }
  } catch (_) {
    // Audio context may not be allowed until user gesture
  }
}

function getNextFromBag(): TetrominoType {
  if (pieceBag.length === 0) {
    pieceBag = generateBag()
  }
  return pieceBag.pop()!
}

function refillNextQueue() {
  while (nextQueue.value.length < 3) {
    nextQueue.value.push(getNextFromBag())
  }
}

function spawnPiece(): boolean {
  refillNextQueue()
  const nextType = nextQueue.value.shift()!
  refillNextQueue()
  currentPiece = createPiece(nextType)
  canHold = true

  // Check initial collision (Game Over)
  if (checkCollision(board, currentPiece.matrix, { x: currentPiece.x, y: currentPiece.y })) {
    triggerGameOver()
    return false
  }
  return true
}

function triggerGameOver() {
  gameStatus.value = 'GAMEOVER'
  stopDropTimer()
  playSound('gameover')
  if (score.value > highScore.value) {
    highScore.value = score.value
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('turuntururun_tetris_highscore', String(highScore.value))
    }
  }
}

function startDropTimer() {
  stopDropTimer()
  const speed = getDropSpeed(level.value)
  dropTimer = setInterval(() => {
    if (gameStatus.value === 'PLAYING') {
      stepDown()
    }
  }, speed)
}

function stopDropTimer() {
  if (dropTimer) {
    clearInterval(dropTimer)
    dropTimer = null
  }
}

function stepDown(): boolean {
  if (!currentPiece || gameStatus.value !== 'PLAYING') return false

  if (!checkCollision(board, currentPiece.matrix, { x: currentPiece.x, y: currentPiece.y + 1 })) {
    currentPiece.y += 1
    render()
    return true
  } else {
    // Lock piece
    board = lockPiece(board, currentPiece)
    currentPiece = null

    // Check for line clears
    const { newBoard, linesCleared, clearedIndices } = clearLines(board)
    if (linesCleared > 0) {
      lineClearAnimationRows = clearedIndices
      if (linesCleared === 4) {
        playSound('tetris')
      } else {
        playSound('clear')
      }

      // Brief flash animation
      if (lineClearTimer) clearTimeout(lineClearTimer)
      lineClearTimer = setTimeout(() => {
        board = newBoard
        lineClearAnimationRows = []
        lines.value += linesCleared
        score.value += calculateScore(linesCleared, level.value)
        level.value = Math.floor(lines.value / 10) + 1
        if (score.value > highScore.value) {
          highScore.value = score.value
        }
        startDropTimer()
        spawnPiece()
        render()
      }, 120)
    } else {
      playSound('drop')
      spawnPiece()
      render()
    }
    return false
  }
}

// User Actions
function moveLeft() {
  if (!currentPiece || gameStatus.value !== 'PLAYING') return
  if (!checkCollision(board, currentPiece.matrix, { x: currentPiece.x - 1, y: currentPiece.y })) {
    currentPiece.x -= 1
    playSound('move')
    render()
  }
}

function moveRight() {
  if (!currentPiece || gameStatus.value !== 'PLAYING') return
  if (!checkCollision(board, currentPiece.matrix, { x: currentPiece.x + 1, y: currentPiece.y })) {
    currentPiece.x += 1
    playSound('move')
    render()
  }
}

function softDrop() {
  if (!currentPiece || gameStatus.value !== 'PLAYING') return
  if (stepDown()) {
    score.value += 1
  }
}

function hardDrop() {
  if (!currentPiece || gameStatus.value !== 'PLAYING') return
  const ghostY = getGhostY(board, currentPiece)
  const dropDistance = ghostY - currentPiece.y
  currentPiece.y = ghostY
  score.value += dropDistance * 2
  playSound('drop')
  stepDown()
}

function rotate(dir: 1 | -1 = 1) {
  if (!currentPiece || gameStatus.value !== 'PLAYING') return
  const rotated = tryRotate(board, currentPiece, dir)
  if (rotated) {
    currentPiece = rotated
    playSound('rotate')
    render()
  }
}

function hold() {
  if (!currentPiece || !canHold || gameStatus.value !== 'PLAYING') return
  const curType = currentPiece.type
  if (holdPieceType.value === null) {
    holdPieceType.value = curType
    spawnPiece()
  } else {
    const prevHold = holdPieceType.value
    holdPieceType.value = curType
    currentPiece = createPiece(prevHold)
    if (checkCollision(board, currentPiece.matrix, { x: currentPiece.x, y: currentPiece.y })) {
      triggerGameOver()
      return
    }
  }
  canHold = false
  playSound('hold')
  render()
}

function startGame() {
  getAudioContext()
  board = createEmptyBoard()
  score.value = 0
  lines.value = 0
  level.value = 1
  holdPieceType.value = null
  canHold = true
  pieceBag = []
  nextQueue.value = []
  gameStatus.value = 'PLAYING'
  spawnPiece()
  startDropTimer()
  render()
}

function pauseGame() {
  if (gameStatus.value === 'PLAYING') {
    gameStatus.value = 'PAUSED'
    stopDropTimer()
    render()
  } else if (gameStatus.value === 'PAUSED') {
    gameStatus.value = 'PLAYING'
    startDropTimer()
    render()
  }
}

function toggleSound() {
  soundEnabled.value = !soundEnabled.value
  if (soundEnabled.value) {
    getAudioContext()
  }
}

// Keyboard Handling
function handleKeyDown(e: KeyboardEvent) {
  // Prevent page scroll on game keys
  const gameKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'Spacebar']
  if (gameKeys.includes(e.key) && gameStatus.value === 'PLAYING') {
    e.preventDefault()
  }

  if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') {
    e.preventDefault()
    pauseGame()
    return
  }

  if (e.key === 'r' || e.key === 'R') {
    if (gameStatus.value === 'GAMEOVER' || gameStatus.value === 'PAUSED') {
      startGame()
      return
    }
  }

  if (gameStatus.value === 'IDLE' || gameStatus.value === 'GAMEOVER') {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      startGame()
      return
    }
  }

  if (gameStatus.value !== 'PLAYING') return

  switch (e.key) {
    case 'ArrowLeft':
    case 'a':
    case 'A':
      moveLeft()
      break
    case 'ArrowRight':
    case 'd':
    case 'D':
      moveRight()
      break
    case 'ArrowDown':
    case 's':
    case 'S':
      softDrop()
      break
    case 'ArrowUp':
    case 'w':
    case 'W':
    case 'x':
    case 'X':
      rotate(1)
      break
    case 'z':
    case 'Z':
    case 'Control':
      rotate(-1)
      break
    case ' ':
      hardDrop()
      break
    case 'c':
    case 'C':
    case 'Shift':
      hold()
      break
  }
}

// Canvas Rendering
function drawBlock(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string,
  isGhost = false,
  isFlash = false,
) {
  const pad = 1
  const bx = x * size + pad
  const by = y * size + pad
  const bSize = size - pad * 2

  if (isFlash) {
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(bx, by, bSize, bSize)
    return
  }

  if (isGhost) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)'
    ctx.fillRect(bx, by, bSize, bSize)
    ctx.strokeStyle = color
    ctx.lineWidth = 1.5
    ctx.strokeRect(bx + 0.5, by + 0.5, bSize - 1, bSize - 1)
    return
  }

  // Base fill
  ctx.fillStyle = color
  ctx.fillRect(bx, by, bSize, bSize)

  // 3D Bevel effect
  ctx.fillStyle = 'rgba(255, 255, 255, 0.35)'
  ctx.beginPath()
  ctx.moveTo(bx, by)
  ctx.lineTo(bx + bSize, by)
  ctx.lineTo(bx + bSize - 3, by + 3)
  ctx.lineTo(bx + 3, by + 3)
  ctx.lineTo(bx + 3, by + bSize - 3)
  ctx.lineTo(bx, by + bSize)
  ctx.closePath()
  ctx.fill()

  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
  ctx.beginPath()
  ctx.moveTo(bx + bSize, by)
  ctx.lineTo(bx + bSize, by + bSize)
  ctx.lineTo(bx, by + bSize)
  ctx.lineTo(bx + 3, by + bSize - 3)
  ctx.lineTo(bx + bSize - 3, by + bSize - 3)
  ctx.lineTo(bx + bSize - 3, by + 3)
  ctx.closePath()
  ctx.fill()
}

function drawMiniPiece(canvas: HTMLCanvasElement | null, type: TetrominoType | null) {
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const w = canvas.width
  const h = canvas.height
  ctx.clearRect(0, 0, w, h)

  if (!type) return

  const shape = TETROMINO_SHAPES[type]
  const color = TETROMINO_COLORS[type]
  const rows = shape.length
  const cols = shape[0].length
  const cellSize = 18

  const startX = Math.round((w - cols * cellSize) / 2)
  const startY = Math.round((h - rows * cellSize) / 2)

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (shape[r][c] !== 0) {
        drawBlock(ctx, (startX + c * cellSize) / cellSize, (startY + r * cellSize) / cellSize, cellSize, color)
      }
    }
  }
}

function render() {
  if (!mainCanvas.value) return
  const canvas = mainCanvas.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const width = canvas.width
  const height = canvas.height
  const cellSize = width / BOARD_WIDTH

  // Background
  ctx.fillStyle = '#181528'
  ctx.fillRect(0, 0, width, height)

  // Grid lines
  ctx.strokeStyle = '#282342'
  ctx.lineWidth = 0.5
  for (let r = 0; r <= BOARD_HEIGHT; r++) {
    ctx.beginPath()
    ctx.moveTo(0, r * cellSize)
    ctx.lineTo(width, r * cellSize)
    ctx.stroke()
  }
  for (let c = 0; c <= BOARD_WIDTH; c++) {
    ctx.beginPath()
    ctx.moveTo(c * cellSize, 0)
    ctx.lineTo(c * cellSize, height)
    ctx.stroke()
  }

  // Draw board blocks
  for (let r = 0; r < BOARD_HEIGHT; r++) {
    const isFlashRow = lineClearAnimationRows.includes(r)
    for (let c = 0; c < BOARD_WIDTH; c++) {
      const cell = board[r][c]
      if (cell !== null) {
        drawBlock(ctx, c, r, cellSize, cell, false, isFlashRow)
      }
    }
  }

  // Draw ghost and active piece if playing
  if (currentPiece && (gameStatus.value === 'PLAYING' || gameStatus.value === 'PAUSED')) {
    // Ghost piece
    const ghostY = getGhostY(board, currentPiece)
    for (let r = 0; r < currentPiece.matrix.length; r++) {
      for (let c = 0; c < currentPiece.matrix[r].length; c++) {
        if (currentPiece.matrix[r][c] !== 0) {
          const gy = ghostY + r
          const gx = currentPiece.x + c
          if (gy >= 0 && gy < BOARD_HEIGHT && gx >= 0 && gx < BOARD_WIDTH) {
            drawBlock(ctx, gx, gy, cellSize, currentPiece.color, true)
          }
        }
      }
    }

    // Current piece
    for (let r = 0; r < currentPiece.matrix.length; r++) {
      for (let c = 0; c < currentPiece.matrix[r].length; c++) {
        if (currentPiece.matrix[r][c] !== 0) {
          const py = currentPiece.y + r
          const px = currentPiece.x + c
          if (py >= 0 && py < BOARD_HEIGHT && px >= 0 && px < BOARD_WIDTH) {
            drawBlock(ctx, px, py, cellSize, currentPiece.color)
          }
        }
      }
    }
  }

  // Side previews
  drawMiniPiece(holdCanvas.value, holdPieceType.value)
  drawMiniPiece(nextCanvas.value, nextQueue.value[0] || null)
}

onMounted(() => {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('turuntururun_tetris_highscore')
    if (saved) {
      highScore.value = parseInt(saved, 10) || 0
    }
  }

  window.addEventListener('keydown', handleKeyDown)
  nextTick(() => {
    refillNextQueue()
    render()
  })
})

onBeforeUnmount(() => {
  stopDropTimer()
  if (lineClearTimer) clearTimeout(lineClearTimer)
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeyDown)
  }
})
</script>

<template>
  <div class="tetris-page">
    <header class="page-header">
      <NuxtLink to="/" class="nav-back" title="Go to home">🏠 Home</NuxtLink>
      <h1>Tetris</h1>
      <div class="header-actions">
        <button
          class="btn-icon"
          :title="soundEnabled ? 'Mute Sound' : 'Enable Sound'"
          @click="toggleSound"
        >
          {{ soundEnabled ? '🔊' : '🔇' }}
        </button>
      </div>
    </header>

    <main class="game-layout">
      <!-- Left Column: Hold & Stats -->
      <aside class="panel side-panel left-panel">
        <div class="card hold-card">
          <h3>HOLD</h3>
          <canvas ref="holdCanvas" width="90" height="90" class="mini-canvas"></canvas>
          <div class="shortcut-tip">[C] / [Shift]</div>
        </div>

        <div class="card stats-card">
          <div class="stat-item">
            <span class="stat-label">SCORE</span>
            <span class="stat-value">{{ score }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">HIGH SCORE</span>
            <span class="stat-value">{{ highScore }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">LINES</span>
            <span class="stat-value">{{ lines }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">LEVEL</span>
            <span class="stat-value">{{ level }}</span>
          </div>
        </div>
      </aside>

      <!-- Center Column: Canvas & Overlays -->
      <section class="center-panel">
        <div class="canvas-wrapper">
          <canvas
            ref="mainCanvas"
            width="280"
            height="560"
            class="tetris-canvas"
          ></canvas>

          <!-- Overlay for Start -->
          <div v-if="gameStatus === 'IDLE'" class="game-overlay">
            <div class="overlay-content">
              <h2>READY?</h2>
              <p>Stack lines and clear rows to rack up points!</p>
              <button class="btn btn-primary" @click="startGame">PLAY</button>
            </div>
          </div>

          <!-- Overlay for Pause -->
          <div v-if="gameStatus === 'PAUSED'" class="game-overlay">
            <div class="overlay-content">
              <h2>PAUSED</h2>
              <button class="btn btn-primary" @click="pauseGame">RESUME</button>
              <button class="btn btn-secondary" @click="startGame">RESTART</button>
            </div>
          </div>

          <!-- Overlay for Game Over -->
          <div v-if="gameStatus === 'GAMEOVER'" class="game-overlay">
            <div class="overlay-content">
              <h2 class="gameover-title">GAME OVER</h2>
              <p class="final-score">Score: <strong>{{ score }}</strong></p>
              <p v-if="score >= highScore && score > 0" class="new-high">🏆 NEW HIGH SCORE!</p>
              <button class="btn btn-primary" @click="startGame">PLAY AGAIN</button>
            </div>
          </div>
        </div>

        <!-- Quick Game Action Buttons -->
        <div class="game-actions">
          <button
            v-if="gameStatus === 'PLAYING'"
            class="btn btn-sm btn-secondary"
            @click="pauseGame"
          >
            ⏸ Pause [P]
          </button>
          <button
            v-if="gameStatus === 'PAUSED'"
            class="btn btn-sm btn-primary"
            @click="pauseGame"
          >
            ▶ Resume [P]
          </button>
          <button
            v-if="gameStatus === 'PLAYING' || gameStatus === 'PAUSED'"
            class="btn btn-sm btn-outline"
            @click="startGame"
          >
            🔄 Restart
          </button>
        </div>
      </section>

      <!-- Right Column: Next Piece & Controls Guide -->
      <aside class="panel side-panel right-panel">
        <div class="card next-card">
          <h3>NEXT</h3>
          <canvas ref="nextCanvas" width="90" height="90" class="mini-canvas"></canvas>
        </div>

        <div class="card controls-card">
          <h3>CONTROLS</h3>
          <ul class="controls-list">
            <li><kbd>←</kbd> <kbd>→</kbd> / <kbd>A</kbd> <kbd>D</kbd><span>Move</span></li>
            <li><kbd>↑</kbd> / <kbd>W</kbd> <kbd>X</kbd><span>Rotate CW</span></li>
            <li><kbd>Z</kbd> / <kbd>Ctrl</kbd><span>Rotate CCW</span></li>
            <li><kbd>↓</kbd> / <kbd>S</kbd><span>Soft Drop</span></li>
            <li><kbd>Space</kbd><span>Hard Drop</span></li>
            <li><kbd>C</kbd> / <kbd>Shift</kbd><span>Hold Piece</span></li>
            <li><kbd>P</kbd> / <kbd>Esc</kbd><span>Pause</span></li>
          </ul>
        </div>
      </aside>
    </main>

    <!-- Mobile Touch Controls -->
    <div class="touch-controls" v-if="gameStatus === 'PLAYING'">
      <div class="touch-row">
        <button class="touch-btn" @click="hold" title="Hold piece">⇄ Hold</button>
        <button class="touch-btn" @click="rotate(-1)" title="Rotate Counter-Clockwise">↺ CCW</button>
        <button class="touch-btn" @click="rotate(1)" title="Rotate Clockwise">↻ CW</button>
        <button class="touch-btn touch-btn-accent" @click="hardDrop" title="Hard drop">⤓ Drop</button>
      </div>
      <div class="touch-row">
        <button class="touch-btn" @click="moveLeft" title="Move Left">◀ Left</button>
        <button class="touch-btn" @click="softDrop" title="Soft drop">▼ Down</button>
        <button class="touch-btn" @click="moveRight" title="Move Right">Right ▶</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$primary-color: #4e295c;
$accent-color: #6b3d7d;
$dark-bg: #13111c;
$card-bg: #1d192b;
$panel-border: #352f4c;
$text-light: #f5f2f8;
$text-dim: #9d94b8;
$highlight-cyan: #00e5ff;
$highlight-yellow: #ffd600;

.tetris-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 0.5rem 1rem 2rem;
  color: $text-light;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  user-select: none;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;

  h1 {
    font-family: 'Bauhaus 93', Arial, sans-serif;
    font-size: 2.4rem;
    letter-spacing: 2px;
    margin: 0;
    color: $primary-color;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  }

  .nav-back {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-weight: 600;
    color: $primary-color;
    font-size: 1.1rem;
    padding: 0.4rem 0.8rem;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    transition: all 0.2s;

    &:hover {
      background: white;
      transform: translateY(-1px);
    }
  }

  .btn-icon {
    background: rgba(255, 255, 255, 0.6);
    border: none;
    font-size: 1.4rem;
    padding: 0.3rem 0.6rem;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: white;
    }
  }
}

.game-layout {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.side-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 170px;
}

.card {
  background: $card-bg;
  border: 2px solid $panel-border;
  border-radius: 12px;
  padding: 0.9rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  text-align: center;

  h3 {
    margin: 0 0 0.6rem 0;
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 1.5px;
    color: $highlight-cyan;
    text-transform: uppercase;
  }
}

.mini-canvas {
  background: $dark-bg;
  border-radius: 8px;
  display: block;
  margin: 0 auto;
  border: 1px solid $panel-border;
}

.shortcut-tip {
  margin-top: 0.4rem;
  font-size: 0.75rem;
  color: $text-dim;
}

.stats-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  text-align: left;

  .stat-item {
    display: flex;
    flex-direction: column;

    .stat-label {
      font-size: 0.75rem;
      font-weight: 600;
      color: $text-dim;
      letter-spacing: 1px;
    }

    .stat-value {
      font-size: 1.35rem;
      font-weight: 800;
      font-family: 'Consolas', monospace;
      color: $highlight-yellow;
    }
  }
}

.center-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.canvas-wrapper {
  position: relative;
  background: $dark-bg;
  border: 4px solid #3d3559;
  border-radius: 12px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  display: inline-block;
}

.tetris-canvas {
  display: block;
}

.game-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(19, 17, 28, 0.88);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  text-align: center;
  animation: fadeIn 0.25s ease-out;

  .overlay-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    h2 {
      margin: 0;
      font-size: 2rem;
      font-weight: 800;
      letter-spacing: 2px;
      color: $highlight-cyan;
    }

    .gameover-title {
      color: #ff1744;
    }

    p {
      margin: 0;
      color: $text-dim;
      font-size: 0.95rem;
    }

    .final-score {
      font-size: 1.2rem;
      color: $text-light;
      strong {
        color: $highlight-yellow;
      }
    }

    .new-high {
      color: #00e676;
      font-weight: bold;
      animation: pulse 1.5s infinite;
    }
  }
}

.game-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.btn {
  font-family: inherit;
  font-weight: 700;
  font-size: 1.05rem;
  padding: 0.6rem 1.6rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:active {
    transform: scale(0.96);
  }

  &.btn-primary {
    background: linear-gradient(135deg, #00e5ff 0%, #0091ea 100%);
    color: #0d1b2a;
    box-shadow: 0 4px 14px rgba(0, 229, 255, 0.35);

    &:hover {
      filter: brightness(1.1);
      box-shadow: 0 6px 18px rgba(0, 229, 255, 0.5);
    }
  }

  &.btn-secondary {
    background: #4e295c;
    color: ghostwhite;

    &:hover {
      background: #6b3d7d;
    }
  }

  &.btn-outline {
    background: transparent;
    border: 1px solid $panel-border;
    color: $text-dim;

    &:hover {
      color: $text-light;
      border-color: $text-dim;
    }
  }

  &.btn-sm {
    font-size: 0.85rem;
    padding: 0.4rem 0.9rem;
  }
}

.controls-card {
  text-align: left;

  .controls-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.8rem;
      color: $text-dim;

      kbd {
        background: $dark-bg;
        border: 1px solid $panel-border;
        border-radius: 4px;
        padding: 0.15rem 0.35rem;
        font-family: monospace;
        font-size: 0.75rem;
        color: $highlight-yellow;
      }
    }
  }
}

.touch-controls {
  display: none;
  margin-top: 1rem;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  max-width: 380px;
  margin-left: auto;
  margin-right: auto;

  .touch-row {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
  }

  .touch-btn {
    flex: 1;
    min-height: 48px;
    background: $card-bg;
    color: $text-light;
    border: 1px solid $panel-border;
    border-radius: 8px;
    font-size: 0.95rem;
    font-weight: bold;
    cursor: pointer;
    touch-action: manipulation;

    &:active {
      background: #342c4d;
      transform: scale(0.97);
    }

    &.touch-btn-accent {
      background: #2a3b5c;
      border-color: #3f6096;
      color: $highlight-cyan;
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@media (max-width: 720px) {
  .side-panel {
    width: 100%;
    flex-direction: row;
    justify-content: center;
  }

  .hold-card,
  .next-card {
    flex: 1;
    max-width: 140px;
  }

  .stats-card,
  .controls-card {
    flex: 1;
    max-width: 160px;
  }

  .touch-controls {
    display: flex;
  }
}
</style>
