var deleteButtons = document.getElementsByClassName("delete_button");

for (var x=0; x < deleteButtons.length; x++) {
  deleteButtons[x].addEventListener("click", function(event) {
    var sure = confirm("Did you actually do that?");
    if (!sure) {
      event.preventDefault();
    }
  });
}
