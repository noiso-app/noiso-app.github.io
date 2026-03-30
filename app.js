const PLAY_FADE_IN_MS = 2000;
const TIMER_FADE_OUT_MS = 5000;
const PLAYBACK_TICK_MS = 100;

const timerOptions = [
    { id: "infinity", label: "∞", accessibility: "Infinite playback", duration: null },
    { id: "minutes30", label: "30m", accessibility: "30 minutes", duration: 30 * 60 * 1000 },
    { id: "hour1", label: "1h", accessibility: "1 hour", duration: 60 * 60 * 1000 },
    { id: "hours2", label: "2h", accessibility: "2 hours", duration: 2 * 60 * 60 * 1000 }
];

const presets = [
    {
        id: "mountain_cabin_in_snow",
        title: "Mountain Cabin in Snow",
        audio: "assets/audio/mountain_cabin_in_snow.m4a",
        background: "assets/backgrounds/mountain_cabin_in_snow_background.jpg",
        colors: {
            bg1: "#050608",
            bg2: "#15161A",
            bg3: "#271E1A",
            glow1: "rgba(126, 98, 79, 0.46)",
            glow2: "rgba(72, 81, 92, 0.34)",
            glow3: "rgba(177, 139, 106, 0.32)",
            primaryText: "rgba(255, 255, 255, 0.94)",
            secondaryText: "rgba(255, 255, 255, 0.64)",
            buttonFill: "rgba(255, 255, 255, 0.09)",
            buttonStroke: "rgba(243, 231, 221, 0.11)",
            buttonGlow: "rgba(188, 146, 108, 0.45)",
            dotActive: "rgba(243, 236, 231, 0.78)",
            dotInactive: "rgba(243, 236, 231, 0.16)"
        }
    },
    {
        id: "japanese_forest_at_night",
        title: "Japanese Forest at Night",
        audio: "assets/audio/japanese_forest_at_night.m4a",
        background: "assets/backgrounds/japanese_forest_at_night_background.jpg",
        colors: {
            bg1: "#040705",
            bg2: "#0B1410",
            bg3: "#132018",
            glow1: "rgba(69, 99, 76, 0.44)",
            glow2: "rgba(32, 54, 43, 0.32)",
            glow3: "rgba(112, 130, 111, 0.3)",
            primaryText: "rgba(255, 255, 255, 0.94)",
            secondaryText: "rgba(255, 255, 255, 0.62)",
            buttonFill: "rgba(255, 255, 255, 0.07)",
            buttonStroke: "rgba(217, 229, 219, 0.10)",
            buttonGlow: "rgba(86, 115, 98, 0.45)",
            dotActive: "rgba(230, 238, 231, 0.78)",
            dotInactive: "rgba(230, 238, 231, 0.16)"
        }
    },
    {
        id: "sumatra_coast_after_dusk",
        title: "Sumatra Coast After Dusk",
        audio: "assets/audio/sumatra_coast_after_dusk.m4a",
        background: "assets/backgrounds/sumatra_coast_after_dusk_background.jpg",
        colors: {
            bg1: "#021015",
            bg2: "#09242C",
            bg3: "#123B43",
            glow1: "rgba(14, 93, 104, 0.44)",
            glow2: "rgba(29, 122, 128, 0.32)",
            glow3: "rgba(108, 146, 149, 0.28)",
            primaryText: "rgba(255, 255, 255, 0.94)",
            secondaryText: "rgba(255, 255, 255, 0.64)",
            buttonFill: "rgba(255, 255, 255, 0.08)",
            buttonStroke: "rgba(213, 236, 235, 0.10)",
            buttonGlow: "rgba(61, 131, 134, 0.45)",
            dotActive: "rgba(225, 240, 239, 0.78)",
            dotInactive: "rgba(225, 240, 239, 0.16)"
        }
    },
    {
        id: "rain_temple_courtyard",
        title: "Rain Temple Courtyard",
        audio: "assets/audio/rain_temple_courtyard.m4a",
        background: "assets/backgrounds/rain_temple_courtyard_background.jpg",
        colors: {
            bg1: "#05070C",
            bg2: "#101421",
            bg3: "#1B2536",
            glow1: "rgba(50, 78, 119, 0.42)",
            glow2: "rgba(42, 51, 80, 0.30)",
            glow3: "rgba(107, 120, 150, 0.30)",
            primaryText: "rgba(255, 255, 255, 0.94)",
            secondaryText: "rgba(255, 255, 255, 0.64)",
            buttonFill: "rgba(255, 255, 255, 0.08)",
            buttonStroke: "rgba(213, 225, 234, 0.10)",
            buttonGlow: "rgba(73, 109, 137, 0.45)",
            dotActive: "rgba(226, 236, 243, 0.78)",
            dotInactive: "rgba(226, 236, 243, 0.16)"
        }
    },
    {
        id: "nordic_fjord_midnight",
        title: "Nordic Fjord Midnight",
        audio: "assets/audio/nordic_fjord_midnight.m4a",
        background: "assets/backgrounds/nordic_fjord_midnight_background.jpg",
        colors: {
            bg1: "#03060A",
            bg2: "#0B1218",
            bg3: "#15222B",
            glow1: "rgba(80, 106, 128, 0.42)",
            glow2: "rgba(46, 67, 84, 0.30)",
            glow3: "rgba(139, 164, 177, 0.28)",
            primaryText: "rgba(255, 255, 255, 0.94)",
            secondaryText: "rgba(255, 255, 255, 0.64)",
            buttonFill: "rgba(255, 255, 255, 0.08)",
            buttonStroke: "rgba(219, 230, 235, 0.10)",
            buttonGlow: "rgba(109, 131, 144, 0.45)",
            dotActive: "rgba(230, 238, 241, 0.78)",
            dotInactive: "rgba(230, 238, 241, 0.16)"
        }
    },
    {
        id: "icelandic_hot_spring_at_night",
        title: "Icelandic Hot Spring At Night",
        audio: "assets/audio/icelandic_hot_spring_at_night.m4a",
        background: "assets/backgrounds/icelandic_hot_spring_at_night_background.jpg",
        colors: {
            bg1: "#04080C",
            bg2: "#0F1E26",
            bg3: "#17323A",
            glow1: "rgba(93, 161, 161, 0.40)",
            glow2: "rgba(142, 187, 194, 0.26)",
            glow3: "rgba(215, 236, 236, 0.18)",
            primaryText: "rgba(255, 255, 255, 0.94)",
            secondaryText: "rgba(255, 255, 255, 0.64)",
            buttonFill: "rgba(255, 255, 255, 0.08)",
            buttonStroke: "rgba(217, 236, 235, 0.10)",
            buttonGlow: "rgba(115, 173, 176, 0.44)",
            dotActive: "rgba(229, 242, 242, 0.78)",
            dotInactive: "rgba(229, 242, 242, 0.16)"
        }
    },
    {
        id: "sahara_dunes_before_dawn",
        title: "Sahara Dunes Before Dawn",
        audio: "assets/audio/sahara_dunes_before_dawn.m4a",
        background: "assets/backgrounds/sahara_dunes_before_dawn_background.jpg",
        colors: {
            bg1: "#08070C",
            bg2: "#171625",
            bg3: "#2A201D",
            glow1: "rgba(127, 100, 80, 0.42)",
            glow2: "rgba(176, 138, 104, 0.30)",
            glow3: "rgba(217, 183, 139, 0.24)",
            primaryText: "rgba(255, 255, 255, 0.94)",
            secondaryText: "rgba(255, 255, 255, 0.64)",
            buttonFill: "rgba(255, 255, 255, 0.08)",
            buttonStroke: "rgba(242, 228, 211, 0.10)",
            buttonGlow: "rgba(175, 139, 103, 0.45)",
            dotActive: "rgba(242, 232, 220, 0.78)",
            dotInactive: "rgba(242, 232, 220, 0.16)"
        }
    }
];

