// WINDOW STACK

let highestZ = 100;

// SAVED POSITIONS

window.savedWindowPositions =
    window.savedWindowPositions || {};

window.fullscreenWindows = [];

// OPEN WINDOW

window.openWindow = function(id) {

    const windowElement =
        document.getElementById(id);

    if (!windowElement) return;

    // SHOW WINDOW

    windowElement.style.display =
        "block";

    // GET WINDOW SIZE

    const width =
        windowElement.offsetWidth;

    const height =
        windowElement.offsetHeight;

    // DEFAULT RANDOM POSITION

    let left =
        Math.random() *

        (window.innerWidth -
            width -
            100);

    let top =
        Math.random() *

        (window.innerHeight -
            height -
            140);

    // USE SAVED POSITION

    const savedPosition =

        window.savedWindowPositions[
            id
        ];

    if (savedPosition) {

        left =
            savedPosition.left;

        top =
            savedPosition.top;

    }

    // KEEP INSIDE SCREEN

    left = Math.max(

        0,

        Math.min(

            left,

            window.innerWidth -
            width

        )

    );

    top = Math.max(

        0,

        Math.min(

            top,

            window.innerHeight -
            height -
            40

        )

    );

    // APPLY POSITION

    windowElement.style.left =
        left + "px";

    windowElement.style.top =
        top + "px";


    // FOCUS WINDOW

    focusWindow(id);

    // ADD TASKBAR ITEM

    addTaskbarItem(id);

    // CLOSE MENUS

    closeAllMenus();

};

// CLOSE WINDOW

window.closeWindow = function(id) {

    const windowElement =
        document.getElementById(id);

    if (!windowElement) return;

    // REMOVE FROM FULLSCREEN LIST

    window.fullscreenWindows =
        window.fullscreenWindows.filter(
            winId => winId !== id
        );

    windowElement.style.display =
        "none";

    removeTaskbarItem(id);

};

// MINIMIZE WINDOW

window.minimizeWindow =
function(id) {

    const windowElement =
        document.getElementById(id);

    if (!windowElement)
        return;

    const wasActive =
        windowElement.classList.contains(
            "active"
        );

    windowElement.style.display =
        "none";

    if (wasActive) {

        activateTopWindow();

    }

};

// MAXIMIZE WINDOW

window.maximizeWindow = function(id) {

    const windowElement =
        document.getElementById(id);

    if (!windowElement) return;

    // RESTORE

    if (
        windowElement.dataset.maximized ===
        "true"
    ) {

        windowElement.style.width =
            windowElement.dataset.oldWidth;

        windowElement.style.height =
            windowElement.dataset.oldHeight;

        windowElement.style.top =
            windowElement.dataset.oldTop;

        windowElement.style.left =
            windowElement.dataset.oldLeft;

        windowElement.dataset.maximized =
            "false";

        window.fullscreenWindows =
            window.fullscreenWindows.filter(
                winId => winId !== id
            );

    }
    

    // MAXIMIZE

    else {

        windowElement.dataset.oldWidth =
            windowElement.offsetWidth + "px";

        windowElement.dataset.oldHeight =
            windowElement.offsetHeight + "px";

        windowElement.dataset.oldTop =
            windowElement.offsetTop + "px";

        windowElement.dataset.oldLeft =
            windowElement.offsetLeft + "px";

        windowElement.style.width =
            "100vw";

        windowElement.style.height =
            "calc(100vh - 40px)";

        windowElement.style.top =
            "0";

        windowElement.style.left =
            "0";

        windowElement.dataset.maximized =
            "true";

        if (
            !window.fullscreenWindows.includes(
                id
            )
        ) {

            window.fullscreenWindows.push(
                id
            );

        }
        

    }

};

// TASKBAR WINDOW TOGGLE

window.toggleTaskbarWindow = function(id) {

    const windowElement =
        document.getElementById(id);

    if (!windowElement)
        return;

    const isActive =
        windowElement.classList.contains(
            "active"
        );

    // ACTIVE WINDOW
    // => MINIMIZE

    if (isActive) {

    windowElement.style.display =
        "none";

    windowElement.classList.remove(
        "active"
    );

    const taskbarItem =
        document.getElementById(
            "taskbar-" + id
        );

    if (taskbarItem) {

        taskbarItem.classList.remove(
            "active"
        );

    }

    activateTopWindow();

    return;

    }

    // WINDOW HIDDEN

    if (
        windowElement.style.display ===
        "none"
    ) {

        windowElement.style.display =
            "block";

    }

    // BRING FRONT

    focusWindow(id);

};

// FOCUS WINDOW

window.focusWindow = function(id) {

    // WINDOWS

    document
        .querySelectorAll(".window")
        .forEach(win => {

            win.classList.remove(
                "active"
            );

        });

    // TASKBAR BUTTONS

    document
        .querySelectorAll(".task-item")
        .forEach(item => {

            item.classList.remove(
                "active"
            );

        });

    const windowElement =
        document.getElementById(id);

    if (!windowElement)
        return;

    // WINDOW ACTIVE

    windowElement.classList.add(
        "active"
    );

    // BRING TO FRONT

    windowElement.style.zIndex =
        highestZ++;

    // TASKBAR ACTIVE

    const taskbarItem =
        document.getElementById(
            "taskbar-" + id
        );

    if (taskbarItem) {

        taskbarItem.classList.add(
            "active"
        );

    }

};

// ADD TASKBAR ITEM

function addTaskbarItem(id) {

    // AVOID DUPLICATE

    if (
        document.getElementById(
            "taskbar-" + id
        )
    ) {
        return;
    }

    const taskItems =
        document.querySelector(
            ".task-items"
        );

    const taskItem =
        document.createElement("div");

    taskItem.className =
        "task-item";

    taskItem.id =
        "taskbar-" + id;

    taskItem.innerText =
        getWindowTitle(id);

    taskItem.onclick =
        function() {

            toggleTaskbarWindow(id);

        };

    // APPEND LAST

    taskItems.appendChild(taskItem);

}

// REMOVE TASKBAR ITEM

function removeTaskbarItem(id) {

    const taskbarItem =
        document.getElementById(
            "taskbar-" + id
        );

    if (taskbarItem) {

        taskbarItem.remove();

    }

}

// GET WINDOW TITLE

function getWindowTitle(id) {

    const windowElement =
        document.getElementById(id);

    if (!windowElement)
        return "Application";

    const title =
        windowElement.querySelector(
            ".window-header span"
        );

    return title
        ? title.innerText
        : "Application";

}

// CLOSE MENUS

function closeAllMenus() {

    const startMenu =
        document.getElementById(
            "startMenu"
        );

    const programMenu =
        document.getElementById(
            "programMenu"
        );

    if (startMenu) {

        startMenu.style.display =
            "none";

    }

    if (programMenu) {

        programMenu.style.display =
            "none";

    }

}

function activateTopWindow() {

    let topWindow = null;

    let highestVisibleZ = 0;

    document
        .querySelectorAll(".window")
        .forEach(win => {

            if (
                win.style.display === "none"
            ) {

                return;

            }

            const z =
                parseInt(
                    win.style.zIndex || 0
                );

            if (
                z > highestVisibleZ
            ) {

                highestVisibleZ = z;

                topWindow = win;

            }

        });

    if (topWindow) {

        focusWindow(
            topWindow.id
        );

    }

}