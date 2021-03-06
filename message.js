var mess = [
  "Hello there.",
  "It seems that you have cracked the code.",
  "That or, looked at the code, and was like \"oh, there's a secret right here.\"",
  "Nevertheless, your prize, my friend:"
];
var i = 0;                                        //denotes the character that is to be typed out on keypress
var messCount = 0;                                //denotes what sentence is to be displayed
var junk = ' qwxz/!@#$%^&*()-+=_____|[{}]?<>;:'   //various characters to randomly pop up in the browser text box
var sub1 = "";                                    //substring before the character that is to be replaced with junk
var sub2 = "";                                    //substring after the character that is to be replaced with junk
var val = false;                                  //Used so that the flicker(display) function inside setInterval is only called once
var tog = false;                                  //Used to toggle the cursor at the end of the sentence
var buttonOn = false;                             //Used to determine if the button is visible or not-visible
var display = document.querySelector("h1");       //selecting the text that is visible to the user
var tag = document.querySelector(".line");        //selecting the cursor line "|"
var butt = document.querySelector("button");      //selecting the button

//make butt invisible (for transition effect), set visibility to none
butt.style.background = "rgba(1,1,1,0)";
butt.setAttribute("class", "not-visible");

//type each character in textContent with each key press
window.addEventListener("keypress", function() {
  if (i < mess[messCount].length){
    display.textContent += mess[messCount][i];
    if (display.textContent.length > 0 && val === false){
      setInterval(function() {
        flicker(display);
      }, Math.floor(Math.random() * 5000));
      val = true;
    }
    i++;
    //buttonOn = false;

  }
  else {
    console.log("EOS");
    butt.setAttribute("class", "visible");
    buttonOn = true;
    //Make button take the background defined in CSS, and set a destination for click event
    butt.style.background = "";
    //butt.setAttribute("onclick", "location.href='#'");

    //When user clicks on the button, set i = 0, remove message and go to the next mess array object, and rehide/disable the button.
    butt.addEventListener("click", function(){
      if (buttonOn === true) {
        //fade button out
        butt.style.background = "rgba(1,1,1,0)";
        //remove button, set buttonOn to false
        butt.setAttribute("class", "not-visible");
        buttonOn = false;
        display.textContent = "";
        i = 0;
        messCount++;
      }
    });

}
});




//add the character flicker to the textContent
function flicker(display) {
  //get random position in textContent
  var ran = Math.floor(Math.random() * display.textContent.length);
  var ran2 = Math.floor(Math.random() * junk.length);
  var randomTimer = Math.floor(Math.random() * (1500+100));
  var currentString = display.textContent;
  var textToReplace = display.textContent[ran];
  var textToReplaceWith = junk[ran2];
  var sub1 = currentString.substring(0, ran);
  var sub2 = currentString.substring(ran + 1, currentString.length);
  var newContent = sub1 + textToReplaceWith + sub2;
  display.textContent = newContent;
  //var clean = mess.substring(0, i);
  //replace it back with the normal character
  setTimeout(function(){
    display.textContent = mess[messCount].substring(0, i);
  }, randomTimer);
}

//toggle cursor
setInterval(function() {
  tag.classList.toggle("displaynone");
}, 723);

//pulse button
setInterval(function() {
  if (tog){
    butt.style.height = "26px";
    butt.style.width = "26px";
  }
  else {
    butt.style.height = "25px";
    butt.style.width = "25px";
  }
  tog = !tog;
}, 2000);
