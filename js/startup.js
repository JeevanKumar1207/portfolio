const CERTIFICATE_MIN_WIDTH = 400;
const CERTIFICATE_MAX_WIDTH = 1000;

const RESEARCH_MIN_WIDTH = 400;
const RESEARCH_MAX_WIDTH = 450;

// ======================================
// ORIGINAL POSITIONS
// ======================================

window.savedWindowPositions = {};
const ORIGINAL_WIDTHS = {

    aboutWindow: 640,

    projectsWindow: 700,

    certificateWindow: 350,

    researchWindow: 350

};

// STARTUP LAYOUT

function startDesktop() {

    const margin = 20;

    const taskbarHeight = 40;

    const screenWidth =
        window.innerWidth;

    const screenHeight =
        window.innerHeight -
        taskbarHeight;

    // OPEN WINDOWS

    const startupWindows = [

        "aboutWindow",

        "projectsWindow",

        "certificateWindow",

        "researchWindow"

    ];

    startupWindows.forEach(

        function(id) {

            openWindow(id);

        }

    );

    // GET WINDOWS

    const about =
        document.getElementById(
            "aboutWindow"
        );

    const projects =
        document.getElementById(
            "projectsWindow"
        );

    const certificate =
        document.getElementById(
            "certificateWindow"
        );

    const research =
        document.getElementById(
            "researchWindow"
        );

    if (
        !about ||
        !projects ||
        !certificate ||
        !research
    ) {
        return;
    }

    // RESET WIDTHS

    certificate.style.width = "";

    research.style.width = "";

    // MEASURE WINDOWS

    const aboutWidth =
        about.offsetWidth;

    const aboutHeight =
        about.offsetHeight;

    const projectWidth =
        projects.offsetWidth;

    const projectHeight =
        projects.offsetHeight;

    const certHeight =
        certificate.offsetHeight;

    const researchHeight =
        research.offsetHeight;

    // LEFT COLUMN

    const leftColumnWidth =
        Math.max(

            aboutWidth,

            projectWidth

        );

    // AVAILABLE RIGHT WIDTH

    let rightWidth =

        screenWidth

        -

        leftColumnWidth

        -

        margin * 3;

    // SHRINK RIGHT WINDOWS

    rightWidth =
        Math.max(
            250,
            rightWidth
        );

    const certificateWidth = Math.max(
        CERTIFICATE_MIN_WIDTH,
        Math.min(
            rightWidth,
            CERTIFICATE_MAX_WIDTH
        )
    );

    const researchWidth = Math.max(
        RESEARCH_MIN_WIDTH,
        Math.min(
            rightWidth,
            RESEARCH_MAX_WIDTH
        )
    );

    certificate.style.width =
        certificateWidth + "px";

    research.style.width =
        researchWidth + "px";

    // LEFT COLUMN POSITION

    about.style.left =
        margin + "px";

    about.style.top =
        margin + "px";

    projects.style.left =
        margin + "px";

    projects.style.top =

        aboutHeight +

        margin * 2 +

        "px";

    // RIGHT COLUMN POSITION

    certificate.style.left =

        leftColumnWidth +

        margin * 2 +

        "px";

    certificate.style.top =
        margin + "px";

    research.style.left =

        leftColumnWidth +

        margin * 2 +

        "px";

    research.style.top =

        certHeight +

        margin * 2 +

        "px";

    window.savedWindowPositions = {

        aboutWindow: {

            left:
                parseInt(
                    about.style.left
                ),

            top:
                parseInt(
                    about.style.top
                )

        },

        projectsWindow: {

            left:
                parseInt(
                    projects.style.left
                ),

            top:
                parseInt(
                    projects.style.top
                )

        },

        certificateWindow: {

            left:
                parseInt(
                    certificate.style.left
                ),

            top:
                parseInt(
                    certificate.style.top
                )

        },

        researchWindow: {

            left:
                parseInt(
                    research.style.left
                ),

            top:
                parseInt(
                    research.style.top
                )

        }

    };

    // KEEP INSIDE SCREEN

    [

        about,

        projects,

        certificate,

        research

    ].forEach(

        function(win) {

            const width =
                win.offsetWidth;

            const height =
                win.offsetHeight;

            let left =
                parseInt(
                    win.style.left
                );

            let top =
                parseInt(
                    win.style.top
                );

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

            win.style.left =
                left + "px";

            win.style.top =
                top + "px";

        }

    );

}

// STARTUP

window.addEventListener(

    "load",

    startDesktop

);