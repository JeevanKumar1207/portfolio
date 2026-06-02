// START MENU

function toggleStartMenu() {

    const startMenu =
        document.getElementById("startMenu");

    const programMenu =
        document.getElementById("programMenu");

    if (
        startMenu.style.display === "block"
    ) {

        startMenu.style.display = "none";

        // CLOSE CHILD MENU

        programMenu.style.display = "none";

    } else {

        startMenu.style.display = "block";

    }

}

// PROGRAM MENU

function toggleProgramMenu() {

    const programMenu =
        document.getElementById("programMenu");

    if (
        programMenu.style.display === "block"
    ) {

        programMenu.style.display = "none";

    } else {

        programMenu.style.display = "block";

    }

}

