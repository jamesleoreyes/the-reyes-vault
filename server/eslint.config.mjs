// @ts-check

import eslint from '@eslint/js';
import teslint from 'typescript-eslint';

export default teslint.config(
	// Globally ignore configuration files, node_modules, and dist
	{
		ignores: [
			'**/node_modules/**',
			'**/dist/**',
			'**/*.config.js', // Ignores eslint.config.js, prettier.config.js, etc.
			'**/*.config.cjs',
			'**/*.config.mjs',
		],
	},

	// ESLint recommended base rules (for JS files primarily)
	eslint.configs.recommended,

	// TypeScript ESLint recommended and strict rules that require type checking
	...teslint.configs.recommendedTypeChecked,
	...teslint.configs.strictTypeChecked,

	// Project-specific TypeScript linting configuration
	{
		files: ['src/**/*.ts'],
		languageOptions: {
			parser: teslint.parser,
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		plugins: {
			'@typescript-eslint': teslint.plugin,
		},
		rules: {
			// Enforce explicit semicolons
			semi: ['error'],
			// Enforce explicit return types on functions and class methods
			'@typescript-eslint/explicit-function-return-type': 'error',
			'@typescript-eslint/explicit-module-boundary-types': 'error',
			// Require explicit accessibility modifiers
			'@typescript-eslint/explicit-member-accessibility': [
				'error',
				{ overrides: { constructors: 'no-public' } },
			],
			// Enforce consistent type assertions
			'@typescript-eslint/consistent-type-assertions': [
				'error',
				{ assertionStyle: 'as', objectLiteralTypeAssertions: 'never' },
			],
			// Enforce consistent type definitions
			'@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
			// Enforce consistent type exports
			'@typescript-eslint/consistent-type-exports': [
				'error',
				{ fixMixedExportsWithInlineTypeSpecifier: true },
			],
			// Enforce consistent type imports
			'@typescript-eslint/consistent-type-imports': [
				'error',
				{ prefer: 'type-imports' },
			],
			// Enforce exhaustive switch statements
			'@typescript-eslint/switch-exhaustiveness-check': 'error',
			// Prevent unused variables and parameters
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_' },
			],
			// Prevent unnecessary type assertions
			'@typescript-eslint/no-unnecessary-type-assertion': 'error',
			// Prevent unsafe type assertions
			'@typescript-eslint/no-unsafe-member-access': 'error',
			'@typescript-eslint/no-unsafe-return': 'error',
			// Enforce proper promise handling
			'@typescript-eslint/no-floating-promises': 'error',
			'@typescript-eslint/await-thenable': 'error',
			// Enforce proper array typing
			'@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
			// Enforce proper naming conventions
			'@typescript-eslint/naming-convention': [
				'error',
				{ selector: 'interface', format: ['PascalCase'], prefix: ['I'] },
				{ selector: 'typeAlias', format: ['PascalCase'], suffix: ['Type'] },
				{ selector: 'enum', format: ['PascalCase'], suffix: ['Enum'] },
			],
		},
	},
);
