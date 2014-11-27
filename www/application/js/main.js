/**
 * @name main.js
 * @version 1.0.0 
 * @author Jean Baudin
 */
require.config({
	'paths': {
        'socketIo':'../../socket.io/socket.io.js',
        'angular': '../../node_modules/angular/angular',
		'angularAnimate': '../../node_modules/angular-animate/angular-animate',
		'angularSanitize': '../../node_modules/angular-sanitize/angular-sanitize',
		'uiRouter': '../../node_modules/angular-ui-router/release/angular-ui-router',
		'cryptojs': '../../node_modules/npm-cryptojs-lib/index'
	},
	'shim': {
        'socketIo': {
            exports: 'io'
        },
        'angular': {
			exports: 'angular'
		},
		'angularAnimate': {
			deps: ['angular']
		},
		'angularSanitize': {
			deps: ['angular']
		},
		'uiRouter': {
			deps: ['angular']
		},
		'cryptojs': {
			exports: 'cryptojs'
		}
    },
    priority: [
        'io',
        'angular',
        'cryptojs'
    ],
    deps: [
        'bootstrap'
    ]
});