const root = document.documentElement;
const ambientAudio = document.getElementById("ambientAudio");
const bgLayers = [
    document.getElementById("bgLayerA"),
    document.getElementById("bgLayerB")
];
const demoSurface = document.getElementById("demoSurface");
const titleTrack = document.getElementById("presetTitleTrack");
const playButton = document.getElementById("playButton");
const timerButton = document.getElementById("timerButton");
const pageDots = document.getElementById("pageDots");
const timerRingProgress = document.getElementById("timerRingProgress");
const prevPresetButton = document.getElementById("prevPresetButton");
const nextPresetButton = document.getElementById("nextPresetButton");
const presetStatus = document.getElementById("presetStatus");
const playbackStatus = document.getElementById("playbackStatus");

const timerRingCircumference = 2 * Math.PI * 52;
let activeBackgroundLayerIndex = 0;

const savedPresetId = (() => {
    try {
        return window.localStorage.getItem("noiso.selectedPreset");
    } catch (error) {
        return null;
    }
})();

const initialPresetIndex = Math.max(
    presets.findIndex((preset) => preset.id === savedPresetId),
    0
);

const state = {
    selectedPresetIndex: initialPresetIndex,
    isPlaying: false,
    timerOptionId: "infinity",
    timerRemaining: null,
    timerStartedAt: null,
    timerDeadline: null,
    fadeInStartedAt: null,
    playbackLoopId: null,
    dragPointerId: null,
    dragStartX: 0,
    dragOffset: 0
};

