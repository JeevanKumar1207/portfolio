// GLOBAL DATA

let projectFavoriteMode = false;

let allProjects = [];

let currentCategoryProjects = [];

let currentProjectIndex = 0;

// LOAD PROJECTS

async function loadProjects() {

    const response =
        await fetch(
            "ASSET/projects.csv"
        );

    const csvText =
        await response.text();

    const rows =
        csvText.trim().split("\n");

    // REMOVE HEADER

    rows.shift();

    // SORT BY YEAR DESCENDING

    rows.sort(function(a, b) {

        const yearA =
            parseInt(
                a.split(",")[3]
            );

        const yearB =
            parseInt(
                b.split(",")[3]
            );

        return yearB - yearA;

    });

    const tableBody =
        document.getElementById(
            "projectTableBody"
        );

    const totalProjects =
        document.getElementById(
            "totalProjects"
        );

    tableBody.innerHTML = "";

    totalProjects.innerText =
        rows.length;

    // CLEAR OLD DATA

    allProjects = [];

    // CREATE PROJECTS

    rows.forEach(function(row, index) {

        const columns =
            row.split(",");

        // PROJECT OBJECT

        const project = {

            name: columns[0],

            category: columns[1],

            status: columns[2],

            year: columns[3],

            textFile: columns[4],

            pdfFile: columns[5],

            github: columns[6],

            images: columns[7]
                ? columns[7]
                    .split("|")
                    .map(img => img.trim())
                : [],

            favorite:
                columns[8]
                    ?.trim()
                    .toLowerCase() === "true"


        };

        // STORE

        allProjects.push(project);

        // TABLE ROW

        const tr =
            document.createElement(
                "tr"
            );

        // STATUS CLASS

        const statusClass =
            project.status === "discarded"
            ? "status-discarded"
            : "status-completed";

        // TABLE CONTENT

        tr.innerHTML = `

            <td>${index + 1}</td>

            <td>${project.name}</td>

            <td>${project.category}</td>

            <td class="${statusClass}">
                ${project.status}
            </td>

            <td>${project.year}</td>

        `;

        // ROW CLICK

        tr.onclick = function() {

            // OPEN DETAIL VIEW

            openDetailedView(false);

            // FILTER CATEGORY

            currentCategoryProjects =
                allProjects.filter(
                    p =>
                    p.category.trim() ===
                    project.category.trim()
                );

            // FIND INDEX

            currentProjectIndex =
                currentCategoryProjects.findIndex(
                    p =>
                    p.name === project.name
                );

            // LOAD PROJECT

            loadProjectDetails(
                currentCategoryProjects,
                project.name
            );

            // UPDATE ACTIVE TAB

            updateActiveTab(
                project.category
            );

        };

        tableBody.appendChild(tr);

    });

    // CREATE CATEGORY TABS

    generateCategoryTabs();
    generateFilters();

}

// GENERATE CATEGORY TABS

function generateCategoryTabs() {

    const tabs =
        document.getElementById(
            "categoryTabs"
        );

    tabs.innerHTML = "";

    // UNIQUE CATEGORIES

    const categories =
        [...new Set(

            allProjects.map(
                project =>
                project.category
            )

        )];

    categories.forEach(function(category,
                                index) {

        const tab =
            document.createElement(
                "div"
            );

        tab.className =
            "category-tab";

        // FIRST ACTIVE

        if (index === 0) {

            tab.classList.add(
                "active-tab"
            );

        }

        tab.innerText =
            category;

        // TAB CLICK

        tab.onclick = function() {

            // UPDATE ACTIVE TAB

            updateActiveTab(
                category
            );

            // FILTER PROJECTS

            currentCategoryProjects =
                allProjects.filter(
                    project =>
                    project.category.trim() ===
                    category.trim()
                );

            // RESET INDEX

            currentProjectIndex = 0;

            // LOAD FIRST PROJECT

            if (
                currentCategoryProjects.length > 0
            ) {

                 loadProjectDetails(
                    currentCategoryProjects,
                );

            }

        };

        tabs.appendChild(tab);

    });

}

