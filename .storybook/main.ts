import type { StorybookConfig } from "@storybook/react-webpack5";
import path from "path";

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
  webpackFinal: async (config) => { 
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
      }
    }
    return config;
  },
};
export default config;