ambientAudio.loop = true;
ambientAudio.preload = "auto";

function buildTitleTrack() {
    titleTrack.innerHTML = presets
        .map((preset) => `<div class="preset-title">${preset.title}</div>`)
        .join("");
}

function buildPageDots() {
    pageDots.innerHTML = presets
        .map((preset) => `<span class="page-dot" data-dot-id="${preset.id}"></span>`)
        .join("");
}

function saveSelectedPreset() {
    try {
        window.localStorage.setItem("noiso.selectedPreset", currentPreset().id);
    } catch (error) {
        // Ignore unavailable storage.
    }
}

function currentPreset() {
    return presets[state.selectedPresetIndex];
}

function currentTimerOption() {
    return timerOptions.find((option) => option.id === state.timerOptionId);
}

function applyThemeColors(colors) {
    root.style.setProperty("--bg-1", colors.bg1);
    root.style.setProperty("--bg-2", colors.bg2);
    root.style.setProperty("--bg-3", colors.bg3);
    root.style.setProperty("--glow-1", colors.glow1);
    root.style.setProperty("--glow-2", colors.glow2);
    root.style.setProperty("--glow-3", colors.glow3);
    root.style.setProperty("--primary-text", colors.primaryText);
    root.style.setProperty("--secondary-text", colors.secondaryText);
    root.style.setProperty("--button-fill", colors.buttonFill);
    root.style.setProperty("--button-stroke", colors.buttonStroke);
    root.style.setProperty("--button-glow", colors.buttonGlow);
    root.style.setProperty("--dot-active", colors.dotActive);
    root.style.setProperty("--dot-inactive", colors.dotInactive);
}

function transitionBackground(imageUrl) {
    const nextLayerIndex = activeBackgroundLayerIndex === 0 ? 1 : 0;
    const nextLayer = bgLayers[nextLayerIndex];
    const currentLayer = bgLayers[activeBackgroundLayerIndex];

    nextLayer.style.backgroundImage = `url("${imageUrl}")`;
    nextLayer.classList.add("is-active");
    currentLayer.classList.remove("is-active");
    activeBackgroundLayerIndex = nextLayerIndex;
}