// UPDATE ACTIVE TAB

function updateActiveTab(category) {

    document
        .querySelectorAll(
            ".category-tab"
        )
        .forEach(function(tab) {

            if (
                tab.innerText.trim() ===
                category.trim()
            ) {

                tab.classList.add(
                    "active-tab"
                );

            }

            else {

                tab.classList.remove(
                    "active-tab"
                );

            }

        });

}

// LOAD PROJECT DETAILS

// LOAD CATEGORY PROJECTS

async function loadProjectDetails(projects,
                                  selectedProjectName = "") {

    const container =
        document.getElementById(
            "categoryProjects"
        );

    container.innerHTML = "";

    // LOOP PROJECTS

    for (const project of projects) {

        // LOAD TXT FILE

        const response =
            await fetch(
                "ASSET/txt/" +
                project.textFile
            );

        const text =
            await response.text();

        // CREATE CARD

        const card =
            document.createElement(
                "div"
            );

        card.className =
            "project-detail-card";

        // FLASH SELECTED PROJECT

        if (
            project.name ===
            selectedProjectName
        ) {

            card.classList.add(
                "project-flash"
            );

            // AUTO SCROLL

            setTimeout(function() {

                card.scrollIntoView({

                    behavior: "smooth",

                    block: "center"

                });

            }, 100);

            // REMOVE FLASH

            setTimeout(function() {

                card.classList.remove(
                    "project-flash"
                );

            }, 1000);

        }

        // HTML

        card.innerHTML = `

            <div class="project-detail-image">

                <div class="image-viewer">

                    <!-- PREVIOUS -->

                    <button class="side-arrow previous-image-btn">

                        ◄

                    </button>

                    <!-- IMAGE -->

                    <img src="ASSET/img/${project.images[0] || ''}"
                        class="project-image"
                        data-image-index="0">

                    <!-- NEXT -->

                    <button class="side-arrow next-image-btn">

                        ►

                    </button>

                </div>


                <!-- IMAGE BUTTONS -->

                <div class="project-detail-buttons">

                    <button class="toolbar-btn github-btn">

                        GitHub

                    </button>

                    <button class="toolbar-btn pdf-btn">

                        Open PDF

                    </button>

                </div>

            </div>

            <div class="project-detail-info">

                <h2>
                    ${project.name}
                </h2>

                <br>

                <p>
                    ${text}
                </p>

                <br>

            </div>

        `;

        // BUTTONS

        card.querySelector(
            ".github-btn"
        ).onclick = function() {

            window.open(
                project.github,
                "_blank"
            );

        };

        card.querySelector(
            ".pdf-btn"
        ).onclick = function() {

            window.open(
                "ASSET/pdf/" +
                project.pdfFile,
                "_blank"
            );

        };

        // ADD CARD

        container.appendChild(card);

        // IMAGE SWITCHING

        const imageElement =
            card.querySelector(
                ".project-image"
            );

        // IMAGE LIST

        const images = project.images || [];

        // PREVIOUS IMAGE

        card.querySelector(
            ".previous-image-btn"
        ).onclick = function() {

            let index =
                parseInt(

                    imageElement.dataset
                        .imageIndex || 0

                );

            index--;

            if (index < 0) {

                index =
                    images.length - 1;

            }

            imageElement.src =
                "ASSET/img/" +
                images[index];

            imageElement.dataset
                .imageIndex = index;

        };

        // NEXT IMAGE

        card.querySelector(
            ".next-image-btn"
        ).onclick = function() {

            let index =
                parseInt(

                    imageElement.dataset
                        .imageIndex || 0

                );

            index++;

            if (
                index >= images.length
            ) {

                index = 0;

            }

            imageElement.src =
                "ASSET/img/" +
                images[index];

            imageElement.dataset
                .imageIndex = index;

        };

    }

}

// OPEN DETAIL VIEW

