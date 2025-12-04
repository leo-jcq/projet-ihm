import pluginVue from 'eslint-plugin-vue';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import vueParser from 'vue-eslint-parser';

export default defineConfig([
    ...pluginVue.configs['flat/recommended'],
    {
        rules: {
            'vue/max-attributes-per-line': 'off',
            'vue/html-indent': ['error', 4],
            'vue/html-self-closing': [
                'error',
                {
                    html: {
                        void: 'always'
                    }
                }
            ],
            'vue/singleline-html-element-content-newline': 'off',
            'vue/multi-word-component-names': 'off'
        },
        languageOptions: {
            sourceType: 'module',
            globals: globals.browser,
            parser: vueParser,
            parserOptions: {
                parser: tsParser,
                ecmaVersion: 2020,
                sourceType: 'module',
                extraFileExtensions: ['.vue']
            }
        }
    }
]);
