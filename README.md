# todo-api
Simple todo API for nextjs todo app practice, created using Typescript and Express, with PostgreSQL Database. Does NOT use ORM.

REMEMBER TO SETUP ENV VARIABLES AND CREATE THE DB FIRST

Commands (executed at Root directory):
- npm run devmigrate = runs table migrations in /src folder (for devs) to DB with name defined in env variable DB_NAME
- npm run dev = running the api in dev mode
- npm run migrate = creating tables on the database written in env variable DB_NAME