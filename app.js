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