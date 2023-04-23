# ChatMeta Demo

Here is a web app demo of ChatMeta.
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
