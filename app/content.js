class PieceType {
    static Pawn = new PieceType("p", "Pawn")
    static Rook = new PieceType("r", "Rook")
    static Knight = new PieceType("n", "Knight")
    static Bishop = new PieceType("b", "Bishop")
    static Queen = new PieceType("q", "Queen")
    static King = new PieceType("k", "King")
    static Empty = new PieceType("e", "Empty")

    constructor(symbol, name) {
        this.symbol = symbol
        this.name = name
    }
}

class Piece {
    constructor(piece, row, col, isWhite) {
        this.piece = piece
        this.row = row
        this.col = col
        this.isWhite = isWhite
    }
    toString() {
        return `${this.isWhite ? "White" : "Black"} ${this.piece.name} on Row: ${this.row} Col: ${this.col}`
    }
}

var getPieces = function() {
    let pieces = []
    for (let piece of document.getElementsByClassName("piece")) {
        let classes = piece.classList.value.split(" ")
        pieceType = classes.find(x => x.length === 2)
        pieceSquare = classes.find(x => x.startsWith("square-"))

        isWhite = pieceType.substring(0, 1) === "w"
        pieceType = Object.values(PieceType).find(x => x.symbol === pieceType.substring(1))
        col = parseInt(pieceSquare.substring(7, 8))
        row = parseInt(pieceSquare.substring(8))

        pieces.push(new Piece(pieceType, row, col, isWhite))
    }
    return pieces
}

var getPiece = function(pieces, item) {
    item = item.substring(item.length - 2)
    let col = parseInt(item.substring(0, 1))
    let row = parseInt(item.substring(1))
    return pieces.find(x => x.row === row && x.col === col)
}

var getPlayer = function(pieces) {
    let squares = []
    for (let el of document.getElementsByClassName("highlight")) {
        for (let _class of el.classList.value.split(" ")) {
            if (_class.startsWith("square")) {
                squares.push(_class)
            }
        }
    }
    if (squares.length > 2) {
        let excludeSquares = []
        for (let el of document.getElementsByClassName("hover-square")) {
            for (let _class of el.classList.value.split(" ")) {
                excludeSquares.push(_class)
            }
        }
        squares = squares.filter(x => !excludeSquares.includes(x))
    } else if (squares.length < 2) {
        return true
    }
    let piece = getPiece(pieces, squares[0])
    if (piece === undefined) {
        piece = getPiece(pieces, squares[1])
    }
    return !piece.isWhite
}

var printPieces = function() {
    let pieces = getPieces()
    console.log(getFEN(pieces, getPlayer(pieces), "KQkq", "-", 0, 1))
}

var getFEN = function(pieces, isWhite, castleString, epString, halfMoves, fullMoves) {
    pieces.sort((a, b) => {
        if (b.row - a.row === 0) {
            return a.col - b.col
        }
        return b.row - a.row
    })
    let blankPieces = 0, row = 8, col = 1, fen = "", index = 0
    while (row > 0) {
        if (pieces[index].row === row && pieces[index].col === col) {
            if (blankPieces > 0) {
                fen = `${fen}${blankPieces}`
            }
            symbol = pieces[index].piece.symbol
            if (pieces[index].isWhite) {
                symbol = symbol.toUpperCase()
            }
            fen = `${fen}${symbol}`
            blankPieces = 0
            index = (index + 1) % pieces.length
        } else {
            ++blankPieces
        }

        ++col
        if (col === 9) {
            if (blankPieces > 0) {
                fen = `${fen}${blankPieces}`
            }
            --row
            blankPieces = 0
            col = 1
            if (row > 0) {
                fen = `${fen}/`
            }
        }
    }
    fen = `${fen} ${isWhite ? "w" : "b"} ${castleString} ${epString} ${halfMoves} ${fullMoves}`
    return fen
}

window.addEventListener("click", printPieces)
printPieces()