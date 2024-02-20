class ThreeByThree extends Puzzle {
    isConstructed = false;

    static Move = {
        R: 'R',
        U: 'U',
        F: 'F',
        L: 'L',
        D: 'D',
        B: 'B',
    };

    static TurnType = {
        Clockwise: '',
        Anticlockwise: '\'',
        Double: '2',
    };

    edges;
    corners;
    centres;

    w = "60px";
    h = "60px";

    constructor() {
        super();
        this.edges = new Map();
        this.corners = new Map();
        this.centres = new Map();
        this.solve();
    }

    makeLettersAppear() {
        let currEdge = "A1";
        let currCorner = "A0";
        for (let i = 0; i < 24; i++) {
            document.getElementById(currEdge).innerHTML = currEdge[0];
            document.getElementById(currCorner).innerHTML = currCorner[0];
            currEdge = incrementString(currEdge);
            currCorner = incrementString(currCorner);
        }
    }

    makeCornersDisappear() {
        let currCorner = "A0";
        for (let i = 0; i < 24; i++) {
            document.getElementById(currCorner).innerHTML = "";
            currCorner = incrementString(currCorner);
        }
    }

    makeEdgesDisappear() {
        let currEdge = "A1";
        for (let i = 0; i < 24; i++) {
            document.getElementById(currEdge).innerHTML = "";
            currEdge = incrementString(currEdge);
        }
    }

    deleteExtras() {
        this.makeCornersDisappear();
        this.makeEdgesDisappear();
    }

    solve() {
        const letters = [
            ["A", "B", "C", "D"],
            ["E", "F", "G", "H"],
            ["I", "J", "K", "L"],
            ["M", "N", "O", "P"],
            ["Q", "R", "S", "T"],
            ["U", "V", "W", "X"]
        ];

        for (const currRow of letters) {
            for (const key of currRow) {
                const color = 
                    key == "A" || key == "B" || key == "C" || key == "D" ? white:
                    key == "E" || key == "F" || key == "G" || key == "H" ? orange :
                    key == "I" || key == "J" || key == "K" || key == "L" ? green :
                    key == "M" || key == "N" || key == "O" || key == "P" ? red :
                    key == "Q" || key == "R" || key == "S" || key == "T" ? blue :
                    key == "U" || key == "V" || key == "W" || key == "X" ? yellow :
                                                                           null;

                const id0 = key + "0";
                const id1 = key + "1";

                this.edges.set(id1, color);
                this.corners.set(id0, color);

                if (this.isConstructed) {
                    this.setColor(id1, this.edges);
                    this.setColor(id0, this.corners);
                }
            }
        }

        this.centres.set("UCentre", white);
        this.centres.set("BCentre", blue);
        this.centres.set("RCentre", red);
        this.centres.set("FCentre", green);
        this.centres.set("DCentre", yellow);
        this.centres.set("LCentre", orange);

        if (this.isConstructed) {
            this.setColor("UCentre", this.centres);
            this.setColor("BCentre", this.centres);
            this.setColor("RCentre", this.centres);
            this.setColor("FCentre", this.centres);
            this.setColor("DCentre", this.centres);
            this.setColor("LCentre", this.centres);
        }
    }

    setColor(id, pieces) {
        document.getElementById(id)
            .setAttribute("style", "background-color: " + pieces.get(id) +  "; width: " + this.w + "; height: " + this.h);
    }

    getMove(randomNum) {
        return randomNum == 0 ? ThreeByThree.Move.R :
               randomNum == 1 ? ThreeByThree.Move.U :
               randomNum == 2 ? ThreeByThree.Move.F :
               randomNum == 3 ? ThreeByThree.Move.L :
               randomNum == 4 ? ThreeByThree.Move.D :
               randomNum == 5 ? ThreeByThree.Move.B :
                                null;
    }

    getRandomTurnType() {
        const randomNum = Math.floor(Math.random() * 3);

        return randomNum == 0 ? ThreeByThree.TurnType.Clockwise :
               randomNum == 1 ? ThreeByThree.TurnType.Anticlockwise :
               randomNum == 2 ? ThreeByThree.TurnType.Double :
                                null;
    }

    generateRandomScramble(moves) {
        let possibleMoves = Array(6).fill(true);
        /*Math.floor(Math.random() * 2) + 20*/
        const movesCount = moves === undefined ? 22 : moves;
        let result = Array(movesCount);
        for(let i = 0 ; i < movesCount ; i++) {
            let randomNum = -1;
            while(true) {
                randomNum = Math.floor(Math.random() * 6);
                if(possibleMoves[randomNum] == true) {
                    if(possibleMoves[(randomNum + 3) % 6] == true) {
                        possibleMoves.fill(true);
                    }
                    possibleMoves[randomNum] = false;
                    break;
                }
            }
            const currentTurn = {
                move: this.getMove(randomNum),
                turnType: this.getRandomTurnType(),
            }
            const str = currentTurn.move + currentTurn.turnType;
            
            result[i] = str;
        }
        return result;
    }
    
    addScramble(givenScramble) {
        if(this.scrambles.length != 0) {
            this.scrambleIndex++;
        }
        this.scrambles.push(givenScramble);
    }

    strigifyScramble() {
        let result = "";
        for (let i = 0 ; i < this.scrambles[this.scrambleIndex].length ; i++) {
            result += this.scrambles[this.scrambleIndex][i];
            if (i != this.scrambles[this.scrambleIndex].length - 1) {
                result += " ";
            }
        }
        return result;
    }

    doScramble() {
        this.solve();
        for(let i = 0 ; i < this.scrambles[this.scrambleIndex].length ; i++) {
            this.move(this.scrambles[this.scrambleIndex][i]);
        }
    }

    singleTurn(id1, id2, id3, id4, pieces) {
        const lostPiece = pieces.get(id1);
        pieces.set(id1, pieces.get(id2));
        pieces.set(id2, pieces.get(id3));
        pieces.set(id3, pieces.get(id4));
        pieces.set(id4, lostPiece);

        this.setColor(id1, pieces);
        this.setColor(id2, pieces);
        this.setColor(id3, pieces);
        this.setColor(id4, pieces);
    }

    doubleTurn(id1, id2, id3, id4, pieces) {
        const lostPiece1 = pieces.get(id1);
        pieces.set(id1, pieces.get(id3));
        pieces.set(id3, lostPiece1);

        const lostPiece2 = pieces.get(id2);
        pieces.set(id2, pieces.get(id4));
        pieces.set(id4, lostPiece2);

        this.setColor(id1, pieces);
        this.setColor(id2, pieces);
        this.setColor(id3, pieces);
        this.setColor(id4, pieces);
    }

    move(moveAsString) {
        if(moveAsString == "R") {
            this.singleTurn("B0", "J0", "V0", "T0", this.corners);
            this.singleTurn("C0", "K0", "W0", "Q0", this.corners);
            this.singleTurn("B1", "J1", "V1", "T1", this.edges);

            this.singleTurn("M0", "P0", "O0", "N0", this.corners);
            this.singleTurn("M1", "P1", "O1", "N1", this.edges);
        }
        else if(moveAsString == "R'") {
            this.singleTurn("B0", "T0", "V0", "J0", this.corners);
            this.singleTurn("C0", "Q0", "W0", "K0", this.corners);
            this.singleTurn("B1", "T1", "V1", "J1", this.edges);

            this.singleTurn("M0", "N0", "O0", "P0", this.corners);
            this.singleTurn("M1", "N1", "O1", "P1", this.edges);
        }
        else if(moveAsString == "R2") {
            this.doubleTurn("B0", "J0", "V0", "T0", this.corners);
            this.doubleTurn("C0", "K0", "W0", "Q0", this.corners);
            this.doubleTurn("B1", "J1", "V1", "T1", this.edges);

            this.doubleTurn("M0", "P0", "O0", "N0", this.corners);
            this.doubleTurn("M1", "P1", "O1", "N1", this.edges);
        }

        else if(moveAsString == "L") {
            this.singleTurn("A0", "S0", "U0", "I0", this.corners);
            this.singleTurn("D0", "R0", "X0", "L0", this.corners);
            this.singleTurn("D1", "R1", "X1", "L1", this.edges);

            this.singleTurn("F0", "E0", "H0", "G0", this.corners);
            this.singleTurn("E1", "H1", "G1", "F1", this.edges);
        }
        else if(moveAsString == "L'") {
            this.singleTurn("A0", "I0", "U0", "S0", this.corners);
            this.singleTurn("D0", "L0", "X0", "R0", this.corners);
            this.singleTurn("D1", "L1", "X1", "R1", this.edges);

            this.singleTurn("F0", "G0", "H0", "E0", this.corners);
            this.singleTurn("E1", "F1", "G1", "H1", this.edges);
        }
        else if(moveAsString == "L2") {
            this.doubleTurn("A0", "S0", "U0", "I0", this.corners);
            this.doubleTurn("D0", "R0", "X0", "L0", this.corners);
            this.doubleTurn("D1", "R1", "X1", "L1", this.edges);

            this.doubleTurn("F0", "E0", "H0", "G0", this.corners);
            this.doubleTurn("E1", "H1", "G1", "F1", this.edges);
        }

        else if(moveAsString == "M") {
            this.singleTurn("C1", "Q1", "W1", "K1", this.edges);
            this.singleTurn("I1", "A1", "S1", "U1", this.edges);
            this.singleTurn("FCentre", "UCentre", "BCentre", "DCentre", this.centres);
            //this.move("R");
            //this.move("L'");

            this.edgeBuffer = this.edgeBuffer == "C1" ? "K1" :
                              this.edgeBuffer == "I1" ? "U1" :
                              "W1";
        }

        else if(moveAsString == "U") {
            this.singleTurn("J0", "N0", "R0", "F0", this.corners);
            this.singleTurn("I0", "M0", "Q0", "E0", this.corners);
            this.singleTurn("I1", "M1", "Q1", "E1", this.edges);

            this.singleTurn("D0", "C0", "B0", "A0", this.corners);
            this.singleTurn("D1", "C1", "B1", "A1", this.edges);
        }
        else if(moveAsString == "U'") {
            this.singleTurn("J0", "F0", "R0", "N0", this.corners);
            this.singleTurn("I0", "E0", "Q0", "M0", this.corners);
            this.singleTurn("I1", "E1", "Q1", "M1", this.edges);

            this.singleTurn("A0", "B0", "C0", "D0", this.corners);
            this.singleTurn("A1", "B1", "C1", "D1", this.edges);
        }
        else if(moveAsString == "U2") {
            this.doubleTurn("J0", "N0", "R0", "F0", this.corners);
            this.doubleTurn("I0", "M0", "Q0", "E0", this.corners);
            this.doubleTurn("I1", "M1", "Q1", "E1", this.edges);

            this.doubleTurn("D0", "C0", "B0", "A0", this.corners);
            this.doubleTurn("D1", "C1", "B1", "A1", this.edges);
        }

        else if(moveAsString == "D") {
            this.singleTurn("K0", "G0", "S0", "O0", this.corners);
            this.singleTurn("L0", "H0", "T0", "P0", this.corners);
            this.singleTurn("K1", "G1", "S1", "O1", this.edges);

            this.singleTurn("V0", "U0", "X0", "W0", this.corners);
            this.singleTurn("U1", "X1", "W1", "V1", this.edges);
        }
        else if(moveAsString == "D'") {
            this.singleTurn("K0", "O0", "S0", "G0", this.corners);
            this.singleTurn("L0", "P0", "T0", "H0", this.corners);
            this.singleTurn("K1", "O1", "S1", "G1", this.edges);

            this.singleTurn("V0", "W0", "X0", "U0", this.corners);
            this.singleTurn("U1", "V1", "W1", "X1", this.edges);
        }
        else if(moveAsString == "D2") {
            this.doubleTurn("K0", "G0", "S0", "O0", this.corners);
            this.doubleTurn("L0", "H0", "T0", "P0", this.corners);
            this.doubleTurn("K1", "G1", "S1", "O1", this.edges);

            this.doubleTurn("V0", "U0", "X0", "W0", this.corners);
            this.doubleTurn("U1", "X1", "W1", "V1", this.edges);
        }

        else if(moveAsString == "F") {
            this.singleTurn("M0", "D0", "G0", "V0", this.corners);
            this.singleTurn("P0", "C0", "F0", "U0", this.corners);
            this.singleTurn("P1", "C1", "F1", "U1", this.edges);

            this.singleTurn("J0", "I0", "L0", "K0", this.corners);
            this.singleTurn("J1", "I1", "L1", "K1", this.edges);
        }
        else if(moveAsString == "F'") {
            this.singleTurn("M0", "V0", "G0", "D0", this.corners);
            this.singleTurn("P0", "U0", "F0", "C0", this.corners);
            this.singleTurn("P1", "U1", "F1", "C1", this.edges);

            this.singleTurn("J0", "K0", "L0", "I0", this.corners);
            this.singleTurn("J1", "K1", "L1", "I1", this.edges);
        }
        else if(moveAsString == "F2") {
            this.doubleTurn("M0", "D0", "G0", "V0", this.corners);
            this.doubleTurn("P0", "C0", "F0", "U0", this.corners);
            this.doubleTurn("P1", "C1", "F1", "U1", this.edges);

            this.doubleTurn("J0", "I0", "L0", "K0", this.corners);
            this.doubleTurn("J1", "I1", "L1", "K1", this.edges);
        }

        else if(moveAsString == "B") {
            this.singleTurn("A0", "N0", "W0", "H0", this.corners);
            this.singleTurn("B0", "O0", "X0", "E0", this.corners);
            this.singleTurn("A1", "N1", "W1", "H1", this.edges);

            this.singleTurn("Q0", "T0", "S0", "R0", this.corners);
            this.singleTurn("Q1", "T1", "S1", "R1", this.edges);
        }
        else if(moveAsString == "B'") {
            this.singleTurn("A0", "H0", "W0", "N0", this.corners);
            this.singleTurn("B0", "E0", "X0", "O0", this.corners);
            this.singleTurn("A1", "H1", "W1", "N1", this.edges);

            this.singleTurn("Q0", "R0", "S0", "T0", this.corners);
            this.singleTurn("Q1", "R1", "S1", "T1", this.edges);
        }
        else if(moveAsString == "B2") {
            this.doubleTurn("A0", "N0", "W0", "H0", this.corners);
            this.doubleTurn("B0", "O0", "X0", "E0", this.corners);
            this.doubleTurn("A1", "N1", "W1", "H1", this.edges);

            this.doubleTurn("Q0", "T0", "S0", "R0", this.corners);
            this.doubleTurn("Q1", "T1", "S1", "R1", this.edges);
        }
    }

    drawScheme() {
        document.write('<table id="cube3x3">');
        for (var i = 0; i <= 8; i++) {
            document.write("<tr>");
            if(i == 0 || i == 6) {
                document.write('<td class="empty" colspan="3" rowspan="3"></td>');
            }
            for (var j = 0; j <= 11; j++) {
                if((i == 0 || i == 6) && j == 6) {
                    document.write("<td colspan=\"6\" rowspan=\"3\"></td>");
                    continue;
                }
                else if((i < 3 || i >= 6) && j >= 6) {
                    continue;
                }
                if((i < 3 || i >= 6) && j < 3) {
                    continue;
                }

                let color;
                let id;
                {
                    // the whites
                    if(i == 0 && j == 3) {
                        id = "A0";
                    }
                    else if(i == 0 && j == 4) {
                        id = "A1";
                    }
                    else if(i == 0 && j == 5) {
                        id = "B0";
                    }
                    else if(i == 1 && j == 3) {
                        id = "D1";
                    }
                    else if(i == 1 && j == 4) {
                        id = "UCentre"
                    }
                    else if(i == 1 && j == 5) {
                        id = "B1";
                    }
                    else if(i == 2 && j == 3) {
                        id = "D0";
                    }
                    else if(i == 2 && j == 4) {
                        id = "C1";
                    }
                    else if(i == 2 && j == 5) {
                        id = "C0";
                    }
            
                    // the oranges
                    else if(i == 3 && j == 0) {
                        id = "E0";
                    }
                    else if(i == 3 && j == 1) {
                        id = "E1";
                    }
                    else if(i == 3 && j == 2) {
                        id = "F0";
                    }
                    else if(i == 4 && j == 0) {
                        id = "H1";
                    }
                    else if(i == 4 && j == 1) {
                        id = "LCentre";
                    }
                    else if(i == 4 && j == 2) {
                        id = "F1";
                    }
                    else if(i == 5 && j == 0) {
                        id = "H0";
                    }
                    else if(i == 5 && j == 1) {
                        id = "G1";
                    }
                    else if(i == 5 && j == 2) {
                        id = "G0";
                    }

                    // the greens
                    else if(i == 3 && j == 3) {
                        id = "I0";
                    }
                    else if(i == 3 && j == 4) {
                        id = "I1";
                    }
                    else if(i == 3 && j == 5) {
                        id = "J0";
                    }
                    else if(i == 4 && j == 3) {
                        id = "L1";
                    }
                    else if(i == 4 && j == 4) {
                        id = "FCentre"
                    }
                    else if(i == 4 && j == 5) {
                        id = "J1";
                    }
                    else if(i == 5 && j == 3) {
                        id = "L0";
                    }
                    else if(i == 5 && j == 4) {
                        id = "K1";
                    }
                    else if(i == 5 && j == 5) {
                        id = "K0";
                    }

                    // the reds
                    else if(i == 3 && j == 6) {
                        id = "M0";
                    }
                    else if(i == 3 && j == 7) {
                        id = "M1";
                    }
                    else if(i == 3 && j == 8) {
                        id = "N0";
                    }
                    else if(i == 4 && j == 6) {
                        id = "P1";
                    }
                    else if(i == 4 && j == 7) {
                        id = "RCentre";
                    }
                    else if(i == 4 && j == 8) {
                        id = "N1";
                    }
                    else if(i == 5 && j == 6) {
                        id = "P0";
                    }
                    else if(i == 5 && j == 7) {
                        id = "O1";
                    }
                    else if(i == 5 && j == 8) {
                        id = "O0";
                    }

                    // the blues
                    else if(i == 3 && j == 9) {
                        id = "Q0";
                    }
                    else if(i == 3 && j == 10) {
                        id = "Q1";
                    }
                    else if(i == 3 && j == 11) {
                        id = "R0";
                    }
                    else if(i == 4 && j == 9) {
                        id = "T1";
                    }
                    else if(i == 4 && j == 10) {
                        id = "BCentre";
                    }
                    else if(i == 4 && j == 11) {
                        id = "R1";
                    }
                    else if(i == 5 && j == 9) {
                        id = "T0";
                    }
                    else if(i == 5 && j == 10) {
                        id = "S1";
                    }
                    else if(i == 5 && j == 11) {
                        id = "S0";
                    }

                    // the yellows
                    else if(i == 6 && j == 3) {
                        id = "U0";
                    }
                    else if(i == 6 && j == 4) {
                        id = "U1";
                    }
                    else if(i == 6 && j == 5) {
                        id = "V0";
                    }
                    else if(i == 7 && j == 3) {
                        id = "X1";
                    }
                    else if(i == 7 && j == 4) {
                        id = "DCentre";
                    }
                    else if(i == 7 && j == 5) {
                        id = "V1";
                    }
                    else if(i == 8 && j == 3) {
                        id = "X0";
                    }
                    else if(i == 8 && j == 4) {
                        id = "W1";
                    }
                    else if(i == 8 && j == 5) {
                        id = "W0";
                    }
                }

                color = id[1] === "1" ? this.edges.get(id) :
                        id[1] === "0" ? this.corners.get(id) :
                                        this.centres.get(id);

                document.write(
                    "<td class=cell id=" + id + " style=\"background-color: " + color + "; " +
                    "width: " + this.w + "; height: " + this.h + ";\">" +

                    "</td>"
                );
            }
            document.write("</tr>");
        }
        document.write("</table>");
        this.isConstructed = true;
    }
}

