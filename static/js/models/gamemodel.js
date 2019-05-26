define([
	'underscore', 
	'backbone' 
	], function(_, Backbone) {

	var GameModel = Backbone.Model.extend({
		defaults: {
			data: [
				'https://www.projectaon.org/en/xml/01fftd.xml', 
				'https://www.projectaon.org/en/xml/02fotw.xml', 
				'https://www.projectaon.org/en/xml/03tcok.xml', 
				'https://www.projectaon.org/en/xml/04tcod.xml', 
				'https://www.projectaon.org/en/xml/05sots.xml' 
			], 
			web: [
				'https://www.projectaon.org/en/xhtml/lw/01fftd/', 
				'https://www.projectaon.org/en/xhtml/lw/02fotw/', 
				'https://www.projectaon.org/en/xhtml/lw/03tcok/', 
				'https://www.projectaon.org/en/xhtml/lw/04tcod/', 
				'https://www.projectaon.org/en/xhtml/lw/05sots/' 
			] 
		}, 

		clear: function() {
			this.destroy();
		}
	});
	return GameModel;
});