let allCertificates = [];

let certificateFavoriteMode = false;

// LOAD CERTIFICATES

async function loadCertificates() {

    const response =
        await fetch(
            "ASSET/certificates.csv"
        );

    const csvText =
        await response.text();

    const rows =
        csvText.trim().split("\n");

    rows.shift();

    allCertificates = [];

    rows.forEach(function(row) {

        const columns =
            row.split(",");

        const cert = {

            title: columns[0],

            issuer: columns[1],

            category: columns[2],

            year: columns[3],

            icon: columns[4],

            file: columns[5],

            favorite:
                columns[6]
                    ?.trim()
                    .toLowerCase() ===
                "true"

        };

        allCertificates.push(
            cert
        );

    });

    document.getElementById(
        "totalCertificates"
    ).innerText =
        allCertificates.length;

    renderCertificates(
        allCertificates
    );

    generateCertificateFilters();

}

// RENDER CERTIFICATES

function renderCertificates(
    certificates
) {

    const container =
        document.getElementById(
            "certificateBody"
        );

    container.innerHTML = "";

    certificates.forEach(
        function(cert) {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "certificate-card";

            card.innerHTML = `

                <div class="certificate-header">

                    <img
                        src="ASSET/icons/${cert.icon}"
                        class="certificate-icon">

                    <div>

                        <div class="certificate-title">

                            ${cert.title}

                        </div>

                        <div class="certificate-issuer">

                            ${cert.issuer}

                        </div>

                        <div class="certificate-year">

                            ${cert.year}

                        </div>

                    </div>

                </div>

                <button
                    class="certificate-open-btn">

                    Open Certificate

                </button>

            `;

            card.querySelector(
                ".certificate-open-btn"
            ).onclick =
            function() {

                window.open(

                    "ASSET/certificates/" +
                    cert.file,

                    "_blank"

                );

            };

            container.appendChild(
                card
            );

        }
    );

}

// CATEGORY FILTER

function generateCertificateFilters() {

    const filter =
        document.querySelector(
            ".certificate-filter"
        );

    filter.innerHTML =
        `<option value="">
            All Categories
        </option>`;

    const categories =
        [...new Set(

            allCertificates.map(
                cert =>
                cert.category.trim()
            )

        )];

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

            filter.appendChild(
                option
            );

        }
    );

    filter.onchange =
        applyCertificateFilters;

}

// APPLY FILTERS

function applyCertificateFilters() {

    const category =
        document.querySelector(
            ".certificate-filter"
        ).value
        .trim();

    let filtered =
        [...allCertificates];

    if (category !== "") {

        filtered =
            filtered.filter(
                cert =>
                cert.category.trim() ===
                category
            );

    }

    if (certificateFavoriteMode) {

        filtered =
            filtered.filter(
                cert =>
                cert.favorite
            );

    }

    renderCertificates(
        filtered
    );

}

// FAVORITES

window.showFavoriteCertificates =
function() {

    certificateFavoriteMode = true;

    applyCertificateFilters();

};

window.filterCertificates =
function() {

    certificateFavoriteMode = false;

    applyCertificateFilters();

};

// START

window.addEventListener(
    "load",
    loadCertificates
);