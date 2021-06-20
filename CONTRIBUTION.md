# Contributing to Crafty-shop

The goal of this file is to make contributing to this project as easy and transparent as possible.

---

## Pull requests
 - Clone the repo and create your branch from master with `feature/name` or `issue/name`.
 - If you've added code that should be tested, add tests.
 - If you've changed APIs, update the documentation.

## Coding Style
 - Don't overwrite any of the pre-commits
 - I use standard coding rules, so please check that your code follows it
 - Test everything

## Setting up

- Clone the repo using `git clone git@github.com:MohabMohamed/crafty-shop.git`

- Install [Nodejs](https://nodejs.org)

- Run `npm install`

- Run `cp config/example.env config/dev.env`
  
- Run `cp config/example.env config/test.env`
  
- Change `config/test.env` and `config/dev.env` to have your enviroment variables

- Run `npm run prepare`
  
- Run `npm run dev`
