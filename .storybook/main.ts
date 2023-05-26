import type { StorybookConfig } from "@storybook/react-webpack5";
import path from "path";
import customWebpackConfig from "../config-override"
import { log } from "console";
const { removeModuleScopePlugin, override } = require('customize-cra');

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  core: {
    builder: {
      name: '@storybook/builder-webpack5',
      options: {
        fsCache: true,
        lazyCompilation: true,
      },
    },
  },
  staticDirs: ["../public"],
  webpackFinal: config => {
    const destinationPath = path.resolve(__dirname, '../chartmetric-web-app');
    const addExternalPath = rules => {
      for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];
        if (rule.test && RegExp(rule.test).test('.tsx')) {
          if (rule.include?.length) rule.include.push(destinationPath);
          else rule.include = destinationPath;
        } else if (rule.oneOf) {
          addExternalPath(rule.oneOf);
        }
      }
    };

    addExternalPath(config.module?.rules);

    return {
      ...config,
      resolve: {
        ...config.resolve, 
        alias: {
          ...config.resolve?.alias,
          '@': path.resolve(__dirname, '../src/'),
          "@chartmetric": path.resolve(__dirname, "../chartmetric-web-app/"),
          "@component": path.resolve(__dirname, "../chartmetric-web-app/components/"),
          "@sharedComponents": path.resolve(__dirname, "../chartmetric-web-app/components/shared/"),
        }
      },
    };
  },
};
export default config;
