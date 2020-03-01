# Scheduler

> Client side of a fullstack React app that utilizes websockets to keep users updated of interview bookings

<!-- Badges -->

[![build status](https://img.shields.io/circleci/build/github/bryce-mcmath/scheduler/master?label=circleci)](https://circleci.com/gh/bryce-mcmath/scheduler)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Scheduler is a responsive and fullstack application made to model an interview booking system, complete with unit, integration, and end-to-end tests. It uses websockets to keep all current users updated of changes other users make and update the state of the app without having to refresh. It was made with modern react, including custom hooks and reducers.

To learn more and see it in action, read further. Or visit it [live](https://suspicious-hodgkin-62d695.netlify.com/) and try adding, editing, or deleting an interview yourself

## Table of contents

- [Usage](#usage)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installing and running](#installing-and-running)
- [Running the Tests](#running-the-tests)
- [Built with](#built-with)
- [Contributing](#contributing)
- [Meta](#meta)
- [Known issues / bugs](#known-issues-/-bugs)
- [Feature roadmap](#feature-roadmap)
  - [In the works](#in-the-works)
  - [Planned](#planned)
- [Acknowledgements](#acknowledgements)

## Usage

<!-- Gif -->
![Scheduler Usage](https://raw.githubusercontent.com/bryce-mcmath/scheduler/master/docs/demo.gif)

The above gif demonstrate basic usage. For more screencaps and any other documentation, please navigate to the /docs directory from the root of this repo.

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Gonna be pretty hard for you to run on your own machine if you're not a LHL student or staff as it requires a fairly specific VM setup. If you are a LHL member, proceed

If you don't have Nodejs (version 10.x or above) and npm installed, install them from [here.](https://nodejs.org/en/)

### Installing and Running

Clone this repository and [this altered api repository](https://github.com/bryce-mcmath/scheduler-api) to your local machine:

#### Setup

Install dependencies with `npm install` in the root of both repos.

Follow the instructions in the README of the api repo to create and seed the database. **This section requires the LHL Vagrant setup.**

#### Running Webpack Development Server

In the root of both this repo and the api repo:

```sh
npm start
```

## Running the Tests

#### Running Unit and Integration Tests

In the root of this repo:

```sh
npm test
```

#### Running End-to-End Tests

In the root of this repo:

```sh
npm run cypress
```


## Built with

- [React](https://vuejs.org/) - Front-end framework
- [axios](https://github.com/axios/axios) - Promise-based HTTP client
- [Sass](https://sass-lang.com/) - CSS pre-compiler to make styling easier
- [Nodejs](https://nodejs.org/en/) - Javascript runtime
- [Express](https://expressjs.com/) - Framework used for API in Node
- [PostgreSQL](https://www.postgresql.org/) - Open source object-relational database
- [Heroku](https://www.heroku.com) - For deployment and hosted database
- [Circle CI](https://www.circleci.com) - Continuous integration platform
- [Jest](https://www.jestjs.io) - JS testing framework
- [Cypress](https://www.cypress.io) - JS end-to-end testing framework
- [ws](https://www.npmjs.com/package/ws) - Websocket client and server for Nodejs

## Contributing

1. Fork it (<https://github.com/bryce-mcmath/scheduler/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`) or issue branch (`git checkout -b issue/brokenThing`)
3. Commit your changes (`git commit -m 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new PR

## Meta

Bryce McMath – [bryce-mcmath](https://github.com/bryce-mcmath) – [bryce.j.mcmath@gmail.com](mailto:bryce.j.mcmath@gmail.com)

## Known issues / bugs

- Bugs? What bugs?

_To add an issue, start a new one [here.](https://github.com/bryce-mcmath/scheduler/issues)_

## Feature roadmap

### In the works

- 100% test coverage

### Planned

- Nothing!

_If you'd like to add a feature yourself, please see the [Contributing](#contributing) guidelines._

## Acknowledgements

- This project was created as part of the Lighthouse Labs curriculum although I added more to it than was required
- I also made a [small dashboard app](https://github.com/bryce-mcmath/scheduler-dashboard) that works in tandem with this one, although it's fairly boring. It was just done as an exercise to use class based components
