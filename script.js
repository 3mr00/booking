//nabvar
const navbarToggle = navbar.querySelector("#navbar-toggle");
const navbarMenu = document.querySelector("#navbar-menu");
const navbarLinksContainer = navbarMenu.querySelector(".navbar-links");
let isNavbarExpanded = false;

const toggleNavbarVisibility = () => {
  isNavbarExpanded = !isNavbarExpanded;

  navbarToggle.setAttribute("aria-expanded", isNavbarExpanded);
};

navbarToggle.addEventListener("click", toggleNavbarVisibility);

navbarLinksContainer.addEventListener("click", (e) => e.stopPropagation());
navbarMenu.addEventListener("click", toggleNavbarVisibility);

//cities
const cities = ["Cairo", "New York", "Los Angeles", "Chicago"];
const countries = [
  "Egypt",
  "American",
  "British",
  "Chinese",
  "Indian",
  "Russian",
];

const Inputs = document.querySelectorAll(".Inputs_search");
const suggestionLists = document.querySelectorAll(".suggestions");

const Arrays = [cities, countries];

Inputs.forEach((cityInput, index) => {
  cityInput.addEventListener("input", function () {
    const userInput = this.value.toLowerCase();
    const suggestions = Arrays[index].filter((city) =>
      city.toLowerCase().startsWith(userInput)
    );
    displaySuggestions(suggestions, index);
  });
});

function displaySuggestions(suggestions, index) {
  suggestionLists[index].innerHTML = "";
  suggestions.forEach((suggestion) => {
    const listItem = document.createElement("li");
    listItem.textContent = suggestion;
    listItem.addEventListener("click", function () {
      Inputs[index].value = suggestion;
      suggestionLists[index].innerHTML = "";
    });
    suggestionLists[index].appendChild(listItem);
  });
}

document.addEventListener("click", function (e) {
  Inputs.forEach((cityInput, index) => {
    if (!cityInput.contains(e.target)) {
      suggestionLists[index].innerHTML = "";
    }
  });
});

//check-in && check-out

function calculateDate() {
  const checkInInput = document.getElementById("checkInDate");
  const checkOutInput = document.getElementById("checkOutDate");
  const nightOptions = document.getElementById("nightOptions");

  const checkInDate = new Date(checkInInput.value);
  const nights = parseInt(nightOptions.value);

  // Calculate check-out date based on selected nights
  const checkOutDate = new Date(checkInDate);
  checkOutDate.setDate(checkInDate.getDate() + nights);

  checkOutInput.valueAsDate = checkOutDate;
}
function calculateNights() {
  const checkInInput = document.getElementById("checkInDate");
  const checkOutInput = document.getElementById("checkOutDate");
  const nightOptions = document.getElementById("nightOptions");

  const checkInDate = new Date(checkInInput.value);
  const checkOutDate = new Date(checkOutInput.value);
  // Calculate the difference in time between the two dates
  const timeDifference = checkOutDate.getTime() - checkInDate.getTime();

  // Calculate the number of milliseconds in a day
  const oneDay = 1000 * 60 * 60 * 24;
  const nightsInSelect = Math.round(timeDifference / oneDay);

  // Check if check-out date is greater than check-in date
  if (checkOutDate.getTime() <= checkInDate.getTime() || nightsInSelect > 10) {
    checkOutInput.value = "";
    return;
  }

  // Calculate the number of nights by dividing the time difference by the number of milliseconds in a day
  nightOptions.value = nightsInSelect;
}
