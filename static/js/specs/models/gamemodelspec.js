describe('Model :: GameModel', function() {

	beforeEach(function() {
		var that = this,
		done = false;

		require(['models/gamemodel'], function(GameModel) {
			that.game = new GameModel();
			done = true;
		});

		waitsFor(function() {
			return done;
		}, 'Create Model');

	});

	afterEach(function() {
		var done = false,
		isDone = function() { return done; };

		this.game.destroy({
			success: function() {
				done = true;
			}
		});

		waitsFor(isDone);

	});

	describe('The GameModel object ', function() {

		it('should have the 5 URLs to the Project Aon Lone Wolf XML data', function() {
			runs(function(){
				expect(this.game).not.toBe(null);
				expect(this.game.get('data').length).toEqual(5);
			});
		});

		it('should have the 1st XML data URL as https://www.projectaon.org/en/xml/01fftd.xml', function() {
			runs(function(){
				expect(this.game).not.toBe(null);
				expect(this.game.get('data')[0]).toEqual('https://www.projectaon.org/en/xml/01fftd.xml');
			});
		});

		it('should have the 2nd XML data URL as https://www.projectaon.org/en/xml/02fotw.xml', function() {
			runs(function(){
				expect(this.game).not.toBe(null);
				expect(this.game.get('data')[1]).toEqual('https://www.projectaon.org/en/xml/02fotw.xml');
			});
		});

		it('should have the 3rd XML data URL as https://www.projectaon.org/en/xml/03tcok.xml', function() {
			runs(function(){
				expect(this.game).not.toBe(null);
				expect(this.game.get('data')[2]).toEqual('https://www.projectaon.org/en/xml/03tcok.xml');
			});
		});

		it('should have the 4th XML data URL as https://www.projectaon.org/en/xml/04tcod.xml', function() {
			runs(function(){
				expect(this.game).not.toBe(null);
				expect(this.game.get('data')[3]).toEqual('https://www.projectaon.org/en/xml/04tcod.xml');
			});
		});

		it('should have the 5th XML data URL as https://www.projectaon.org/en/xml/05sots.xml', function() {
			runs(function(){
				expect(this.game).not.toBe(null);
				expect(this.game.get('data')[4]).toEqual('https://www.projectaon.org/en/xml/05sots.xml');
			});
		});

		it('should have the 5 URLs to the Project Aon Lone Wolf web resources', function() {
			runs(function(){
				expect(this.game).not.toBe(null);
				expect(this.game.get('web').length).toEqual(5);
			});
		});

		it('should have the 1st web resource URL as https://www.projectaon.org/en/xhtml/lw/01fftd/', function() {
			runs(function(){
				expect(this.game).not.toBe(null);
				expect(this.game.get('web')[0]).toEqual('https://www.projectaon.org/en/xhtml/lw/01fftd/');
			});
		});

		it('should have the 2nd web resource URL as https://www.projectaon.org/en/xhtml/lw/02fotw/', function() {
			runs(function(){
				expect(this.game).not.toBe(null);
				expect(this.game.get('web')[1]).toEqual('https://www.projectaon.org/en/xhtml/lw/02fotw/');
			});
		});

		it('should have the 3rd web resource URL as https://www.projectaon.org/en/xhtml/lw/03tcok/', function() {
			runs(function(){
				expect(this.game).not.toBe(null);
				expect(this.game.get('web')[2]).toEqual('https://www.projectaon.org/en/xhtml/lw/03tcok/');
			});
		});

		it('should have the 4th web resource URL as https://www.projectaon.org/en/xhtml/lw/04tcod/', function() {
			runs(function(){
				expect(this.game).not.toBe(null);
				expect(this.game.get('web')[3]).toEqual('https://www.projectaon.org/en/xhtml/lw/04tcod/');
			});
		});

		it('should have the 5th web resource URL as https://www.projectaon.org/en/xhtml/lw/05sots/', function() {
			runs(function(){
				expect(this.game).not.toBe(null);
				expect(this.game.get('web')[4]).toEqual('https://www.projectaon.org/en/xhtml/lw/05sots/');
			});
		});

	});
});