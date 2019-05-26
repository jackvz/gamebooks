# [Lone Wolf Adventures](https://lonewolf.indecorous.tk/)

A web app featuring the 1980s Lone Wolf gamebooks. The app keeps track of players' progress, and saves their statistics and items as they read through the choose-your-own-adventure titles. Playable on the desktop and handheld devices. Offline support for playing on-the-go. 

[Forum](http://projectaon.proboards.com/index.cgi?board=lonewolfadventures)

[Screenshots](http://jackvz.github.io/lone-wolf-adventures/)

## Build

### Install [Python](https://www.python.org/)

### Start a Python [virtual environment](https://virtualenv.pypa.io/en/latest/)

Clone the repository and run:

```bash
virtualenv env
source env/bin/activate
pip3 install -r requirements.txt
```

### Run

```bash
python3 app/wsgi.py
```

Browse to [http://localhost:8000/](http://localhost:8000/)

[on hold]@todo: Rewrite in React
@todo: Automatic actions (action chart, random numbers etc.)
