import type { EngineConfig } from './types';
import { BiomeIcon } from '../icons/BiomeIcon';

export const BiomeConfig: EngineConfig = {
  name: 'Biome',
  icon: BiomeIcon,
  defaultFileName: 'biome.json',
  versions: [
    {
      id: '1.x',
      label: 'v1.x',
      defaultState: {
        formatter: { enabled: true, indentStyle: 'tab', indentWidth: 2, lineWidth: 80 },
        javascript: { formatter: { quoteStyle: 'double', trailingComma: 'all', semicolons: 'always' } },
        linter: { enabled: true, rules: { recommended: true } }
      }
    },
    {
      id: '2.x',
      label: 'v2.x (Latest)',
      defaultState: {
        formatter: { enabled: true, indentStyle: 'tab', indentWidth: 2, lineWidth: 80, attributePosition: 'auto' },
        javascript: { formatter: { quoteStyle: 'double', jsxQuoteStyle: 'double', quoteProperties: 'asNeeded', trailingCommas: 'all', semicolons: 'always', arrowParentheses: 'always', bracketSpacing: true, bracketSameLine: false } },
        linter: { enabled: true, rules: { recommended: true } }
      }
    }
  ],
  rules: [
    {
      id: 'formatter.indentStyle',
      titleKey: 'Indent Style',
      descriptionKey: 'The indent style.',
      type: 'select',
      options: [
        { label: 'Tab', value: 'tab' },
        { label: 'Space', value: 'space' }
      ],
      previewBefore: `function init() {\n    console.log('hi');\n}`,
      previewAfterMap: {
        'tab': `function init() {\n\tconsole.log('hi');\n}`,
        'space': `function init() {\n  console.log('hi');\n}`
      }
    },
    {
      id: 'formatter.indentWidth',
      titleKey: 'Indent Width',
      descriptionKey: 'The size of the indentation.',
      type: 'number'
    },
    {
      id: 'formatter.lineWidth',
      titleKey: 'Line Width',
      descriptionKey: 'What\'s the max width of a line.',
      type: 'number'
    },
    {
      id: 'formatter.attributePosition',
      titleKey: 'Attribute Position',
      descriptionKey: 'The attribute position style.',
      type: 'select',
      supportedVersions: ['2.x'],
      options: [
        { label: 'Auto', value: 'auto' },
        { label: 'Multiline', value: 'multiline' }
      ],
      previewBefore: `<div class="a" id="b" />`,
      previewAfterMap: {
        'auto': `<div class="a" id="b" />`,
        'multiline': `<div\n  class="a"\n  id="b"\n/>`
      }
    },
    {
      id: 'javascript.formatter.quoteStyle',
      titleKey: 'Quote Style',
      descriptionKey: 'The type of quotes used in JavaScript code.',
      type: 'select',
      options: [
        { label: 'Double', value: 'double' },
        { label: 'Single', value: 'single' }
      ],
      previewBefore: `const msg = "hello world";`,
      previewAfterMap: {
        'single': `const msg = 'hello world';`,
        'double': `const msg = "hello world";`
      }
    },
    {
      id: 'javascript.formatter.jsxQuoteStyle',
      titleKey: 'JSX Quote Style',
      descriptionKey: 'The type of quotes used in JSX.',
      type: 'select',
      supportedVersions: ['2.x'],
      options: [
        { label: 'Double', value: 'double' },
        { label: 'Single', value: 'single' }
      ],
      previewBefore: `<div className="test" />`,
      previewAfterMap: {
        'single': `<div className='test' />`,
        'double': `<div className="test" />`
      }
    },
    {
      id: 'javascript.formatter.quoteProperties',
      titleKey: 'Quote Properties',
      descriptionKey: 'When properties in objects are quoted.',
      type: 'select',
      supportedVersions: ['2.x'],
      options: [
        { label: 'As Needed', value: 'asNeeded' },
        { label: 'Preserve', value: 'preserve' }
      ],
      previewBefore: `const obj = { "a": 1, b: 2 };`,
      previewAfterMap: {
        'asNeeded': `const obj = { a: 1, b: 2 };`,
        'preserve': `const obj = { "a": 1, b: 2 };`
      }
    },
    {
      id: 'javascript.formatter.trailingCommas',
      titleKey: 'Trailing Commas',
      descriptionKey: 'Print trailing commas wherever possible.',
      type: 'select',
      supportedVersions: ['2.x'],
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
      id: 'javascript.formatter.semicolons',
      titleKey: 'Semicolons',
      descriptionKey: 'Whether the formatter prints semicolons.',
      type: 'select',
      options: [
        { label: 'Always', value: 'always' },
        { label: 'As Needed', value: 'asNeeded' }
      ],
      previewBefore: `const a = 1\nconst b = 2`,
      previewAfterMap: {
        'always': `const a = 1;\nconst b = 2;`,
        'asNeeded': `const a = 1\nconst b = 2`
      }
    },
    {
      id: 'javascript.formatter.arrowParentheses',
      titleKey: 'Arrow Parentheses',
      descriptionKey: 'Whether to add non-necessary parentheses to arrow functions.',
      type: 'select',
      supportedVersions: ['2.x'],
      options: [
        { label: 'Always', value: 'always' },
        { label: 'As Needed', value: 'asNeeded' }
      ],
      previewBefore: `const foo = x => x;`,
      previewAfterMap: {
        'always': `const foo = (x) => x;`,
        'asNeeded': `const foo = x => x;`
      }
    },
    {
      id: 'javascript.formatter.bracketSpacing',
      titleKey: 'Bracket Spacing',
      descriptionKey: 'Whether to insert spaces around brackets in object literals.',
      type: 'boolean',
      supportedVersions: ['2.x'],
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
      id: 'javascript.formatter.bracketSameLine',
      titleKey: 'Bracket Same Line',
      descriptionKey: 'Whether to hug the closing bracket of multiline HTML/JSX tags to the end of the last line.',
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
    }
  ]
};
