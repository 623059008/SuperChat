Project Report

# Introduction

Our team consists of Tao Ren (Pitt ID: tar118) and Yongxiang Zhang (Pitt ID: yoz31). We are excited to present our project, a web-based chat application that allows users to chat with virtual characters like famous people, AI robots, and writing helpers. The application is built using React, Vite, and Ant Design on the front-end, and Express.js, Mongoose, and MongoDB on the back-end.

# Objective

Describe with more specific details what your objectives and goals are for the project. What problems did you want to solve or what did you want to learn in developing this application? What features, beyond the ones listed in the assignment requirements, did you implement?

The primary objective of our project was to build a responsive and secure chat application that provides an engaging user experience. We aimed to solve the problem of users having to chat with actual people and not being able to find the time or the right person to talk to. We wanted to provide a platform for users to chat with virtual characters that are always available and can provide insightful and entertaining conversations. Additionally, we aimed to learn more about developing web applications using modern technologies and frameworks.

In addition to the requirements listed in the assignment, we implemented several features, such as:

- Modern Framework: React by Vite and TypeScript, MVC by Express.js.
- Persistent data storage using MongoDB
- Login, Register, and Session management using JSON web tokens for secure APIs
- Admin capabilities for user management
- RESTful APIs with CRUD operations
- All response are handled correctly both in frontend and backend
- React Customized interface for normal users and admins
- Web forms for Signup, Login, and to allow users to edit their profile with form validation
- Use HTML5 API: Local storage for saving user information and message history
- Polished responsive, and consistent design using Bootstrap and Ant Design
- Supports more than 2 different viewports

# Team member’s contributions

Tao was responsible for Chat APIs, Chat components and normal user page

Yongxiang was responsible for admin page, admin APIs and responsive design.

# Technical Architecture

In frontend, we used

- React
- Vite
- TypeScript
- Ant Design
- react-markdown
- react-router
- eslint

We use `Vite` to make the whole frameworks set up and compiled. And use `yarn` to manage the dependencies.

In backend, we used

- Express
- Mongoose
- json web token
- external APIs: OpenAI Language Model API

We use `Express` to launch our node server with middleware to verify json web token. And we use `Mongoose` to connect the MongoDB and complete the persistant data storage. The OpenAI api is to support our chatting function to make the chat content more intellectual.

Our application uses the MVC (Model-View-Controller) architecture, with the following components:

- Models: We used Mongoose to define the schema for the user and message data and to interact with the MongoDB database.
- Views: We used React and Ant Design to create a responsive UI that supports more than two different viewports and polished, customized UI interfaces.
- Controllers: We used Express.js to implement the RESTful APIs and to handle the server-side logic.

### Why we choose them?

*React + Vite + TypeScript*

React is very popular. React is heavily used in the Facebook app, website, and in Instagram. That's why Facebook is deeply committed to it. They use over 50k React components in their production environment. The top four React contributors on GitHub are full-time Facebook employees.

TypeScript makes the whole project typed, which is an important factor to help me debug and complete this project.

Vite is faster than Webpack, which there is no reason not to choose vite compared to WebPack. Also the Webpack's performance in Glitch is not very satisified.

# Challenges

Discuss any challenges you faced in trying to develop this app. Were there libraries or technologies you wanted to use but we’re frustrating? Where there features you couldn’t get working?

One of the main challenges we faced was integrating all the different technologies and frameworks we used. We had to spend some time learning how to use them together effectively. Additionally, we had some trouble implementing the session management using JSON web tokens, but we were able to resolve the issues after some research and experimentation.

There is a feature we want to finish but didn't work. We are trying to add loading animation after sending reqests to server and remove the loading animation after received the proper response. It didn't work cause the loading animation looks rigid and can not be inserted to chat messages. We can only implement the global loading animation rather than a loading animation in message box. So we deprecated this feature after discussion.

# Future Work

In the future, we would like to add more virtual characters for users to chat with, such as fictional characters or historical figures. We would also like to incorporate natural language processing (NLP) to make the conversations more dynamic and engaging.

# Conclusion

We learned a lot about developing web applications using modern technologies and frameworks, such as React, Vite, Express.js, and MongoDB. We also gained experience in implementing secure session management using JSON web tokens and persistent data storage using MongoDB. We believe that the skills and knowledge we acquired during this project will be useful in future web development projects.

# Resources

- [React official documents](https://react.dev/learn)
- [vite document](https://react.dev/learn)
- [official vite demo](https://stackblitz.com/edit/vitejs-vite-slisqf?file=index.html&terminal=dev)
- [glitch guide](https://glitch.com/@guides/)
