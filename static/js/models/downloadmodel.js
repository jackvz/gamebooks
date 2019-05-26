define([
	'underscore', 
	'backbone'
	], function(_, Backbone) {

	var DownloadModel = Backbone.Model.extend({
		defaults: {
			verbose: false,
			status : [],
			filesDownloaded: 0,
			totalFiles: 0, 
			completed: false
		},

		clear: function() {
			this.status = [];
			this.destroy();
		}
	});
	return DownloadModel;
});