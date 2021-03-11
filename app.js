//event listener for user input
document.addEventListener("load", function getInput(){//when page is fully loaded, call function getInput
    var userField = document.getElementById("input");//identify text input field
    userField.addEventListener("keydown", event =>{
        if(event.keyCode===13){//if enter keydown detected
            var userInput = userField.value; //grab user input
            read(userInput);
            inputField.value=null;//reset the user input field
        }
    })
})

function compare(arrayPrompt, arrayReplies, string) {
    let reply;
    let foundReply = false;
    for (let x = 0; x < arrayPrompt.length; x++) {
      for (let y = 0; y < arrayPrompt[x].length; y++) {
        if (arrayPrompt[x][y] === string) {
          let replies = arrayReplies[x];
          reply = replies[Math.floor(Math.random() * replies.length)];
          // Inner loop stops when user input value == prompts
          foundReply = true;
          
          break;
        }
      }
      // instead of interating through the entire array stop outer loop when reply is found 
      if (foundReply) {
        break;
      }
    }
    return reply;
  }
  