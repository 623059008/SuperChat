# SuperChat

## Dev Guild

### Start
```
npm install
```

### Client Building
```
cd client && yarn
yarn build
```
After building, there is `build` folder that contains the build result of frontend.
Then you can launch the node backend

### Environment Variables
`PORT`: PORT of your application
`MONGOOSE_USERNAME`: Username of mongodb
`MONGOOSE_PASSWORD`: Password of mongodb
`OPENAI_API_KEY`: API key of OPenAI

## Frontend

# SuperChat Demo

Here is a web app demo of SuperChat.
You can chat with virtual characters from Animation, Video Game, Real Stars in this web app.
Have fun!

## Q&A

**1. What framework did you pick and why?**

*React + Vite + TypeScript*

React is very popular. React is heavily used in the Facebook app, website, and in Instagram. That's why Facebook is deeply committed to it. They use over 50k React components in their production environment. The top four React contributors on GitHub are full-time Facebook employees.

TypeScript makes the whole project typed, which is an important factor to help me debug and complete this project.

Vite is faster than WebPack, which there is no reason not to choose vite compared to WebPack. Also the Webpack's performance in Glitch is not very satisified.

**2. What about that framework appealed to you, for this project?**

Using React, I can reuse my components like ProfileCard and Chat Components. Write once, use many times.

Looping in React.js is very friendly for me. JSX is a simple well-known HTML tag with no fancy attributes. The render function is simply generating the Components from a data list and rendering them to container element in the HTML file. This also help me to divide the design of data structure and view part.

It vastly decrease my workload and I only need to focus on each component itself and combine them like building Lego.

**3. What alternative frameworks did you consider?**

Angular, it seems like Angular is also a good option to build a mordern cross-platfrom web app. It doesn't use JSX but it provides like `*ngFor` to loop rendering with a data list, which helps me like React by similiar Component Design.

**4. What resources did you read/watch/listen to?**

