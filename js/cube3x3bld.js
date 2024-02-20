class cube3x3bld extends ThreeByThree {
    edgeBuffer = "C1";
    cornerBuffer = "C0";

    getEdgeInversionsCount() {
        let ctr = 0;
        const arr = this.getBldSolutionEdges();
        const size = arr.length;
        for (let i = 0; i < size; i++) {
            let isCycleStarter = false;
            for (let j = 0; j < size; j++) {
                if (i == j) {
                    continue;
                }

                if (arr[i] == arr[j] || this.getComplimentaryOfEdge(arr[i]) == arr[j]) {
                    isCycleStarter = true;  
                }
            }

            if (!isCycleStarter) {
                ctr++;
            }
        }

        return ctr;
    }
    
    getCornerInversionsCount() {
        let ctr = 0;
        const arr = this.getBldSolutionCorners();
        const size = arr.length;
        for (let i = 0; i < size; i++) {
            let isCycleStarter = false;
            for (let j = 0; j < size; j++) {
                if (i == j) {
                    continue;
                }

                if (
                    arr[i] == arr[j] ||
                    this.getComplimentaryOfCorner(arr[i])[0] == arr[j] ||
                    this.getComplimentaryOfCorner(arr[i])[1] == arr[j]
                ) {
                    isCycleStarter = true;
                }
            }

            if (!isCycleStarter) {
                ctr++;
            }
        }

        return ctr;
    }

    printStoryEdges() {        
        document.getElementById("storyEdges").innerHTML =
            "история за ръбовете: TaLor swift is singing her song Blank Space while holding an United Arab" +
            "emirates flag on her JOurney to DEnver to see Aleksandar GluXkov";
    }

    printStoryCorners() {
        document.getElementById("storyCorners").innerHTML =
            "история за ъглите: the LiFt, in which a BmW crashed, is being restored by XakiRa while she is listening to K-Pop music";
    }

    getBldSolutionEdges() {
        let solvedEdges = this.getSolvedEdges();
        let numberOfSolvedEdges = 0;
        this.edges.forEach(function(value, key) {
            if (value == true) {
                numberOfSolvedEdges++;
            }
        });
        numberOfSolvedEdges /= 2;

        let result = new Array();
        while (numberOfSolvedEdges < 12) {
            let starter = this.pickEdge(solvedEdges);
            if (starter == null) {
                // If all edges are already solved
                break;
            }
            numberOfSolvedEdges++;
            let curr = starter;
            result.push(starter);
            while (true) {
                curr = this.getNextEdge(curr, solvedEdges);
                result.push(curr);
                if(curr == starter || this.getComplimentaryOfEdge(curr) == starter) {
                    break;
                } else {
                    numberOfSolvedEdges++;
                }
            }
        }
        return result;
    }

    getBldSolutionCorners() {
        let solvedCorners = this.getSolvedCorners();
        let numberOfSolvedCorners = 0;
        this.corners.forEach(function(value, key) {
            if(value == true) {
                numberOfSolvedCorners++;
            }
        });
        numberOfSolvedCorners /= 3;

        let result = new Array();
        while(numberOfSolvedCorners < 8) {
            let starter = this.pickCorner(solvedCorners);
            if(starter == null) {
                // If all corners are already solved
                break;
            }
            numberOfSolvedCorners++;
            let curr = starter;
            result.push(starter);
            while(true) {
                curr = this.getNextCorner(curr, solvedCorners);
                result.push(curr);
                if (
                    curr == starter ||
                    this.getComplimentaryOfCorner(curr)[0] == starter ||
                    this.getComplimentaryOfCorner(curr)[1] == starter
                ) {
                    break;
                }
                else {
                    numberOfSolvedCorners++;
                }
            }
        }
        return result;
    }

    strigifySolutionEdges(edges) {
        let result = "";
        let ctr = 0;
        let ctrForInv = 0;
        for (const edge of edges) {
            if (edge == null || edge == this.edgeBuffer || edge == this.getComplimentaryOfEdge(this.edgeBuffer)) {
                continue;
            }
            result += edge[0];
            if(ctr == 1) {
                result += " ";
            }
            ctr++;
            ctr %= 2;

            ctrForInv++;
        }
        this.edgeInv = ctrForInv;
        return result;
    }

    strigifySolutionCorners(corners) {
        let result = "";
        let ctr = 0;
        let ctrForInv = 0;
        for (const corner of corners) {
            if (
                corner == null ||
                corner == this.cornerBuffer ||
                corner == this.getComplimentaryOfCorner(this.cornerBuffer)[0] ||
                corner == this.getComplimentaryOfCorner(this.cornerBuffer)[1]
            ) {
                continue;
            }
            result += corner[0];
            if(ctr == 1) {
                result += " ";
            }
            ctr++;
            ctr %= 2;

            ctrForInv++;
        }
        this.cornerInv = ctrForInv;
        return result;
    }

    getSolvedEdges() {
        let result = new Map();
        let curr = "A1";
        let solvedCube = new ThreeByThree();
        solvedCube.solve();
        for (let i = 0 ; i < 24 ; i++) {
            if (result.has(curr)) {
                curr = incrementString(curr);
                continue;
            }
            let complimentary = this.getComplimentaryOfEdge(curr);
            if (solvedCube.edges.get(curr) == this.edges.get(curr) && solvedCube.edges.get(complimentary) == this.edges.get(complimentary)) {
                result.set(curr, true);
                result.set(complimentary, true);
            } else {
                result.set(curr, false);
                result.set(complimentary, false);
            }
            curr = incrementString(curr);
        }
        return result;
    }

    getSolvedCorners() {
        let result = new Map();
        let curr = "A0";
        let solvedCube = new ThreeByThree();
        solvedCube.solve();
        for(let i = 0 ; i < 24 ; i++) {
            if (result.has(curr)) {
                curr = incrementString(curr);
                continue;
            }

            const complimentaries = this.getComplimentaryOfCorner(curr);
            const complimentary1 = complimentaries[0];
            const complimentary2 = complimentaries[1];
            if (
                solvedCube.corners.get(curr) == this.corners.get(curr) &&
                solvedCube.corners.get(complimentary1) == this.corners.get(complimentary1) &&
                solvedCube.corners.get(complimentary2) == this.corners.get(complimentary2)
            ) {
                result.set(curr, true);
                result.set(complimentary1, true);
                result.set(complimentary2, true);
            } else {
                result.set(curr, false);
                result.set(complimentary1, false);
                result.set(complimentary2, false);
            }
            curr = incrementString(curr);
        }
        return result;
    }

    pickEdge(solvedEdges) {
        if(solvedEdges.get(this.edgeBuffer) == false) {
            solvedEdges.set(this.edgeBuffer, true);
            solvedEdges.set(this.getComplimentaryOfEdge(this.edgeBuffer), true);
            return this.edgeBuffer;
        }
        let curr = "A1";
        for(let i = 0 ; i < 24 ; i++) {
            if(solvedEdges.get(curr) == false) {
                solvedEdges.set(curr, true);
                solvedEdges.set(this.getComplimentaryOfEdge(curr), true);
                return curr;
            }
            curr = incrementString(curr);
        }
        return null;
    }

    /**
     * Picks the first corner of a new cycle.
     * 
     * @param {Map<string, boolean>} solvedCorners All the corners and whether they are in the right place
     * @returns {string|null} 
     * - The corner at which a new cycle can be started
     * - null if all corners are solved and a new cycle cannot be started.
     */
    pickCorner(solvedCorners) {
        if(solvedCorners.get(this.cornerBuffer) == false) {
            solvedCorners.set(this.cornerBuffer, true);
            solvedCorners.set(this.getComplimentaryOfCorner(this.cornerBuffer)[0], true);
            solvedCorners.set(this.getComplimentaryOfCorner(this.cornerBuffer)[1], true);
            return this.cornerBuffer;
        }
        let curr = "A0";
        for(let i = 0 ; i < 24 ; i++) {
            if(solvedCorners.get(curr) == false) {
                solvedCorners.set(curr, true);
                solvedCorners.set(this.getComplimentaryOfCorner(curr)[0], true);
                solvedCorners.set(this.getComplimentaryOfCorner(curr)[1], true);
                return curr;
            }
            curr = incrementString(curr);
        }
        return null;
    }

    getNextEdge(currEdge, solvedEdges) {
        let curr = "A1";
        let solvedCube = new ThreeByThree();
        solvedCube.solve();

        const color1 = this.edges.get(currEdge);
        const color2 = this.edges.get(this.getComplimentaryOfEdge(currEdge));
        for(let i = 0 ; i < 24 ; i++) {
            const currCompl = this.getComplimentaryOfEdge(curr);
            if(solvedCube.edges.get(curr) == color1 && solvedCube.edges.get(currCompl) == color2) {
                solvedEdges.set(curr, true);
                solvedEdges.set(currCompl, true);
                return curr;
            }
            curr = incrementString(curr);
        }
        return null;
    }

    getNextCorner(currCorner, solvedCorners) {
        let curr = "A0";
        let solvedCube = new ThreeByThree();
        solvedCube.solve();

        const color1 = this.corners.get(currCorner);
        const color2 = this.corners.get(this.getComplimentaryOfCorner(currCorner)[0]);
        const color3 = this.corners.get(this.getComplimentaryOfCorner(currCorner)[1]);

        for(let i = 0 ; i < 24 ; i++) {
            const currCompl1 = this.getComplimentaryOfCorner(curr)[0];
            const currCompl2 = this.getComplimentaryOfCorner(curr)[1];

            if (
                (
                    solvedCube.corners.get(curr) == color1 &&
                    solvedCube.corners.get(currCompl1) == color2 &&
                    solvedCube.corners.get(currCompl2) == color3
                )
                ||
                (
                    solvedCube.corners.get(curr) == color1 &&
                    solvedCube.corners.get(currCompl1) == color3 &&
                    solvedCube.corners.get(currCompl2) == color2
                )
            ) {
                solvedCorners.set(curr, true);
                solvedCorners.set(currCompl1, true);
                solvedCorners.set(currCompl2, true);
                return curr;
            }
            curr = incrementString(curr);
        }
        return null;
    }

    getComplimentaryOfEdge(edge) {
        if(edge == "A1") {
            return "Q1";
        }
        else if(edge == "Q1") {
            return "A1";
        }

        else if(edge == "B1") {
            return "M1";
        }
        else if(edge == "M1") {
            return "B1";
        }
        
        else if(edge == "C1") {
            return "I1";
        }
        else if(edge == "I1") {
            return "C1";
        }

        else if(edge == "D1") {
            return "E1";
        }
        else if(edge == "E1") {
            return "D1";
        }

        else if(edge == "F1") {
            return "L1";
        }
        else if(edge == "L1") {
            return "F1";
        }

        else if(edge == "G1") {
            return "X1";
        }
        else if(edge == "X1") {
            return "G1";
        }

        else if(edge == "H1") {
            return "R1";
        }
        else if(edge == "R1") {
            return "H1";
        }

        else if(edge == "J1") {
            return "P1";
        }
        else if(edge == "P1") {
            return "J1";
        }

        else if(edge == "K1") {
            return "U1";
        }
        else if(edge == "U1") {
            return "K1";
        }

        else if(edge == "N1") {
            return "T1";
        }
        else if(edge == "T1") {
            return "N1";
        }

        else if(edge == "O1") {
            return "V1";
        }
        else if(edge == "V1") {
            return "O1";
        }

        else if(edge == "S1") {
            return "W1";
        }
        else if(edge == "W1") {
            return "S1";
        }

        else {
            return null;
        }
    }

    getComplimentaryOfCorner(corner) {
        if(corner == "A0") {
            return ["E0", "R0"];
        }
        else if(corner == "E0") {
            return ["A0", "R0"];
        }
        else if(corner == "R0") {
            return ["A0", "E0"];
        }

        else if(corner == "B0") {
            return ["N0", "Q0"];
        }
        else if(corner == "N0") {
            return ["B0", "Q0"];
        }
        else if(corner == "Q0") {
            return ["B0", "N0"];
        }

        else if(corner == "C0") {
            return ["J0", "M0"];
        }
        else if(corner == "J0") {
            return ["C0", "M0"];
        }
        else if(corner == "M0") {
            return ["C0", "J0"];
        }

        else if(corner == "D0") {
            return ["F0", "I0"];
        }
        else if(corner == "F0") {
            return ["D0", "I0"];
        }
        else if(corner == "I0") {
            return ["D0", "F0"];
        }

        else if(corner == "G0") {
            return ["L0", "U0"];
        }
        else if(corner == "L0") {
            return ["G0", "U0"];
        }
        else if(corner == "U0") {
            return ["G0", "L0"];
        }

        else if(corner == "H0") {
            return ["S0", "X0"];
        }
        else if(corner == "S0") {
            return ["H0", "X0"];
        }
        else if(corner == "X0") {
            return ["H0", "S0"];
        }

        else if(corner == "K0") {
            return ["P0", "V0"];
        }
        else if(corner == "P0") {
            return ["K0", "V0"];
        }
        else if(corner == "V0") {
            return ["K0", "P0"];
        }

        else if(corner == "O0") {
            return ["T0", "W0"];
        }
        else if(corner == "T0") {
            return ["O0", "W0"];
        }
        else if(corner == "W0") {
            return ["O0", "T0"];
        }

        else {
            return null;
        }
    }
}
