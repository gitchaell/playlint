import { StylelintIcon } from '../icons/StylelintIcon';
import type { EngineConfig } from './types';

export const StylelintConfig: EngineConfig = {
	name: 'Stylelint',
	icon: StylelintIcon,
	defaultFileName: '.stylelintrc.json',
	versions: [
		{
			id: 'latest',
			label: 'Latest',
			defaultState: {
				extends: ['stylelint-config-standard'],
				rules: {
					'color-hex-case': 'lower',
					'color-hex-length': 'short',
					'block-no-empty': true,
					'declaration-block-no-duplicate-properties': true,
					'unit-allowed-list': [
						'em',
						'rem',
						's',
						'px',
						'deg',
						'all',
						'vh',
						'vw',
						'%',
					],
					'font-family-name-quotes': 'always-where-recommended',
					'function-url-quotes': 'always',
				},
			},
		},
	],
	rules: [
		{
			id: 'rules.color-hex-case',
			titleKey: 'Hex Color Case',
			descriptionKey: 'Specify lowercase or uppercase for hex colors.',
			type: 'select',
			options: [
				{ label: 'Lower', value: 'lower' },
				{ label: 'Upper', value: 'upper' },
			],
			previewBefore: `a { color: #FFF; }`,
			previewAfterMap: {
				lower: `a { color: #fff; }`,
				upper: `a { color: #FFF; }`,
			},
		},
		{
			id: 'rules.color-hex-length',
			titleKey: 'Hex Color Length',
			descriptionKey: 'Specify short or long notation for hex colors.',
			type: 'select',
			options: [
				{ label: 'Short', value: 'short' },
				{ label: 'Long', value: 'long' },
			],
			previewBefore: `a { color: #ffffff; }`,
			previewAfterMap: {
				short: `a { color: #fff; }`,
				long: `a { color: #ffffff; }`,
			},
		},
		{
			id: 'rules.block-no-empty',
			titleKey: 'No Empty Blocks',
			descriptionKey: 'Disallow empty blocks.',
			type: 'boolean',
			options: [
				{ label: 'True', value: true },
				{ label: 'False', value: false },
			],
			previewBefore: `a { }`,
			previewAfterMap: {
				true: `a { } /* ❌ Error */`,
				false: `a { } /* ✅ Ignored */`,
			},
		},
		{
			id: 'rules.declaration-block-no-duplicate-properties',
			titleKey: 'No Duplicate Properties',
			descriptionKey:
				'Disallow duplicate properties within declaration blocks.',
			type: 'boolean',
			options: [
				{ label: 'True', value: true },
				{ label: 'False', value: false },
			],
			previewBefore: `a { color: red; color: blue; }`,
			previewAfterMap: {
				true: `a { color: red; color: blue; } /* ❌ Error */`,
				false: `a { color: red; color: blue; } /* ✅ Ignored */`,
			},
		},
		{
			id: 'rules.font-family-name-quotes',
			titleKey: 'Font Family Quotes',
			descriptionKey: 'Specify quotes for font family names.',
			type: 'select',
			options: [
				{ label: 'Always', value: 'always-where-recommended' },
				{ label: 'Always where required', value: 'always-where-required' },
			],
			previewBefore: `a { font-family: Arial, sans-serif; }`,
			previewAfterMap: {
				'always-where-recommended': `a { font-family: "Arial", sans-serif; }`,
				'always-where-required': `a { font-family: Arial, sans-serif; }`,
			},
		},
		{
			id: 'rules.function-url-quotes',
			titleKey: 'URL Quotes',
			descriptionKey: 'Require or disallow quotes for urls.',
			type: 'select',
			options: [
				{ label: 'Always', value: 'always' },
				{ label: 'Never', value: 'never' },
			],
			previewBefore: `a { background: url(image.png); }`,
			previewAfterMap: {
				always: `a { background: url("image.png"); }`,
				never: `a { background: url(image.png); }`,
			},
		},
	],
};
