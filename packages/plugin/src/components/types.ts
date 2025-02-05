import type { ExtractPropTypes } from 'vue';

export const demosProps = {
  src: {
    type: String,
    required: true,
  },
  rawSource: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  files: {
    type: String,
    required: true,
  },
  isFile: {
    type: Boolean,
    required: true,
  },
} as const;
export const codeProps = {
  modelValue: {
    type: Number,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  rawSource: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  files: {
    type: Array,
    required: true,
  },
} as const;
export const codeEmits = {
  'update:modelValue': (value: number) => typeof value === 'number',
};
export type DemosProps = ExtractPropTypes<typeof demosProps>;
export type CodeProps = ExtractPropTypes<typeof codeProps>;
