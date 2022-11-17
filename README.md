# Northcoders House of Games API

## Background
**Please note: due to NHS Digital wifi restrictions this cannon be hosted atm**

This is a backend project which builds an API server using express.js for the purpose of accessing data programmatically from the nc_games database via PostgreSQL (psql). 

The data includes reviews of games of different categories. The API allows users to view game review information and can also be filtered by category. The API also allows users to add and delete comments on reviews as well as vote (up/down) on these comments. 

## SET UP
### 1. Cloning 
Firstly, clone this repo by navigating to the directory that you would like to store the project then run:

```
git clone https://github.com/hlilya/be-final-project.git
```

### 2. Install dependencies
To install the dependencies run:

```
npm install
```

### 3. Set up .ENV files
We have two databases in this project
One for _dev data_ and another for _test data_.

You will need to create two .env files to run this repo locally:

1. `.env.test` which should contain `PGDATABASE=nc_games_test`
2. `.env.development` which should contain `PGDATABASE=nc_games`


### 4. Seed local databases
To seed the local databases the dependencies run:
``` 
npm run setup-dbs
npm run seed
```

### 5. Run jest (test-driven-development)
* To run all of the jest tests: `npm test`
* To run tests for the API functionality only:  `npm test app`
* To run tests for the util functions only:  `npm test util`

### 6. Minimum requirements
node: v16.17.1

psql (PostgreSQL): 14.5