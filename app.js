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
const preloadedAudio = new Map();
const AudioContextClass = window.AudioContext || window.webkitAudioContext || null;
const supportsPointerEvents = "PointerEvent" in window;

const isAppleMobileSafari = (() => {
    const userAgent = navigator.userAgent || "";
    return (
        /iP(hone|ad|od)/.test(userAgent) &&
        /AppleWebKit/.test(userAgent) &&
        !/CriOS|FxiOS|EdgiOS/.test(userAgent)
    );
})();

const isConstrainedMobileDevice = (() => {
    const userAgent = navigator.userAgent || "";
    const mobileUserAgent = /Android|iPhone|iPad|iPod|Mobile|webOS|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const coarsePointer = window.matchMedia?.("(pointer: coarse)").matches ?? false;
    const narrowViewport = window.matchMedia?.("(max-width: 900px)").matches ?? false;
    const touchCapable = (navigator.maxTouchPoints || 0) > 0;

    return coarsePointer && (mobileUserAgent || narrowViewport || touchCapable);
})();

const timerRingCircumference = 2 * Math.PI * 52;
let activeBackgroundLayerIndex = 0;
let audioContext = null;
let audioSourceNode = null;
let audioGainNode = null;
let interactiveAudioReady = false;

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
    playbackLoopId: null,
    dragPointerId: null,
    dragStartX: 0,
    dragOffset: 0,
    playRequestId: 0
};

ambientAudio.loop = true;
ambientAudio.preload = "auto";

if (isConstrainedMobileDevice) {
    document.documentElement.classList.add("is-constrained-mobile");
}

if (isAppleMobileSafari) {
    document.documentElement.classList.add("is-apple-mobile-safari");
}

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

function preferredOutputGain() {
    return isAppleMobileSafari ? 1.55 : 1;
}

function absoluteAudioUrl(audioPath) {
    return new URL(audioPath, window.location.href).href;
}

function ambientAudioMatchesPreset(preset) {
    return ambientAudio.src === absoluteAudioUrl(preset.audio);
}

function warmAudioAsset(audioPath) {
    if (isConstrainedMobileDevice) {
        return;
    }

    if (preloadedAudio.has(audioPath)) {
        return;
    }

    const audio = new Audio();
    audio.preload = "auto";
    audio.src = audioPath;
    audio.load();
    preloadedAudio.set(audioPath, audio);
}

function ensureAmbientAudioPreset(preset) {
    warmAudioAsset(preset.audio);

    if (ambientAudioMatchesPreset(preset)) {
        return;
    }

    ambientAudio.src = preset.audio;
    ambientAudio.load();
}

function primeAmbientAudioForPreset(preset = currentPreset()) {
    if (state.isPlaying) {
        warmAudioAsset(preset.audio);
        return;
    }

    ensureAmbientAudioPreset(preset);
}

function preloadPresetAudioInBackground() {
    if (isConstrainedMobileDevice) {
        return;
    }

    const preloadAll = () => {
        presets.forEach((preset) => {
            warmAudioAsset(preset.audio);
        });
    };

    if ("requestIdleCallback" in window) {
        window.requestIdleCallback(preloadAll, { timeout: 1500 });
        return;
    }

    window.setTimeout(preloadAll, 300);
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
    if (isConstrainedMobileDevice) {
        bgLayers.forEach((layer) => {
            layer.style.backgroundImage = "";
            layer.classList.remove("is-active");
        });
        return;
    }

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
    primeAmbientAudioForPreset(preset);
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
    timerButton.classList.toggle("timer-button--compact", option.duration !== null);
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
    const hasRunningTimer = Boolean(
        option.duration &&
        state.timerRemaining !== null &&
        state.timerDeadline !== null
    );

    playButton.classList.toggle("timer-active", hasRunningTimer);
    timerRingProgress.hidden = !hasRunningTimer;

    if (!hasRunningTimer) {
        playButton.classList.remove("timer-active");
        timerRingProgress.style.strokeDasharray = `${timerRingCircumference} 0`;
        timerRingProgress.style.strokeDashoffset = "0";
        return;
    }

    const progress = Math.min(Math.max(state.timerRemaining / option.duration, 0), 1);
    const visibleLength = timerRingCircumference * progress;
    const gapLength = timerRingCircumference - visibleLength;
    timerRingProgress.style.strokeDasharray = `${visibleLength} ${gapLength}`;
    timerRingProgress.style.strokeDashoffset = `${-gapLength}`;
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

    return timerVolume;
}

function ensureAudioOutputChain() {
    if (!AudioContextClass || audioGainNode) {
        return;
    }

    try {
        audioContext = new AudioContextClass();
        audioSourceNode = audioContext.createMediaElementSource(ambientAudio);
        audioGainNode = audioContext.createGain();
        audioSourceNode.connect(audioGainNode);
        audioGainNode.connect(audioContext.destination);
    } catch (error) {
        audioContext = null;
        audioSourceNode = null;
        audioGainNode = null;
    }
}

