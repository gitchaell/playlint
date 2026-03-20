import type { EngineConfig } from './types';
import { PrettierIcon } from '../icons/PrettierIcon';

export const PrettierConfig: EngineConfig = {
  name: 'Prettier',
  icon: PrettierIcon,
  defaultFileName: '.prettierrc',
  versions: [
    {
      id: '2.x',
      label: 'v2.x',
      defaultState: {
        printWidth: 80,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: false,
        quoteProps: 'as-needed',
        jsxSingleQuote: false,
        trailingComma: 'es5',
        bracketSpacing: true,
        jsxBracketSameLine: false,
        arrowParens: 'always',
        endOfLine: 'lf'
      }
    },
    {
      id: '3.x',
      label: 'v3.x (Latest)',
      defaultState: {
        printWidth: 80,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: false,
        quoteProps: 'as-needed',
        jsxSingleQuote: false,
        trailingComma: 'all',
        bracketSpacing: true,
        bracketSameLine: false,
        arrowParens: 'always',
        endOfLine: 'lf',
        singleAttributePerLine: false,
      }
    }
  ],
  rules: [
    {
      id: 'printWidth',
      titleKey: 'Print Width',
      descriptionKey: 'Specify the line length that the printer will wrap on.',
      type: 'number'
    },
    {
      id: 'tabWidth',
      titleKey: 'Tab Width',
      descriptionKey: 'Specify the number of spaces per indentation-level.',
      type: 'number'
    },
    {
      id: 'useTabs',
      titleKey: 'Tabs vs. Spaces',
      descriptionKey: 'Indent lines with tabs instead of spaces.',
      type: 'boolean',
      options: [
        { label: 'Tabs', value: true },
        { label: 'Spaces', value: false }
      ],
      previewBefore: `function init() {\n    console.log('hi');\n}`,
      previewAfterMap: {
        'true': `function init() {\n\tconsole.log('hi');\n}`,
        'false': `function init() {\n  console.log('hi');\n}`
      }
    },
    {
      id: 'semi',
      titleKey: 'Semicolons',
      descriptionKey: 'Print semicolons at the ends of statements.',
      type: 'boolean',
      options: [
        { label: 'Always', value: true },
        { label: 'Never', value: false }
      ],
      previewBefore: `const a = 1\nconst b = 2`,
      previewAfterMap: {
        'true': `const a = 1;\nconst b = 2;`,
        'false': `const a = 1\nconst b = 2`
      }
    },
    {
      id: 'singleQuote',
      titleKey: 'Quotes',
      descriptionKey: 'Use single quotes instead of double quotes.',
      type: 'boolean',
      options: [
        { label: 'Single', value: true },
        { label: 'Double', value: false }
      ],
      previewBefore: `const msg = "hello world";`,
      previewAfterMap: {
        'true': `const msg = 'hello world';`,
        'false': `const msg = "hello world";`
      }
    },
    {
      id: 'quoteProps',
      titleKey: 'Quote Props',
      descriptionKey: 'Change when properties in objects are quoted.',
      type: 'select',
      options: [
        { label: 'As Needed', value: 'as-needed' },
        { label: 'Consistent', value: 'consistent' },
        { label: 'Preserve', value: 'preserve' }
      ],
      previewBefore: `const obj = { "a": 1, b: 2 };`,
      previewAfterMap: {
        'as-needed': `const obj = { a: 1, b: 2 };`,
        'consistent': `const obj = { "a": 1, "b": 2 };`,
        'preserve': `const obj = { "a": 1, b: 2 };`
      }
    },
    {
      id: 'jsxSingleQuote',
      titleKey: 'JSX Quotes',
      descriptionKey: 'Use single quotes instead of double quotes in JSX.',
      type: 'boolean',
      options: [
        { label: 'Single', value: true },
        { label: 'Double', value: false }
      ],
      previewBefore: `<div className="test" />`,
      previewAfterMap: {
        'true': `<div className='test' />`,
        'false': `<div className="test" />`
      }
    },
    {
      id: 'trailingComma',
      titleKey: 'Trailing Commas',
      descriptionKey: 'Print trailing commas wherever possible in multi-line comma-separated syntactic structures.',
      type: 'select',
      options: [
        { label: 'All', value: 'all' },
        { label: 'ES5', value: 'es5' },
        { label: 'None', value: 'none' }
      ],
      previewBefore: `const obj = {\n  a: 1,\n  b: 2\n};`,
      previewAfterMap: {
        'all': `const obj = {\n  a: 1,\n  b: 2,\n};`,
        'es5': `const obj = {\n  a: 1,\n  b: 2,\n};`,
        'none': `const obj = {\n  a: 1,\n  b: 2\n};`
      }
    },
    {
      id: 'bracketSpacing',
      titleKey: 'Bracket Spacing',
      descriptionKey: 'Print spaces between brackets in object literals.',
      type: 'boolean',
      options: [
        { label: 'True', value: true },
        { label: 'False', value: false }
      ],
      previewBefore: `const obj = {foo: bar};`,
      previewAfterMap: {
        'true': `const obj = { foo: bar };`,
        'false': `const obj = {foo: bar};`
      }
    },
    {
      id: 'bracketSameLine',
      titleKey: 'Bracket Line',
      descriptionKey: 'Put the > of a multi-line element at the end of the last line.',
      type: 'boolean',
      supportedVersions: ['3.x'],
      options: [
        { label: 'True', value: true },
        { label: 'False', value: false }
      ],
      previewBefore: `<button\n  className="btn"\n>\n  Click\n</button>`,
      previewAfterMap: {
        'true': `<button\n  className="btn">\n  Click\n</button>`,
        'false': `<button\n  className="btn"\n>\n  Click\n</button>`
      }
    },
    {
      id: 'jsxBracketSameLine',
      titleKey: 'JSX Brackets',
      descriptionKey: 'Put the > of a multi-line JSX element at the end of the last line.',
      type: 'boolean',
      supportedVersions: ['2.x'],
      options: [
        { label: 'True', value: true },
        { label: 'False', value: false }
      ],
      previewBefore: `<button\n  className="btn"\n>\n  Click\n</button>`,
      previewAfterMap: {
        'true': `<button\n  className="btn">\n  Click\n</button>`,
        'false': `<button\n  className="btn"\n>\n  Click\n</button>`
      }
    },
    {
      id: 'arrowParens',
      titleKey: 'Arrow Function Parentheses',
      descriptionKey: 'Include parentheses around a sole arrow function parameter.',
      type: 'select',
      options: [
        { label: 'Always', value: 'always' },
        { label: 'Avoid', value: 'avoid' }
      ],
      previewBefore: `const foo = x => x;`,
      previewAfterMap: {
        'always': `const foo = (x) => x;`,
        'avoid': `const foo = x => x;`
      }
    },
    {
      id: 'singleAttributePerLine',
      titleKey: 'Single Attribute Per Line',
      descriptionKey: 'Enforce single attribute per line in HTML, Vue, and JSX.',
      type: 'boolean',
      supportedVersions: ['3.x'],
      options: [
        { label: 'True', value: true },
        { label: 'False', value: false }
      ],
      previewBefore: `<div class="a" id="b" />`,
      previewAfterMap: {
        'true': `<div\n  class="a"\n  id="b"\n/>`,
        'false': `<div class="a" id="b" />`
      }
    }
  ]
};
