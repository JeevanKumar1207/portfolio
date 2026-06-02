// ABOUT DATA

let aboutData = null;

// LOAD ABOUT

async function loadAbout() {

    try {

        const response =
            await fetch(
                "ASSET/about.csv"
            );

        if (!response.ok) {

            throw new Error(
                "about.csv not found"
            );

        }

        const csvText =
            await response.text();

        const rows =
            csvText.trim().split(
                "\n"
            );

        // REMOVE HEADER

        rows.shift();

        // FIRST DATA ROW

        const columns =
            parseCSVRow(
                rows[0]
            );

        aboutData = {

            profileImage:
                columns[0]?.trim(),

            name:
                columns[1]?.trim(),

            title:
                columns[2]?.trim(),

            email:
                columns[3]?.trim(),

            githubUsername:
                columns[4]?.trim(),

            github:
                columns[5]?.trim(),

            linkedinUsername:
                columns[6]?.trim(),

            linkedin:
                columns[7]?.trim(),

            hackerrankUsername:
                columns[8]?.trim(),

            hackerrank:
                columns[9]?.trim(),

            summary:
                columns[10]?.trim(),

            location:
                columns[11]?.trim(),

            status:
                columns[12]?.trim(),

            resume:
                columns[13]?.trim(),

            domains:
                columns[14]?.trim(),

            languages:
                columns[15]?.trim(),

            tools:
                columns[16]?.trim(),

            frameworks:
                columns[17]?.trim(),

            strengths:
                columns[18]?.trim(),

            information:
                columns[19]?.trim()

        };

        updateAboutUI();

    }

    catch(error) {

        console.error(
            "Failed to load about.csv",
            error
        );

    }

}

// UPDATE UI

function updateAboutUI() {

    // AVATAR

    const avatar =
        document.getElementById(
            "aboutAvatar"
        );

    if (
        avatar &&
        aboutData.profileImage
    ) {

        avatar.src =
            "ASSET/avatar/" +
            aboutData.profileImage;

    }

    // NAME

    document.getElementById(
        "aboutName"
    ).innerText =
        aboutData.name || "";

    // TITLE

    document.getElementById(
        "aboutTitle"
    ).innerText =
        aboutData.title || "";

    // SUMMARY

    document.getElementById(
        "aboutSummary"
    ).innerText =
        aboutData.summary || "";

    // LOCATION

    document.getElementById(
        "aboutLocation"
    ).innerText =
        aboutData.location || "";

    // STATUS

    document.getElementById(
        "aboutStatus"
    ).innerText =
        aboutData.status || "";

    // EMAIL

    const email =
        document.getElementById(
            "aboutEmail"
        );

    if (email) {

        email.innerText =
            aboutData.email;

        email.href =
            "mailto:" +
            aboutData.email;

    }

    // GITHUB

    const github =
        document.getElementById(
            "aboutGithub"
        );

    if (github) {

        github.innerText =
            aboutData.githubUsername;

        github.href =
            aboutData.github;

    }

    // LINKEDIN

    const linkedin =
        document.getElementById(
            "aboutLinkedIn"
        );

    if (linkedin) {

        linkedin.innerText =
            aboutData.linkedinUsername;

        linkedin.href =
            aboutData.linkedin;

    }

    // HACKERRANK

    const hackerrank =
        document.getElementById(
            "aboutHackerRank"
        );

    if (hackerrank) {

        hackerrank.innerText =
            aboutData.hackerrankUsername;

        hackerrank.href =
            aboutData.hackerrank;

    }

    // RESUME BUTTON

    const resumeButton =
        document.getElementById(
            "resumeButton"
        );

    if (
        resumeButton &&
        aboutData.resume
    ) {

        resumeButton.onclick =
            function() {

                window.open(

                    "ASSET/pdf/" +
                    aboutData.resume,

                    "_blank"

                );

            };

    }

    // DETAIL PROFILE

    const detailAvatar =
        document.getElementById(
            "detailAvatar"
        );

    if (detailAvatar) {

        detailAvatar.src =
            "ASSET/avatar/" +
            aboutData.profileImage;

    }

    document.getElementById(
        "detailName"
    ).innerText =
        aboutData.name;

    document.getElementById(
        "detailTitle"
    ).innerText =
        aboutData.title;

    document.getElementById(
        "detailLocation"
    ).innerText =
        aboutData.location;

    document.getElementById(
        "detailStatus"
    ).innerText =
        aboutData.status;

    // EMAIL

    const detailEmail =
        document.getElementById(
            "detailEmail"
        );

    if (detailEmail) {

        detailEmail.innerText =
            aboutData.email;

        detailEmail.href =
            "mailto:" +
            aboutData.email;

    }

    // GITHUB

    const detailGithub =
        document.getElementById(
            "detailGithub"
        );

    if (detailGithub) {

        detailGithub.innerText =
            aboutData.githubUsername;

        detailGithub.href =
            aboutData.github;

    }

    // LINKEDIN

    const detailLinkedIn =
        document.getElementById(
            "detailLinkedIn"
        );

    if (detailLinkedIn) {

        detailLinkedIn.innerText =
            aboutData.linkedinUsername;

        detailLinkedIn.href =
            aboutData.linkedin;

    }

    // HACKERRANK

    const detailHackerRank =
        document.getElementById(
            "detailHackerRank"
        );

    if (detailHackerRank) {

        detailHackerRank.innerText =
            aboutData.hackerrankUsername;

        detailHackerRank.href =
            aboutData.hackerrank;

    }

    // DETAIL SUMMARY

    const detailAboutSummary =
        document.getElementById(
            "detailAboutSummary"
        );

    if (detailAboutSummary) {

        detailAboutSummary.innerText =
            aboutData.summary || "";

    }

    const detailSummary =
        document.getElementById(
            "detailSummary"
        );

    if (detailSummary) {

        detailSummary.innerText =
            aboutData.summary || "";

    }

    // DETAIL RESUME BUTTON

    const detailResumeButton =
        document.getElementById(
            "detailResumeButton"
        );

    if (
        detailResumeButton &&
        aboutData.resume
    ) {

        detailResumeButton.onclick =
            function() {

                window.open(

                    "ASSET/pdf/" +
                    aboutData.resume,

                    "_blank"

                );

            };

    }

    // LANGUAGES

    const detailLanguages =
        document.getElementById(
            "detailLanguages"
        );

    if (detailLanguages) {

        detailLanguages.innerHTML =
            createInlineList(
                aboutData.languages
            );

    }

    // DOMAINS

    const detailDomains =
        document.getElementById(
            "detailDomains"
        );

    if (detailDomains) {

        detailDomains.innerHTML =
            createList(
                aboutData.domains
            );

    }

    // TOOLS

    const detailTools =
        document.getElementById(
            "detailTools"
        );

    if (detailTools) {

        detailTools.innerHTML =
            createList(
                aboutData.tools
            );

    }

    // FRAMEWORKS

    const detailFrameworks =
        document.getElementById(
            "detailFrameworks"
        );

    if (detailFrameworks) {

        detailFrameworks.innerHTML =
            createList(
                aboutData.frameworks
            );

    }

    // STRENGTHS

    const detailStrengths =
        document.getElementById(
            "detailStrengths"
        );

    if (detailStrengths) {

        detailStrengths.innerHTML =
            createList(
                aboutData.strengths
            );

    }

    const detailInformation =
        document.getElementById(
            "detailinformation"
        );

    if (
        detailInformation &&
        aboutData.information
    ) {

        fetch(
            "ASSET/txt/" +
            aboutData.information
        )

        .then(response =>
            response.text()
        )

        .then(text => {

            detailInformation.innerText =
                text;

        })

        .catch(() => {

            detailInformation.innerText =
                "Information file not found.";

        });

    }

}

