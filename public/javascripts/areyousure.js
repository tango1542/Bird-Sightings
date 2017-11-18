var deleteButtons = document.getElementsByClassName("delete_button");

for (var x=0; x < deleteButtons.length; x++) {
  deleteButtons[x].addEventListener("click", function(event) {
    var sure = confirm("Did you actually do that?");
    if (!sure) {
      event.preventDefault();
    }
  });
}

delete_button.addEventListener("click", function(event){
    var sure = confirm("Did you actually do this?");
    if (!sure) {
        event.preventDefault();   // don't actually click the button or send a request to the server.
    }
});


// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
