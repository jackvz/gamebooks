from flask import Flask
from flask import request
from flask import Response
from flask import render_template
from flask import make_response
from whitenoise import WhiteNoise
import requests

import jinja2
import os
import datetime

import cgi
import urllib.request, urllib.parse, urllib.error
import http.client
import re
import urllib.request, urllib.error, urllib.parse
import string

JINJA_ENVIRONMENT = jinja2.Environment(
	loader=jinja2.FileSystemLoader(os.path.dirname(__file__)))

app = Flask(__name__)
app.wsgi_app = WhiteNoise(app.wsgi_app, root='./static')

@app.route('/')
def IndexPage():
	if request.method == 'GET':
		template = JINJA_ENVIRONMENT.get_template('templates/index.html')
		return render_template(template)

@app.route('/triggercache')
def TriggerCachePage():
	if request.method == 'GET':
		template = JINJA_ENVIRONMENT.get_template('templates/triggercache.html')
		return render_template(template)

@app.route('/app.appcache')
def OfflineApplicationCacheManifest():
	def getTitleFilePaths(title_res):
		data_query = '\n'
		if request.args.get('app','') == 'true':
			data_query = '&type=jsonp&callback=fback\n'

		title_files = []
		temp_files = title_res.readlines()

		# Add the XML data file, cached either as xml for the web or jsonp for apps
		title_files.append(temp_files[0].replace('\n', '') + data_query) 

		title_images = temp_files[1] # Get the images URL
		url = title_images
		pattern = '<a href=".*?">(.*\.png)</a>'
		response = requests.get(url).text

		for image in re.findall(pattern, response):
			title_files.append(url.replace('\n', '') + image + '\n')
		last_file_index = len(title_files) - 1
		title_files[last_file_index] = title_files[last_file_index].rstrip('\n') # Get rid of the last newline

		return title_files

	if request.method == 'GET':
		# Check the cookie value to see if the user has agreed to the terms, 
		# and if so then add the projecaon.org resource files to the cache manifest
		app_files = []
		appmod_files = []
		ui_files = []
		title1_files = []
		title2_files = []
		title3_files = []
		title4_files = []
		title5_files = []
		title6_files = []
		title7_files = []
		title8_files = []
		agreed = 0
		if 'agreed' in request.cookies:
			agreed = request.cookies['agreed']
		with open('./app/resources/app.res') as app_res:
			app_files = app_res.readlines()
		with open('./app/resources/appmod.res') as appmod_res:
			appmod_files = appmod_res.readlines()
			appmod_files = [file.replace('\n', '') + '?0.2.205\n' for file in appmod_files]
			appmod_files[-1] = appmod_files[-1].replace('\n', '') # Remove the last line's line break
		if agreed == '1':
			with open('./app/resources/ui.res') as ui_res:
				ui_files = ui_res.readlines()
			with open('./app/resources/title1.res') as title1_res:
				title1_files = getTitleFilePaths(title1_res)
			with open('./app/resources/title2.res') as title2_res:
				title2_files = getTitleFilePaths(title2_res)
			with open('./app/resources/title3.res') as title3_res:
				title3_files = getTitleFilePaths(title3_res)
			with open('./app/resources/title4.res') as title4_res:
				title4_files = getTitleFilePaths(title4_res)
			with open('./app/resources/title5.res') as title5_res:
				title5_files = getTitleFilePaths(title5_res)

		template_values = {
			'datetimestamp': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'), 
			'app_files': app_files, 
			'appmod_files': appmod_files, 
			'ui_files': ui_files, 
			'title1_files': title1_files, 
			'title2_files': title2_files, 
			'title3_files': title3_files, 
			'title4_files': title4_files, 
			'title5_files': title5_files, 
			'title6_files': title6_files, 
			'title7_files': title7_files, 
			'title8_files': title8_files 
		}
		template = JINJA_ENVIRONMENT.get_template('templates/app.appcache')

		resp = make_response(render_template(template, **template_values))

		resp.headers['Content-Type'] = 'text/cache-manifest'

		# Do not cache the cache manifest file.
		resp.headers['cache-control'] = 'no-cache, no-store, must-revalidate'
		resp.headers['Pragma'] = 'no-cache'
		resp.headers['Expires'] = '0'

		return resp

