define([
	'jquery', 
	'backbone', 
	'lib/text!/js/templates/game.html', 

	'ga' 
	], function ($, Backbone, GameTemplate) {
	
	var GameView = Backbone.View.extend({
		el: '#main-content',
		template: _.template(GameTemplate),

		initialize: function() {
			this.render();

			// Show the story panel when the view loads
			this.$('.content-pane').hide();
			this.$('#story').show();

			// Render the story content on first load
			this.renderStoryRulesAndRandomNumbers();
			// Render the story content when the player's book or section changes
			this.listenTo(this.model.attributes.player, 'change:bookNumber change:bookSection', this.renderStoryRulesAndRandomNumbers);

			// Bind to a custom event that is raised by the Game module 
			// in response to an event fired by one of the module's views
			this.on('navClick', this.navClick, this); 

			// Set the map on widescreen displays to only take up 10 out of 12 columns when scaled (default), 
			// but all columns when full-sized (when toggled).
			this.$('#map-header').addClass('large-10');
			this.$('#map-header').addClass('large-offset-1');
			this.$('#map-holder').addClass('large-10');
			this.$('#map-holder').addClass('large-offset-1');
		},

		events: {
			'click #story .choice': 'loadChosenSection', 
			'click #story .fight': 'fightRound', 
			'click #story .refresh': 'refreshStoryPage', 
			'click #story .illustration.ill': 'focusIllustration', 
			'click #story #story-illustration': 'blurIllustration', 
			'click #story #next-adventure': 'loadNextAdventure',
			'click .content-nav-link': 'contentNavClick',
			'click .back-to-top': 'backToTop', 
			'click #random-number table tbody td': 'activateRandomNumber', 
			'click #map-toggle': 'toggleMap', 
			'click #save-okay': 'closeSavePopup', 
			'click #combat-warning-okay': 'closeCombatWarningPopup', 
			'click #quit-game': 'quitGameConfirm', 
			'click #quit-game-cancel': 'closeQuitPopup' 
		},

		renderStoryRulesAndRandomNumbers: function() {
			var bookNumber = this.model.attributes.player.get('bookNumber');
			var bookSection = this.model.attributes.player.get('bookSection');

			// Show the loading animation
			this.$('#story-content').hide();
			this.$('#loading-anim').show();

			// Set the values of the hidden fields (to be saved later in case the book or section changed)
			this.$('#book-number').val(bookNumber);
			this.$('#book-section').val(bookSection);

			var self = this;

			$.ajax({
				type: 'get',
				url: '/data?title=' + bookNumber, // This should already be cached after the user has agreed to the terms
				dataType: 'xml', 
				success: function(xml) {
					// Hide the loading animation
					self.$('#loading-anim').hide();
					self.$('#story-content').show();

					// Render the rules and random number table
					var rulesTitle = '';
					var rulesData = null;
					var rulesContent = '';
					var randomNumberData = null;
					var randomNumberContent = '';

					rulesTitle = $(xml).find('section#title > data > section.frontmatter#gamerulz > meta > title').text();
					rulesData = $(xml).find('section#title > data > section.frontmatter#gamerulz > data');
					rulesContent += self.renderSectionContent(rulesData, 1);

					rulesTitle = $('<span>').html(rulesTitle).text() // Decode the HTML special characters in the XML
					self.$('#rules-content').html('<h2>' + rulesTitle + '</h2>' + rulesContent);

					randomNumberData = $(xml).find('#random.backmatter > data table');
					randomNumberContent = $('<span>').html(randomNumberData).html();
					self.$('#random-number table').html('<tbody>' + randomNumberContent + '</tbody>');

					// If the current story's title and blurb is not yet set, set it now
					var lastBookTitle = self.model.attributes.player.get('bookTitle');
					if (bookSection == 0) {
						var bookTitle = $(xml).find('gamebook > meta > title').text();
						var bookBlurb = $(xml).find('gamebook > meta > description.blurb');
						bookBlurb = $('<div>').append(bookBlurb.clone()).remove().html(); // Get HTML from the XML, not just the text
						bookBlurb = bookBlurb.replace(/&amp;/g, '&')

						self.model.attributes.player.set('bookTitle', bookTitle); 
						self.model.attributes.player.set('bookBlurb', bookBlurb);
						self.model.attributes.player.save(null, {
							success: function() {
								// If the user has just started the next adventure, 
								// let them know that their game has been saved
								if (bookNumber > 1 && lastBookTitle != bookTitle) {
									$(window).scrollTop(0);
									$('#save-modal').foundation('reveal', 'open');
								}
							} 
						});

						self.$('#book-title').val(bookTitle);
						self.$('#book-blurb').val(bookBlurb);
					}

					var sectionNav = ''
					var sectionTitle = '';
					var sectionData = null;
					var sectionContent = '';

					if (bookSection == 0) {
						sectionNav += '<p class="right"><a href="#sect0.1" class="choice enclosedfoundicon-right-arrow"> Continue</a></p>';

						sectionTitle = $(xml).find('section#title > data > section.frontmatter#tssf > meta > title').text();
						sectionData = $(xml).find('section#title > data > section.frontmatter#tssf > data');
						sectionContent += self.renderSectionContent(sectionData, 1);

						sectionContent += '<p class="right"><a href="#sect0.1" class="choice enclosedfoundicon-right-arrow"> Continue</a></p>';
					} else if (bookSection == 0.1) {
						sectionNav += '<p class="right"><a href="#sect0.2" class="choice enclosedfoundicon-right-arrow"> Continue</a></p>';

						sectionTitle = $(xml).find('section#title > data > section.frontmatter#acknwldg > data > section.frontmatter#credits > meta > title').text();
						sectionData = $(xml).find('section#title > data > section.frontmatter#acknwldg > data > section.frontmatter#credits > data');
						sectionContent += self.renderSectionContent(sectionData, 1);

						sectionContent += '<p class="left"><a href="#sect0" class="choice enclosedfoundicon-left-arrow"> Back</a></p>';
						sectionContent += '<p class="right"><a href="#sect0.2" class="choice enclosedfoundicon-right-arrow"> Continue</a></p>';
					} else if (bookSection == 0.2) {
						sectionNav += '<p class="right"><a href="#sect0.3" class="choice enclosedfoundicon-right-arrow"> Continue</a></p>';

						sectionTitle = $(xml).find('section#title > data > section.frontmatter#gamerulz > meta > title').text();
						sectionData = $(xml).find('section#title > data > section.frontmatter#gamerulz > data');
						sectionContent += self.renderSectionContent(sectionData, 1);

						sectionContent += '<p class="left"><a href="#sect0.1" class="choice enclosedfoundicon-left-arrow"> Back</a></p>';
						sectionContent += '<p class="right"><a href="#sect0.3" class="choice enclosedfoundicon-right-arrow"> Continue</a></p>';
					} else if (bookSection == 0.3) {
						sectionNav += '<p class="right"><a href="#sect1" class="choice enclosedfoundicon-right-arrow"> Begin</a></p>';

						sectionTitle = $(xml).find('section#title > data > section.frontmatter#kaiwisdm > meta > title').text();
						sectionData = $(xml).find('section#title > data > section.frontmatter#kaiwisdm > data');
						sectionContent += self.renderSectionContent(sectionData, 1);

						sectionContent += '<p class="left"><a href="#sect0.2" class="choice enclosedfoundicon-left-arrow"> Back</a></p>';
						sectionContent += '<p class="right"><a href="#sect1" class="choice enclosedfoundicon-right-arrow"> Begin</a></p>';
					} else {
						sectionTitle = $(xml).find('section#title data section.numbered data section.numbered#sect' + bookSection + ' meta title').text();
						sectionData = $(xml).find('section#title data section.numbered data section.numbered#sect' + bookSection + ' data');
						sectionContent = self.renderSectionContent(sectionData, 1);
						
						// If this is the last section of the book, link to the next book, unless this is the last book (book 5 for this app)
						if (bookSection == 350 && bookNumber < 5) {
							sectionContent += '<p><a id="next-adventure" href="#next-adventure" class="enclosedfoundicon-right-arrow"> Continue</a></p>';
						} else if (bookSection == 400 && bookNumber == 5) {
							sectionContent += '<p>This is this app\'s last adventure. Thanks for playing!</p>';
						}
					}
					sectionTitle = $('<span>').html(sectionTitle).text() // Decode the HTML special characters in the XML
					self.$('#story-content').html(sectionNav + '<h2>' + sectionTitle + '</h2>' + sectionContent);

					// Scroll to the top
					$(window).scrollTop(0);

					// Track a page view
					ga('send', 'pageview', '/#section-' + bookSection);
				}, 
				error: function(jqXHR, textStatus, errorThrown) {
					// Hide the loading animation
					self.$('#loading-anim').hide();
					self.$('#story-content').show();

					// Sometimes the first offline ajax call fails. 
					// In that case, try to refresh the page once before displaying a message.
					if ($.cookie('refreshed-game-view') != '1') {
						$.cookie('refreshed-game-view', '1');
						window.location.reload();
					} else {
						self.$('#story-content').html('<h2>Resource not found</h2><p>A resource required was not found and has not yet been downloaded. <a href="#refresh" class="refresh small radius button">Refresh</a></p>');
	
						// Scroll to the top
						$(window).scrollTop(0);

						// Track a page view
						ga('send', 'pageview', '/#resource-not-found');
					}
				} 
			});
		}, 

		renderSectionContent: function(sectionData, level) {
			var self = this;
			var sectionContent = '';
			$(sectionData).find('> *').each(function() {
				if($(this).is('p')) {
					// paragraph

					// Process quote tags
					$(this).find('quote').each(function() {
						// Only process if not already processed. Look into this
						if ($(this).text().indexOf('&lt;a') != 0)
						{
							$(this).text('&ldquo;' + $(this).text() + '&rdquo;')
						}
					});

					// Process Action Chart links
					$(this).find('a[idref="action"]').each(function() {
						// Only process if not already processed. Look into this
						if ($(this).text().indexOf('&lt;a') != 0)
						{
							var copy = $(this).text();
							$(this).text('&lt;a href="#action-chart" class="content-nav-link foundicon-right-arrow"&gt;' + copy + '&lt;/a&gt;')
						}
					});

					// Process Random Number links
					$(this).find('a[idref="random"]').each(function() {
						// Only process if not already processed. Look into this
						if ($(this).text().indexOf('&lt;a') != 0)
						{
							var copy = $(this).text();
							$(this).text('&lt;a href="#random-number" class="content-nav-link foundicon-right-arrow"&gt;' + copy + '&lt;/a&gt;')
						}
					});

					// Process Combat Reults links
					$(this).find('a[idref="crtable"]').each(function() {
						// Only process if not already processed. Look into this
						if ($(this).text().indexOf('&lt;a') != 0)
						{
							var copy = $(this).text();
							$(this).text('&lt;a href="#combat-results" class="content-nav-link foundicon-right-arrow"&gt;' + copy + '&lt;/a&gt;')
						}
					});

					// Process Map links
					$(this).find('a[idref="map"]').each(function() {
						// Only process if not already processed. Look into this
						if ($(this).text().indexOf('&lt;a') != 0)
						{
							var copy = $(this).text();
							$(this).text('&lt;a href="#map" class="content-nav-link foundicon-right-arrow"&gt;' + copy + '&lt;/a&gt;')
						}
					});

					var copy = $(this).text();
					copy = $('<span>').html(copy).text() // Decode the HTML special characters in the XML
					sectionContent += '<p>' + copy + '</p>';
				} else if($(this).is('ul')) {
					// unordered list
					var listItemContent = '';
					$(this).find('> li').each(function() {
						var content = $(this).text(); // Set it to just the text at first
						// If it contains more markup, render it
						if ($(this).children().not('typ').length > 0) {
							content = self.renderSectionContent($(this), level + 1);
						}
						listItemContent += '<li class="bullet-item">' + content + '</li>';
					});
					sectionContent += '<ul class="pricing-table small-12 large-8 large-offset-2">' + listItemContent + '</ul>';
				} else if($(this).is('ol')) {
					// ordered list
					var listItemContent = '';
					$(this).find('> li').each(function() {
						var content = $(this).text(); // Set it to just the text at first
						// If it contains more markup, render it
						if ($(this).children().not('typ').length > 0) {
							content = self.renderSectionContent($(this), level + 1);
						}
						listItemContent += '<li class="bullet-item">' + content + '</li>';
					});
					sectionContent += '<ul class="pricing-table small-12 large-8 large-offset-2">' + listItemContent + '</ul>';
				} else if($(this).is('dl')) {
					// definition list
					var definitionContent = '';
					$(this).find('> dt, > dd').each(function() {
						var content = $(this).text();
						if ($(this).is('dt')) {
							definitionContent += '<tr><th>' + content + '</th>';
						} else if ($(this).is('dd')) {
							definitionContent += '<td>' + content + '</tr></td>';
						}
					});
					sectionContent += '<table class="small-12 large-8 large-offset-2"><tbody>' + definitionContent + '</tbody></table>';
				} else if (this.tagName.toLowerCase() == 'choice') {
					// choice
					var copy = $(this).text();
					var section = $(this).attr('idref');
					copy = $('<span>').html(copy).text() // Decode the HTML special characters in the XML
					sectionContent += '<p><a href="#' + section + '" class="choice enclosedfoundicon-right-arrow"> ' + copy + '</a></p>';
				} else if (this.tagName.toLowerCase() == 'illustration') {
					// illustration
					sectionContent += self.renderIllustration(this);
				} else if (this.tagName.toLowerCase() == 'blockquote') {
					// blockquote
					var copy = $(this).text();
					copy = $('<span>').html(copy).text() // Decode the HTML special characters in the XML
					sectionContent += '<blockquote>' + copy + '</blockquote>';
				} else if (this.tagName.toLowerCase() == 'deadend') {
					// deadend
					var copy = $(this).text();
					copy = $('<span>').html(copy).text() // Decode the HTML special characters in the XML
					sectionContent += '<ul class="pricing-table"><li class="title">' + copy + '</li></ul>';
				} else if (this.tagName.toLowerCase() == 'puzzle') {
					// puzzle
					var copy = $(this).clone();
					copy.find('otherwise').remove();
					copy = copy.text();
					var section = $(this).attr('idref');
					copy = $('<span>').html(copy).text() // Decode the HTML special characters in the XML
					sectionContent += '<p><a href="#' + section + '" class="choice enclosedfoundicon-right-arrow"> ' + copy + '</a></p>';
				} else if (this.tagName.toLowerCase() == 'poetry') {
					// poetry
					var copy = '';
					$(this).find('line').each(function() {
						var line = $(this).text();
						line = $('<span>').html(line).text() // Decode the HTML special characters in the XML
						copy += '<li class="bullet-item">' + line + '</li>';
					})
					sectionContent += '<ul class="pricing-table">' + copy + '</ul>';
				} else if (this.tagName.toLowerCase() == 'combat') {
					// combat
					var enemy = $(this).find('enemy').text();
					var combatSkill = $(this).find('.combatskill').text();
					var endurance = $(this).find('.endurance').text();
					var tableContent = '';
					tableContent += '<thead><tr><th colspan="2"><h3 class="enemy-title">' + enemy + '</h3></th></tr></thead>';
					tableContent += '<tbody><tr><th>Combat Skill</th><th>Endurance</th></tr>';
					tableContent += '<tr><td class="enemy-combat-skill">' + combatSkill + '</td><td class="enemy-endurance-points">' + endurance + '</td></tr></tbody>';
					sectionContent += '<table class="small-12 large-8 large-offset-2">' + tableContent + '</table>';
					// sectionContent += '<p class="fight-round"><a href="#" class="fight radius button">Fight a round of combat</a><br>';
					// sectionContent += '<small>Fighting a round will automatically update your Action Chart.</small></p>';
				} else if (this.tagName.toLowerCase() == 'section') {
					// section
					var sectionId = $(this).attr('id');
					var innerSectionData = $(sectionData).find('section#' + sectionId + '> data');
					var headingLevel = level + 1;
					sectionContent += '<h' + headingLevel + '>' + $(sectionData).find('section#' + sectionId + '> meta > title').text() + '</h' + headingLevel + '>';
					sectionContent += self.renderSectionContent(innerSectionData, level + 1)
				}
			});
			return sectionContent;
		}, 

		renderIllustration: function(data) {
			var illustrationContent = '';
			var bookNumber = this.model.attributes.player.get('bookNumber');
			var illustrationsPath = this.model.attributes.game.get('web')[bookNumber - 1];
			var creator = $(data).find('> meta > creator').text();
			var description = $(data).find('> meta > description').text();
			// Fix single quote markup
			description = description.replace('&rsquot;', '&rsquo;');
			description = description.replace('&lsquot;', '&lsquo;');
			// Fix double quote markup
			description = description.replace('&rdquot;', '&rdquo;');
			description = description.replace('&ldquot;', '&ldquo;');

			if (creator == 'Gary Chalk') { // This app is only for the first 5 books and gives credit to only this illustrator in the footer, so only use his work
				var source = $(data).find('> instance.html').attr('src');
				var isLargeIllustration = (source.indexOf('ill') == 0);
				illustrationContent += '<div class="illustration ' + 
					(isLargeIllustration ? ' ill' : '') + 
					'"><img src="' + illustrationsPath + source + '" alt="' + description + '" title="' + description + '"></div><p class="illustration-label">' + description + '</p>';
			}

			return illustrationContent;
		}, 

		loadChosenSection: function(event) {
			event.preventDefault();
			var bookSection = $(event.target).attr('href').replace('#sect', '');
			this.model.attributes.player.set('bookSection', bookSection); 
			
			// The model's bookSection attribute change event will trigger a refresh of the story section
		}, 

		fightRound: function(event) {
			event.preventDefault();
			var $target = $(event.target);

			// Break out if a round is in progress and the button is disabled
			if ($target.hasClass('disabled')) {
				return;
			}

			var $combatInfo = $(event.target).parent('p').prev('table');
			var enemyTitle = $combatInfo.find('.enemy-title').text();
			var enemyCombatSkill = $combatInfo.find('.enemy-combat-skill').text();
			var enemyEndurancePoints = $combatInfo.find('.enemy-endurance-points').text();

			var $lastRound = $('table.combat-round:last');

			// Disable the fight button while the round is worked out
			$target.addClass('disabled');

			// TODO: 
			// $('#combat-warning-modal').foundation('reveal', 'open');

			// console.log(enemyTitle);
			// console.log(enemyCombatSkill);
			// console.log(enemyEndurancePoints);
			// console.log(lastRound);

			// TODO: Refactor
			var $combatRecord = 
						$('<table class="combat-round small-12 large-8 large-offset-2">' +
						'	<thead>' +
						'		<tr>' +
						'			<th width="60%" colspan="2">Random Number</th>' +
						'			<th width="40%" class="random-number-round alert-box">4</th>' +
						'		</tr>' +
						'		<tr>' +
						'			<th width="40%">Lone Wolf <br class="show-for-small">EP</th>' +
						'			<th width="20%">Combat <br class="show-for-small">Ratio</th>' +
						'			<th width="40%">Enemy <br class="show-for-small">EP</th>' +
						'		</tr>' +
						'	</thead>' +
						'	<tbody>' +
						'		<tr>' +
						'			<td class="LW-E-round"><span>23 <br class="show-for-small">- 2 <br>= <strong>21</strong></span></td>' +
						'			<td class"combat-ratio-round">&nbsp;<br class="show-for-small">+3<br>&nbsp;</td>' +
						'			<td class="E-E-round"><span>18 <br class="show-for-small">- 8 <br>= <strong>10</strong><br class="show-for-small"></span></td>' +
						'		</tr>' +
						'	</tbody>' +
						'</table>');
			$target.before($combatRecord);
			$('table.combat-round:last .LW-E-round span, table.combat-round:last .E-E-round span').hide()
			$('table.combat-round:last .random-number-round').hide().fadeIn('slow', function() {
				$('table.combat-round:last .LW-E-round span, table.combat-round:last .E-E-round span').hide().fadeIn('slow', function() {
					setTimeout(function() {
						$target.removeClass('disabled');
					}, 500);
				});
			});
		},

		refreshStoryPage: function(event) {
			event.preventDefault();
			window.location.reload();
		}, 

		focusIllustration: function(event) {
			event.preventDefault();

			// Medium and up: Show the illustration and only the illustration
			if ($('#on-medium-screen').is(':visible') || 
				$('#on-large-screen').is(':visible') ||
				$('#on-xlarge-screen').is(':visible')) {

				var $target = $(event.target);

				$('#header').fadeToggle();
				$('#gameoptions').fadeToggle();
				self.$('#story-content').fadeToggle();

				self.$('#story-illustration img').attr('src', $target.attr('src'));
				self.$('#story-illustration img').attr('alt', $target.attr('alt'));
				self.$('#story-illustration img').attr('title', $target.attr('title'));
				self.$('#story-illustration').fadeToggle();

				$('footer').fadeToggle();

				// Scroll to the top
				$(window).scrollTop(0);
			}
		}, 

		blurIllustration: function(event) {
			// Break out of the illustration-only view
			$('#header').fadeToggle();
			$('#gameoptions').fadeToggle();
			self.$('#story-content').fadeToggle();
			self.$('#story-illustration').fadeToggle();
			$('footer').fadeToggle();
		}, 

		loadNextAdventure: function(event) {
			event.preventDefault();
			var bookNumber = parseInt(this.model.attributes.player.get('bookNumber'), 10) + 1;
			this.model.attributes.player.set('bookNumber', bookNumber); 
			this.model.attributes.player.set('bookSection', 0); 
			// The model change will trigger a refresh of the story section, rules section and random number table
		}, 

		backToTop: function(event) {
			event.preventDefault();
			$(window).scrollTop(0);
		}, 

		activateRandomNumber: function(event) {
			event.preventDefault();
			var tableCell = $(event.target);
			this.$('#random-number table tbody td').removeClass('active');
			tableCell.addClass('active');
			tableCell.blur();
		}, 

		toggleMap: function() {
			if (this.$('#map-toggle').html() == 'View full-sized map') {
				this.$('#map-toggle').html('View scaled map');
				this.$('#map-holder').addClass('toggle-map-holder');
				this.$('#map-image').addClass('toggle-map-image');

				this.$('#map-header').removeClass('large-10');
				this.$('#map-header').removeClass('large-offset-1');
				this.$('#map-holder').removeClass('large-10');
				this.$('#map-holder').removeClass('large-offset-1');
			} else {
				this.$('#map-toggle').html('View full-sized map');
				this.$('#map-holder').removeClass('toggle-map-holder');
				this.$('#map-image').removeClass('toggle-map-image');

				this.$('#map-header').addClass('large-10');
				this.$('#map-header').addClass('large-offset-1');
				this.$('#map-holder').addClass('large-10');
				this.$('#map-holder').addClass('large-offset-1');
			}
		}, 

		saveGame: function() {
			this.model.attributes.player.set('name', this.$('#name').val());
			this.model.attributes.player.set('rank', this.$('#rank').val());

			this.model.attributes.player.set('combatSkill', this.$('#combat-skill').val());
			this.model.attributes.player.set('endurancePoints', this.$('#endurance-points').val());
			this.model.attributes.player.set('initialEndurancePoints', this.$('#initial-endurance-points').val());

			this.model.attributes.player.set('bookNumber', this.$('#book-number').val());
			this.model.attributes.player.set('bookSection', this.$('#book-section').val());

			this.model.attributes.player.set('bookTitle', this.$('#book-title').val());
			this.model.attributes.player.set('bookBlurb', this.$('#book-blurb').val());

			this.model.attributes.player.set('weapons', [ this.$('#weapon1').val(), 
				this.$('#weapon2').val() ]);

			this.model.attributes.player.set('disciplines', [ this.$('#discipline1').val(), 
				this.$('#discipline2').val(), 
				this.$('#discipline3').val(), 
				this.$('#discipline4').val(), 
				this.$('#discipline5').val(), 
				this.$('#discipline6').val(), 
				this.$('#discipline7').val(), 
				this.$('#discipline8').val(), 
				this.$('#discipline9').val(), 
				this.$('#discipline10').val() ]);

			this.model.attributes.player.set('goldCrowns', this.$('#gold-crowns').val());

			this.model.attributes.player.set('backpackItems', [ this.$('#backpack1').val(), 
				this.$('#backpack2').val(), 
				this.$('#backpack3').val(), 
				this.$('#backpack4').val(), 
				this.$('#backpack5').val(), 
				this.$('#backpack6').val(), 
				this.$('#backpack7').val(), 
				this.$('#backpack8').val() ]);

			this.model.attributes.player.set('specialItems', this.$('#special-items').val());
			this.model.attributes.player.set('notes', this.$('#notes').val());

			this.model.attributes.player.save(null, {
				success: function() {
					$('#save-modal').foundation('reveal', 'open');
				} 
			});
		}, 

		quitGame: function() {
			$('#quit-modal').foundation('reveal', 'open');
		}, 

		closeSavePopup: function(event) {
			event.preventDefault();
			$('#save-modal').foundation('reveal', 'close');
		}, 

		closeCombatWarningPopup: function(event) {
			event.preventDefault();
			$('#combat-warning-modal').foundation('reveal', 'close');
		}, 

		quitGameConfirm: function(event) {
			event.preventDefault();
			$('#quit-modal').foundation('reveal', 'close');
			Backbone.history.navigate('#home', true); 
		}, 

		closeQuitPopup: function(event) {
			event.preventDefault();
			$('#quit-modal').foundation('reveal', 'close');
		}, 

		navClick: function(target) {
			if (target == '#save') {
				this.saveGame();
			} else if (target == '#quit') {
				this.quitGame();
			} else {
				$('.content-pane').hide();
				$(target).show();
				$('footer').show();
				$(window).scrollTop(0);
			}
		}, 

		contentNavClick: function(event) {
			event.preventDefault();
			var target = $(event.target).attr('href');
			$('.nav-link[href="' + target + '"]').trigger('click');
		}, 

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this.el;
		}
	});
	return GameView;
});