async function resumeAudioOutputChain() {
    ensureAudioOutputChain();

    if (!audioContext || audioContext.state !== "suspended") {
        return;
    }

    try {
        await audioContext.resume();
    } catch (error) {
        // Fall back to regular media element output.
    }
}

async function prepareInteractiveAudio() {
    if (interactiveAudioReady) {
        return;
    }

    primeAmbientAudioForPreset();
    await resumeAudioOutputChain();
    interactiveAudioReady = true;
}

function applyPlaybackOutput(now = Date.now()) {
    const level = effectiveTargetVolume(now);

    if (audioGainNode) {
        audioGainNode.gain.value = level * preferredOutputGain();
        ambientAudio.volume = 1;
        return;
    }

    ambientAudio.volume = level;
}

function ensurePlaybackLoop() {
    if (state.playbackLoopId !== null) {
        return;
    }

    state.playbackLoopId = window.setInterval(syncPlaybackState, PLAYBACK_TICK_MS);
}

function stopPlaybackLoopIfIdle() {
    if (state.isPlaying || state.timerDeadline !== null) {
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
        applyPlaybackOutput(now);
    }

    render();
    stopPlaybackLoopIfIdle();
}

async function startCurrentPresetAudio() {
    const preset = currentPreset();
    ensureAmbientAudioPreset(preset);
    applyPlaybackOutput();

    await ambientAudio.play();
    applyPlaybackOutput();
}

async function play() {
    const requestId = ++state.playRequestId;
    state.isPlaying = true;
    render();
    ensurePlaybackLoop();

    try {
        await prepareInteractiveAudio();
        await startCurrentPresetAudio();

        if (requestId !== state.playRequestId || !state.isPlaying) {
            ambientAudio.pause();
            stopPlaybackLoopIfIdle();
            return false;
        }

        playbackStatus.textContent = `Playing ${currentPreset().title}`;
        render();
        return true;
    } catch (error) {
        state.isPlaying = false;
        playbackStatus.textContent = "Playback could not start in this browser session.";
        render();
        stopPlaybackLoopIfIdle();
        return false;
    }
}

function pause() {
    state.playRequestId += 1;
    ambientAudio.pause();
    state.isPlaying = false;
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
    if (audioGainNode) {
        audioGainNode.gain.value = 0;
    } else {
        ambientAudio.volume = 0;
    }
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

function normalizePresetIndex(nextIndex, shouldWrap = false) {
    if (shouldWrap) {
        return (nextIndex % presets.length + presets.length) % presets.length;
    }

    return Math.min(Math.max(nextIndex, 0), presets.length - 1);
}

async function setPresetByIndex(nextIndex, { wrap = false } = {}) {
    const clampedIndex = normalizePresetIndex(nextIndex, wrap);

    if (clampedIndex === state.selectedPresetIndex) {
        resetDragState();
        return;
    }

    state.selectedPresetIndex = clampedIndex;
    updateThemeForPreset();
    render();
    resetDragState();

    if (state.isPlaying) {
        const requestId = ++state.playRequestId;

        try {
            await startCurrentPresetAudio();

            if (requestId !== state.playRequestId || !state.isPlaying) {
                ambientAudio.pause();
                return;
            }

            playbackStatus.textContent = `Playing ${currentPreset().title}`;
        } catch (error) {
            if (requestId !== state.playRequestId) {
                return;
            }

            state.isPlaying = false;
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

function bindDiscreteButton(button, handler) {
    const invoke = (event) => {
        event.preventDefault();
        handler();
    };

    if (supportsPointerEvents) {
        button.addEventListener("pointerdown", () => {
            void prepareInteractiveAudio();
        }, { passive: true });

        button.addEventListener("pointerup", (event) => {
            if (!event.isPrimary) {
                return;
            }

            if (event.pointerType === "mouse" && event.button !== 0) {
                return;
            }

            invoke(event);
        });
    } else {
        button.addEventListener("touchstart", () => {
            void prepareInteractiveAudio();
        }, { passive: true });
        button.addEventListener("click", invoke);
    }

    button.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") {
            return;
        }

        invoke(event);
    });
}

function bindEvents() {
    bindDiscreteButton(playButton, () => {
        void togglePlaybackByUser();
    });

    bindDiscreteButton(timerButton, cyclePlaybackTimer);
    bindDiscreteButton(prevPresetButton, () => {
        void setPresetByIndex(state.selectedPresetIndex - 1, { wrap: true });
    });
    bindDiscreteButton(nextPresetButton, () => {
        void setPresetByIndex(state.selectedPresetIndex + 1, { wrap: true });
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
    preloadPresetAudioInBackground();
    bindEvents();
    render();
}

init();
