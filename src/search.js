const { ipcRenderer } = require("electron");
const { default: gsap } = require("gsap");

const searchBar = document.getElementById('searchBarI');

const time = 0.2;

ipcRenderer.on('search_action', _ => {
    if (Number(window.getComputedStyle(searchBar).opacity) === 0) {
        gsap.to(searchBar, { duration: time, opacity: 1, display: "block" });
    } else {
        gsap.to(searchBar, { duration: time, opacity: 0, display: "none" });
    }
});
