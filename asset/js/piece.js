export const piece = {
    red: {
        'pawn': '兵',
        'cannon': '砲',
        'rook': '車',
        'knight': '马',
        'bishop': '相',
        'guard': '仕',
        'king': '帅'
    },
    green: {
        'pawn': '卒',
        'cannon': '炮',
        'rook': '車',
        'knight': '马',
        'bishop': '象',
        'guard': '士',
        'king': '将'
    }
}

export const pieceType = {
    pawn: 'pawn',
    cannon: 'cannon',
    rook: 'rook',
    knight: 'knight',
    bishop: 'bishop',
    guard: 'guard',
    king: 'king'
}

export function getPieceType(chineeseName) {
    switch (chineeseName) {
        case '兵':
        case '卒':
            return pieceType.pawn
        case '砲':
        case '炮':
            return pieceType.cannon
        case '車':
            return pieceType.rook
        case '马':
            return pieceType.knight
        case '相':
        case '象':
            return pieceType.bishop
        case '仕':
        case '士':
            return pieceType.guard
        case '帅':
        case '将':
            return pieceType.king
        default:
            return null
    }
}

export const side = {
    red: 1,
    green: -1
}

export const piecesPosition = [
    [side.red, piece.red.rook, 0, 0], [side.red, piece.red.rook, 0, 8],
    [side.red, piece.red.knight, 0, 1], [side.red, piece.red.knight, 0, 7],
    [side.red, piece.red.bishop, 0, 2], [side.red, piece.red.bishop, 0, 6],
    [side.red, piece.red.guard, 0, 3], [side.red, piece.red.guard, 0, 5],
    [side.red, piece.red.king, 0, 4],
    [side.red, piece.red.cannon, 2, 1], [side.red, piece.red.cannon, 2, 7],
    [side.red, piece.red.pawn, 3, 0], [side.red, piece.red.pawn, 3, 2], [side.red, piece.red.pawn, 3, 4], [side.red, piece.red.pawn, 3, 6], [side.red, piece.red.pawn, 3, 8],

    [side.green, piece.green.rook, 9, 0], [side.green, piece.green.rook, 9, 8],
    [side.green, piece.green.knight, 9, 1], [side.green, piece.green.knight, 9, 7],
    [side.green, piece.green.bishop, 9, 2], [side.green, piece.green.bishop, 9, 6],
    [side.green, piece.green.guard, 9, 3], [side.green, piece.green.guard, 9, 5],
    [side.green, piece.green.king, 9, 4],
    [side.green, piece.green.cannon, 7, 1], [side.green, piece.green.cannon, 7, 7],
    [side.green, piece.green.pawn, 6, 0], [side.green, piece.green.pawn, 6, 2], [side.green, piece.green.pawn, 6, 4], [side.green, piece.green.pawn, 6, 6], [side.green, piece.green.pawn, 6, 8]
];