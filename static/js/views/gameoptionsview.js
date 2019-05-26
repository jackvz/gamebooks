define( [
	'backbone', 
	'lib/text!/js/templates/gameoptions.html', 

	'ga' 
	], function (Backbone, GameOptionsTemplate) {
	
	var GameOptionsView = Backbone.View.extend({
		el: '#gameoptions',
		template: _.template(GameOptionsTemplate),

		initialize: function() {
			this.render();
		},

		events: {
			'click #gameoption-activator' : 'toggleOptions', 
			'click #user-nav-placeholder a' : 'cancelPlaceholderActivation', 
			'click .nav-link' : 'navClick' 
		},

		toggleOptions: function(event) {
			event.preventDefault();
			var self = this;
			// As the nav manu slides down and in, the visible content pane slides up and out, and vice versa
			this.$('.gameoptions').slideToggle(function() {
				self.$('#gameoption-activator').toggleClass('secondary');
			});

			var target = this.$('.gameoptions .nav-link .callout').closest('a').attr('href');
			$(target + '.content-pane').toggle();
			$('footer').toggle();
		},

		cancelPlaceholderActivation: function(event) {
			event.preventDefault();
		},

		navClick: function(event) {
			event.preventDefault();
			var link = $(event.target).closest('.nav-link');
			var target = link.attr('href');

			// Track a page view
			ga('send', 'pageview', '/' + target);

			this.trigger('navClick', target); // Raise a custom event
			if (target != '#save' && target != '#quit')
			{
				this.$('.nav-link .panel').removeClass('callout');
				link.find('.panel').addClass('callout');
				var self = this;
				this.$('.gameoptions').slideUp(function() {
					self.$('#gameoption-activator').removeClass('secondary');

					// Scroll to the top
					$(window).scrollTop(0);
				});
			}
		},

		render: function() {
			this.$el.html(this.template);
			return this.el;
		}
	});
	return GameOptionsView;
});