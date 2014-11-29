/**
 * @name main.js
 * @version 1.0.0 
 * @author Jean Baudin
 */
require.config({
	'paths': {
        'socketio':'https://cdn.socket.io/socket.io-1.2.1',
        'angular': '../../node_modules/angular/angular',
		'angularAnimate': '../../node_modules/angular-animate/angular-animate',
		'angularSanitize': '../../node_modules/angular-sanitize/angular-sanitize',
		'uiRouter': '../../node_modules/angular-ui-router/release/angular-ui-router',
        'uiBootstrap': '../../node_modules/angular-bootstrap/ui-bootstrap',
		'cryptojs': '../../node_modules/npm-cryptojs-lib/index'
	},
	'shim': {
        'socketio': {
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
        'uiBootstrap': {
            deps: ['angular']
        },
		'cryptojs': {
			exports: 'cryptojs'
		}
    },
    priority: [
        'angular',
        'cryptojs'
    ],
    deps: [
        'bootstrap'
    ]
});


