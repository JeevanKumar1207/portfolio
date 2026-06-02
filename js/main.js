// SYSTEM STARTUP
const BUILD_ID = "JKS_2026_PORTFOLIO_v1";

console.log(
    "JEEVAN OS STARTED"
);

function toggleFavorites(
    buttonId,
    showFavoritesFn,
    showAllFn
) {

    const btn =
        document.getElementById(
            buttonId
        );

    const active =
        btn.classList.toggle(
            "favorite-btn-active"
        );

    if (active) {

        btn.innerText =
            "See All";

        showFavoritesFn();

    }

    else {

        btn.innerText =
            "See Favorites";

        showAllFn();

    }

}