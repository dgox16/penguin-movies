const { nextui } = require("@nextui-org/react");
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            xs: "350px",
            ...defaultTheme.screens,
        },
        extend: {},
    },
    darkMode: "class",
    plugins: [
        nextui({
            addCommonColors: true,
            defaultTheme: "dark", // default theme from the themes object
            defaultExtendTheme: "dark", // default theme to extend on custom themes
        }),
    ],
};