window.openDetailedView =
function(autoLoad = true) {

    const win =
        document.getElementById(
            "projectsWindow"
        );

    // SAVE SIZE

    if (!win.dataset.saved) {

        win.dataset.oldWidth =
            win.style.width;

        win.dataset.oldHeight =
            win.style.height;

        win.dataset.oldTop =
            win.style.top;

        win.dataset.oldLeft =
            win.style.left;

        win.dataset.saved =
            "true";

    }

    // FULLSCREEN

    win.style.width =
        "100vw";

    win.style.height =
        "calc(100vh - 40px)";

    win.style.top =
        "0";

    win.style.left =
        "0";

    if (
        !window.fullscreenWindows.includes(
            "projectsWindow"
        )
    ) {

        window.fullscreenWindows.push(
            "projectsWindow"
        );

    }

    // SWITCH VIEW

    document.getElementById(
        "projectTableView"
    ).style.display =
        "none";

    document.getElementById(
        "projectDetailedView"
    ).style.display =
        "block";

    // AUTO LOAD ONLY FOR BUTTON

    if (
        autoLoad &&
        allProjects.length > 0
    ) {

        const firstCategory =
            allProjects[0].category;

        currentCategoryProjects =
            allProjects.filter(
                project =>
                project.category ===
                firstCategory
            );

        loadProjectDetails(
            currentCategoryProjects
        );

        updateActiveTab(
            firstCategory
        );

    }

};

// CLOSE DETAIL VIEW

window.closeDetailedView =
function() {

    const win =
        document.getElementById(
            "projectsWindow"
        );

    window.fullscreenWindows =
        window.fullscreenWindows.filter(
            id => id !== "projectsWindow"
        );

    // RESTORE

    win.style.width =
        win.dataset.oldWidth;

    win.style.height =
        win.dataset.oldHeight;

    win.style.top =
        win.dataset.oldTop;

    win.style.left =
        win.dataset.oldLeft;

    // SWITCH VIEW

    document.getElementById(
        "projectTableView"
    ).style.display =
        "block";

    document.getElementById(
        "projectDetailedView"
    ).style.display =
        "none";

};

// START

window.addEventListener(
    "load",
    loadProjects
);

// FILTER PROJECTS

window.filterProjects =
function() {

    const category =
        document.getElementById(
            "categoryFilter"
        ).value;

    const status =
        document.getElementById(
            "statusFilter"
        ).value;

    const year =
        document.getElementById(
            "yearFilter"
        ).value;

    const tableBody =
        document.getElementById(
            "projectTableBody"
        );

    tableBody.innerHTML = "";

    // FILTER

    const filteredProjects =
        allProjects.filter(function(project) {

            return (

                (category === "" ||
                 project.category === category)

                &&

                (status === "" ||
                 project.status === status)

                &&

                (year === "" ||
                 project.year === year)

            );

        });

    // REBUILD TABLE

    filteredProjects.forEach(function(project,
                                  index) {

        const tr =
            document.createElement(
                "tr"
            );

        const statusClass =
            project.status === "Active"
            ? "status-active"
            : "status-completed";

        tr.innerHTML = `

            <td>${index + 1}</td>

            <td>${project.name}</td>

            <td>${project.category}</td>

            <td class="${statusClass}">
                ${project.status}
            </td>

            <td>${project.year}</td>

        `;

        tr.onclick = function() {

            openDetailedView();

            currentCategoryProjects =
                allProjects.filter(
                    p =>
                    p.category.trim() ===
                    project.category.trim()
                );

            loadProjectDetails(
                currentCategoryProjects,
                project.name
            );

            updateActiveTab(
                project.category
            );

        };

        tableBody.appendChild(tr);

    });

    applyProjectFilters();

};

// GENERATE FILTER OPTIONS

