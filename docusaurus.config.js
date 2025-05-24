// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '构建完美舞台需要我的牺牲离开',
  tagline: '(★≧▽^))★☆',
  favicon: 'img/logo.jpg',

  // 设置为你的 GitHub Pages URL
  url: 'https://ljzxl0721.github.io',
  // 设置为仓库名
  baseUrl: '/',
  
  organizationName: 'ljzxl0721', // 通常是你的 GitHub 用户名
  projectName: 'ljzxl0721.github.io', // 仓库名
  trailingSlash: false,
  
  // GitHub Pages 部署配置
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // 设置中文作为默认语言
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  // Add Font Awesome
  stylesheets: [
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Remove the "edit this page" links.
          editUrl: undefined,
        },
        blog: {
          showReadingTime: true,
          authorsMapPath: require.resolve('./blog/authors.yml'),
          editUrl: undefined,
          feedOptions: {
            type: ['rss', 'atom'],
            copyright: `Copyright © ${new Date().getFullYear()} My Website`,
          },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  // 添加客户端模块
  clientModules: [
    './src/js/clickEffects.js',
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/logo.jpg',
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: '无聊破站',
        logo: {
          alt: '网站Logo',
          src: 'img/logo.jpg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '文段符号',
          },
          {to: '/blog', label: '散笔胡言', position: 'left'},
          {to: '/gallery', label: '鬼图示众', position: 'left'},
          {to: '/chat', label: '人工智障', position: 'left'},
          {
            href: 'https://github.com/ljzxl0721',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [],
        copyright: `Copyright © ${new Date().getFullYear()} 俨梓`,
        logo: {
          src: 'img/logo.jpg',
          width: 20,
          height: 20,
          style: {
            marginRight: '10px',
            verticalAlign: 'middle'
          }
        }
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
