// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Elementary Audio Docs',
  tagline: 'Simplifying the way we write audio software',
  url: 'https://www.elementary.audio',
  baseUrl: '/docs/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'elemaudio', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  scripts: [
    {src: 'https://plausible.io/js/plausible.js', defer: true, 'data-domain': 'elementary.audio'}
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
        disableSwitch: false,
      },
      navbar: {
        title: 'Elementary Audio',
        logo: {
          alt: 'Elementary Audio Docs',
          src: 'img/Logo.svg',
          href: 'https://www.elementary.audio',
          target: '_self',
        },
        items: [
          {
            type: 'doc',
            docId: 'Introduction',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://github.com/elemaudio/docs',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://twitter.com/elemaudio',
            label: 'Twitter',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        logo: {
          alt: 'Elementary Audio Logo',
          src: 'img/Lockup_Dark.svg',
          href: 'https://www.elementary.audio',
        },
        copyright: `Copyright © ${new Date().getFullYear()} Elementary Audio, LLC. Built with Docusaurus.`,
      },
    }),
};

module.exports = config;