function parseCSVRow(
    row
) {

    const result = [];

    let current = "";

    let insideQuotes =
        false;

    for (
        let i = 0;
        i < row.length;
        i++
    ) {

        const char =
            row[i];

        if (
            char === '"'
        ) {

            insideQuotes =
                !insideQuotes;

        }

        else if (

            char === ","

            &&

            !insideQuotes

        ) {

            result.push(
                current.trim()
            );

            current = "";

        }

        else {

            current +=
                char;

        }

    }

    result.push(
        current.trim()
    );

    return result;

}


function createTags(
    data
) {

    return data
        .split("|")
        .map(
            item =>
            `<span class="about-tag">
                ${item}
             </span>`
        )
        .join("");

}

function createList(data) {

    if (!data) {

        return "";

    }

    return `
        <ul class="about-list">
            ${data
                .split("|")
                .map(item =>
                    `<li>${item.trim()}</li>`
                )
                .join("")}
        </ul>
    `;

}
function createInlineList(data) {

    if (!data) {

        return "";

    }

    return data
        .split("|")
        .map(item =>
            item.trim()
        )
        .join(" / ");

}

window.openAboutDetailedView =
function() {

    maximizeWindow(
        "aboutWindow"
    );

    document.getElementById(
        "aboutCompactView"
    ).style.display =
        "none";

    document.getElementById(
        "aboutDetailedView"
    ).style.display =
        "grid";

    updateAboutLayout();

};

window.closeAboutDetailedView =
function() {

    maximizeWindow(
        "aboutWindow"
    );

    document.getElementById(
        "aboutDetailedView"
    ).style.display =
        "none";

    document.getElementById(
        "aboutCompactView"
    ).style.display =
        "flex";

    restoreWindow(
        "aboutWindow"
    );

};

// START

window.addEventListener(
    "load",
    loadAbout
);