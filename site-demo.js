import {
    PLAYBACK_TICK_MS,
    PRESETS,
    STORAGE_KEYS,
    TIMER_FADE_OUT_MS,
    TIMER_OPTIONS,
    detectEnvironment
} from "./site-config.js";

const DRAG_EDGE_RESISTANCE = 0.32;
const DRAG_THRESHOLD_RATIO = 0.14;
const TIMER_RING_CENTER = 60;
const TIMER_RING_RADIUS = 52;

function queryElement(id) {
    const element = document.getElementById(id);

    if (!element) {
        throw new Error(`Missing required element: #${id}`);
    }

    return element;
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function createElements() {
    return {
        root: document.documentElement,
        themeColorMeta: document.querySelector('meta[name="theme-color"]'),
        ambientAudio: queryElement("ambientAudio"),
        bgLayers: [
            queryElement("bgLayerA"),
            queryElement("bgLayerB")
        ],
        demoSurface: queryElement("demoSurface"),
        titleTrack: queryElement("presetTitleTrack"),
        playButton: queryElement("playButton"),
        timerButton: queryElement("timerButton"),
        pageDots: queryElement("pageDots"),
        timerRingProgress: queryElement("timerRingProgress"),
        prevPresetButton: queryElement("prevPresetButton"),
        nextPresetButton: queryElement("nextPresetButton"),
        presetStatus: queryElement("presetStatus"),
        playbackStatus: queryElement("playbackStatus")
    };
}

function readSavedPresetId() {
    try {
        return window.localStorage.getItem(STORAGE_KEYS.selectedPreset);
    } catch (error) {
        return null;
    }
}

function resolveInitialPresetIndex() {
    const savedPresetId = readSavedPresetId();

    return Math.max(
        PRESETS.findIndex((preset) => preset.id === savedPresetId),
        0
    );
}

export function createNoisoDemo() {
    const elements = createElements();
    const environment = detectEnvironment();
    const audioRuntime = {
        context: null,
        sourceNode: null,
        gainNode: null,
        interactiveReady: false,
        preloadedAudio: new Map(),
        isSwitchingSource: false
    };
    const state = {
        selectedPresetIndex: resolveInitialPresetIndex(),
        isPlaying: false,
        timerOptionId: "infinity",
        timerRemaining: null,
        timerStartedAt: null,
        timerDeadline: null,
        playbackLoopId: null,
        dragPointerId: null,
        dragStartX: 0,
        dragOffset: 0,
        playRequestId: 0,
        activeBackgroundLayerIndex: 0
    };
    const AudioContextClass = window.AudioContext || window.webkitAudioContext || null;

    elements.ambientAudio.loop = true;
    elements.ambientAudio.preload = "auto";

    if (environment.isConstrainedMobileDevice) {
        elements.root.classList.add("is-constrained-mobile");
    }

    if (environment.isAppleMobileSafari) {
        elements.root.classList.add("is-apple-mobile-safari");
    }

    function currentPreset() {
        return PRESETS[state.selectedPresetIndex];
    }

    function currentTimerOption() {
        return TIMER_OPTIONS.find((option) => option.id === state.timerOptionId);
    }

    function isLargeLoopAsset(audioPath) {
        return /\.wav(?:$|\?)/i.test(audioPath);
    }

    function saveSelectedPreset() {
        try {
            window.localStorage.setItem(STORAGE_KEYS.selectedPreset, currentPreset().id);
        } catch (error) {
            // Ignore unavailable storage.
        }
    }

    function setPlaybackStatus(message) {
        if (elements.playbackStatus.textContent !== message) {
            elements.playbackStatus.textContent = message;
        }
    }

    function buildTitleTrack() {
        elements.titleTrack.innerHTML = PRESETS
            .map((preset) => `<div class="preset-title">${preset.title}</div>`)
            .join("");
    }

    function buildPageDots() {
        elements.pageDots.innerHTML = PRESETS
            .map((preset) => `<span class="page-dot" data-dot-id="${preset.id}"></span>`)
            .join("");
    }

    function preferredOutputGain() {
        return environment.isAppleMobileSafari ? 1.55 : 1;
    }

    function absoluteAudioUrl(audioPath) {
        return new URL(audioPath, window.location.href).href;
    }

    function ambientAudioMatchesPreset(preset) {
        return elements.ambientAudio.src === absoluteAudioUrl(preset.audio);
    }

    function warmAudioAsset(audioPath) {
        if (
            environment.isConstrainedMobileDevice ||
            isLargeLoopAsset(audioPath) ||
            audioRuntime.preloadedAudio.has(audioPath)
        ) {
            return;
        }

        const audio = new Audio();
        audio.preload = "auto";
        audio.src = audioPath;
        audio.load();
        audioRuntime.preloadedAudio.set(audioPath, audio);
    }

    function ensureAmbientAudioPreset(preset) {
        warmAudioAsset(preset.audio);

        if (ambientAudioMatchesPreset(preset)) {
            audioRuntime.isSwitchingSource = false;
            return;
        }

        audioRuntime.isSwitchingSource = true;
        elements.ambientAudio.src = preset.audio;
        elements.ambientAudio.load();
    }

    function primeAmbientAudioForPreset(preset = currentPreset()) {
        if (state.isPlaying) {
            warmAudioAsset(preset.audio);
            return;
        }

        ensureAmbientAudioPreset(preset);
    }

    function preloadPresetAudioInBackground() {
        if (environment.isConstrainedMobileDevice) {
            return;
        }

        const preloadAll = () => {
            PRESETS.forEach((preset) => {
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
        elements.root.style.setProperty("--bg-1", colors.bg1);
        elements.root.style.setProperty("--bg-2", colors.bg2);
        elements.root.style.setProperty("--bg-3", colors.bg3);
        elements.root.style.setProperty("--glow-1", colors.glow1);
        elements.root.style.setProperty("--glow-2", colors.glow2);
        elements.root.style.setProperty("--glow-3", colors.glow3);
        elements.root.style.setProperty("--primary-text", colors.primaryText);
        elements.root.style.setProperty("--secondary-text", colors.secondaryText);
        elements.root.style.setProperty("--button-fill", colors.buttonFill);
        elements.root.style.setProperty("--button-stroke", colors.buttonStroke);
        elements.root.style.setProperty("--button-glow", colors.buttonGlow);
        elements.root.style.setProperty("--dot-active", colors.dotActive);
        elements.root.style.setProperty("--dot-inactive", colors.dotInactive);

        if (elements.themeColorMeta) {
            elements.themeColorMeta.setAttribute("content", colors.bg1);
        }
    }

    function transitionBackground(imageUrl) {
        if (environment.isConstrainedMobileDevice) {
            elements.bgLayers.forEach((layer) => {
                layer.style.backgroundImage = "";
                layer.classList.remove("is-active");
            });
            return;
        }

        const nextLayerIndex = state.activeBackgroundLayerIndex === 0 ? 1 : 0;
        const nextLayer = elements.bgLayers[nextLayerIndex];
        const currentLayer = elements.bgLayers[state.activeBackgroundLayerIndex];

        nextLayer.style.backgroundImage = `url("${imageUrl}")`;
        nextLayer.classList.add("is-active");
        currentLayer.classList.remove("is-active");
        state.activeBackgroundLayerIndex = nextLayerIndex;
    }

    function updateThemeForPreset() {
        const preset = currentPreset();
        applyThemeColors(preset.colors);
        transitionBackground(preset.background);
        saveSelectedPreset();
        primeAmbientAudioForPreset(preset);
    }

    function updateTitlePosition() {
        elements.demoSurface.style.setProperty("--current-index", state.selectedPresetIndex);
        elements.demoSurface.style.setProperty("--drag-offset", `${state.dragOffset}px`);
    }

    function updateDots() {
        const dots = elements.pageDots.querySelectorAll(".page-dot");

        dots.forEach((dot, index) => {
            dot.classList.toggle("is-active", index === state.selectedPresetIndex);
        });
    }

    function updateTimerButton() {
        const option = currentTimerOption();
        elements.timerButton.textContent = option.label;
        elements.timerButton.setAttribute("aria-label", `Sleep timer, ${option.accessibility}`);
        elements.timerButton.classList.toggle("timer-button--compact", option.duration !== null);
    }

    function updatePresetAccessibility() {
        const presetTitle = currentPreset().title;

        if (elements.demoSurface.getAttribute("aria-valuetext") !== presetTitle) {
            elements.demoSurface.setAttribute("aria-valuetext", presetTitle);
        }

        if (elements.presetStatus.textContent !== presetTitle) {
            elements.presetStatus.textContent = presetTitle;
        }
    }

    function updatePlaybackButton() {
        elements.playButton.classList.toggle("is-playing", state.isPlaying);
        elements.playButton.setAttribute(
            "aria-label",
            state.isPlaying ? "Pause current preset" : "Play current preset"
        );
    }

    function timerRingPoint(angleDegrees) {
        const radians = (angleDegrees * Math.PI) / 180;

        return {
            x: TIMER_RING_CENTER + TIMER_RING_RADIUS * Math.cos(radians),
            y: TIMER_RING_CENTER + TIMER_RING_RADIUS * Math.sin(radians)
        };
    }

    function buildFullTimerRingPath() {
        const topPoint = timerRingPoint(270);
        const bottomPoint = timerRingPoint(90);

        return [
            `M ${topPoint.x} ${topPoint.y}`,
            `A ${TIMER_RING_RADIUS} ${TIMER_RING_RADIUS} 0 0 1 ${bottomPoint.x} ${bottomPoint.y}`,
            `A ${TIMER_RING_RADIUS} ${TIMER_RING_RADIUS} 0 0 1 ${topPoint.x} ${topPoint.y}`
        ].join(" ");
    }

    function buildTimerRingPath(progress) {
        const clampedProgress = clamp(progress, 0.001, 1);

        if (clampedProgress >= 0.9995) {
            return buildFullTimerRingPath();
        }

        const startAngle = ((270 - clampedProgress * 360) % 360 + 360) % 360;
        const startPoint = timerRingPoint(startAngle);
        const endPoint = timerRingPoint(270);
        const largeArcFlag = clampedProgress > 0.5 ? 1 : 0;

        return [
            `M ${startPoint.x} ${startPoint.y}`,
            `A ${TIMER_RING_RADIUS} ${TIMER_RING_RADIUS} 0 ${largeArcFlag} 1 ${endPoint.x} ${endPoint.y}`
        ].join(" ");
    }

    function updateTimerRing() {
        const option = currentTimerOption();
        const hasRunningTimer = Boolean(
            option.duration &&
            state.timerRemaining !== null &&
            state.timerDeadline !== null
        );

        elements.playButton.classList.toggle("timer-active", hasRunningTimer);

        if (!hasRunningTimer) {
            elements.playButton.classList.remove("timer-active");
            elements.timerRingProgress.setAttribute("hidden", "");
            elements.timerRingProgress.removeAttribute("d");
            return;
        }

        const progress = clamp(state.timerRemaining / option.duration, 0, 1);
        elements.timerRingProgress.removeAttribute("hidden");
        elements.timerRingProgress.setAttribute("d", buildTimerRingPath(progress));
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
        if (state.timerRemaining !== null && state.timerRemaining <= TIMER_FADE_OUT_MS) {
            return Math.max(state.timerRemaining / TIMER_FADE_OUT_MS, 0);
        }

        return 1;
    }

    function ensureAudioOutputChain() {
        if (!AudioContextClass || audioRuntime.gainNode) {
            return;
        }

        try {
            audioRuntime.context = new AudioContextClass();
            audioRuntime.sourceNode = audioRuntime.context.createMediaElementSource(elements.ambientAudio);
            audioRuntime.gainNode = audioRuntime.context.createGain();
            audioRuntime.sourceNode.connect(audioRuntime.gainNode);
            audioRuntime.gainNode.connect(audioRuntime.context.destination);
        } catch (error) {
            audioRuntime.context = null;
            audioRuntime.sourceNode = null;
            audioRuntime.gainNode = null;
        }
    }

    async function resumeAudioOutputChain() {
        ensureAudioOutputChain();

        if (!audioRuntime.context || audioRuntime.context.state !== "suspended") {
            return;
        }

        try {
            await audioRuntime.context.resume();
        } catch (error) {
            // Fall back to regular media element output.
        }
    }

    async function prepareInteractiveAudio() {
        if (audioRuntime.interactiveReady) {
            return;
        }

        primeAmbientAudioForPreset();
        await resumeAudioOutputChain();
        audioRuntime.interactiveReady = true;
    }

    function applyPlaybackOutput(now = Date.now()) {
        const level = effectiveTargetVolume(now);

        if (audioRuntime.gainNode) {
            audioRuntime.gainNode.gain.value = level * preferredOutputGain();
            elements.ambientAudio.volume = 1;
            return;
        }

        elements.ambientAudio.volume = level;
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

        await elements.ambientAudio.play();
        audioRuntime.isSwitchingSource = false;
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
                elements.ambientAudio.pause();
                stopPlaybackLoopIfIdle();
                return false;
            }

            setPlaybackStatus(`Playing ${currentPreset().title}`);
            render();
            return true;
        } catch (error) {
            audioRuntime.isSwitchingSource = false;
            state.isPlaying = false;
            setPlaybackStatus("Playback could not start in this browser session.");
            render();
            stopPlaybackLoopIfIdle();
            return false;
        }
    }

    function pause() {
        state.playRequestId += 1;
        elements.ambientAudio.pause();
        state.isPlaying = false;
        setPlaybackStatus(`Paused ${currentPreset().title}`);
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
        if (audioRuntime.gainNode) {
            audioRuntime.gainNode.gain.value = 0;
        } else {
            elements.ambientAudio.volume = 0;
        }

        pause();
        stopPlaybackTimerForPause();
        setPlaybackStatus("Playback stopped after the timer finished.");
    }

    function syncPlaybackStateFromMediaElement() {
        if (audioRuntime.isSwitchingSource) {
            return;
        }

        const isActuallyPlaying =
            !elements.ambientAudio.paused &&
            !elements.ambientAudio.ended;

        if (isActuallyPlaying) {
            if (!state.isPlaying) {
                state.isPlaying = true;

                if (currentTimerOption().duration !== null && state.timerDeadline === null) {
                    schedulePlaybackTimer(currentTimerOption(), Date.now());
                }

                setPlaybackStatus(`Playing ${currentPreset().title}`);
            }

            ensurePlaybackLoop();
            applyPlaybackOutput();
            render();
            return;
        }

        if (!state.isPlaying && state.timerDeadline === null) {
            render();
            stopPlaybackLoopIfIdle();
            return;
        }

        state.isPlaying = false;
        stopPlaybackTimerForPause();
        setPlaybackStatus(`Paused ${currentPreset().title}`);
        render();
        stopPlaybackLoopIfIdle();
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
        const option = TIMER_OPTIONS.find((candidate) => candidate.id === optionId);

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
            return;
        }

        state.timerRemaining = option.duration;
        state.timerStartedAt = null;
        state.timerDeadline = null;
        render();
    }

    function cyclePlaybackTimer() {
        const currentIndex = TIMER_OPTIONS.findIndex((option) => option.id === state.timerOptionId);
        const nextOption = TIMER_OPTIONS[(currentIndex + 1) % TIMER_OPTIONS.length];
        setPlaybackTimer(nextOption.id);
    }

    function adjustedTranslation(translation) {
        if (state.selectedPresetIndex === 0 && translation > 0) {
            return translation * DRAG_EDGE_RESISTANCE;
        }

        if (state.selectedPresetIndex === PRESETS.length - 1 && translation < 0) {
            return translation * DRAG_EDGE_RESISTANCE;
        }

        return translation;
    }

    function resetDragState() {
        state.dragPointerId = null;
        state.dragStartX = 0;
        state.dragOffset = 0;
        elements.demoSurface.classList.remove("is-dragging");
        updateTitlePosition();
    }

    function normalizePresetIndex(nextIndex, shouldWrap = false) {
        if (shouldWrap) {
            return (nextIndex % PRESETS.length + PRESETS.length) % PRESETS.length;
        }

        return clamp(nextIndex, 0, PRESETS.length - 1);
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

        if (!state.isPlaying) {
            return;
        }

        const requestId = ++state.playRequestId;

        try {
            await startCurrentPresetAudio();

            if (requestId !== state.playRequestId || !state.isPlaying) {
                elements.ambientAudio.pause();
                return;
            }

            setPlaybackStatus(`Playing ${currentPreset().title}`);
        } catch (error) {
            if (requestId !== state.playRequestId) {
                return;
            }

            state.isPlaying = false;
            setPlaybackStatus("The new preset could not start.");
        }

        render();
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
        elements.demoSurface.classList.add("is-dragging");
        elements.demoSurface.setPointerCapture(event.pointerId);
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

        const threshold = elements.demoSurface.clientWidth * DRAG_THRESHOLD_RATIO;
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

        if (environment.supportsPointerEvents) {
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

    function isEditableTarget(target) {
        if (!(target instanceof Element)) {
            return false;
        }

        if (target.closest("input, textarea, select, [contenteditable='true']")) {
            return true;
        }

        return target instanceof HTMLElement && target.isContentEditable;
    }

    function isKeyboardShortcutTarget(target) {
        if (!(target instanceof Element)) {
            return false;
        }

        if (target === elements.demoSurface) {
            return false;
        }

        return Boolean(target.closest("button, a, input, textarea, select, [contenteditable='true']"));
    }

    function bindDesktopKeyboardShortcuts() {
        if (environment.isConstrainedMobileDevice) {
            return;
        }

        window.addEventListener("keydown", (event) => {
            if (
                event.repeat ||
                event.altKey ||
                event.ctrlKey ||
                event.metaKey ||
                isEditableTarget(event.target) ||
                isKeyboardShortcutTarget(event.target)
            ) {
                return;
            }

            if (event.key === " " || event.code === "Space") {
                event.preventDefault();
                void togglePlaybackByUser();
                return;
            }

            if (event.key === "ArrowLeft") {
                event.preventDefault();
                void setPresetByIndex(state.selectedPresetIndex - 1, { wrap: true });
                return;
            }

            if (event.key === "ArrowRight") {
                event.preventDefault();
                void setPresetByIndex(state.selectedPresetIndex + 1, { wrap: true });
            }
        }, { capture: true });
    }

    function bindEvents() {
        bindDiscreteButton(elements.playButton, () => {
            void togglePlaybackByUser();
        });
        bindDiscreteButton(elements.timerButton, cyclePlaybackTimer);
        bindDiscreteButton(elements.prevPresetButton, () => {
            void setPresetByIndex(state.selectedPresetIndex - 1, { wrap: true });
        });
        bindDiscreteButton(elements.nextPresetButton, () => {
            void setPresetByIndex(state.selectedPresetIndex + 1, { wrap: true });
        });

        elements.demoSurface.addEventListener("pointerdown", handlePointerDown);
        elements.demoSurface.addEventListener("pointermove", handlePointerMove);
        elements.demoSurface.addEventListener("pointerup", handlePointerEnd);
        elements.demoSurface.addEventListener("pointercancel", handlePointerEnd);
        elements.demoSurface.addEventListener("lostpointercapture", resetDragState);

        elements.demoSurface.addEventListener("keydown", (event) => {
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
                return;
            }

            syncPlaybackStateFromMediaElement();
        });

        window.addEventListener("focus", syncPlaybackStateFromMediaElement);
        window.addEventListener("pageshow", syncPlaybackStateFromMediaElement);

        elements.ambientAudio.addEventListener("error", () => {
            audioRuntime.isSwitchingSource = false;
            setPlaybackStatus("Audio asset failed to load.");
        });
        elements.ambientAudio.addEventListener("play", syncPlaybackStateFromMediaElement);
        elements.ambientAudio.addEventListener("pause", syncPlaybackStateFromMediaElement);
        elements.ambientAudio.addEventListener("ended", syncPlaybackStateFromMediaElement);

        bindDesktopKeyboardShortcuts();
    }

    function init() {
        buildTitleTrack();
        buildPageDots();
        updateThemeForPreset();
        preloadPresetAudioInBackground();
        bindEvents();
        render();
    }

    return { init };
}
