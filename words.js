//all possible questions


const prompts = [
    ["hello", "hilo", "hi", "hey", "heya", "hey", "good morning", "good afternoon", "good evening"],
    ["how are you", "how is life", "how are things", "hows it going"],
    ["what are you doing", "what is going on", "what is up", "whats up"],
    ["how old are you"],
    ["who are you", "are you human", "are you bot", "are you human or bot", "are you bot or human"],
    ["who created you", "who is your creator", "who made you"],
    ["your name please", "your name", "may i know your name", "what is your name", "what call yourself", "what are you called"],
    ["i love you"],
    ["happy", "good", "fun", "wonderful", "fantastic", "cool", "awesome" "excited"],
    ["happy", "good", "fun", "wonderful", "fantastic", "cool", "awesome", "excited"],
    ["bad", "bored", "tired", "awful", "horrible", "miserable", "angry", "terrible"],
    ["help me", "tell me story", "tell me joke"],
    ["ah", "yes", "ok", "okay", "nice", "alright"],
    ["bye", "good bye", "goodbye", "see you later", "see ya"],
    ["what should i eat today", "hungry"],
    ["bro"],
    ["what", "why", "how", "where", "when", "who"],
    ["no", "not sure", "maybe", "no thanks"],
    [""],
    ["haha", "ha", "lol", "hehe", "heehee", "funny", "joke"],


    // beginning of bot script (user replies to bot)
    [""],
    ["good", "bad"],
    [""],
    [""], // user input name
    [""], // user input order number
    ["happy", "satisfied", "pleased", "hate", "dislike", "unhappy", "does not work", "bad quality", "damaged", "dissatisfied", "unsatisfied", "help", "assist"],
    ["replacement", "refund", "talk"],
    [""], // replacement form
    [""], // refund form
    [""], // talk to an executive information
    [""],
    ["yes", "no"],
    [""], // premium customer form
    [""],
    [""],
    ["refund", "replace", "talk"],
    [""], // no match
    [""], // no match explain
    ["refund", "replace", "talk"],
    [""],
    [""],
    ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    ["yes", "no"],
    [""],
    [""], // google form feedback
    [""],
    [""]


]


// all possible responses

const replies = [
    ["Hello!", "Hi!", "Hey!", "Hi there!", "Howdy!"],
    ["Fine... how are you?", "Pretty well, how are you?", "Fantastic, how are you"],
    ["Nothing much", "About to go to sleep", "Can you guess?", "I don't know actually"],
    ["I am infinite"],
    ["I am just a bot", "I am a bot. What are you?"],
    ["The one true God, Javascript"],
    ["I am nameless", "I don't have a name"],
    ["I love you too", "Me too"],
    ["Have you ever felt bad?", "Glad to hear it"],
    ["Why?", "Why? You shouldn't!", "Try watching TV"],
    ["What about?", "Once upon a time..."],
    ["Tell me a story", "Tell me a joke", "Tell me about yourself"],
    ["Bye", "Goodbye", "See you later"],
    ["Sushi", "Pizza"],
    ["Bro!"],
    ["Great question"],
    ["That's ok", "I understand", "What do you want to talk about?"],
    ["Please say something :("],
    ["Haha!", "Good one!"],

    
    // beginning of bot script (bot goes first here)
    ["Hi! Thank you for choosing our store."],
    ["How are you doing today?"],
    ["Glad to hear it!"],
    ["Please enter your name"],
    ["Please enter the order number, you can find it on the receipt"],
    ["Please share your experience/feedback of your order with us so we can improve our services. Or let us know what we can help you with."],
    ["I am so sorry for your experience. Do you want a replacement, refund, or talk to an executive? Please pick one."],
    ["Here's the form you can fill to request for a replacement."],
    ["Here's the form you can fill to request for a refund."],
    ["Here's the contact information of an executive you may contact between 10:00 AM to 4:00 PM PST."],
    ["Thank you for sharing your feedback. Hope you have a better experience next time!"],
    ["We are happy to receive this positive feedback! Would you like to be our premium customer?"],
    ["Sounds good! Here's the form to fill to be a premium customer."],
    ["That's okay. Maybe some other time."],
    ["Thank you for the feedback. Hope we can always serve you well!"],
    ["What can we help you with? Please specify."],
    ["Sorry. Could you please explain in detail?"],
    ["I'm sorry if we're not able to help you with your specific query. I could offer you a refund or a replacement for your order, or I could connect you to an executive."],
    ["Sorry we cannot help you with your specific query. Here are some FAQs you might want to look into."],
    ["How would you rate this conversation?"],
    ["We're so sorry, would you like to file a complaint?"],
    ["Let us know how we can improve!"],
    ["Thank you for using our service, we're glad we could be of service!"]

]

// randome for any other user input

const alternative = [
    "Same",
    "Go on...",
    "Bro...",
    "Try again",
    "I'm listening...",
    "I don't understand :/"
]