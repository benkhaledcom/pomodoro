
// Just to make things easier and JQuery-ish
const $ = (qry = "") => document.querySelector(qry);

// I don't think I actually need these buttons saved as variables
const start_work_btn = $("#start-work-btn");
const short_break_btn = $("#short-break-btn");
const long_break_btn = $("#long-break-btn");
const timer_buttons_wrapper = $(".timer-buttons");

const timer_txt = $(".timer-txt");

const work_ms = 30 * (60 * 1000);
const short_break_ms = 3 * (1000); // Super short for testing
// const short_break_ms = 5 * (60 * 1000);
const long_break_ms = 15 * (60 * 1000);

const ding_audio = new Audio("/sounds/ding.mp3");

let time_ms = 0;
/** @type {"none" | "work" | "short" | "long"} */
let timer_mode = "none";


start_work_btn.onclick = function() {
    time_ms = work_ms;
    setTimerMode("work");
    updateTimerTxt();
}

short_break_btn.onclick = function() {
    time_ms = short_break_ms;
    setTimerMode("short");
    updateTimerTxt();
}

long_break_btn.onclick = function() {
    time_ms = long_break_ms;
    setTimerMode("long");
    updateTimerTxt();
}


function updateTimerTxt() {
    const totalSeconds = Math.floor(time_ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    document.title = timer_txt.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (time_ms == 0) {
        document.title = "Start New Timer";
    }
}

function playDingSound() {
    ding_audio.play().catch(err => console.error("Error playing sound:", err));
    console.log(ding_audio)
}

function setTimerMode(mode = timer_mode) {
    timer_buttons_wrapper.classList.remove(timer_mode);
    timer_mode = mode;
    timer_buttons_wrapper.classList.add(timer_mode);
} 


setInterval(() => {
    const prev = time_ms;
    time_ms = Math.max(time_ms - 1000, 0);

    if (time_ms == 0 && prev > 0) {
        playDingSound();
        setTimerMode("none");
    }

    updateTimerTxt();
}, 1000);

updateTimerTxt();
