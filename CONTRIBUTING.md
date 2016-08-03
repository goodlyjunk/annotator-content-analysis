#Overview

Hi! Glad you want to add code to this project. First, a brief overview of what's gone into this repo and some suggestions on how to get started using it.

Formally, this repository contains a Redux app written with ES6 JavaScript, styled with Sass, and served with hotloading and module support from Webpack. It relies on a backend with a RESTful API, which is a Django server running PostgreSQL in Docker. 

The section "Uh, where does the code even start?" gives a brief overview. The two parts after that detail the frontend and backend stacks, respectively.

#Uh, where does the code even start?

The main body of code for the frontend is in the `app` folder. Upon first loading, `index.js` adds a `Router` component, which uses `routes.js` to decide what React component to render at its child at specific routes/urls. At `http://localhost:3001/app/#/topics/0`, React renders `TopicHighlighter` as the child of the `App` component. 

When `App` from `app.js` was loaded in `index.js`, it called `configureStore` from `appStore.js`, which set up Redux. This call in turn initializes the reducers, which perform the proper (synchronous for now) API calls from `api.js` to the back end so there's data (currently the news articles) to display. 

The backend code is briefly summarized below:

First of all, raw data is loaded to the database by executing `load_data.py` (as what you can see in `README`). Sample raw data is located in `data/sample/schema/` and `data/sample/article/`. The schema is basically some questions (and child questions) related to an article. `load_data.py` will call data parsers in these files: `parse_schema.py`, `data/parse_schema.py` and `data/parse_document.py`. The two parser functions (i.e. `parse_schema()` and `parse_document()`)in `data/` parses specific articles and schemas related to that article. The parser in `parse_schema.py` (note that it's the one in the root folder!) is an object called `TopicsSchemaParser`, and it loads specific topics and schemas related to the article to our data models in `thresher/models.py`. 

The backend features a RESTful API and you can view it via browser. `thresher/urls.py` provides endpoints for you to access. `thresher/views.py` provides functions and models that defines how you view data via browser. `thresher/views.py` will call serializers in `thresher/serializer.py` to output data stored in models in an organized way.

`thresher_backend/` contains management files for this django project. `docker-compose.yml`, `Dockerfile`, `init_docker.sh` and `reset_db.sh` are for running the backend locally with Docker.

#The frontend stack

* Redux
* React
* ES6
* Sass
* Webpack

###What's React?

React is like an extension of JavaScript that allows you to write markup HTML inline with logic. Each part of a page should have its own React component, and a React component, once created, can be treated as an HTML tag. For example, once `SomeReactComponent` is created, it can be used as HTML tag `<SomeReactComponent />`.

React allows you to focus on presentational code that determines what to render on the page, and you can treat the presentational code as funnels which accept data and produce the correct visual change.

The React docs aren't so great - more information on React is included in the guide linked to in the **Redux** section. 

###What's Redux?

Redux is a framework exceptionally good for building understandable and manageable UIs, because of its unified state, unidirectional data flow, and pure functional mutations of state. The Redux docs ARE good, and you should read them until at least like the section labeled 'Advanced'. This one is the hardest to understand, after React. Read up and ask questions.

A brief overview of the Redux flow: when using Redux, there is a single state for the entire application. **Reducers** return certain parts of the state. When an event is triggered, a JavaScript object, called an **action**, representing the event, is sent to all the reducers. The reducers then, based on the action's **type**, create a new Redux state (as Redux state is immutable), and a new Redux state is assembled. Now that we have a new, complete state, the React components are re-rendered accordingly.

If you want more information, I wrote a hopefully comprehensive guide on React and Redux [here](https://gist.github.com/JasmineDeng/764dcd7be22288fadfe95bc83f051cd8).

###What's ES6?

ES6 is the next language release of JavaScript. It is made available now by the developer community of Babel, which also transpiles ES6 to ES5 (the current JavaScript release). Essentially, ES6 changed ES5 syntax to become prettier and more readable.

Some major changes in ES6 involve: default values, arrow functions, template literals, the `let` and `const` keywords, etc. A full list of the new features in ES6 can be found [here](http://es6-features.org/).

###What's Sass?

Syntactically Awesome StyleSheets - one of the leading preprocessors of CSS, it is a preprocessor that allows Sass code to be processed into ordinary CSS. You can do this most directly via `sass input.scss output.css`. Sass essentially changes the syntax of CSS to make it easier to use. The current Sass 3.0 is also called "sassy css".

Variables, calculations, mixins, and nesting all help CSS scale way better. A quick guide to Sass can be found [here](http://sass-lang.com/guide).

###What's Webpack?

Webpack is a module bundler. It takes in a bunch of files (HTML, JavaScript, CSS, SCSS, etc.) and turns it into something that can be provided to the client.

The main benefits of Webpack are its powerful hot module reloading (instant updates to React components without refreshing), lazy loading (it only loads what you need), and the efficiency with which it detects, packages, and sends over changes and modules. 

It produces similar results to Grunt and Gulp, but you don't need to write as much code. All the code for Webpack can be found in the `webpack` folder. 

#The backend stack

* Django REST Framework
* PostgreSQL
* Docker

###What's Django REST Framework? 

Django REST framework is a powerful and flexible toolkit for building Web APIs.

Some reasons you might want to use REST framework:

1. The Web browsable API is a huge usability win for your developers.
2. Authentication policies including optional packages for OAuth1a and OAuth2.
3. Serialization that supports both ORM and non-ORM data sources.
4. Customizable all the way down - just use regular function-based views if you don't need the more powerful features.
5. Extensive documentation, and great community support.

And here's a brief intro to Django:

Django is a high-level Python Web framework that encourages rapid development and clean, pragmatic design. Built by experienced developers, it takes care of much of the hassle of Web development, so you can focus on writing your app without needing to reinvent the wheel. It’s free and open source.

###What's PostgreSQL?

PostgreSQL is a powerful, open source object-relational database system. It has more than 15 years of active development and a proven architecture that has earned it a strong reputation for reliability, data integrity, and correctness. It runs on all major operating systems, including Linux, UNIX (AIX, BSD, HP-UX, SGI IRIX, Mac OS X, Solaris, Tru64), and Windows. It is fully ACID compliant, has full support for foreign keys, joins, views, triggers, and stored procedures (in multiple languages). It includes most SQL:2008 data types, including INTEGER, NUMERIC, BOOLEAN, CHAR, VARCHAR, DATE, INTERVAL, and TIMESTAMP. It also supports storage of binary large objects, including pictures, sounds, or video. It has native programming interfaces for C/C++, Java, .Net, Perl, Python, Ruby, Tcl, ODBC, among others, and exceptional documentation.

###What's Docker?

Docker is an open-source project that automates the deployment of applications inside software containers.

Docker containers wrap up a piece of software in a complete filesystem that contains everything it needs to run: code, runtime, system tools, system libraries – anything you can install on a server. This guarantees that it will always run the same, regardless of the environment it is running in.

#What's ____?

I've tried to enumerate all the interesting and useful parts of all the above, so that you can Google the pieces easily. Developer support for this stuff is all great since it's pretty much cutting edge and widely accepted as the way to go. 

The only thing we're not doing which would be great but not possible (Python has too many benefits for research) is isomorphic Redux, which just means the server also is in JavaScript and runs Redux. 

#Additional information

###React Routing 

The part of the url after the `#` becomes the route fed into `routes.js`. The route for each `Route` tag is decided by the `path` property. The default url `http://localhost:3001/app/#/topics/0` means that the `App` and `TopicHighlighter` component are both rendered, with `TopicHighlighter` as the child component of `App` and the `0` in the url the `:articleId` parameter for that `Route`. Thus, `/` only renders `App`, while going to `/topics/0` then renders `TopicHighlighter` as the child of the `App` component. The same idea can be applied to the `Quiz` component at the path `/quiz`.
