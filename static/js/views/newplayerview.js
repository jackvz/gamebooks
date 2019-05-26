define([
	'jquery', 
	'backbone', 
	'lib/text!/js/templates/newplayer.html', 
	'models/bookmodel', 
	'models/playermodel', 
	'collections/booklist' 
	], function ($, Backbone, NewPlayerTemplate, BookModel, PlayerModel, BookList) {

	var NewPlayerView = Backbone.View.extend({
		el: '#main-content', 
		template: _.template(NewPlayerTemplate), 
		player: null, 
		books: null, 

		initialize: function() {
			this.books = new BookList();

			var self = this;
			this.collection.fetch().done(function() {
				self.render();
			});

			// Hide the blurbs and illustrations
			this.$('.book-blurb').hide();
			this.$('.book-illustration').hide();

			// Show the loading animation
			this.$('#new-player').hide();
			this.$('#loading-anim').show();

			// Get the first book
			var book1 = new BookModel({ 
				number: 1, 
				showcaseIllustration: 'https://www.projectaon.org/data/trunk/en/png/lw/01fftd/ill/chalk/ill3.png' 
			});

			$.ajax({
				type: 'get',
				url: '/data?title=1', 
				dataType: 'xml' 
			}).done(function(data, textStatus, jqXHR) {
				self.loadBook(book1, data);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				self.handleResourceNotFound();
			});

			// Get the second book
			var book2 = new BookModel({ 
				number: 2, 
				showcaseIllustration: 'https://www.projectaon.org/data/trunk/en/png/lw/02fotw/ill/chalk/ill16.png' 
			});

			$.ajax({
				type: 'get',
				url: '/data?title=2', 
				dataType: 'xml' 
			}).done(function(data, textStatus, jqXHR) {
				self.loadBook(book2, data);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				self.handleResourceNotFound();
			});

			// Get the third book
			var book3 = new BookModel({ 
				number: 3, 
				showcaseIllustration: 'https://www.projectaon.org/data/trunk/en/png/lw/03tcok/ill/chalk/ill1.png' 
			});

			$.ajax({
				type: 'get',
				url: '/data?title=3', 
				dataType: 'xml' 
			}).done(function(data, textStatus, jqXHR) {
				self.loadBook(book3, data);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				self.handleResourceNotFound();
			});

			// Get the fourth book
			var book4 = new BookModel({ 
				number: 4, 
				showcaseIllustration: 'https://www.projectaon.org/data/trunk/en/png/lw/04tcod/ill/chalk/ill20.png' 
			});

			$.ajax({
				type: 'get',
				url: '/data?title=4', 
				dataType: 'xml' 
			}).done(function(data, textStatus, jqXHR) {
				self.loadBook(book4, data);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				self.handleResourceNotFound();
			});

			// Get the fifth book
			var book5 = new BookModel({ 
				number: 5, 
				showcaseIllustration: 'https://www.projectaon.org/data/trunk/en/png/lw/05sots/ill/chalk/ill22.png' 
			});

			$.ajax({
				type: 'get',
				url: '/data?title=5', 
				dataType: 'xml' 
			}).done(function(data, textStatus, jqXHR) {
				self.loadBook(book5, data);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				self.handleResourceNotFound();
			});
		},

		events: {
			'click #new-player .refresh': 'refreshPage', 
			'change #new-player #adventure-title': 'updateSelectedAdventure', 
			'click #new-player #create-player' : 'createPlayer', 
			'submit form#new-player' : 'createPlayer', 
			'closed #player-invalid-modal': 'invalidPlayerWarningDismissed' 
		},

		handleResourceNotFound: function() {
			// Hide the loading animation
			this.$('#loading-anim').hide();
			this.$('#new-player').show();

			this.$('#new-player').html('<h2>Resource not found</h2><p>A resource required was not found and has not yet been downloaded. <a href="#refresh" class="refresh small radius button">Refresh</a></p>');

			// Scroll to the top
			$(window).scrollTop(0);

			// Track a page view
			ga('send', 'pageview', '/#resource-not-found');
		}, 

		refreshPage: function(event) {
			event.preventDefault();
			window.location.reload();
		}, 

		loadBook: function(book, xml) {
			var bookTitle = $(xml).find('gamebook > meta > title').text();
			var bookBlurb = $(xml).find('gamebook > meta > description.blurb p');
			bookBlurb = $('<div>').append(bookBlurb.clone()).remove().html(); // Get HTML from the XML, not just the text
			bookBlurb = bookBlurb.replace(/&amp;/g, '&')

			var bookPublication = $(xml).find('gamebook > meta > description.publication *');
			bookPublication = $('<div>').append(bookPublication.clone()).remove().html(); // Get HTML from the XML, not just the text
			bookPublication = bookPublication.replace(/&amp;/g, '&')

			var bookCopyrights = $(xml).find('gamebook > meta > rights.copyrights *');
			bookCopyrights = $('<div>').append(bookCopyrights.clone()).remove().html(); // Get HTML from the XML, not just the text
			bookCopyrights = bookCopyrights.replace(/&amp;/g, '&')

			var licenseNotification = $(xml).find('gamebook > meta > rights.license-notification *');
			licenseNotification = $('<div>').append(licenseNotification.clone()).remove().html(); // Get HTML from the XML, not just the text
			licenseNotification = licenseNotification.replace(/&amp;/g, '&')

			book.set('title', bookTitle);
			book.set('blurb', bookBlurb);
			book.set('publication', bookPublication);
			book.set('copyrights', bookCopyrights);
			book.set('licenseNotification', licenseNotification);

			this.books.add(book);

			// Render the view after the data for all 5 books are loaded
			if (this.books.length == 5)
			{
				// Re-render with the collection loaded
				this.render();

				// Hide the loading animation (after rendering as this will show the animation by default)
				self.$('#loading-anim').hide();
				self.$('#new-player').show();

				// Hide the blurbs and illustrations
				this.$('.book-blurb').hide();
				this.$('.book-illustration').hide();

				// If a session cookie is set to start at a specific title, select the title
				var specificTitle = $.cookie('lw_title');
				if (specificTitle) {
					$.removeCookie('lw_title'); // Clear the session cookie
					$('#adventure-title').val(specificTitle).trigger('change');
				} else {
					// Start at the first title
					$('#adventure-title').val('1').trigger('change');
				}

				// Scroll to the top
				$(window).scrollTop(0);
			}
		}, 

		updateSelectedAdventure: function(event) {
			var bookNumber = this.$('#adventure-title').val();

			// Hide the blurbs and illustrations
			this.$('.book-blurb').hide();
			this.$('.book-illustration').hide();

			// Show the selected book's blurb and illustration
			this.$('#book' + bookNumber + '-blurb').show();
			this.$('#book' + bookNumber + '-illustration').show();
		}, 

		createPlayer: function(event) {
			// Do not follow the empty link
			event.preventDefault();

			// Disable the button
			this.$('#create-player').attr('disabled','disabled');

			// Create a new player
			this.player = new PlayerModel({ 
				name: this.$('#player-name').val(), 
				bookNumber: this.$('#adventure-title').val(), 
				bookTitle: this.$('#adventure-title').find(':selected').text(), 
				bookBlurb: this.$('#book' + this.$('#adventure-title').val() + '-blurb').html() 
			});
			this.collection.add(this.player);

			var self = this;

			this.player.on('invalid', function(model, errors) { 
				// Add the errors as paragraphs to the invalid player popup
				var errorMarkup = '';

				_.each(errors, function(error) {
					errorMarkup += '<p>' + error.message + '</p>';
				}, this);

				self.$('#player-errors').html(errorMarkup);

				self.$('#player-invalid-modal').foundation('reveal', 'open');
			});

			// Redirect to the game view on save
			this.player.save(null, {
				success: function () {
					Backbone.history.navigate('#game/' + self.player.id, true); 
				}
			});
		},

		invalidPlayerWarningDismissed: function(event) {
			// Enable the start game / new player button again
			self.$('#create-player').removeAttr('disabled');
		},

		render: function() {
			this.$el.html(this.template({ collection: this.collection, books: this.books }));

			return this.el;
		}
	});
	return NewPlayerView;
});