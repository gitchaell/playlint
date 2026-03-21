import { ESLintIcon } from '../icons/ESLintIcon';
import type { EngineConfig } from './types';

export const ESLintConfig: EngineConfig = {
	name: 'ESLint',
	icon: ESLintIcon,
	defaultFileName: '.eslintrc.json',
	versions: [
		{
			id: '8.x',
			label: 'v8.x (Legacy)',
			defaultState: {
				env: { browser: true, es2021: true },
				extends: ['eslint:recommended'],
				parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
				rules: {
					semi: ['error', 'always'],
					quotes: ['error', 'double'],
					eqeqeq: ['error', 'always'],
					'no-unused-vars': 'warn',
					'no-console': 'off',
					curly: ['error', 'all'],
					'brace-style': ['error', '1tbs'],
				},
			},
		},
		{
			id: '9.x',
			label: 'v9.x (Latest)',
			defaultState: {
				languageOptions: {
					ecmaVersion: 'latest',
					sourceType: 'module',
				},
				rules: {
					semi: ['error', 'always'],
					quotes: ['error', 'double'],
					eqeqeq: ['error', 'always'],
					'no-unused-vars': 'warn',
					'no-console': 'off',
					curly: ['error', 'all'],
					'brace-style': ['error', '1tbs'],
				},
			},
		},
	],
	rules: [
		{
			id: 'rules.semi.1',
			titleKey: 'Semicolons',
			descriptionKey: 'Require or disallow semicolons instead of ASI.',
			type: 'select',
			options: [
				{ label: 'Always', value: 'always' },
				{ label: 'Never', value: 'never' },
			],
			previewBefore: `const a = 1\nconst b = 2`,
			previewAfterMap: {
				always: `const a = 1;\nconst b = 2;`,
				never: `const a = 1\nconst b = 2`,
			},
		},
		{
			id: 'rules.quotes.1',
			titleKey: 'Quotes',
			descriptionKey:
				'Enforce the consistent use of either backticks, double, or single quotes.',
			type: 'select',
			options: [
				{ label: 'Double', value: 'double' },
				{ label: 'Single', value: 'single' },
				{ label: 'Backtick', value: 'backtick' },
			],
			previewBefore: `const msg = "hello world";`,
			previewAfterMap: {
				single: `const msg = 'hello world';`,
				double: `const msg = "hello world";`,
				backtick: 'const msg = `hello world`;',
			},
		},
		{
			id: 'rules.eqeqeq.1',
			titleKey: 'Require === and !==',
			descriptionKey: 'Require the use of === and !==',
			type: 'select',
			options: [
				{ label: 'Always', value: 'always' },
				{ label: 'Smart', value: 'smart' },
			],
			previewBefore: `if (x == 42) { }`,
			previewAfterMap: {
				always: `if (x === 42) { }`,
				smart: `if (x === 42) { }`, // Smart allows null comparisons
			},
		},
		{
			id: 'rules.no-unused-vars',
			titleKey: 'No Unused Variables',
			descriptionKey: 'Disallow unused variables.',
			type: 'select',
			options: [
				{ label: 'Error', value: 'error' },
				{ label: 'Warn', value: 'warn' },
				{ label: 'Off', value: 'off' },
			],
			previewBefore: `const x = 10;\n// x is never used`,
			previewAfterMap: {
				error: `const x = 10; // ❌ Error`,
				warn: `const x = 10; // ⚠️ Warning`,
				off: `const x = 10; // ✅ Ignored`,
			},
		},
		{
			id: 'rules.no-console',
			titleKey: 'No Console',
			descriptionKey: 'Disallow the use of console.',
			type: 'select',
			options: [
				{ label: 'Error', value: 'error' },
				{ label: 'Warn', value: 'warn' },
				{ label: 'Off', value: 'off' },
			],
			previewBefore: `console.log("hello");`,
			previewAfterMap: {
				error: `console.log("hello"); // ❌ Error`,
				warn: `console.log("hello"); // ⚠️ Warning`,
				off: `console.log("hello"); // ✅ Ignored`,
			},
		},
		{
			id: 'rules.curly.1',
			titleKey: 'Enforce Curly Braces',
			descriptionKey:
				'Enforce consistent brace style for all control statements.',
			type: 'select',
			options: [
				{ label: 'All', value: 'all' },
				{ label: 'Multi', value: 'multi' },
				{ label: 'Multi-line', value: 'multi-line' },
			],
			previewBefore: `if (foo) foo++;`,
			previewAfterMap: {
				all: `if (foo) {\n  foo++;\n}`,
				multi: `if (foo) foo++;`,
				'multi-line': `if (foo) foo++;`,
			},
		},
		{
			id: 'rules.brace-style.1',
			titleKey: 'Brace Style',
			descriptionKey: 'Enforce consistent brace style for blocks.',
			type: 'select',
			options: [
				{ label: '1TBS', value: '1tbs' },
				{ label: 'Stroustrup', value: 'stroustrup' },
				{ label: 'Allman', value: 'allman' },
			],
			previewBefore: `if (foo) {\n  bar();\n}\nelse {\n  baz();\n}`,
			previewAfterMap: {
				'1tbs': `if (foo) {\n  bar();\n} else {\n  baz();\n}`,
				stroustrup: `if (foo) {\n  bar();\n}\nelse {\n  baz();\n}`,
				allman: `if (foo)\n{\n  bar();\n}\nelse\n{\n  baz();\n}`,
			},
		},
		{
			id: 'rules.no-async-promise-executor',
			titleKey: 'No Async Promise Executor',
			descriptionKey: 'Disallow using an async function as a Promise executor.',
			type: 'select',
			options: [
				{ label: 'Error', value: 'error' },
				{ label: 'Warn', value: 'warn' },
				{ label: 'Off', value: 'off' },
			],
			previewBefore: `const result = new Promise(async (resolve, reject) => {\n  resolve(await foo);\n});`,
			previewAfterMap: {
				error: `const result = new Promise(async (resolve, reject) => {\n  resolve(await foo);\n}); // ❌ Error`,
				warn: `const result = new Promise(async (resolve, reject) => {\n  resolve(await foo);\n}); // ⚠️ Warning`,
				off: `const result = new Promise(async (resolve, reject) => {\n  resolve(await foo);\n}); // ✅ Ignored`,
			},
		},
		{
			id: 'rules.getter-return',
			titleKey: 'Getter Return',
			descriptionKey:
				'Enforce that a return statement is present in property getters.',
			type: 'select',
			options: [
				{ label: 'Error', value: 'error' },
				{ label: 'Warn', value: 'warn' },
				{ label: 'Off', value: 'off' },
			],
			previewBefore: `const p = {\n  get name(){\n    // no returns.\n  }\n};`,
			previewAfterMap: {
				error: `const p = {\n  get name(){\n    // no returns.\n  }\n}; // ❌ Error`,
				warn: `const p = {\n  get name(){\n    // no returns.\n  }\n}; // ⚠️ Warning`,
				off: `const p = {\n  get name(){\n    // no returns.\n  }\n}; // ✅ Ignored`,
			},
		},
		{
			id: 'rules.for-direction',
			titleKey: 'For Direction',
			descriptionKey:
				'Enforce for loop update clause moving the counter in the right direction.',
			type: 'select',
			options: [
				{ label: 'Error', value: 'error' },
				{ label: 'Warn', value: 'warn' },
				{ label: 'Off', value: 'off' },
			],
			previewBefore: `for (let i = 0; i < 10; i--) {\n}`,
			previewAfterMap: {
				error: `for (let i = 0; i < 10; i--) {\n} // ❌ Error`,
				warn: `for (let i = 0; i < 10; i--) {\n} // ⚠️ Warning`,
				off: `for (let i = 0; i < 10; i--) {\n} // ✅ Ignored`,
			},
		},
	],
};
