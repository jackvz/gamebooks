require([
	'backbone' 
	], function(Backbone) {

	// Override the Backbone View prototype's remove method to empty the element instead of removing it, 
	// and also to remove any events.
	Backbone.View.prototype.remove = function(){
		// Undelegate the events that the backbone view had set up using the declarative events configuration 
		this.undelegateEvents(); 
		this.$el.empty();
		this.stopListening();
		return this;
	}
});
