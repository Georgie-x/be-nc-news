Adding environment variables

This repo requires two files to be created(file contents in brackets):

.env.development    (PGDATABASE=nc_news)
.env.test           (PGDATABASE=nc_news_test)



This is the backend repo for NC news project by Georgie-x (August 2023 cohort). This repo holds information on users and articles. This backend repo is hosted at https://georgiex-news.onrender.com


Clone this repo: git clone https://github.com/Georgie-x/be-nc-news.git

Install dependencies: npm i

Seed local database: npm run setup-dbs THEN npm run seed

Add environmental variables: .env.development (PGDATABASE=nc_news) .env.test (PGDATABASE=nc_news_test)

Add to .gitignore: node_modules .env.* helper.sql helper.txt

Run tests: npm t

View DB and check tables: npm run helper

The NC news frontend repo can be found at: https://github.com/Georgie-x/fe-nc-news.git