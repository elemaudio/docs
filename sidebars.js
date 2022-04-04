// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
  docs: [
    'Introduction',
    'Examples',
    'In_Depth',
    'Migrating_to_v1',
    'Changelog',
    {
      type: 'category',
      label: 'Packages',
      collapsed: false,
      items: [
        'packages/core',
        'packages/web-renderer',
        'packages/node-renderer',
        'packages/plugin-renderer',
        'packages/offline-renderer',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      collapsed: false,
      items: [
        'guides/Making_Sound',
        'guides/Understanding_Keys',
        'guides/Writing_Reusable_Components',
        'guides/Sample_Accurate_Rendering',
      ],
    },
    {
      type: 'category',
      label: 'API',
      collapsed: false,
      items: [
        'api/Index',
        'api/TopLevel',
        'api/Midi',
        {
          type: 'category',
          label: 'Reference',
          items: [{
            type: 'autogenerated',
            dirName: 'api/reference',
          }],
        },
      ],
    },
  ],
};

module.exports = sidebars;
