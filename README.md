# Scheduler

> Client side of a fullstack React app that utilizes websockets to keep users updated of interview bookings

<!-- Badges -->

[![Build Status](https://travis-ci.com/bryce-mcmath/scheduler.svg?branch=master)](https://travis-ci.com/bryce-mcmath/scheduler)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Scheduler is a responsive and fullstack application made to model an interview booking system, complete with unit, integration, and end-to-end tests. It uses websockets to keep all current users updated of changes other users make and update the state of the app without having to refresh. It was made with modern react, including custom hooks and reducers.

To learn more and see it in action, read further. Or visit it [live](https://suspicious-hodgkin-62d695.netlify.com/) and try adding, editing, or deleting an interview yourself

## Table of contents

- [Usage](#usage)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installing and running](#installing-and-running)
- [Deployment](#deployment)
- [Built with](#built-with)
- [Contributing](#contributing)
- [Meta](#meta)
- [Known issues / bugs](#known-issues-/-bugs)
- [Feature roadmap](#feature-roadmap)
  - [In the works](#in-the-works)
  - [Planned](#planned)
- [Acknowledgements](#acknowledgements)

## Usage

<!-- Gifs -->

The above gif demonstrate basic usage. For more screencaps and other documentation, please navigate to the /docs directory from the root of this repo.

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

If you don't have Nodejs and npm installed, install them from [here.](https://nodejs.org/en/)

### Installing and Running

Clone this repository to your local machine, and in the root directory:

#### Setup

Install dependencies with `npm install`.

#### Running Webpack Development Server

```sh
npm start
```

#### Running Jest Test Framework

```sh
npm test
```

#### Running Storybook Visual Testbed

```sh
npm run storybook
```


## Deployment

After forking the project and setting up the cloud database and .env file as per the above steps, add your forked repo to Travis CI [here.](https://travis-ci.com/getting_started) After that, setup a Heroku instance following the guide [here,](https://devcenter.heroku.com/articles/getting-started-with-nodejs) add your environment variables with the Heroku dashboard, and add your api-key and app name to the .travis.yml file.

Congrats! Now everytime you push to master, you'll automatically check that installing and building works and then deploy if it does.

## Built with

- [Vue](https://vuejs.org/) - Front-end framework
- [semantic-ui-vue](https://semantic-ui-vue.github.io/)
- [axios](https://github.com/axios/axios) - Promise-based HTTP client
- [Sass](https://sass-lang.com/) - CSS pre-compiler to make styling easier
- [Nodejs](https://nodejs.org/en/) - Javascript runtime
- [Express](https://expressjs.com/) - Framework used for API in Node
- [PostgreSQL](https://www.postgresql.org/) - Open source object-relational database
- [ElephantSQL/AWS](https://www.elephantsql.com/) - Cloud database management
- [Travis CI](https://travis-ci.com/) - Continuous integration platform
- [Twilio](https://www.twilio.com/) - Comms API

## Contributing

1. Fork it (<https://github.com/bryce-mcmath/scheduler/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`) or issue branch (`git checkout -b issue/brokenThing`)
3. Commit your changes (`git commit -m 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new PR

## Meta

Bryce McMath – [bryce-mcmath](https://github.com/bryce-mcmath) – bryce.j.mcmath@gmail.com

## Known issues / bugs

- Bugs? What bugs?

_To add an issue, start a new one [here.](https://github.com/bryce-mcmath/scheduler/issues)_

## Feature roadmap

### In the works


### Planned


_If you'd like to add a feature yourself, please see the [Contributing](#contributing) guidelines._

## Acknowledgements

