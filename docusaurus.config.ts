import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'AgentRun',
  tagline: 'Run Your Agent',
  // favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.agent.run',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // Load custom client scripts (e.g. insert alt captions for images)
  scripts: [{ src: '/js/show-img-alt.js', defer: true }],

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'serverless-devs', // Usually your GitHub org/user name.
  projectName: 'agentrun-docs', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: (args) => {
            return args.docPath.startsWith('api/python')
              ? `https://github.com/Serverless-Devs/agentrun-sdk-python/edit/main/${args.docPath
                  .replace('api/python/', 'agentrun/')
                  .replace('.md', '.py')}`
              : `https://github.com/Serverless-Devs/agentrun-docs/edit/main/docs/${args.docPath}`;
          },
          remarkPlugins: [
            [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
          ],
        },

        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    docs: {},
    navbar: {
      title: 'AgentRun',
      logo: {
        alt: 'AgentRun',
        src: 'img/logo.svg',
        href: 'https://www.agent.run',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '使用 AgentRun',
        },
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'sdkPythonSidebar',
        //   position: 'left',
        //   label: 'Python SDK',
        // },
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'sdkNodeJSSidebar',
        //   position: 'left',
        //   label: 'NodeJS SDK',
        // },

        {
          href: 'https://github.com/Serverless-Devs/agentrun-sdk-python',
          label: 'Python SDK',
          position: 'right',
          className: 'header-github-link',
        },
        {
          href: 'https://github.com/Serverless-Devs/agentrun-sdk-nodejs',
          label: 'NodeJS SDK',
          position: 'right',
          className: 'header-github-link',
        },
      ],
    },
    footer: {
      // style: 'dark',
      // links: [
      //   {
      //     title: 'Docs',
      //     items: [
      //       {
      //         label: 'Tutorial',
      //         to: '/docs/intro',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Community',
      //     items: [
      //       {
      //         label: 'Stack Overflow',
      //         href: 'https://stackoverflow.com/questions/tagged/docusaurus',
      //       },
      //       {
      //         label: 'Discord',
      //         href: 'https://discordapp.com/invite/docusaurus',
      //       },
      //       {
      //         label: 'X',
      //         href: 'https://x.com/docusaurus',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'More',
      //     items: [
      //       {
      //         label: 'Blog',
      //         to: '/blog',
      //       },
      //       {
      //         label: 'GitHub',
      //         href: 'https://github.com/facebook/docusaurus',
      //       },
      //     ],
      //   },
      // ],
      copyright: `Copyright © ${new Date().getFullYear()} <a target="_blank" href="https://functionai.console.aliyun.com/cn-hangzhou/agent/runtime/agent-list">AgentRun</a>. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash'],
      magicComments: [
        // Remember to extend the default highlight class name as well!
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: { start: 'highlight-start', end: 'highlight-end' },
        },
        {
          className: 'code-block-error-line',
          line: 'error-next-line',
          block: { start: 'error-start', end: 'error-end' },
        },
        {
          className: 'code-block-success-line',
          line: 'success-next-line',
          block: { start: 'success-start', end: 'success-end' },
        },
        {
          className: 'code-block-info-line',
          line: 'info-next-line',
          block: { start: 'info-start', end: 'info-end' },
        },
      ],
    },
    zoom: {
      selector: '.markdown img',
      background: {
        light: 'rgb(255, 255, 255)',
        dark: 'rgb(50, 50, 50)',
      },
      config: {
        // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
      },
    },
  } satisfies Preset.ThemeConfig,

  plugins: [
    './src/plugins/tailwind-config.js',
    './src/plugins/webpack-cache-config.js',
    'image-zoom',
    // [
    //   '@docusaurus/plugin-ideal-image',
    //   {
    //     quality: 70,
    //     max: 1030, // max resized image's size.
    //     min: 640, // min resized image's size. if original is lower, use that size.
    //     steps: 2, // the max number of images generated between min and max (inclusive)
    //     disableInDev: false,
    //   },
    // ],
  ],
};

export default config;
