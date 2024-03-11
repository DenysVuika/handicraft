/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
module.exports = {
  title: 'webStencils',
  tagline: 'A React framework for building drag-n-drop page editors',
  url: 'https://webstencils.app',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'webstencils', // Usually your GitHub org/user name.
  projectName: 'craft.js', // Usually your repo name.
  onBrokenLinks: 'warn',
  themeConfig: {
    prism: {
      theme: require('prism-react-renderer/themes/shadesOfPurple')
    },
    navbar: {
      hideOnScroll: false,
      title: 'webStencils',
      items: [
        {
          to: 'docs/overview',
          label: 'Documentation',
          activeBasePath: `docs`,
          position: 'left'
        },
        // TODO: create an /examples page in Docusaurus
        {
          label: 'Examples',
          position: 'right',
          items: [
            {
              to: 'pathname:///examples/landing',
              label: 'Landing'
            },
            {
              to: 'pathname:///examples/basic',
              label: 'Basic'
            }
          ]
        },
        { to: 'docs/sponsor', label: 'Sponsor', position: 'right' },
        {
          href: 'https://github.com/DenysVuika/handicraft',
          label: 'GitHub',
          position: 'right'
        }
      ]
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Overview',
              to: 'docs/overview'
            },
            {
              label: 'Core Concepts',
              to: 'docs/concepts/nodes'
            },
            {
              label: 'Tutorial',
              to: 'docs/guides/basic-tutorial'
            },
            {
              label: 'API Reference',
              to: 'docs/api/editor-state'
            }
          ]
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Github Repository',
              href: 'https://github.com/DenysVuika/handicraft'
            },
            {
              label: 'NPM',
              href: 'https://npmjs.com/package/@webstencils/core'
            }
          ]
        },
        {
          title: 'Find me elsewhere',
          items: [
            {
              label: 'Github',
              href: 'https://github.com/DenysVuika'
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/DenysVuika/'
            }
          ]
        }
      ],

      copyright: `Copyright © ${new Date().getFullYear()} Denys Vuika`
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js')
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ]
};