function updateThemeForPreset() {
    const preset = currentPreset();
    applyThemeColors(preset.colors);
    transitionBackground(preset.background);
    saveSelectedPreset();
}

function updateTitlePosition() {
    demoSurface.style.setProperty("--current-index", state.selectedPresetIndex);
    demoSurface.style.setProperty("--drag-offset", `${state.dragOffset}px`);
}

function updateDots() {
    const dots = pageDots.querySelectorAll(".page-dot");
    dots.forEach((dot, index) => {
        dot.classList.toggle("is-active", index === state.selectedPresetIndex);
    });
}

function updateTimerButton() {
    const option = currentTimerOption();
    timerButton.textContent = option.label;
    timerButton.setAttribute("aria-label", `Sleep timer, ${option.accessibility}`);
}

function updatePresetAccessibility() {
    demoSurface.setAttribute("aria-valuetext", currentPreset().title);
    presetStatus.textContent = currentPreset().title;
}

function updatePlaybackButton() {
    playButton.classList.toggle("is-playing", state.isPlaying);
    playButton.setAttribute(
        "aria-label",
        state.isPlaying ? "Pause current preset" : "Play current preset"
    );
}

function updateTimerRing() {
    const option = currentTimerOption();

    if (!option.duration || state.timerDeadline === null || state.timerRemaining === null) {
        playButton.classList.remove("timer-active");
        timerRingProgress.style.strokeDasharray = `${timerRingCircumference}`;
        timerRingProgress.style.strokeDashoffset = `${timerRingCircumference}`;
        return;
    }

    const progress = Math.min(Math.max(state.timerRemaining / option.duration, 0), 1);
    playButton.classList.add("timer-active");
    timerRingProgress.style.strokeDasharray = `${timerRingCircumference}`;
    timerRingProgress.style.strokeDashoffset = `${timerRingCircumference * (1 - progress)}`;
}

function render() {
    updateTitlePosition();
    updateDots();
    updateTimerButton();
    updatePlaybackButton();
    updateTimerRing();
    updatePresetAccessibility();
}

function effectiveTargetVolume(now = Date.now()) {
    let timerVolume = 1;

    if (state.timerRemaining !== null && state.timerRemaining <= TIMER_FADE_OUT_MS) {
        timerVolume = Math.max(state.timerRemaining / TIMER_FADE_OUT_MS, 0);
    }

    if (state.fadeInStartedAt === null) {
        return timerVolume;
    }

    const fadeProgress = Math.min(Math.max((now - state.fadeInStartedAt) / PLAY_FADE_IN_MS, 0), 1);

    if (fadeProgress >= 1) {
        state.fadeInStartedAt = null;
        return timerVolume;
    }

    return timerVolume * fadeProgress;
}

function ensurePlaybackLoop() {
    if (state.playbackLoopId !== null) {
        return;
    }

    state.playbackLoopId = window.setInterval(syncPlaybackState, PLAYBACK_TICK_MS);
}

function stopPlaybackLoopIfIdle() {
    if (state.isPlaying || state.timerDeadline !== null || state.fadeInStartedAt !== null) {
        return;
    }

    if (state.playbackLoopId !== null) {
        window.clearInterval(state.playbackLoopId);
        state.playbackLoopId = null;
    }
}

function syncPlaybackState() {
    const now = Date.now();

    if (state.timerDeadline !== null) {
        state.timerRemaining = Math.max(state.timerDeadline - now, 0);

        if (state.timerRemaining <= 0) {
            handleSleepTimerCompletion();
            return;
        }
    }

    if (state.isPlaying) {
        ambientAudio.volume = effectiveTargetVolume(now);
    }

    render();
    stopPlaybackLoopIfIdle();
}

