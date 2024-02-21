const puzzle = new cube3x3bld();

function getLineOfEdgesSolution() {
    const edgesSolution = puzzle.strigifySolutionEdges(
        puzzle.getBldSolutionEdges(),
    );
    return "Solution for the edges: " + edgesSolution;
}

function getLineOfCornersSolution() {
    const cornerSolution = puzzle.strigifySolutionCorners(
        puzzle.getBldSolutionCorners(),
    );
    return "Solution for the corners: " + cornerSolution;
}

document.addEventListener("DOMContentLoaded", function () {
    let next = document.getElementById("next");
    next.addEventListener("click", function () {
        if (puzzle.scrambles.length == 0) {
            console.log("smth went wrong");
            return;
        }

        if (puzzle.scrambles.length == puzzle.scrambleIndex + 1) {
            const randomScramble = puzzle.generateRandomScramble();

            puzzle.addScramble(randomScramble);
        } else {
            puzzle.scrambleIndex++;
        }

        update();

        if (
            document.getElementById("last").classList.contains("isActive") ==
            false
        ) {
            document.getElementById("last").classList.add("isActive");
        }
    });

    let last = document.getElementById("last");
    last.addEventListener("click", function () {
        if (!last.classList.contains("isActive")) {
            return;
        }

        if (puzzle.scrambleIndex != 0) {
            puzzle.scrambleIndex--;
        }

        update();

        if (puzzle.scrambleIndex == 0) {
            document.getElementById("last").classList.remove("isActive");
        }
    });

    function update() {
        puzzle.doScramble();
        const newScrambleText = puzzle.strigifyScramble();
        document.getElementById("scramble3x3").innerHTML = newScrambleText;

        document.getElementById("solutionEdges").innerHTML =
            getLineOfEdgesSolution();
        document.getElementById("solutionCorners").innerHTML =
            getLineOfCornersSolution();
    }
});

function makePuzzleAppear() {
    const randomScramble = puzzle.generateRandomScramble();
    puzzle.addScramble(randomScramble);
    const scrambleText = puzzle.strigifyScramble();

    document.write('<p id="scramble3x3">' + scrambleText + "</p>");

    puzzle.drawScheme();
    puzzle.doScramble();

    document.write(
        '<p id="solutionEdges">' + getLineOfEdgesSolution() + "</p>",
    );
    document.write(
        '<p id="solutionCorners">' + getLineOfCornersSolution() + "</p>",
    );
}
