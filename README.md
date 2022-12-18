## Python Django React Demo

This is just a personal tutorial for me to learn Django and React. I'm starting from nothing so first step is to install the tools necessary.

### Installation

__Note: djangorestframwork will not be necessary if building a non-restful service__
1. Install Django

    pip install django
    pip install djangorestframework

2. Install react

    brew install node
    npm install - save react react-dom

### Project Setup
Next need to setup the django and react folders. Also would help development is you export the asbsolute path of the project folder as PYTHONPATH

    export PYTHONPATH="path/to/project/dir"

#### Django

These commands will set up a project and start a server
    django-admin startproject $APPNAME
    cd $APPNAME
    python manage.py startapp $(api|backend)
    python manage.py runserver

Some things to look out for is that in `python_django_react_demo/backend/backend/settings.py` there is a default secret. The key here is used to sign session cookies if an attacker had access to this they could start signing their own cookies and changing the values in them. It can also start apps in debug mode.

Need to connect the api or backend properly in django.
In `$APPNAME/settings.py` under `#Application Definition` as an installed app add the api config.

    INSTALLED_APPS = [
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',

        'api.apps.ApiConfig'
        'rest_framework'
    ]

#### Django Views and Routes
The routes or views for the application go into this file $APP_NAME/api|backend/views.py. Check that file for example views and how that should be written.

Each view would need to be registered in the urls.py file located $APP_NAME/$APP_NAME/urls.py. You need to import the views and then register them in the `url_patterns`. Visit the urls.py file to see examples.

#### Django Models and Databases
Models go into $APP_NAME/api|backend/models.py. Check the file to see example models.

Whenever you have new models that need to be created need to create the migration scripts. And then migrate the database.

To create the migration scripts:
    python manage.py makemigrations

Next to migrate and create the tables from the models:
    python manage.py migrate

Django creates a Users table by default and an admin panel for people to login and use it. But need to create a super user first.
    python manage.py createsuperuser

After creating the user you can login to the admin panel at url:port/admin with the created credentials. But the models that you created won't be available unless you register them with the admin panel.

In the file $APP_NAME/api|backend/admin.py, you need to import the models and register them. Here is an example of how to register models in the admin.py file.

    from api.models import {{MODEL}}
    admin.site.register({{MODEL}})

##### Getting and Serialzing Data from DB
Need to serialize data before sending the response see `$APP_NAME/api|backend/serializers.py` for an example

For examples of retrieving data from the Django Models see `$APP_NAME/api|backend/views.py`

#### React

To set up the frontend React project

    npx create-react-app frontend
    cd frontend
    npm run build
    npm start

The last command `npm start` will run on 0.0.0.0 need to run `export HOST=localhost` to just run on localhost.

    export $(grep -v '^#' env.local | xargs -0) #this assumes that an env.local is created

##### Setting up folders

In the `$APP_NAME/frontend/src` folder need to create the components and pages folders. The main bulk of the app and the procvessing goes into the `$APP_NAME/frontend/src/App.js` file.

##### React Routes
See $APP_NAME/frontend/src/App.js for example of how routes look.
See $APP_NAME/frontend/src/index.js as well.

#### Connect React and Django

Need to finally connect the two apps.

React application folder needs to be in the root of the Django application folder. Django requires that the React app be built.

    cd frontend
    npm run build

Inside Django's setting.py file need to tell it about the react build files that were just created. In TEMPLATES at DIRS.

Example

    TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [ BASE_DIR / 'frontend/build'], #this is telling Django where the templates are
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

In the settings.py the static files directory also needs to be added.
Example

    STATICFILES_DIRS = [
        BASE_DIR / 'frontend/build/static'
    ]

After you need to go to `$APP_NAME/urls.py` and tell django which url is the react files. Below is an example of that.
    
    from django.urls import re_path
    from django.views.generic import TemplateView
    urlpatterns = [
        re_path(r".*", TemplateView.as_view(template_name="index.html"))
    ]

This is the final connection but every time changes are made you must rebuild the react app with the following command.

    npm run build

Also in frontend/package.json need to set this and restart the react server for the changes to propogate.

    proxy: "http://127.0.0.1:8000"
