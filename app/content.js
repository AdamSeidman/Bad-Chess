class PieceType {
    static Pawn = new PieceType("p", "Pawn")
    static Rook = new PieceType("r", "Rook")
    static Knight = new PieceType("n", "Knight")
    static Bishop = new PieceType("b", "Bishop")
    static Queen = new PieceType("q", "Queen")
    static King = new PieceType("k", "King")

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

var printPieces = function() {
    console.log("Pieces: ")
    getPieces().forEach(el => console.log(el.toString()))
}

printPieces()