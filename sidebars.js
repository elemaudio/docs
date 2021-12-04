// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
  docs: [
    'Getting_Started',
    {
      type: 'category',
      label: 'Targets',
      collapsed: false,
      items: [
        'targets/Nodejs',
        'targets/Plugin',
        'targets/WebAudio',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      collapsed: false,
      items: [
        'guides/Making_Sound',
        'guides/Native_Rendering',
        'guides/Sample_Accurate_Rendering',
        'guides/Understanding_Keys',
        'guides/Writing_Reusable_Components',
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
