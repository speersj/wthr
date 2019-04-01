const primaryPalette = {
  black: "#191a21",
  white: "#f8f8f2",
  grey: "#afb9c6",
  gray: "#afb9c6",
  red: "#ff3076",
  green: "#50fa7b",
  blue: "#6272a4",
  cyan: "#8be9fd",
  orange: "#ffbf36",
  pink: "#ff79c6",
  yellow: "#ffff36",
  purple: "#bd93f9",
};

export default {
  breakpoints: ["40em", "52em", "64em"],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  colors: {
    ...primaryPalette,
    bgMuted: primaryPalette.black,
    bg: "#282a36",
    bgEm: "#343746",

    textMuted: primaryPalette.blue,
    text: primaryPalette.purple,
    textEm: primaryPalette.cyan,
    accent: primaryPalette.green,
    accent2: primaryPalette.pink,

    hot: primaryPalette.orange,
    cold: primaryPalette.cyan,

    contrast: primaryPalette.white, // white on dark themes, dark on light themes

    sunny: primaryPalette.yellow,
    rainy: primaryPalette.cyan,

    "clear-day": primaryPalette.yellow,
    "clear-night": primaryPalette.white,
    rain: primaryPalette.cyan,
    snow: primaryPalette.white,
    sleet: primaryPalette.cyan,
    wind: primaryPalette.white,
    fog: primaryPalette.grey,
    cloudy: primaryPalette.white,
    "partly-cloudy-day": primaryPalette.orange,
    "partly-cloudy-night": primaryPalette.white,
    hail: primaryPalette.blue,
    thunderstorm: primaryPalette.yellow,
    tornado: primaryPalette.red,

    uvColor0: primaryPalette.green,
    uvColor1: primaryPalette.green,
    uvColor2: primaryPalette.green,
    uvColor3: primaryPalette.yellow,
    uvColor4: primaryPalette.yellow,
    uvColor5: primaryPalette.yellow,
    uvColor6: primaryPalette.orange,
    uvColor7: primaryPalette.orange,
    uvColor8: primaryPalette.red,
    uvColor9: primaryPalette.red,
    uvColor10: primaryPalette.red,
    uvColor11: primaryPalette.purple,
    uvColor12: primaryPalette.purple,
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256],
  fonts: {
    sans: "system-ui, sans-serif",
    mono: "Menlo, monospace",
  },
  shadows: {
    small: "0 0 4px rgba(0, 0, 0, .125)",
    large: "0 0 24px rgba(0, 0, 0, .125)",
  },
  // later?
  // fontWeights: 0,
  // lineHeights: 0,
  // letterSpacings: 0,
  // borders: 0,
  // radii: 0,
  // opacity: 0,
};
