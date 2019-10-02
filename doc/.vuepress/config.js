const currentDateUTC = new Date().toUTCString()

module.exports = {
    title: 'Home of Naren"s Knowledge share',
    dest: './build',
    themeConfig: {
	nav: [
	    { text: 'Home', link: '/' }, 
	    { text: 'Works', link: '/works/' },
	    { text: 'Blog', link: '/blog/'},
//	    { text: 'Resume', link: 'https://narenkn.com/resume/' },
	    { text: 'GitHub', link: 'https://github.com/narenkn/' },
	    { text: 'YouTube', link: 'https://www.youtube.com/user/narenkn/videos' },
	],
	logo: '/icons/favicon-96x96.png',
	sidebar: 'auto',
	docsDir: 'src',
	sidebar: {
	    '/works/embedded/at32_biller/': [
		'',
		'display',
		'keypad',
		'keyboard',
		'storage',
		'printer',
		'power',
		'weighmc',
		'develenv',
		'swarch',
		'swtesting'
	    ],
	    '/works/embedded/at128_biller/': [
		'',
		'at128',
		'battery',
		'buzzer',
		'i2c',
		'keypad',
		'lcd',
		'nandf',
		'power',
		'ps2',
		'uart',
		'uSD',
		'rtc'
	    ],
	    '/works/embedded/opiz_exp/': [
		'',
	    ],
	    '/works/verif/': [
		'svtypes',
		'surfboard',
		'cdump',
		'fsdbStimulus',
		'scemi',
		'simlog',
	    ],
	    '/works/embedded/': [
		'/works/embedded/at32_biller/',
		'/works/embedded/at128_biller/',
		'/works/embedded/opiz_exp/',
	    ],
  	    '/works/emu/': [
		'synthesisMem',
		'writingStateMachines',
		'clearComboSequential',
		'userTypes',
	    ],
	    '/works/': [
		'/works/verif/',
		'/works/embedded/',
		'/works/emu/'
	    ]
	}
    },
    plugins: [
	[
	    '@vuepress/google-analytics',
	    {
		ga: 'UA-141610207-1'
	    }
	],
	[
	    'vuepress-plugin-rss',
	    {
		base_url: '/',
		site_url: 'https://www.narenkn.com',
		filter: frontmatter => frontmatter.date <= new Date(currentDateUTC),
		count: 20
	    }
	],
	'vuepress-plugin-reading-time',
	'vuepress-plugin-janitor'
    ],
    head: [
	['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/icons/apple-icon.png' }],
	['link', { rel: 'icon', sizes: '32x32', href: '/icons/favicon-32x32.png' }],
	['link', { rel: 'icon', sizes: '16x16', href: '/icons/favicon-16x16.png' }],
	['link', { rel: 'manifest', href: '/manifest.json' }],
	['link', { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' }],
	['meta', { name: 'msapplication-TileColor', content: '#da532c' }],
	['meta', { name: 'theme-color', content: '#3ed0e0' }]
	],
	markdown: {
		lineNumbers: true
	}
}
