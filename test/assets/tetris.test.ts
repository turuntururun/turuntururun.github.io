import { expect, test, describe } from '@jest/globals'
import {
  createEmptyBoard,
  generateBag,
  createPiece,
  rotateMatrix,
  checkCollision,
  tryRotate,
  getGhostY,
  lockPiece,
  clearLines,
  calculateScore,
  getDropSpeed,
  BOARD_WIDTH,
  BOARD_HEIGHT,
  Piece,
} from '../../assets/tetris'

describe('Tetris engine tests', () => {
  test('createEmptyBoard initializes correct dimensions', () => {
    const board = createEmptyBoard()
    expect(board.length).toBe(BOARD_HEIGHT)
    expect(board[0].length).toBe(BOARD_WIDTH)
    expect(board.every((row) => row.every((cell) => cell === null))).toBe(true)
  })

  test('generateBag produces all 7 unique tetrominoes', () => {
    const bag = generateBag()
    expect(bag.length).toBe(7)
    expect(new Set(bag).size).toBe(7)
  })

  test('createPiece initializes piece properties', () => {
    const piece = createPiece('T')
    expect(piece.type).toBe('T')
    expect(piece.color).toBe('#d500f9')
    expect(piece.y).toBe(0)
    expect(piece.x).toBeGreaterThanOrEqual(0)
  })

  test('rotateMatrix rotates clockwise and counter-clockwise correctly', () => {
    const matrix = [
      [1, 2],
      [3, 4],
    ]
    const cw = rotateMatrix(matrix, 1)
    expect(cw).toEqual([
      [3, 1],
      [4, 2],
    ])

    const ccw = rotateMatrix(matrix, -1)
    expect(ccw).toEqual([
      [2, 4],
      [1, 3],
    ])
  })

  test('checkCollision detects boundaries and existing cells', () => {
    const board = createEmptyBoard()
    const matrix = [[1]]

    // Inside bounds
    expect(checkCollision(board, matrix, { x: 5, y: 5 })).toBe(false)

    // Left wall collision
    expect(checkCollision(board, matrix, { x: -1, y: 5 })).toBe(true)

    // Right wall collision
    expect(checkCollision(board, matrix, { x: BOARD_WIDTH, y: 5 })).toBe(true)

    // Floor collision
    expect(checkCollision(board, matrix, { x: 5, y: BOARD_HEIGHT })).toBe(true)

    // Block collision
    board[10][5] = '#ff0000'
    expect(checkCollision(board, matrix, { x: 5, y: 10 })).toBe(true)
  })

  test('tryRotate rotates piece and applies wall kicks if near wall', () => {
    const board = createEmptyBoard()
    const piece: Piece = {
      type: 'I',
      matrix: [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      x: BOARD_WIDTH - 2,
      y: 5,
      color: '#00e5ff',
    }

    const rotated = tryRotate(board, piece, 1)
    expect(rotated).not.toBeNull()
    if (rotated) {
      expect(checkCollision(board, rotated.matrix, { x: rotated.x, y: rotated.y })).toBe(false)
    }
  })

  test('getGhostY computes correct drop position', () => {
    const board = createEmptyBoard()
    const piece = createPiece('O')
    piece.y = 0
    const ghostY = getGhostY(board, piece)
    expect(ghostY).toBe(BOARD_HEIGHT - 2)
  })

  test('lockPiece and clearLines correctly update board and score', () => {
    let board = createEmptyBoard()
    // Fill row 18 and 19 completely except 2 cells
    for (let c = 0; c < BOARD_WIDTH - 2; c++) {
      board[18][c] = '#ffffff'
      board[19][c] = '#ffffff'
    }

    const piece: Piece = {
      type: 'O',
      matrix: [
        [1, 1],
        [1, 1],
      ],
      x: BOARD_WIDTH - 2,
      y: 18,
      color: '#ffd600',
    }

    board = lockPiece(board, piece)
    // Row 18 and 19 should now be full
    const { newBoard, linesCleared, clearedIndices } = clearLines(board)
    expect(linesCleared).toBe(2)
    expect(clearedIndices).toEqual([18, 19])
    expect(newBoard.length).toBe(BOARD_HEIGHT)
    expect(newBoard[19].every((c) => c === null)).toBe(true)

    expect(calculateScore(1, 1)).toBe(100)
    expect(calculateScore(4, 2)).toBe(1600)
    expect(getDropSpeed(1)).toBe(1000)
    expect(getDropSpeed(5)).toBe(680)
  })
})
