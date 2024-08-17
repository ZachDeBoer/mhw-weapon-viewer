let currentFilters = {
  elementtype: "all",
  iselementlocked: "all",
  rarity: "all",
};

function sort(value) {
  let divs = document.querySelectorAll(".weaponCard");
  let array = Array.from(divs);
  array.sort(
    (a, b) =>
      b.querySelector(`p[data-${value}]`).getAttribute(`data-${value}`) -
      a.querySelector(`p[data-${value}]`).getAttribute(`data-${value}`)
  );
  document.getElementById("weapons").innerHTML = "";
  array.forEach((node) => document.getElementById("weapons").appendChild(node));
}

function filter(type, value) {
  let cards = document.querySelectorAll(".weaponCard");
  currentFilters[type] = value;
  let newCards = updateFilters();
  cards.forEach((card) => {
    card.classList.add("hidden");
  });
  newCards.forEach((card) => {
    card.classList.remove("hidden");
  });
}

function updateFilters() {
  let cards = document.querySelectorAll(".weaponCard");
  let filteredCards = Array.from(cards);
  Object.keys(currentFilters).forEach((key) => {
    if (currentFilters[key] !== "all") {
      let newFilter = Array.from(
        document.querySelectorAll(
          `div:has(> p[data-${key}=\"${currentFilters[key]}\"])`
        )
      );
      for (let i = filteredCards.length - 1; i >= 0; i--) {
        if (!newFilter.includes(filteredCards[i])) {
          filteredCards.splice(i, 1);
        }
      }
    }
  });
  return filteredCards;
}
