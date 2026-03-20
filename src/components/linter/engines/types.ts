import type { ReactNode } from 'react';

export type ConfigEngine = 'Biome' | 'Prettier' | 'ESLint' | 'Oxlint' | 'Stylelint';

export interface RuleOption {
  label: string;
  value: any;
}

export interface ConfigRule {
  id: string; // The path to the setting, e.g., 'formatter.indentStyle'
  titleKey: string; // translation key or fallback string
  descriptionKey?: string;
  type: 'select' | 'boolean' | 'number';
  options?: RuleOption[]; // Used if type is select or boolean
  // Two snippets to show before -> after
  previewBefore?: string;
  previewAfterMap?: Record<string, string>; // Maps option value to 'after' snippet
  supportedVersions?: string[]; // E.g., ['v2.x', 'v3.x'] -> if undefined, applies to all
}

export interface EngineVersion {
  id: string;
  label: string;
  defaultState: any;
}

export interface EngineConfig {
  name: ConfigEngine;
  icon: any; // React Component
  defaultFileName: string;
  versions: EngineVersion[];
  rules: ConfigRule[];
}
