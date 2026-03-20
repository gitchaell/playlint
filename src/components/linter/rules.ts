import type { ConfigEngine, EngineConfig } from './engines/types';
import { BiomeConfig } from './engines/biome';
import { PrettierConfig } from './engines/prettier';
import { ESLintConfig } from './engines/eslint';
import { OxlintConfig } from './engines/oxlint';
import { StylelintConfig } from './engines/stylelint';

export type { ConfigEngine, EngineConfig } from './engines/types';

export const ENGINES: Record<ConfigEngine, EngineConfig> = {
  Biome: BiomeConfig,
  Prettier: PrettierConfig,
  ESLint: ESLintConfig,
  Oxlint: OxlintConfig,
  Stylelint: StylelintConfig
};
