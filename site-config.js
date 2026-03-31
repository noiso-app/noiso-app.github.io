function assetUrl(relativePath) {
    return new URL(relativePath, document.baseURI).href;
}

export const TIMER_FADE_OUT_MS = 5000;
export const PLAYBACK_TICK_MS = 100;
export const STORAGE_KEYS = {
    selectedPreset: "noiso.selectedPreset"
};

export const TIMER_OPTIONS = [
    { id: "infinity", label: "∞", accessibility: "Infinite playback", duration: null },
    { id: "minutes30", label: "30m", accessibility: "30 minutes", duration: 30 * 60 * 1000 },
    { id: "hour1", label: "1h", accessibility: "1 hour", duration: 60 * 60 * 1000 },
    { id: "hours2", label: "2h", accessibility: "2 hours", duration: 2 * 60 * 60 * 1000 }
];

export const PRESETS = [
    {
        id: "mountain_cabin_in_snow",
        title: "Mountain Cabin in Snow",
        audio: assetUrl("./assets/audio/mountain_cabin_in_snow.wav"),
        background: assetUrl("./assets/backgrounds/mountain_cabin_in_snow_background.jpg"),
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
        audio: assetUrl("./assets/audio/japanese_forest_at_night.wav"),
        background: assetUrl("./assets/backgrounds/japanese_forest_at_night_background.jpg"),
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
        audio: assetUrl("./assets/audio/sumatra_coast_after_dusk.wav"),
        background: assetUrl("./assets/backgrounds/sumatra_coast_after_dusk_background.jpg"),
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
        audio: assetUrl("./assets/audio/rain_temple_courtyard.wav"),
        background: assetUrl("./assets/backgrounds/rain_temple_courtyard_background.jpg"),
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
        audio: assetUrl("./assets/audio/nordic_fjord_midnight.wav"),
        background: assetUrl("./assets/backgrounds/nordic_fjord_midnight_background.jpg"),
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
        audio: assetUrl("./assets/audio/icelandic_hot_spring_at_night.wav"),
        background: assetUrl("./assets/backgrounds/icelandic_hot_spring_at_night_background.jpg"),
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
        audio: assetUrl("./assets/audio/sahara_dunes_before_dawn.wav"),
        background: assetUrl("./assets/backgrounds/sahara_dunes_before_dawn_background.jpg"),
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

export function detectEnvironment() {
    const userAgent = navigator.userAgent || "";
    const coarsePointer = window.matchMedia?.("(pointer: coarse)").matches ?? false;
    const narrowViewport = window.matchMedia?.("(max-width: 900px)").matches ?? false;
    const touchCapable = (navigator.maxTouchPoints || 0) > 0;

    return {
        isAppleMobileSafari:
            /iP(hone|ad|od)/.test(userAgent) &&
            /AppleWebKit/.test(userAgent) &&
            !/CriOS|FxiOS|EdgiOS/.test(userAgent),
        isConstrainedMobileDevice:
            coarsePointer &&
            (
                /Android|iPhone|iPad|iPod|Mobile|webOS|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) ||
                narrowViewport ||
                touchCapable
            ),
        supportsPointerEvents: "PointerEvent" in window
    };
}
