define( [
	'backbone', 
	'lib/text!/js/templates/terms.html'
	], function (Backbone, TermsTemplate) {
	
	var TermsView = Backbone.View.extend({
		el: '#main-content',
		template: _.template(TermsTemplate),

		initialize: function() {
			this.render();
		},

		events: {
			'click #agree': 'proceedToDownload'
		},

		proceedToDownload: function(event) {

			if (false) {
				this.$('#offlineModal').foundation('reveal', 'open');
				event.preventDefault();
			}
			else {
				// Set the cookie so that the resource files will be added to the cache manifest
				$.cookie('agreed', '1', { expires: 365 });
				// Do not prevent the default action, i.e. let the browser follow the hash link to the download view
			}
		},

		render: function() {
			this.$el.html(this.template);
			return this.el;
		}
	});
	return TermsView;
});