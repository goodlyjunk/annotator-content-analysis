# TextThresher

An annotation interface for detailed text annotation by crowdworkers along researcher-defined topics of interest. Under development for the
[Deciding Force Project](http://www.decidingforce.org/). Currently, this app only runs locally.

Built with [React](https://facebook.github.io/react/) and [Redux](https://github.com/reactjs/redux).

#Frontend

####To setup

From the project directory, run

```
npm install
bower install
```

You might also want to install Devtools for [React](https://facebook.github.io/react/blog/2015/09/02/new-react-developer-tools.html). For Redux, you can install the [Google Chrome extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) or use the other methods described in the README [here](https://github.com/zalmoxisus/redux-devtools-extension).

####To develop

In the project directory, run `npm run dev` and start the Docker server (described below) to build and serve the development app.

####To deploy

To deploy the fronted:

In the project dictory, run `npm run deploy` and set up the Docker server as described above. The output files will be written to the `dist` folder.

**NOTE:** this command currently currently not fully functional and needs to be upgraded. Running `npm run dev` instead will show the most recent version of the code.

#Backend

####To setup

The backend is supported by Docker.

To install Docker:
* For OS X, go [here](https://docs.docker.com/docker-for-mac/).
* For Windows, go [here](https://docs.docker.com/docker-for-windows/).
* For Ubuntu and other Linux distributions, go [here](https://docs.docker.com/engine/installation/linux/ubuntulinux/).

####To run the Docker server

Go to the project directory: 

1. Run `docker-compose up`.
2. Run `./init_docker.sh`.

Once the containers are seeded, run `docker-compose start`. After this, you should be able to make your first query.

**Note:** If you are setting up Docker a second time, you may want to first remove the database container with `docker-compose rm db`.

####To develop

Start the containers, which should already be seeded, with `docker-compose start`. 

To view a browsable interface for the queries, navigate to `localhost:5000/api`. Another browsable interface is available [on Heroku](http://text-thresher.herokuapp.com/api/), but is not fully up-to-date.

####To Deploy

To deploy the backend to Heroku:

- push the code to Heroku `git push heroku`

- Reset the db with `heroku pg:reset postgres --confirm text-thresher`

- Prepare the database. You have two options.

   - To initialize the database but not load data, run `heroku run python manage.py syncdb`

   - To initialize the database with a copy of your local data, verify that your
local postgres database has data and works when you run the app locally,
then run `heroku pg:push LOCAL_DB_NAME postgres`

- Visit the [application](http://text-thresher.herokuapp.com/api/) to make sure it worked.