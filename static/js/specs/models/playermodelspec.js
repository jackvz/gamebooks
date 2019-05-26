describe('Model :: PlayerModel', function() {

	beforeEach(function() {
		var that = this,
		done = false;

		require(['models/playermodel'], function(PlayerModel) {
			that.player = new PlayerModel();
			done = true;
		});

		waitsFor(function() {
			return done;
		}, 'Create Model');

	});

	afterEach(function() {
		var done = false,
		isDone = function() { return done; };

		this.player.destroy({
			success: function() {
				done = true;
			}
		});

		waitsFor(isDone);

	});

	describe('A PlayerModel object ', function() {

		it('can be created with default attribute values', function() {
			runs(function(){
				expect(this.player).not.toBe(null);
				expect(this.player.get('name')).toEqual('');

				expect(this.player.get('combatSkill')).toEqual(null);
				expect(this.player.get('endurancePoints')).toEqual(null);
				expect(this.player.get('initialEndurancePoints')).toEqual(null);
			});
		});

	});
});