async function startCurrentPresetAudio({ fadeIn }) {
    const preset = currentPreset();

    if (!ambientAudio.src.endsWith(preset.audio)) {
        ambientAudio.src = preset.audio;
        ambientAudio.load();
    }

    if (fadeIn) {
        state.fadeInStartedAt = Date.now();
        ambientAudio.volume = 0;
    } else {
        state.fadeInStartedAt = null;
        ambientAudio.volume = effectiveTargetVolume();
    }

    await ambientAudio.play();
    state.isPlaying = true;
    ambientAudio.volume = effectiveTargetVolume();
    ensurePlaybackLoop();
}

async function play() {
    try {
        await startCurrentPresetAudio({ fadeIn: true });
        playbackStatus.textContent = `Playing ${currentPreset().title}`;
        render();
        return true;
    } catch (error) {
        state.isPlaying = false;
        state.fadeInStartedAt = null;
        playbackStatus.textContent = "Playback could not start in this browser session.";
        render();
        stopPlaybackLoopIfIdle();
        return false;
    }
}

function pause() {
    ambientAudio.pause();
    state.isPlaying = false;
    state.fadeInStartedAt = null;
    playbackStatus.textContent = `Paused ${currentPreset().title}`;
    render();
    stopPlaybackLoopIfIdle();
}

function schedulePlaybackTimer(option, startedAt) {
    if (option.duration === null) {
        return;
    }

    state.timerOptionId = option.id;
    state.timerStartedAt = startedAt;
    state.timerDeadline = startedAt + option.duration;
    state.timerRemaining = Math.max(state.timerDeadline - Date.now(), 0);
    ensurePlaybackLoop();
    render();
}

function clearPlaybackTimer() {
    state.timerOptionId = "infinity";
    state.timerRemaining = null;
    state.timerStartedAt = null;
    state.timerDeadline = null;
    render();
}

function restartPlaybackTimerForCurrentSelection() {
    const option = currentTimerOption();

    if (option.duration === null) {
        return;
    }

    schedulePlaybackTimer(option, Date.now());
}

function stopPlaybackTimerForPause() {
    const option = currentTimerOption();

    state.timerStartedAt = null;
    state.timerDeadline = null;
    state.timerRemaining = option.duration;
    render();
}

function handleSleepTimerCompletion() {
    ambientAudio.volume = 0;
    pause();
    stopPlaybackTimerForPause();
    playbackStatus.textContent = "Playback stopped after the timer finished.";
}

async function playByUser() {
    const didStart = await play();

    if (didStart) {
        restartPlaybackTimerForCurrentSelection();
        render();
    }
}

function pauseByUser() {
    pause();
    stopPlaybackTimerForPause();
}

async function togglePlaybackByUser() {
    if (state.isPlaying) {
        pauseByUser();
        return;
    }

    await playByUser();
}

function setPlaybackTimer(optionId) {
    const option = timerOptions.find((candidate) => candidate.id === optionId);

    if (!option) {
        return;
    }

    if (option.duration === null) {
        clearPlaybackTimer();
        return;
    }

    const previousOption = currentTimerOption();
    let startDate = Date.now();

    if (
        previousOption.duration !== null &&
        state.timerStartedAt !== null &&
        state.timerDeadline !== null &&
        option.duration > previousOption.duration
    ) {
        startDate = state.timerStartedAt;
    }

    state.timerOptionId = option.id;

    if (state.isPlaying) {
        schedulePlaybackTimer(option, startDate);
    } else {
        state.timerRemaining = option.duration;
        state.timerStartedAt = null;
        state.timerDeadline = null;
        render();
    }
}

function cyclePlaybackTimer() {
    const currentIndex = timerOptions.findIndex((option) => option.id === state.timerOptionId);
    const nextOption = timerOptions[(currentIndex + 1) % timerOptions.length];
    setPlaybackTimer(nextOption.id);
}

function adjustedTranslation(translation) {
    if (state.selectedPresetIndex === 0 && translation > 0) {
        return translation * 0.32;
    }

    if (state.selectedPresetIndex === presets.length - 1 && translation < 0) {
        return translation * 0.32;
    }

    return translation;
}

