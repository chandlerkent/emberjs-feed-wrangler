import Ember from 'ember';

export default Ember.Object.extend({
	getPreambledConsole: function(preamble) {
		preamble += ":";
		var unshift = [].unshift;
		var preambledConsole = console || function() {};
		return {
			info: function() {
				unshift.call(arguments, preamble);
				preambledConsole.info.apply(preambledConsole, arguments); 
			},
			
			log: function() {
				unshift.call(arguments, preamble);
				preambledConsole.log.apply(preambledConsole, arguments); 
			},
			
			warn: function() {
				unshift.call(arguments, preamble);
				preambledConsole.warn.apply(preambledConsole, arguments); 
			},
			
			error: function() {
				unshift.call(arguments, preamble);
				preambledConsole.error.apply(preambledConsole, arguments); 
			}
		};
	}
});
