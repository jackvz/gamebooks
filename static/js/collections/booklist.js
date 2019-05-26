define([
	'underscore', 
	'backbone', 
	'models/bookmodel', 

	'localstorage' 
	], function(_, Backbone, BookModel) {

	var BookList = Backbone.Collection.extend({
		localStorage: new Backbone.LocalStorage('BookList'), 
		model: BookModel,

		initialize: function() {
			this.on('add', this.updateSet, this);
		},
		
		updateSet: function() {
			items = this.models;
		}
	});
	return BookList;
});
