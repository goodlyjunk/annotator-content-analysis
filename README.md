# annotator-content-analysis

An annotation interface for detailed text annotation by crowdworkers along researcher-defined topics of interest. Under development for the
[Deciding Force Project](http://www.decidingforce.org/). Currently, this app only runs locally.

Built with [React](https://facebook.github.io/react/) and [Redux](https://github.com/reactjs/redux).

####To setup

From the project directory, run

```
npm install
bower install
```

The backend is supported by Docker.

To install Docker:
  * For Linux, go [here](https://docs.docker.com/engine/installation/). 
  * For OS X, go [here](https://docs.docker.com/engine/installation/mac/).
  * For Windows, go [here](https://docs.docker.com/engine/installation/windows/).

You might also want to install Devtools for [React](https://facebook.github.io/react/blog/2015/09/02/new-react-developer-tools.html). For Redux, you can install the [Google Chrome extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) or use the other methods described in the README [here](https://github.com/zalmoxisus/redux-devtools-extension).

####To run the Docker server

Go to the project directory and follow the instructions below:

1. Open up the Docker Quickstart Terminal and wait for the machine to start running.
2. On OSX, run `eval $(docker-machine env default)`.
3. Run `docker-compose up`.

The server should now be up and running. Initialize it by running `./init_docker.sh`. **[Perhaps not necessary to run ./init_docker.sh?]**

After this, you should be able to make your first query.

**Note:** If you are setting up Docker a second time, you may want to first remove the database container with `docker-compose rm db`.

####To develop

In the project directory, run `npm run dev` and set up the Docker server as described above to build and serve the development app.

To make your first query:

- Find your Docker machine's ip by running `docker-machine ip default` in the project directory. Let's say it is `192.168.99.100`.
- Browse to `http://192.168.99.100:5000/api`.

####To deploy

In the project dictory, run `npm run deploy` and set up the Docker server as described above. The output files will be written to the `dist` folder.

**NOTE:** this command currently is not fully functional and most likely will not work. Running `npm run dev` instead will show the most recent version of the code.