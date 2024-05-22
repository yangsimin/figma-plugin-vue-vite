// https://www.figma.com/plugin-docs/manifest/
export default {
  name: 'figma-plugin-vue-vite',
  id: '1374656848207600313',
  api: '1.0.0',
  main: 'plugin.js',
  capabilities: [],
  enableProposedApi: false,
  documentAccess: 'dynamic-page',
  editorType: ['figma'],
  ui: 'index.html',
  networkAccess: {
    allowedDomains: ['none'],
  },
}
