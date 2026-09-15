const locationInput = document.getElementById("location");
const searchButton = document.getElementById("searchBtn");

searchButton.addEventListener("click", function() {

    const location = locationInput.value;

    if (location === "") {
        alert("Please enter your location.");
        return;
    }

    alert("Searching PGs in " + location);

});