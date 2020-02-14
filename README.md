# FoodZebra

> Order-for-pickup app that uses SMS to keep customers notified of progress

<!-- Badges -->

[![Build Status](https://travis-ci.com/bryce-mcmath/foodzebra.svg?branch=master)](https://travis-ci.com/bryce-mcmath/foodzebra)

FoodZebra is a responsive fullstack application made to model a restaurants online ordering process, from both the user's view and the restaurant's. It uses the Twilio API to notify both parties of changes in the order's status via SMS.

To learn more and see it in action, read further. Or visit it [live](https://ancient-woodland-75923.herokuapp.com/) and try making an order (of five items or less please.) You don't have to give us your phone number but receiving the notifications is sort of the fun part.

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

### Customer Demo:

![Customer Demo](https://github.com/bryce-mcmath/foodzebra/blob/master/docs/demo_customer.gif?raw=true)

### Operator Demo:

![Operator Demo](https://github.com/bryce-mcmath/foodzebra/blob/master/docs/demo_operator.gif?raw=true)

The above gifs demonstrate basic usage. For more gifs, screenshots, and the ERD we created at the start of this project, please navigate to the /docs directory from the root of this repo.

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

If you don't have Nodejs and npm installed, install them from [here.](https://nodejs.org/en/)

Set up a free ElephantSQL cloud database [here](https://customer.elephantsql.com/instance/create?plan=turtle) using the migration and seed files in /queries.

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

1. Fork it (<https://github.com/bryce-mcmath/foodzebra/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`) or issue branch (`git checkout -b issue/brokenThing`)
3. Commit your changes (`git commit -m 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new PR

## Meta

Wilson Wong – [wilwong89](https://github.com/wilwong89) – wilwong89@gmail.com

Bryce McMath – [bryce-mcmath](https://github.com/bryce-mcmath) – bryce.j.mcmath@gmail.com

## Known issues / bugs

- You can only order five items at a time due to our free (rate-limited) usage of ElephantSQL
- Bugs? What bugs?

_To add an issue, start a new one [here.](https://github.com/bryce-mcmath/foodzebra/issues)_

## Feature roadmap

### In the works

- Hook up add, update, delete menu routes to UI
- Hook up delete order routes to UI
- Hook up customer login, logout, register routes to UI

### Planned

- Switch from semantic-vue to vuetify
- Autofill forms if customer is logged in
- Add a dashboard with basic analytics for operators
- Add ability to send custom SMS to any unfulfilled order

_If you'd like to add a feature yourself, please see the [Contributing](#contributing) guidelines._

## Acknowledgements

- We only had a week to do this and we used some tools we were interested in but not yet familiar with
- It was a blast
- I'm very tired

## ![FoodZebra](https://github.com/bryce-mcmath/foodzebra/blob/master/docs/large_foodzebra.png?raw=true)