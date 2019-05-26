define([
	'underscore', 
	'backbone' 
	], function(_, Backbone) {

	var BookModel = Backbone.Model.extend({
		defaults: {
			number: null, 
			title: '', 
			blurb: '', 
			publication: '', 
			copyrights: '', 
			licenseNotification: '', 
			showcaseIllustration: '' 
		},

		validate: function(attrs) {
			if(!attrs.title) {
				return 'Book title is required. ';
			}
		},

		clear: function() {
			this.destroy();
		}
	});
	return BookModel;
});