I read [React official documents](https://react.dev/learn) and [vite document](https://react.dev/learn). They are very useful and there are many demos.
I set up my project based on [official vite demo](https://stackblitz.com/edit/vitejs-vite-slisqf?file=index.html&terminal=dev), and [glitch guide](https://glitch.com/@guides/)

**5. Describe the site you built for this assignment. What does it do? What components or features of the framework did you explore for this project.**

This chat web app provide services including displaying information by profile cards, picking virtual characters, chatting with them. User can choose virtual characters and chat with them. Different virtual character has different information, avatar and tags. I binded the shortcut key "Enter" for input, and it will automatically save and load the conversation using browser's local storage. For now, the reply from chat robots is static about their basic information I set. But in the future, I plan to develop backend services for these chat robots. My design supports different devices like laptop or mobilee. I developed more than 1 breakpoints for different display by CSS media query. And I also implemented a good animation for scroller when user click a virtual character. The information in chat page will dynamically load with the selected character changing. There is an active style for selected character. The boarder of panels are designed carefully and they are interactive and elegant.

Image it, it's very fun if you can chat with Trump about some daily problems you met or with Iron Man about his iron suits. That's cool, right?

### Features/Components I used

In this app, I used react-router to navigate among different pages based on url changes. When you choose different virtual characters, the url will change with corresponding character id. Then I developed a ProfileCard component to show the information and avatar of the virtual characters. I also developed a Chat Page with Chat Header, Chat Message Box, Chat Input components to allow user to send messages and chat with the virtual character you choose. I binded the shortcut key "Enter" for input, and automatically save and load the conversation in browser local storage.

I explored the React Hooks feature, which is the latest skills in React, so that I can develop the React components more elegantly and quickly.

## Declaration

Not real person, no offense, no politics, just for fun


## Backend
# RESTful API Documentation
-------------------------

This is the documentation for the RESTful API that supports two resources: `users` and `messages`. All data is transferred in the JSON data format.

## Outline
- [SuperChat](#superchat)
  - [Dev Guild](#dev-guild)
    - [Start](#start)
    - [Client Building](#client-building)
    - [Environment Variables](#environment-variables)
  - [Frontend](#frontend)
- [SuperChat Demo](#superchat-demo)
  - [Q\&A](#qa)
    - [Features/Components I used](#featurescomponents-i-used)
  - [Declaration](#declaration)
  - [Backend](#backend)
- [RESTful API Documentation](#restful-api-documentation)
  - [Outline](#outline)
  - [Users Resource](#users-resource)
    - [Endpoints](#endpoints)
    - [Request and Response Formats](#request-and-response-formats)
      - [GET /users](#get-users)
      - [GET /users/:id](#get-usersid)
      - [POST /users](#post-users)
      - [PUT /users/:id](#put-usersid)
      - [DELETE /users/:id](#delete-usersid)
      - [POST /users/:id/purchases](#post-usersidpurchases)
      - [GET /users/:id/purchases](#get-usersidpurchases)
      - [PUT /users/:id/purchases/:pid](#put-usersidpurchasespid)
      - [DELETE /users/:id/purchases/:pid](#delete-usersidpurchasespid)
  - [Messages Resource](#messages-resource)
    - [Endpoints](#endpoints-1)
    - [Request and Response Formats](#request-and-response-formats-1)
      - [GET /messages](#get-messages)
      - [GET /messages/:id](#get-messagesid)
      - [POST /messages](#post-messages)
      - [PUT /messages/:id](#put-messagesid)
      - [DELETE /messages/:id](#delete-messagesid)

## Users Resource
--------------

The `users` resource represents a collection of users, each of which can purchase passes for their chatting service. Each user has the following attributes:

*   `id`: unique identifier for the user (integer)
*   `username`: the user's username (string)
*   `email`: the user's email address (string)
*   `password`: the user's password (string)
*   `purchases`: an array of purchases made by the user (array)

Each purchase in the `purchases` array has the following attributes:

*   `id`: unique identifier for the purchase (integer)
*   `type`: the type of the purchase (string, either 'monthly', 'yearly', or 'number')
*   `start_time`: the start time of the purchase (number, representing a Unix timestamp)
*   `expire_time`: the expiration time of the purchase (number, representing a Unix timestamp)
*   `maxCount`: the maximum number of messages that can be sent using this purchase (integer)
*   `usedCount`: the number of messages that have been sent using this purchase (integer)
*   `purchase_key`: the authentication key of the purchase (string)

### Endpoints

*   `GET /users`: get a list of all users
*   `GET /users/:id`: get the user with the specified ID
*   `POST /users`: create a new user
*   `PUT /users/:id`: update the user with the specified ID
*   `DELETE /users/:id`: delete the user with the specified ID
*   `POST /users/:id/purchases`: create a new purchase for the user with the specified ID
*   `GET /users/:id/purchases`: get a list of all purchases made by the user with the specified ID
*   `PUT /users/:id/purchases/:pid`: update the purchase with the specified ID for the user with the specified ID
*   `DELETE /users/:id/purchases/:pid`: delete the purchase with the specified ID for the user with the specified ID

### Request and Response Formats

#### GET /users

Parameters:

None

Request:

```bash
GET /users
```

Response:

```makefile
Status: 200 OK
Content-Type: application/json

[
  {
    "id": 1,
    "username": "John",
    "email": "john@example.com",
    "password": "password123",
    "purchases": [
      {
        "id": 1,
        "type": "monthly",
        "start_time": 1648634400000,
        "expire_time": 1651312800000,
        "maxCount": 1000000,
        "usedCount": 0,
        "purchase_key": "abc123"
      }
    ]
  },
  {
    "id": 2,
    "username": "Jane",
    "email": "jane@example.com",
    "password": "password456",
    "purchases": [
      {
        "id": 2,
        "type": "yearly",
        "start_time": 1648634400000,
        "expire_time": 1680170400000,
        "maxCount": 5000000,
        "usedCount": 0,
        "purchase_key": "xyz789"
      }
    ]
  }
]
```

#### GET /users/:id

Parameters:

- `id`

Request:

```bash
GET /users/1
```

Response:

```makefile
Status: 200 OK
Content-Type: application/json

{
    "id": 1,
    "username": "John",
    "email": "john@example.com",
    "password": "password123",
    "purchases": [
      {
        "id": 1,
        "type": "monthly",
        "start_time": 1648634400000,
        "expire_time": 1651312800000,
        "maxCount": 1000000,
        "usedCount": 0,
        "purchase_key": "abc123"
      }
    ]
}
```

#### POST /users

Parameters:

- `username`
- `email`
- `password`

Request:

```bash
POST /users
Content-Type: application/json

{
  "username": "Alice",
  "email": "alice@example.com",
  "password": "password789"
}
```

Response:

```makefile
Status: 201 Created
Content-Type: application/json

{
  "id": 3,
  "username": "Alice",
  "email": "alice@example.com",
  "password": "password789",
  "purchases": []
}
```

#### PUT /users/:id

Parameters:

- `id`
- `username`
- `email`
- `password`

Request:

```bash
PUT /users/1
Content-Type: application/json

{
  "username": "John Doe"
}
```

Response:

```makefile
Status: 200 OK
Content-Type: application/json

{
  "id": 1,
  "username": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "purchases": [
    {
      "id": 1,
      "type": "monthly",
      "start_time": 1648634400000,
      "expire_time": 1651312800000,
      "maxCount": 1000000,
      "usedCount": 0,
      "purchase_key": "abc123"
    }
  ]
}
```

#### DELETE /users/:id

Parameters:

- `id`

Request:

```bash
DELETE /users/1
```

Response:

```makefile
Status: 200 OK
Content-Type: application/json

{
  "message": "User deleted"
}
```

#### POST /users/:id/purchases

Parameters:

- `id`: userid
- `type`
- `start_time`
- `expire_time`
- `maxCount`
- `purchase_key`

Request:

```bash
POST /users/1/purchases
Content-Type: application/json

{
  "type": "monthly",
  "start_time": 1648634400000,
  "expire_time": 1651312800000,
  "maxCount": 1000000,
  "purchase_key": "def456"
}
```

Response:

```makefile
Status: 201 Created
Content-Type: application/json

{
  "id": 2,
  "type": "monthly",
  "start_time": 1648634400000,
  "expire_time": 1651312800000,
  "maxCount": 1000000,
  "usedCount": 0,
  "purchase_key": "def456"
}
```

#### GET /users/:id/purchases

Parameters:

- `id`

Request:

```bash
GET /users/1/purchases
```

Response:

```makefile
Status: 200 OK
Content-Type: application/json

[
  {
    "id": 1,
    "type": "monthly",
    "start_time": 1648634400000,
    "expire_time": 1651312800000,
    "maxCount": 1000000,
    "usedCount": 0,
    "purchase_key": "abc123"
  },
  {
    "id": 2,
    "type": "monthly",
    "start_time": 1648634400000,
    "expire_time": 1651312800000,
    "maxCount": 1000000,
    "usedCount": 0,
    "purchase_key": "def456"
  }
]
```

#### PUT /users/:id/purchases/:pid

Parameters:

- `id`
- `pid`
- `type`
- `start_time`
- `expire_time`
- `maxCount`
- `purchase_key`

Request:

```bash
PUT /users/1/purchases/1
Content-Type: application/json

{
  "type": "yearly",
  "start_time": 1648634400000,
  "expire_time": 1680170400000,
  "maxCount": 5000000,
  "purchase_key": "abc123"
}
```

Response:

```makefile
Status: 200 OK
Content-Type: application/json

{
    "id": 1,
    "type": "yearly",
    "start_time": 1648634400000,
    "expire_time": 1680170400000,
    "maxCount": 5000000,
    "usedCount": 0,
    "purchase_key": "abc123"
}
```

#### DELETE /users/:id/purchases/:pid

Parameters:

- `id`
- `pid`

Request:

```bash
DELETE /users/1/purchases/1
```

Response:

```makefile
Status: 200 OK
Content-Type: application/json

{
  "message": "Purchase deleted"
}
```

## Messages Resource
-----------------

The `messages` resource represents a collection of messages sent between users. Each message has the following attributes:

*   `id`: unique identifier for the message (integer)
*   `message`: the content of the message (string)
*   `fromUser`: the ID of the user who sent the message (integer)
*   `toUser`: the ID of the user who received the message (integer)
*   `created_time`: the time the message was created (number, representing a Unix timestamp)

### Endpoints

*   `GET /messages`: get a list of all messages
*   `GET /messages/:id`: get the message with the specified ID
*   `POST /messages`: create a new message
*   `PUT /messages/:id`: update the message with the specified ID
*   `DELETE /messages/:id`: delete the message with the specified ID

### Request and Response Formats

#### GET /messages

Parameters:

None

Request:

```bash
GET /messages
```

Response:

```makefile
Status: 200 OK
Content-Type: application/json

[
  {
    "id": 1,
    "message": "Hello, friend",
    "fromUser": 1,
    "toUser": 2,
    "created_time": 1680125245129
  },
  {
    "id": 2,
    "message": "How are you?",
    "fromUser": 2,
    "toUser": 1,
    "created_time": 1680125287465
  }
]
```

#### GET /messages/:id

Parameters:

- `id`

Request:

```bash
GET /messages/1
```

Response:

```makefile
Status: 200 OK
Content-Type: application/json

{
  "id": 1,
  "message": "Hello, friend",
  "fromUser": 1,
  "toUser": 2,
  "created_time": 1680125245129
}
```

#### POST /messages

Parameters:

- `message`
- `fromUser`
- `toUser`

Request:

```bash
POST /messages
Content-Type: application/json

{
  "message": "How are you?",
  "fromUser": 1,
  "toUser": 2
}
```

Response:

```makefile
Status: 201 Created
Content-Type: application/json

{
  "id": 3,
  "message": "How are you?",
  "fromUser": 1,
  "toUser": 2,
  "created_time": 1680125293856
}
```

#### PUT /messages/:id

Parameters:

- `message`
- `fromUser`
- `toUser`


Request:

```bash
PUT /messages/1
Content-Type: application/json

{
  "message": "Hi, there"
}
```

Response:

```makefile
Status: 200 OK
Content-Type: application/json

{
  "id": 1,
  "message": "Hi, there",
  "fromUser": 1,
  "toUser": 2,
  "created_time": 1680125245129
}
```

#### DELETE /messages/:id

Parameters:

- `id`

Request:

```bash
DELETE /messages/1
```

Response:

```makefile
Status: 200 OK
Content-Type: application/json

{
  "message": "Message deleted"
}
```