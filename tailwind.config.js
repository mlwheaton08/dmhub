/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
		extend: {
			colors: {
				"clr-foreground": "var(--clr-foreground)",
				"clr-background": "var(--clr-background)",
				"clr-background-2": "var(--clr-background-2)",
				"clr-background-3": "var(--clr-background-3)",
				"clr-background-4": "var(--clr-background-4)",
				"clr-background-clear": "var(--clr-background-clear)",
				"clr-primary": "var(--clr-primary)",
				"clr-secondary": "var(--clr-secondary)",
				"clr-accent": "var(--clr-accent)"
			},
			height: {
				"nav-height": "var(--nav-height)",
				"screen-minus-nav-height": "var(--screen-minus-nav-height)"
			},
			width: {
				"dashNav-width": "var(--dashNav-width)"
			},
			margin: {
				"nav-height": "var(--nav-height)",
			},
		},
	},
	plugins: [],
}