import Ember from 'ember';

export default Ember.Mixin.create({
	beforeModel: function(transition) {
		this._super(transition);
		
		window.scrollTo(0, 0);
	}
});
