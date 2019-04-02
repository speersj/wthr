export interface Colors {
  [index: string]: string;
  black: string;
  blue: string;
  cyan: string;
  gray: string;
  green: string;
  grey: string;
  orange: string;
  pink: string;
  purple: string;
  red: string;
  white: string;
  yellow: string;
  bg: string;
  bgEm: string;
  bgMuted: string;

  textMuted: string;
  text: string;
  textEm: string;
  accent: string;
  accent2: string;

  hot: string;
  cold: string;

  contrast: string;

  sunny: string;
  rainy: string;

  "clear-day": string;
  "clear-night": string;
  rain: string;
  snow: string;
  sleet: string;
  wind: string;
  fog: string;
  cloudy: string;
  "partly-cloudy-day": string;
  "partly-cloudy-night": string;
  hail: string;
  thunderstorm: string;
  tornado: string;

  uvColor0: string;
  uvColor1: string;
  uvColor2: string;
  uvColor3: string;
  uvColor4: string;
  uvColor5: string;
  uvColor6: string;
  uvColor7: string;
  uvColor8: string;
  uvColor9: string;
  uvColor10: string;
  uvColor11: string;
  uvColor12: string;
}

export interface Theme {
  breakpoints: string[];
  colors: Colors;
  fontSizes: number[];
  space: number[];
  fonts: { sans: string; mono: string };
  shadows: { small: string; large: string };
}

export const primaryPalette = {
  black: "#191a21",
  blue: "#6272a4",
  cyan: "#8be9fd",
  gray: "#afb9c6",
  green: "#50fa7b",
  grey: "#afb9c6",
  orange: "#ffbf36",
  pink: "#ff79c6",
  purple: "#bd93f9",
  red: "#ff3076",
  white: "#f8f8f2",
  yellow: "#ffff36",
};

const theme: Theme = {
  breakpoints: ["40em", "52em", "64em"],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],

  colors: {
    ...primaryPalette,
    bg: "#282a36",
    bgEm: "#343746",
    bgMuted: primaryPalette.black,

    text: primaryPalette.purple,
    textEm: primaryPalette.cyan,
    textMuted: primaryPalette.blue,

    accent: primaryPalette.green,
    accent2: primaryPalette.pink,
    cold: primaryPalette.cyan,
    contrast: primaryPalette.white, // white on dark themes, dark on light themes
    hot: primaryPalette.orange,
    rainy: primaryPalette.cyan,
    sunny: primaryPalette.yellow,

    "clear-day": primaryPalette.yellow,
    "clear-night": primaryPalette.white,
    cloudy: primaryPalette.white,
    fog: primaryPalette.grey,
    hail: primaryPalette.blue,
    "partly-cloudy-day": primaryPalette.orange,
    "partly-cloudy-night": primaryPalette.white,
    rain: primaryPalette.cyan,
    sleet: primaryPalette.cyan,
    snow: primaryPalette.white,
    thunderstorm: primaryPalette.yellow,
    tornado: primaryPalette.red,
    wind: primaryPalette.white,

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

  fonts: {
    mono: "Menlo, monospace",
    sans: "system-ui, sans-serif",
  },

  shadows: {
    large: "0 0 24px rgba(0, 0, 0, .125)",
    small: "0 0 4px rgba(0, 0, 0, .125)",
  },

  space: [0, 4, 8, 16, 32, 64, 128, 256],
  // later?
  // fontWeights: 0,
  // lineHeights: 0,
  // letterSpacings: 0,
  // borders: 0,
  // radii: 0,
  // opacity: 0,
};

export default theme;
