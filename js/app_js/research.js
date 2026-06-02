// GLOBAL DATA

let researchFavoriteMode = false;

let allResearchPapers = [];

// LOAD RESEARCH PAPERS


async function loadResearchPapers() {

    // LOAD CSV

    const response =
        await fetch(
            "ASSET/research.csv"
        );

    const csvText =
        await response.text();

    // ROWS

    const rows =
        csvText.trim().split("\n");

    // REMOVE HEADER

    rows.shift();

    // CLEAR OLD DATA

    allResearchPapers = [];

    // SORT YEAR DESC

    rows.sort(function(a, b) {

        const yearA =
            parseInt(
                a.split(",")[2]
            );

        const yearB =
            parseInt(
                b.split(",")[2]
            );

        return yearB - yearA;

    });

    // BODY

    const tableBody =
        document.getElementById(
            "researchTableBody"
        );

    // CLEAR

    tableBody.innerHTML = "";

    // LOOP

    rows.forEach(function(row,
                          index) {

        // COLUMNS

        const columns =
            row.split(",");

        // DATA

        const paper = {

            title:
                columns[0],

            category:
                columns[1],

            year:
                columns[2],

            file:
                columns[3],

            favorite:
                columns[4]
                    ?.trim()
                    .toLowerCase() ===
                "true"
        };

        // STORE

        allResearchPapers.push(
            paper
        );

        // ROW

        const tr =
            document.createElement(
                "tr"
            );

        // HTML

        tr.innerHTML = `

            <td>${index + 1}</td>

            <td>${paper.title}</td>

            <td>${paper.category}</td>

            <td>${paper.year}</td>

        `;

        // CLICK

        tr.onclick = function() {

            window.open(

                "ASSET/research/" +
                paper.file,

                "_blank"

            );

        };

        // APPEND

        tableBody.appendChild(tr);

    });

    // GENERATE FILTERS

    generateResearchFilters();

    document.getElementById(
        "researchCategoryFilter"
    ).onchange =
        applyResearchFilters;

    document.getElementById(
        "researchYearFilter"
    ).onchange =
        applyResearchFilters;

}

// GENERATE FILTERS

function generateResearchFilters() {

    const categoryFilter =
        document.getElementById(
            "researchCategoryFilter"
        );

    const yearFilter =
        document.getElementById(
            "researchYearFilter"
        );

    // RESET

    categoryFilter.innerHTML =
        `<option value="">
            Category
        </option>`;

    yearFilter.innerHTML =
        `<option value="">
            Year
        </option>`;

    // UNIQUE VALUES

    const categories =
        [...new Set(

            allResearchPapers.map(
                p => p.category
            )

        )];

    const years =
        [...new Set(

            allResearchPapers.map(
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

    updateResearchFilters();

}

// FILTER RESEARCH

window.filterResearch =
function() {

    const category =
        document.getElementById(
            "researchCategoryFilter"
        ).value;

    const year =
        document.getElementById(
            "researchYearFilter"
        ).value;

    const tableBody =
        document.getElementById(
            "researchTableBody"
        );

    // CLEAR

    tableBody.innerHTML = "";

    // FILTER

    const filtered =
        allResearchPapers.filter(
            function(paper) {

            return (

                (category === "" ||

                 paper.category === category)

                &&

                (year === "" ||

                 paper.year === year)

            );

        });

    // REBUILD

    filtered.forEach(function(paper,
                              index) {

        const tr =
            document.createElement(
                "tr"
            );

        tr.innerHTML = `

            <td>${index + 1}</td>

            <td>${paper.title}</td>

            <td>${paper.category}</td>

            <td>${paper.year}</td>

        `;

        // CLICK

        tr.onclick = function() {

            window.open(

                "ASSET/research/" +
                paper.file,

                "_blank"

            );

        };

        tableBody.appendChild(tr);

    });

};

window.addEventListener(
    "load",
    loadResearchPapers
);



window.showFavoriteResearch =
function() {

    researchFavoriteMode = true;

    applyResearchFilters();

};


window.showAllResearch =
function() {

    researchFavoriteMode = false;

    applyResearchFilters();

};

function renderResearch(
    papers
) {

    const tableBody =
        document.getElementById(
            "researchTableBody"
        );

    tableBody.innerHTML = "";

    papers.forEach(function(
        paper,
        index
    ) {

        const tr =
            document.createElement(
                "tr"
            );

        tr.innerHTML = `

            <td>${index + 1}</td>

            <td>${paper.title}</td>

            <td>${paper.category}</td>

            <td>${paper.year}</td>

        `;

        tr.onclick =
            function() {

                window.open(

                    "ASSET/research/" +
                    paper.file,

                    "_blank"

                );

            };

        tableBody.appendChild(
            tr
        );

    });

}

function applyResearchFilters() {

    const category =
        document.getElementById(
            "researchCategoryFilter"
        ).value;

    const year =
        document.getElementById(
            "researchYearFilter"
        ).value;

    let filtered =
        [...allResearchPapers];

    if (category !== "") {

        filtered =
            filtered.filter(
                paper =>
                paper.category ===
                category
            );

    }

    if (year !== "") {

        filtered =
            filtered.filter(
                paper =>
                paper.year ===
                year
            );

    }

    if (researchFavoriteMode) {

        filtered =
            filtered.filter(
                paper =>
                paper.favorite
            );

    }

    renderResearch(
        filtered
    );

    updateResearchFilters();

}

function updateResearchFilters() {

    const categoryFilter =
        document.getElementById(
            "researchCategoryFilter"
        );

    const yearFilter =
        document.getElementById(
            "researchYearFilter"
        );

    const selectedCategory =
        categoryFilter.value;

    const selectedYear =
        yearFilter.value;

    let data =
        [...allResearchPapers];

    if (researchFavoriteMode) {

        data =
            data.filter(
                paper =>
                paper.favorite
            );

    }

    if (selectedYear !== "") {

        data =
            data.filter(
                paper =>
                paper.year ===
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
        function(category) {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                category;

            option.innerText =
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

    data =
        [...allResearchPapers];

    if (researchFavoriteMode) {

        data =
            data.filter(
                paper =>
                paper.favorite
            );

    }

    if (selectedCategory !== "") {

        data =
            data.filter(
                paper =>
                paper.category ===
                selectedCategory
            );

    }

    const years =
        [...new Set(
            data.map(
                p => p.year
            )
        )];

    yearFilter.innerHTML =
        `<option value="">
            Year
        </option>`;

    years.forEach(
        function(year) {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                year;

            option.innerText =
                year;

            if (
                year ===
                selectedYear
            ) {

                option.selected =
                    true;

            }

            yearFilter.appendChild(
                option
            );

        }
    );

}