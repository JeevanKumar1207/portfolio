window.addEventListener(
    "load",
    function() {

        makeDraggable(
            "projectsWindow"
        );

        makeDraggable(
            "aboutWindow"
        );

        makeDraggable(
            "certificateWindow"
        );

        makeDraggable(
            "researchWindow"
        );

    }
);

function makeDraggable(id) {

    const element =
        document.getElementById(id);

    if (!element) return;

    const header =
        element.querySelector(
            ".window-header"
        );

    if (!header) return;

    let pos1 = 0;
    let pos2 = 0;
    let pos3 = 0;
    let pos4 = 0;

    header.onmousedown =
        dragMouseDown;

    element.onmousedown = function() {

        focusWindow(id);

    };

    function dragMouseDown(e) {

        e = e || window.event;

        e.preventDefault();

        // FOCUS WINDOW

        focusWindow(id);

        pos3 = e.clientX;
        pos4 = e.clientY;

        document.onmouseup =
            closeDragElement;

        document.onmousemove =
            elementDrag;

    }

    function elementDrag(e) {

        e = e || window.event;

        e.preventDefault();

        pos1 =
            pos3 - e.clientX;

        pos2 =
            pos4 - e.clientY;

        pos3 =
            e.clientX;

        pos4 =
            e.clientY;

        element.style.top =
            (element.offsetTop - pos2)
            + "px";

        element.style.left =
            (element.offsetLeft - pos1)
            + "px";

    }

    function closeDragElement() {

        document.onmouseup =
            null;

        document.onmousemove =
            null;

        if (

            window.savedWindowPositions

        ) {

            window.savedWindowPositions[id] = {

                left:
                    parseInt(element.style.left) || 0,

                top:
                    parseInt(element.style.top) || 0

            };

        }

    }
}