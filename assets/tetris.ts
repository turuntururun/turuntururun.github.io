export type TetrominoType = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z'

export type Cell = string | null

export type Board = Cell[][]

export interface Piece {
  type: TetrominoType
  matrix: number[][]
  x: number
  y: number
  color: string
}

export const BOARD_WIDTH = 10
export const BOARD_HEIGHT = 20

export const TETROMINO_COLORS: Record<TetrominoType, string> = {
  I: '#00e5ff',
  J: '#2979ff',
  L: '#ff9100',
  O: '#ffd600',
  S: '#00e676',
  T: '#d500f9',
  Z: '#ff1744',
}

export const TETROMINO_SHAPES: Record<TetrominoType, number[][]> = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
}

export function createEmptyBoard(
  height = BOARD_HEIGHT,
  width = BOARD_WIDTH,
): Board {
  return Array.from({ length: height }, () => Array(width).fill(null))
}

export function generateBag(): TetrominoType[] {
  const pieces: TetrominoType[] = ['I', 'J', 'L', 'O', 'S', 'T', 'Z']
  for (let i = pieces.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pieces[i], pieces[j]] = [pieces[j], pieces[i]]
  }
  return pieces
}

export function createPiece(type: TetrominoType): Piece {
  const matrix = TETROMINO_SHAPES[type].map((row) => [...row])
  const color = TETROMINO_COLORS[type]
  const x = Math.floor((BOARD_WIDTH - matrix[0].length) / 2)
  const y = type === 'I' ? -1 : 0
  return { type, matrix, x, y, color }
}

export function rotateMatrix(matrix: number[][], dir: 1 | -1 = 1): number[][] {
  const n = matrix.length
  const result: number[][] = Array.from({ length: n }, () => Array(n).fill(0))
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (dir === 1) {
        result[c][n - 1 - r] = matrix[r][c]
      } else {
        result[n - 1 - c][r] = matrix[r][c]
      }
    }
  }
  return result
}

export function checkCollision(
  board: Board,
  matrix: number[][],
  offset: { x: number; y: number },
): boolean {
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      if (matrix[r][c] !== 0) {
        const targetX = offset.x + c
        const targetY = offset.y + r

        // Check horizontal bounds
        if (targetX < 0 || targetX >= BOARD_WIDTH) {
          return true
        }
        // Check bottom bound
        if (targetY >= BOARD_HEIGHT) {
          return true
        }
        // Check collision with locked blocks (if inside board)
        if (targetY >= 0 && board[targetY][targetX] !== null) {
          return true
        }
      }
    }
  }
  return false
}

export function tryRotate(
  board: Board,
  piece: Piece,
  dir: 1 | -1 = 1,
): Piece | null {
  if (piece.type === 'O') {
    return { ...piece }
  }

  const rotatedMatrix = rotateMatrix(piece.matrix, dir)
  const kickOffsets =
    piece.type === 'I'
      ? [
          { x: 0, y: 0 },
          { x: -1, y: 0 },
          { x: 1, y: 0 },
          { x: -2, y: 0 },
          { x: 2, y: 0 },
          { x: 0, y: -1 },
          { x: 0, y: -2 },
        ]
      : [
          { x: 0, y: 0 },
          { x: -1, y: 0 },
          { x: 1, y: 0 },
          { x: 0, y: -1 },
          { x: -1, y: -1 },
          { x: 1, y: -1 },
          { x: -2, y: 0 },
          { x: 2, y: 0 },
        ]

  for (const kick of kickOffsets) {
    const newX = piece.x + kick.x
    const newY = piece.y + kick.y
    if (!checkCollision(board, rotatedMatrix, { x: newX, y: newY })) {
      return {
        ...piece,
        matrix: rotatedMatrix,
        x: newX,
        y: newY,
      }
    }
  }
  return null
}

export function getGhostY(board: Board, piece: Piece): number {
  let ghostY = piece.y
  while (!checkCollision(board, piece.matrix, { x: piece.x, y: ghostY + 1 })) {
    ghostY++
  }
  return ghostY
}

export function lockPiece(board: Board, piece: Piece): Board {
  const newBoard = board.map((row) => [...row])
  for (let r = 0; r < piece.matrix.length; r++) {
    for (let c = 0; c < piece.matrix[r].length; c++) {
      if (piece.matrix[r][c] !== 0) {
        const boardY = piece.y + r
        const boardX = piece.x + c
        if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
          newBoard[boardY][boardX] = piece.color
        }
      }
    }
  }
  return newBoard
}

export function clearLines(board: Board): {
  newBoard: Board
  linesCleared: number
  clearedIndices: number[]
} {
  const clearedIndices: number[] = []
  const remainingRows: Cell[][] = []

  for (let r = 0; r < board.length; r++) {
    const isFull = board[r].every((cell) => cell !== null)
    if (isFull) {
      clearedIndices.push(r)
    } else {
      remainingRows.push([...board[r]])
    }
  }

  const linesCleared = clearedIndices.length
  const emptyRows = Array.from({ length: linesCleared }, () =>
    Array(BOARD_WIDTH).fill(null),
  )
  const newBoard = [...emptyRows, ...remainingRows]

  return {
    newBoard,
    linesCleared,
    clearedIndices,
  }
}

export function calculateScore(linesCleared: number, level: number): number {
  const baseScores = [0, 100, 300, 500, 800]
  return (baseScores[linesCleared] || 0) * level
}

export function getDropSpeed(level: number): number {
  return Math.max(80, 1000 - (level - 1) * 80)
}
