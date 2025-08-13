import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends("next/core-web-vitals", "next/typescript"),
	{
		ignores: ["**/._*"],
	},
	{
		rules: {
			// Allow unescaped entities in JSX
			"react/no-unescaped-entities": "off",

			// Allow unused variables (make them warnings instead of errors)
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
				},
			],

			// Disable other strict rules that might cause build failures
			"react/display-name": "off",
			"react/prop-types": "off",
			"@typescript-eslint/no-explicit-any": "warn",
			"@typescript-eslint/ban-ts-comment": "warn",

			// Allow console statements in development
			"no-console": process.env.NODE_ENV === "production" ? "error" : "warn",

			// Prefer const assertions and explicit return types
			"prefer-const": "warn",

			// Allow empty functions
			"@typescript-eslint/no-empty-function": "off",

			// Allow any in some cases
			"@typescript-eslint/no-unsafe-assignment": "off",
			"@typescript-eslint/no-unsafe-member-access": "off",
			"@typescript-eslint/no-unsafe-call": "off",
			"@typescript-eslint/no-unsafe-return": "off",

			// Allow non-null assertions
			"@typescript-eslint/no-non-null-assertion": "warn",
		},
	},
	{
		files: ["**/*.ts", "**/*.tsx"],
		rules: {
			// TypeScript specific rules
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
				},
			],
		},
	},
	{
		files: ["**/*.js", "**/*.jsx"],
		rules: {
			// JavaScript specific rules
			"no-unused-vars": [
				"warn",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
				},
			],
		},
	},
];

export default eslintConfig;