function generateFilters() {

    const categoryFilter =
        document.getElementById(
            "categoryFilter"
        );

    const statusFilter =
        document.getElementById(
            "statusFilter"
        );

    const yearFilter =
        document.getElementById(
            "yearFilter"
        );

    // CLEAR OLD OPTIONS

    categoryFilter.innerHTML =
        `<option value="">Category</option>`;

    statusFilter.innerHTML =
        `<option value="">Status</option>`;

    yearFilter.innerHTML =
        `<option value="">Year</option>`;

    // UNIQUE VALUES

    const categories =
        [...new Set(

            allProjects.map(
                p => p.category
            )

        )];

    const statuses =
        [...new Set(

            allProjects.map(
                p => p.status
            )

        )];

    const years =
        [...new Set(

            allProjects.map(
                p => p.year
            )

        )];

    // CATEGORY OPTIONS

    categories.forEach(function(category) {

        const option =
            document.createElement(
                "option"
            );

        option.value =
            category;

        option.innerText =
            category;

        categoryFilter.appendChild(
            option
        );

    });

    // STATUS OPTIONS

    statuses.forEach(function(status) {

        const option =
            document.createElement(
                "option"
            );

        option.value =
            status;

        option.innerText =
            status;

        statusFilter.appendChild(
            option
        );

    });

    // YEAR OPTIONS

    years.forEach(function(year) {

        const option =
            document.createElement(
                "option"
            );

        option.value =
            year;

        option.innerText =
            year;

        yearFilter.appendChild(
            option
        );

    });

}


window.showFavoriteProjects =
function() {

    projectFavoriteMode = true;

    applyProjectFilters();

};

window.showAllProjects =
function() {

    projectFavoriteMode = false;

    applyProjectFilters();

};


function applyProjectFilters() {

    const category =
        document.getElementById(
            "categoryFilter"
        ).value;

    const status =
        document.getElementById(
            "statusFilter"
        ).value;

    const year =
        document.getElementById(
            "yearFilter"
        ).value;

    let filtered =
        [...allProjects];

    if (category !== "") {

        filtered =
            filtered.filter(
                p =>
                p.category ===
                category
            );

    }

    if (status !== "") {

        filtered =
            filtered.filter(
                p =>
                p.status ===
                status
            );

    }

    if (year !== "") {

        filtered =
            filtered.filter(
                p =>
                p.year ===
                year
            );

    }

    if (projectFavoriteMode) {

        filtered =
            filtered.filter(
                p =>
                p.favorite
            );

    }

    renderProjects(
        filtered
    );

    updateProjectFilters();

}

function renderProjects(
    projects
) {

    const tableBody =
        document.getElementById(
            "projectTableBody"
        );

    tableBody.innerHTML = "";

    projects.forEach(
        function(project, index) {

            const tr =
                document.createElement(
                    "tr"
                );

            const statusClass =
                project.status ===
                "discarded"
                ? "status-discarded"
                : "status-completed";

            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${project.name}</td>
                <td>${project.category}</td>
                <td class="${statusClass}">
                    ${project.status}
                </td>
                <td>${project.year}</td>
            `;

            tableBody.appendChild(
                tr
            );

        }
    );

}

function updateProjectFilters() {

    const categoryFilter =
        document.getElementById(
            "categoryFilter"
        );

    const statusFilter =
        document.getElementById(
            "statusFilter"
        );

    const yearFilter =
        document.getElementById(
            "yearFilter"
        );

    const selectedCategory =
        categoryFilter.value;

    const selectedStatus =
        statusFilter.value;

    const selectedYear =
        yearFilter.value;

    let data =
        [...allProjects];

    if (projectFavoriteMode) {

        data =
            data.filter(
                p => p.favorite
            );

    }

    if (selectedStatus !== "") {

        data =
            data.filter(
                p =>
                p.status ===
                selectedStatus
            );

    }

    if (selectedYear !== "") {

        data =
            data.filter(
                p =>
                p.year ===
                selectedYear
            );

    }

    const categories =
        [...new Set(
            data.map(
                p => p.category
            )
        )];

    categoryFilter.innerHTML =
        `<option value="">
            Category
        </option>`;

    categories.forEach(
        category => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                category;

            option.textContent =
                category;

            if (
                category ===
                selectedCategory
            ) {

                option.selected =
                    true;

            }

            categoryFilter.appendChild(
                option
            );

        }
    );

}

