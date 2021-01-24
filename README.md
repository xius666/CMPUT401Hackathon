# CMPUT401Hackathon

## Demo

https://infinite-thicket-76100.herokuapp.com/

## Build instructions

```
# Install the virtual environment
$ virtualenv env --python=python3

# Activation
$ source env/bin/activate

# Install the packages
$ pip install -r requirements.txt
```

## Run

```
# Apply all migrations
$ python manage.py migrate

$ python manage.py runserver
```

## API Document

API is based on 
* https://covid19-api.com/docs 
* https://rapidapi.com/api-sports/api/covid-193

## Deployment

Use Heroko to deploy the project
```
git push heroko main
```

## License
TODO