# Northcoders House of Games API

## Background

We will be building an API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture.

The database will be PSQL, and you can interact with it using [node-postgres](https://node-postgres.com/).

## 1. Creating environment variables

We have two databases in this project.
One for _dev data_ and another for _test data_.

You will need to create two .env files to run this repo locally:

1. `.env.test` which should contain `PGDATABASE=nc_games_test`
2. `.env.development` which should contain `PGDATABASE=nc_games`