@app.route('/totalfiles')
def GetTotalFiles():
	def getTitleFileCount(title_res):
		title_file_count = 0
		temp_files = title_res.readlines()
		title_file_count += 1 # Add the XML data file
		title_images = temp_files[1] # Get the images URL
		url = title_images
		pattern = '<a href=".*?">(.*\.png)</a>'
		response = requests.get(url).text
		for image in re.findall(pattern, response):
			title_file_count += 1
		return title_file_count

	if request.method == 'GET':
		app_file_count = 0
		appmod_file_count = 0
		ui_file_count = 0
		title1_file_count = 0
		title2_file_count = 0
		title3_file_count = 0
		title4_file_count = 0
		title5_file_count = 0
		title6_file_count = 0
		title7_file_count = 0
		title8_file_count = 0
		agreed = 0
		if 'agreed' in request.cookies:
			agreed = request.cookies['agreed']
		with open('./app/resources/app.res') as app_res:
			app_file_count = len(app_res.readlines())
		with open('./app/resources/appmod.res') as appmod_res:
			appmod_file_count = len(appmod_res.readlines())
		if agreed == '1':
			with open('./app/resources/ui.res') as ui_res:
				ui_file_count = len(ui_res.readlines())
			with open('./app/resources/title1.res') as title1_res:
				title1_file_count = getTitleFileCount(title1_res)
			with open('./app/resources/title2.res') as title2_res:
				title2_file_count = getTitleFileCount(title2_res)
			with open('./app/resources/title3.res') as title3_res:
				title3_file_count = getTitleFileCount(title3_res)
			with open('./app/resources/title4.res') as title4_res:
				title4_file_count = getTitleFileCount(title4_res)
			with open('./app/resources/title5.res') as title5_res:
				title5_file_count = getTitleFileCount(title5_res)

		template_values = {
			'total_files': (
				ui_file_count + app_file_count + appmod_file_count + 
				title1_file_count + 
				title2_file_count + 
				title3_file_count + 
				title4_file_count + 
				title5_file_count + 
				title6_file_count + 
				title7_file_count + 
				title8_file_count - 1
			)
		}
		template = JINJA_ENVIRONMENT.get_template('templates/totalfiles')

		return render_template(template, **template_values)

@app.route('/data', methods=['GET', 'POST'])
def ProxyController():
	def doProxy(p, is_post):

		# Only download the XML content from projectaon.org if the user has agreed to the terms.
		agreed = 0
		if 'agreed' in request.cookies:
			agreed = request.cookies['agreed']
		with open('./app/resources/app.res') as app_res:
			app_files = app_res.readlines()
		if agreed == '1':

			title = ''

			if p.get('title','') == '':
				return 'resource location not found'
			else:
				title = p['title']

				dataType = 'xml'
				if p.get('type','') == 'jsonp':
					dataType = 'jsonp'
				callbackFn = ''
				if p.get('callback','') != '':
					callbackFn = p['callback']

				url = ''
				if title == '1':
					url = 'https://www.projectaon.org/en/xml/01fftd.xml' 
				if title == '2':
					url = 'https://www.projectaon.org/en/xml/02fotw.xml' 
				if title == '3':
					url = 'https://www.projectaon.org/en/xml/03tcok.xml' 
				if title == '4':
					url = 'https://www.projectaon.org/en/xml/04tcod.xml' 
				if title == '5':
					url = 'https://www.projectaon.org/en/xml/05sots.xml' 

				valid_content = '';
				if url != '':
					if is_post:
						data = urllib.parse.urlencode(p)
						req = urllib.request.Request(url, data)
						result = requests.get(url)
						valid_content = result.text
					else:
						result = requests.get(url)
						valid_content = result.text

					# remove general directives
					valid_content = valid_content.replace('%general.links;', '')
					valid_content = valid_content.replace('%xhtml.links;', '')
					valid_content = valid_content.replace('%general.inclusions;', '')
					valid_content = valid_content.replace('&link.project.website;', '')
					valid_content = valid_content.replace('&inclusion.joe.dever.bio.lw;', '')
					valid_content = valid_content.replace('&inclusion.gary.chalk.bio.lw;', '')
					valid_content = valid_content.replace('&link.staff.contact;', '')
					valid_content = valid_content.replace('&inclusion.project.aon.license;', '')
					valid_content = valid_content.replace('&inclusion.joe.dever.endowment;', '')

					# replace non-valid special characters with html special characters
					valid_content = re.sub('<ch.ellips/>', '&amp;hellip;', valid_content);
					valid_content = re.sub('<ch.lellips/>', '&amp;hellip;', valid_content);
					valid_content = re.sub('<ch.emdash/>', '&amp;mdash;', valid_content);
					valid_content = re.sub('<ch.endash/>', '&amp;ndash;', valid_content);
					valid_content = re.sub('<ch.apos/>', '&amp;rsquo;', valid_content);
					valid_content = re.sub('<ch.blankline/>', '<br />', valid_content);
					valid_content = re.sub('<ch.minus/>', '-', valid_content);
					valid_content = re.sub('<ch.ampersand/>', '&amp;amp;', valid_content);
					valid_content = re.sub('<ch.thinspace/>', ' ', valid_content);

					# replace html special characters
					valid_content = re.sub('<ch\.(.+?)/>', r'&amp;\1;', valid_content);

				if dataType == 'jsonp':
					# get rid of new lines
					valid_content = re.sub(r'\r', '', valid_content);
					valid_content = re.sub(r'\n', '', valid_content);

					resp = Response(callbackFn + '(\'' + valid_content + '\');')
					resp.headers['Content-Type'] = 'text/javascript'
					return resp
				else:
					resp = Response(valid_content)
					resp.headers['Content-Type'] = 'text/xml'
					return resp

	# handles get requests
	if request.method == 'GET':
		return doProxy(request.args, False)

	# handles post requests
	if request.method == 'POST':
		return doProxy(request.form, True)

if __name__ == "__main__":
	app.run(host='0.0.0.0', port='8000')
