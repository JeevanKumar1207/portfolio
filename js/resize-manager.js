function repositionWindows() {

    const taskbarHeight = 40;

    const screenWidth =
        window.innerWidth;

    const screenHeight =
        window.innerHeight -
        taskbarHeight;

    let occupiedWidth = 0;

    const priority = [
        "researchWindow",
        "certificateWindow",
        "projectsWindow",
        "aboutWindow"
    ];

    const deferredWindows = [];

    priority.forEach(function(id, index) {

        if (
            window.fullscreenWindows.includes(id)
        ) {

            deferredWindows.push(id);

            return;
        }

        const win =
            document.getElementById(id);

        if (!win) return;

        if (
            win.style.display ===
            "none"
        ) {
            return;
        }

        const width =
            win.offsetWidth;

        const height =
            win.offsetHeight;

        // APPLY PRIORITY-BASED Z-INDEX
        const baseZ = 100;
        win.style.zIndex = baseZ + index;

        // USE SAVED POSITION
        const saved =
            window.savedWindowPositions?.[
                win.id
            ];

        let left =
            saved?.left ??
            parseInt(
                win.style.left
            ) ??
            0;

        let top =
            saved?.top ??
            parseInt(
                win.style.top
            ) ??
            0;

        // REMEMBER ORIGINAL
        const originalLeft =
            left;

        const originalTop =
            top;

        // KEEP INSIDE SCREEN
        left = Math.max(
            0,
            Math.min(
                left,
                screenWidth -
                width
            )
        );

        top = Math.max(
            0,
            Math.min(
                top,
                screenHeight -
                height
            )
        );

        const wasMoved =
            left !== originalLeft ||
            top !== originalTop;

        if (wasMoved) {

            win.dataset.autoMoved =
                "true";

        } else if (
            win.dataset.autoMoved ===
            "true"
        ) {

            // Screen became large again
            left =
                originalLeft;

            top =
                originalTop;

            win.dataset.autoMoved =
                "false";
        }

        // Priority push only if overflowing right side
        if (
            left + width >
            screenWidth
        ) {

            left = Math.max(
                0,
                screenWidth -
                width -
                occupiedWidth
            );

            occupiedWidth += 40;
        }

        win.style.left =
            left + "px";

        win.style.top =
            top + "px";

    })
    
    deferredWindows.forEach(function(id) {

        const win =
            document.getElementById(id);

        if (!win) return;

        win.style.zIndex = 99999;

    });

    updateAboutLayout();

}

function updateAboutLayout() {

    const width =
        document.getElementById(
            "aboutWindow"
        ).offsetWidth;

    const container =
        document.querySelector(
            ".about-detailed-view"
        );

    const middle =
        document.querySelector(
            ".about-detail-middle"
        );

    const right =
        document.querySelector(
            ".about-detail-right"
        );

    // 3 Columns

    if (width >= 950) {

        middle.style.display =
            "flex";

        right.style.display =
            "flex";

        container.style.gridTemplateColumns =
            "minmax(600px,1fr) minmax(200px,300px) minmax(300px,1fr)";

    }

    // 2 Columns

    else if (width >= 850) {

        middle.style.display =
            "flex";

        right.style.display =
            "none";

        container.style.gridTemplateColumns =
            "minmax(600px,1fr) minmax(200px,1fr)";

    }

    // 1 Column

    else {

        middle.style.display =
            "none";

        right.style.display =
            "none";

        container.style.gridTemplateColumns =
            "1fr";

    }

}

window.addEventListener(
    "resize",
    repositionWindows
);

window.addEventListener(
    "load",
    repositionWindows
);