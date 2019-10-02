module.exports = {
  base: '/resume/',
  dest: './build/resume',
  theme: 'vuepress-theme-resume',
  themeConfig: {
    themeConfig: {
  nav: ['/'],
	docsDir: 'resume'
    },
    sidebar: [
      {
        collapsable: false,
        children: [ '/' ]
      }
    ]
  }
}
