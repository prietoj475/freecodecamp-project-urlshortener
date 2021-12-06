# FCC API Project: URL Shortener Microservice

## About
This is my project of the [URL Shortener Microservice challenge](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/url-shortener-microservice) for the freeCodeCamp Back End Development and APIs certification. It was built based on the boilerplate available [here](https://github.com/freeCodeCamp/boilerplate-project-urlshortener/).

## Technologies
- **Node.js** and **Express** to create the server and handle routes, requests and responses.
- **Mongoose** to persist all the data.

## Endpoints:

Endpoints | Description | Params
----------|-------------|-------------
POST `/api/shorturl` | Create a new short_url | url (via body)
GET `/api/shorturl/:shortUrl?` | redirected to original url | shortURL (via query)

#### Example output:
* `{"original_url":"https://www.freecodecamp.com","short_url":56}`

## How to use:
```
setup Mongodb server
create .env file
npm install
npm start
```
