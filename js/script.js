var puzzle = new cube3x3bld();

var inv = 0
var sol = 15;

function l1() {
    return puzzle.scrambleIndex <= inv ? "" : "Минимален брой инверсии за ръбове: " + puzzle.getEdgeInversionsCount();
}

function l2() {
    return puzzle.scrambleIndex <= inv ? "" : "Минимален брой инверсии за ъгли: " + puzzle.getCornerInversionsCount();
}

function l3() {
    const edgesSolution = puzzle.strigifySolutionEdges(puzzle.getBldSolutionEdges());
    return puzzle.scrambleIndex <= sol ? "" : "Решение за ръбове: " + edgesSolution;
}

function l4() {
    const cornerSolution = puzzle.strigifySolutionCorners(puzzle.getBldSolutionCorners());
    return puzzle.scrambleIndex <= sol ? "" : "Решение за ъгли: " + cornerSolution;
}

document.addEventListener("DOMContentLoaded", function() {
    let next = document.getElementById("next");
    next.addEventListener("click", function() {
        if(puzzle.scrambles.length == 0) {
            console.log("smth went wrong");
            return;
        }

        if(puzzle.scrambles.length == puzzle.scrambleIndex + 1) {
            if (puzzle.scrambleIndex == 15) {
                puzzle.makeLettersAppear();
            }
            if (puzzle.scrambleIndex == 16) {
                puzzle.makeCornersDisappear();
            }
            if (puzzle.scrambleIndex == 17) {
                puzzle.printStoryEdges();
            }
            if (puzzle.scrambleIndex == 18) {
                puzzle.printStoryCorners();
            }

            if (puzzle.scrambleIndex == 19) {
                puzzle.deleteExtras();
                document.getElementById("storyEdges").innerHTML = "";
                document.getElementById("storyCorners").innerHTML = "";
            }

            const scr80m = [
                "L'", "R2", "B2", "R2", "B", "L", "R", "F'",
                "D2", "U", "R'", "U'", "R", "F'", "R", "B",
                "F'", "L'", "B'", "D", "B2", "L", "D", "B'",
                "U'", "F'", "B'", "D'", "F'", "L", "U", "D2",
                "L", "F2", "D", "B2", "F'", "D2", "L2", "U2",
                "D", "R2", "U", "L", "R2", "F'", "R2", "D'",
                "F2", "U'", "R2", "D'", "U", "F2", "B'", "R'",
                "U'", "L'", "F2", "L'", "F", "U", "L", "F'",
                "D'", "U'", "B'", "U", "B'", "F", "D'", "R'",
                "L'", "D2", "F", "L'", "F", "B2", "D", "L'"
            ];
            const scrStory = [
                "R'", "F", "R", "B'", "D", "F'", "D", "B", "L", "R'", "F", "L2", "U2", "R2", "F", "L", "R'", "U'", "B", "R'", "B'", "D2"
            ];
            const Tperm = [
                "R", "U", "R'", "U'" ,"R'", "F", "R2", "U'", "R'", "U'", "R", "U", "R'", "F'"
            ];

            const randomScramble = 
                puzzle.scrambleIndex == 0 ? ['R'] :
                puzzle.scrambleIndex == 1 ? ['R', 'D'] :
                puzzle.scrambleIndex == 2 ? ['R', 'D', 'L'] :
                puzzle.scrambleIndex == 3 ? ['R', 'D', 'L', 'B2'] :
                puzzle.scrambleIndex == 4 ? ['R', 'D', 'L', 'B2', 'R'] :
                puzzle.scrambleIndex == 5 ? ['R', 'D', 'L', 'B2', 'R', "F'"] :
                puzzle.scrambleIndex == 6 ? ['R', 'D', 'L', 'B2', 'R', "F'", 'L2'] :
                puzzle.scrambleIndex == 7 ? Tperm :
                puzzle.scrambleIndex == 8 ? scr80m :
                puzzle.scrambleIndex == 9 ? puzzle.generateRandomScramble(60) :
                puzzle.scrambleIndex == 10 ? puzzle.generateRandomScramble(40) :
                puzzle.scrambleIndex == 11 ? puzzle.generateRandomScramble(30) :
                puzzle.scrambleIndex == 12 ? puzzle.generateRandomScramble(20) :
                puzzle.scrambleIndex == 13 ? puzzle.generateRandomScramble(15) :
                puzzle.scrambleIndex == 14 ? puzzle.generateRandomScramble(10) :
                puzzle.scrambleIndex >= 15 && puzzle.scrambleIndex <= 18 ? scrStory :
                puzzle.generateRandomScramble();

            puzzle.addScramble(randomScramble);
        }
        else {
            puzzle.scrambleIndex++;
        }

        update();

        if(document.getElementById("last").classList.contains("isActive") == false) {
            document.getElementById("last").classList.add("isActive");
        }
    });

    let last = document.getElementById("last");
    last.addEventListener("click", function() {
        if(!last.classList.contains("isActive")) {
            return;
        }

        if(puzzle.scrambleIndex != 0) {
            puzzle.scrambleIndex--;
        }
        
        update();

        if(puzzle.scrambleIndex == 0) {
            document.getElementById("last").classList.remove("isActive");
        }
    });

    function update() {
        puzzle.doScramble();
        const newScrambleText = puzzle.strigifyScramble();
        document.getElementById("scramble3x3").innerHTML = newScrambleText;

        document.getElementById("edgeInversions").innerHTML = l1();
        document.getElementById("cornerInversions").innerHTML = l2();

        document.getElementById("solutionEdges").innerHTML = l3();
        document.getElementById("solutionCorners").innerHTML = l4();
    }
});



function makePuzzleAppear() {
    const randomScramble = /*puzzle.generateRandomScramble()*/[];
    puzzle.addScramble(randomScramble);
    var scrambleText = puzzle.strigifyScramble();
    puzzle.scrambleIndex = 0;

    document.write("<p id=\"scramble3x3\">" + scrambleText + "</p>");

    puzzle.drawScheme();
    puzzle.doScramble();

    document.write('<p id="edgeInversions">' + l1() + '</p>');
    document.write('<p id="cornerInversions">' + l2() + '</p>');
    document.write("<p id=\"solutionEdges\">" + l3() + "</p>");
    document.write("<p id=\"solutionCorners\">" + l4() + "</p>");
    document.write("<p id=\"storyEdges\"></p>");
    document.write("<p id=\"storyCorners\"></p>");
}

