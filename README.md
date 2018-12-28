# Echar Agua Al Mar Server

This is a repo for the server-side of the Echar Agua Al Mar App, where users can learn Spanish through spaced repetition.

## Prerequisites

This app requires Node.js v6.0+ to run.

## Installing
Install the dependencies and devDependencies and start the server.

```
npm install
```

## Schema

### User

```js
{
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  questions: [{
    _id: mongoose.Schema.Types.ObjectId,
    question: String,
    answer: String,
    memoryStrength: Number,
    guesses: Number,
    correct: Number,
    next: Number
  }],
  head: {
    type: Number,
    default: 0
  }
}
```

### Pairs

```js
{
  question: String,
  answer: String
}
```

## API Overview

```text
/api
.
├── /auth
│   └── POST
│       ├── /login
│       └── /refresh
├── /users
│   └── POST
│       └── /
├── /questions
│   └── GET
│       ├── /
│       └── /progress
│   └── PUT
│       └── /
│   └── POST
│       └── /

```

### POST `/api/auth/login`

```js
// req.body
{
  username: String,
  password: String
}

// res.body
{
  authToken: String
}
```

### POST `/api/auth/refresh`

```js
// req.header
Authorization: Bearer ${token}

// res.body
{
  authToken: ${token}
}
```

### POST `/api/users/`

```js
// req.body
{
  username: String,
  password: String
}

// res.body
{
  username: String,
  id: UserId
}
```
### GET `/api/questions`

```js
// req.header
Authorization: Bearer ${token}

// res.body
{
  question: String,
  guesses: Number,
  correct: Number            
}
```

### GET `/api/questions/progress`

```js
// req.header
Authorization: Bearer ${token}

// res.body
{
  [
      {
          question: String,
          correct: Number,
          guesses: Number,
          _id: QuestionId
      }
  ]
}
```
### PUT `/api/questions`

```js
// req.header
Authorization: Bearer ${token}

// req.body
{
  answer: String
}

// res.body
{
  guesses: Number,
  correct: Number,
  answer: String,
  feedback: String
}
```
### POST `/api/questions`

```js
// req.header
Authorization: Bearer ${token}

// req.body
{
  question: String,  
  answer: String
}

// res.body
{
  username: String,
  id: UserId
}

```

## Built With

* [Node](https://nodejs.org/en/) - Run-time environment
* [Express](https://expressjs.com/) - Web application framework
* [MongoDB](https://www.mongodb.com/) - Database
* [Mongoose](https://mongoosejs.com/) - Data modeling
* [Passport](http://www.passportjs.org/docs/) - Authentication
* [JWT](https://jwt.io/) - Authentication

## Authors

* **Cameron Hatch** - *Full-Stack* - [CameronHatch92](https://github.com/CameronHatch92)

* **Colin Rupp** - *Full-Stack* - [rupp-colin](https://github.com/rupp-colin)