function resetDragState() {
    state.dragPointerId = null;
    state.dragStartX = 0;
    state.dragOffset = 0;
    demoSurface.classList.remove("is-dragging");
    updateTitlePosition();
}

async function setPresetByIndex(nextIndex) {
    const clampedIndex = Math.min(Math.max(nextIndex, 0), presets.length - 1);

    if (clampedIndex === state.selectedPresetIndex) {
        resetDragState();
        return;
    }

    state.selectedPresetIndex = clampedIndex;
    updateThemeForPreset();
    render();
    resetDragState();

    if (state.isPlaying) {
        try {
            await startCurrentPresetAudio({ fadeIn: false });
            playbackStatus.textContent = `Playing ${currentPreset().title}`;
        } catch (error) {
            state.isPlaying = false;
            state.fadeInStartedAt = null;
            playbackStatus.textContent = "The new preset could not start.";
        }
        render();
    }
}

function handlePointerDown(event) {
    if (event.pointerType === "mouse" && event.button !== 0) {
        return;
    }

    if (event.target.closest("button")) {
        return;
    }

    state.dragPointerId = event.pointerId;
    state.dragStartX = event.clientX;
    state.dragOffset = 0;
    demoSurface.classList.add("is-dragging");
    demoSurface.setPointerCapture(event.pointerId);
}

function handlePointerMove(event) {
    if (state.dragPointerId !== event.pointerId) {
        return;
    }

    state.dragOffset = adjustedTranslation(event.clientX - state.dragStartX);
    updateTitlePosition();
}

function handlePointerEnd(event) {
    if (state.dragPointerId !== event.pointerId) {
        return;
    }

    const threshold = demoSurface.clientWidth * 0.14;
    const dragOffset = state.dragOffset;

    if (dragOffset < -threshold) {
        void setPresetByIndex(state.selectedPresetIndex + 1);
        return;
    }

    if (dragOffset > threshold) {
        void setPresetByIndex(state.selectedPresetIndex - 1);
        return;
    }

    resetDragState();
}

function bindEvents() {
    playButton.addEventListener("click", () => {
        void togglePlaybackByUser();
    });

    timerButton.addEventListener("click", cyclePlaybackTimer);
    prevPresetButton.addEventListener("click", () => {
        void setPresetByIndex(state.selectedPresetIndex - 1);
    });
    nextPresetButton.addEventListener("click", () => {
        void setPresetByIndex(state.selectedPresetIndex + 1);
    });

    demoSurface.addEventListener("pointerdown", handlePointerDown);
    demoSurface.addEventListener("pointermove", handlePointerMove);
    demoSurface.addEventListener("pointerup", handlePointerEnd);
    demoSurface.addEventListener("pointercancel", handlePointerEnd);
    demoSurface.addEventListener("lostpointercapture", resetDragState);

    demoSurface.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight") {
            event.preventDefault();
            void setPresetByIndex(state.selectedPresetIndex + 1);
        }

        if (event.key === "ArrowLeft") {
            event.preventDefault();
            void setPresetByIndex(state.selectedPresetIndex - 1);
        }

        if (event.key === " " || event.key === "Enter") {
            event.preventDefault();
            void togglePlaybackByUser();
        }
    });

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            resetDragState();
        }
    });

    ambientAudio.addEventListener("error", () => {
        playbackStatus.textContent = "Audio asset failed to load.";
    });
}

function initTimerRing() {
    timerRingProgress.style.strokeDasharray = `${timerRingCircumference}`;
    timerRingProgress.style.strokeDashoffset = `${timerRingCircumference}`;
}

function init() {
    buildTitleTrack();
    buildPageDots();
    initTimerRing();
    updateThemeForPreset();
    bindEvents();
    render();
}

init();
