import type { EngineConfig } from './types';
import { OxlintIcon } from '../icons/OxlintIcon';

export const OxlintConfig: EngineConfig = {
  name: 'Oxlint',
  icon: OxlintIcon,
  defaultFileName: 'oxlint.json',
  versions: [
    {
      id: 'latest',
      label: 'Latest',
      defaultState: {
        categories: {
          correctness: 'error',
          suspicious: 'warn',
          pedantic: 'warn',
          style: 'off'
        },
        rules: {
          'no-console': 'warn',
          'no-debugger': 'error',
          'eqeqeq': 'error'
        }
      }
    }
  ],
  rules: [
    {
      id: 'categories.correctness',
      titleKey: 'Correctness',
      descriptionKey: 'Rules that detect code that is likely to be incorrect.',
      type: 'select',
      options: [
        { label: 'Error', value: 'error' },
        { label: 'Warn', value: 'warn' },
        { label: 'Off', value: 'off' }
      ]
    },
    {
      id: 'categories.suspicious',
      titleKey: 'Suspicious',
      descriptionKey: 'Rules that detect code that is likely to be a mistake.',
      type: 'select',
      options: [
        { label: 'Error', value: 'error' },
        { label: 'Warn', value: 'warn' },
        { label: 'Off', value: 'off' }
      ]
    },
    {
      id: 'categories.pedantic',
      titleKey: 'Pedantic',
      descriptionKey: 'Rules that are very strict and may produce false positives.',
      type: 'select',
      options: [
        { label: 'Error', value: 'error' },
        { label: 'Warn', value: 'warn' },
        { label: 'Off', value: 'off' }
      ]
    },
    {
      id: 'categories.style',
      titleKey: 'Style',
      descriptionKey: 'Rules that enforce coding style.',
      type: 'select',
      options: [
        { label: 'Error', value: 'error' },
        { label: 'Warn', value: 'warn' },
        { label: 'Off', value: 'off' }
      ]
    },
    {
      id: 'rules.no-console',
      titleKey: 'No Console',
      descriptionKey: 'Disallow the use of console.',
      type: 'select',
      options: [
        { label: 'Error', value: 'error' },
        { label: 'Warn', value: 'warn' },
        { label: 'Off', value: 'off' }
      ],
      previewBefore: `console.log("hello");`,
      previewAfterMap: {
        'error': `console.log("hello"); // ❌ Error`,
        'warn': `console.log("hello"); // ⚠️ Warning`,
        'off': `console.log("hello"); // ✅ Ignored`
      }
    },
    {
      id: 'rules.eqeqeq',
      titleKey: 'Require ===',
      descriptionKey: 'Require the use of === and !==',
      type: 'select',
      options: [
        { label: 'Error', value: 'error' },
        { label: 'Warn', value: 'warn' },
        { label: 'Off', value: 'off' }
      ],
      previewBefore: `if (x == 42) { }`,
      previewAfterMap: {
        'error': `if (x === 42) { }`,
        'warn': `if (x === 42) { }`,
        'off': `if (x == 42) { }`
      }
    }
  ]
};
