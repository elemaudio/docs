// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Elementary Audio Docs',
  tagline: 'Simplifying the way we write audio software',
  url: 'https://docs.elementary.audio',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'elemaudio', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  scripts: [
    {src: 'https://plausible.io/js/plausible.js', defer: true, 'data-domain': 'docs.elementary.audio'}
  ],

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          editUrl: 'https://github.com/elemaudio/docs/edit/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
      },
      navbar: {
        title: 'Elementary Audio',
        logo: {
          alt: 'Elementary Audio Docs',
          src: 'img/Logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'Intro',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://github.com/elemaudio/docs',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        logo: {
          alt: 'Elementary Audio Logo',
          src: 'img/Lockup_Dark.svg',
          href: '/',
        },
        copyright: `Copyright © ${new Date().getFullYear()} Elementary Audio, LLC. Built with Docusaurus.`,
      },
    }),
};

module.exports = config;
