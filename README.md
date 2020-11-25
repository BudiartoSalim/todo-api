# todo-api
Simple todo API for nextjs todo app practice, created using Typescript and Express, with PostgreSQL Database. Does NOT use ORM.

REMEMBER TO SETUP ENV VARIABLES AND CREATE THE DB FIRST

Commands (executed at Root directory):
- npm run devmigrate = runs table migrations in /src folder (for devs) to DB with name defined in env variable DB_NAME
- npm run dev = running the api in dev mode
- npm run build = build the application for deployment into dist folder
- npm run migrate = creating tables on the database written in env variable DB_NAME on built application
- npm run start = runs the built application

# ENDPOINTS
Endpoints without header
- POST /login => req.body = {email:string, password:string} ; response = {message:string, access_token?:string, errorType?:string}
- POST /register => req.body = {email:string, username:string, password:string} ; response = {message:string, errorType?:string}

Endpoints requiring header = access_token:string
- GET /todo => response = [todo{id:integer, title:string, description:string, status_description:string, status_id:integer}] || {message:string, errorType?:string}
- POST /todo => req.body = {title:string, description:string} ; response = todo[] || {message:string, errorType?:string}
- PUT /todo/:todoId => req.body = {title:string, description:string, status_id:integer} ; response = todo[] || {message:string, errorType?:string}
- DELETE /todo/:todoId => response = {deleted:todo, data: todo[]} || {message:string, errorType?:string}

all todo endpoint will automatically refetch the new todos after the changes.

DELETE will return both the deleted todo and the new fetched todos after deletion thus have a slightly different response schema.
