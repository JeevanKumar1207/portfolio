function updateClock() {

    const clock =
        document.getElementById("clock");

    if (!clock) return;

    const now =
        new Date();

    let hours =
        now.getHours();

    let minutes =
        now.getMinutes();

    const ampm =
        hours >= 12 ? "PM" : "AM";

    hours =
        hours % 12 || 12;

    minutes =
        String(minutes)
        .padStart(2, "0");

    clock.innerText =
        `${hours}:${minutes} ${ampm}`;

}

updateClock();

setInterval(updateClock, 1000);