import { BiomeConfig } from './engines/biome';
import { ESLintConfig } from './engines/eslint';
import { OxlintConfig } from './engines/oxlint';
import { PrettierConfig } from './engines/prettier';
import { StylelintConfig } from './engines/stylelint';
import type { ConfigEngine, EngineConfig } from './engines/types';

export type { ConfigEngine, EngineConfig } from './engines/types';

export const ENGINES: Record<ConfigEngine, EngineConfig> = {
	Biome: BiomeConfig,
	Prettier: PrettierConfig,
	ESLint: ESLintConfig,
	Oxlint: OxlintConfig,
	Stylelint: StylelintConfig,
};
