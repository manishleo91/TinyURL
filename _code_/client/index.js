var btn = document.getElementById("urlButton");

btn.addEventListener("click", function (event) {
  var urlInput = document.getElementById("urlInput");
  var expiryDaysInput = document.getElementById("expiryDaysInput");

  fetch("/register?url=" + urlInput.value+ "&&expirydays=" + expiryDaysInput.value)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      var label = document.getElementById("tinylabel");
      label.innerHTML = data.tinyUrl;

      var longUrlInput = document.getElementById("longUrlInput");
      longUrlInput.value = '';
      var longUrlLabel = document.getElementById("longUrlLabel");
      longUrlLabel.innerHTML = '';
    });
  console.log(urlInput.value);
});

var longbtn = document.getElementById("longUrlButton");

longbtn.addEventListener("click", function (event) {
  var longUrlInput = document.getElementById("longUrlInput");
  fetch("/retrieve?url=" + longUrlInput.value)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      var label = document.getElementById("longUrlLabel");
      label.innerHTML = data.longurl;

      var urlInput = document.getElementById("urlInput");
      urlInput.value = '';
      var tinylabel = document.getElementById("tinylabel");
      tinylabel.innerHTML = '';
    });
  console.log(urlInput.value);
});
