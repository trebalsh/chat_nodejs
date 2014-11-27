/**
 * @name main.js
 * @version 1.0.0 
 * @author Jean Baudin
 */
require.config({
	'paths': {
        'angular': '../lib/angular/angular',
		'angularAnimate': '../lib/angular-animate/angular-animate',
		'angularSanitize': '../lib/angular-sanitize/angular-sanitize',
		'uiRouter': '../lib/angular-ui-router/release/angular-ui-router',
		'cryptojs': '../lib/npm-cryptojs-lib/index',
        'async':'../lib/requirejs-plugins/src/async'
	},
	'shim': {
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
        'angular',
        'cryptojs'
    ],
    deps: [
        'bootstrap'
    ]
});


