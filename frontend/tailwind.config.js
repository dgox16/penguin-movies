const { heroui } = require("@heroui/react");
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
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
		heroui({
			addCommonColors: true,
			defaultTheme: "dark",
			defaultExtendTheme: "dark",
		}),
	],
};
