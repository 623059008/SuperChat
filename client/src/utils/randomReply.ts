import { ChatUser } from '../components/ChatPage/types';
// Define an object to store responses for the chatbot
const responses = {
  greeting: ["Hello! I'm [robotname], What's your name?", "Hi there! I'm [robotname]. What can I call you?"],
  age: [
    "Nice to meet you, [name]! How old are you?",
    "Welcome, [name]! What's your age?",
  ],
  city: [
    "Great, [name]! Where are you from?",
    "Awesome! Which city do you live in?",
  ],
  goodbye: [
    "Thanks for chatting, [name]! Goodbye!",
    "It was nice talking to you, [name]! See you later!",
  ],
};

// Define a function to generate a random response from an array
function getRandomResponse(array: string[]): string {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

// Define a function to respond to the user's input
function respondToUser(input: string, user: ChatUser, robot?: ChatUser): string {
  let output: string;
  if(input === "") {
    output = getRandomResponse(responses.greeting);
    output = output.replace("[robotname]", robot?.name || '');
    return output;
  }
  if (user.name === "") {
    output = getRandomResponse(responses.greeting);
    user.name = input;
    output = output.replace("[robotname]", robot?.name || '');
  } else if (!user?.dob?.age || user?.dob?.age === 0) {
    output = getRandomResponse(responses.age);
    output = output.replace("[name]", user.name);
  } else if (!user.location?.city || user.location?.city === "") {
    output = getRandomResponse(responses.city);
    output = output.replace("[name]", user.name);
  } else {
    output = getRandomResponse(responses.goodbye);
    output = output.replace("[name]", user.name);
  }

  return output;
}

export { respondToUser }
