let currentWeaponSelection = [];

let currentWeaponType = "";

function loadWeapons(file) {
  fetch(file)
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then((data) => {
      currentWeaponType = file.split("/")[1].split(".")[0];
      currentWeaponSelection = data.weapons;
      let list = document.getElementById("weapons");
      list.innerHTML = "";
      for (let w of currentWeaponSelection) {
        list.appendChild(createWeaponCard(w));
      }
    })
    .catch((error) =>
      console.error("There was a problem with the fetch operation:", error)
    );
}

function createWeaponCard(weapon) {
  let div = document.createElement("div");
  div.classList.add("weaponCard");
  div.id = weapon.name;

  for (const key in weapon) {
    if (!IGNORED_KEYS.includes(key)) {
      if (key === "name") {
        div.appendChild(createWeaponName(weapon));
      } else {
        let prop = createWeaponProperty(key, weapon[key]);

        if (key === "elderSeal") {
          prop.querySelectorAll("span")[0].innerHTML = `${
            ELDER_SEAL[weapon[key]]
          }`;
        } else if (key === "sharpness") {
          let span = prop.querySelectorAll("span")[0];
          span.innerHTML = "";
          span.classList.add("sharpness");
          span.style.setProperty(
            "background-color",
            `${SHARPNESS_COLORS[weapon[key]]}`
          );
        } else if (key === "elementPower" && weapon["elementType"] !== "None") {
          let span = prop.querySelectorAll("span")[0];
          let image = document.createElement("img");
          image.setAttribute("src", `${ELEMENT_ICONS[weapon["elementType"]]}`);
          image.classList.add("icon");
          span.prepend(image);
          if (weapon["isElementLocked"]) {
            span.classList.add("lockedElement");
            span.innerHTML = `(${span.innerHTML})`;
          }
          prop.setAttribute("data-iselementlocked", weapon["isElementLocked"]);
          prop.setAttribute("data-elementType", weapon["elementType"]);
        } else if (key === "affinity") {
          prop.querySelectorAll("span")[0].innerHTML += "%";
        }
        div.appendChild(prop);
      }
    }
  }

  return div;
}

function createWeaponProperty(key, value) {
  let image = document.createElement("img");
  image.setAttribute("src", `${CARD_ICONS[key]}`);
  image.classList.add("icon");

  let label = document.createElement("p");
  label.appendChild(image);
  label.innerHTML += `${CARD_LABELS[key]}:`;
  label.setAttribute(`data-${key}`, value);

  let v = document.createElement("span");
  v.innerHTML = `${value}`;
  v.classList.add("weaponValue");

  label.appendChild(v);
  return label;
}

function createWeaponName(weapon) {
  let p = document.createElement("p");
  p.classList.add("weaponName");
  p.setAttribute("data-name", weapon["name"]);
  let image = document.createElement("img");
  image.setAttribute(
    "src",
    `${WEAPON_TYPES[currentWeaponType][weapon["rarity"]]}`
  );
  image.classList.add("icon");
  p.appendChild(image);
  p.innerHTML += `${weapon["name"]}`;
  p.setAttribute("data-rarity", weapon["rarity"]);
  return p;
}

const ELDER_SEAL = {
  0: "None",
  1: "Low",
  2: "Average",
  3: "High",
};

const ELEMENT_ICONS = {
  Blast: "../img/element-icons/blast-icon.png",
  Dragon: "../img/element-icons/dragon-icon.png",
  Fire: "../img/element-icons/fire-icon.webp",
  Ice: "../img/element-icons/ice-icon.png",
  Paralysis: "../img/element-icons/paralysis-icon.webp",
  Poison: "../img/element-icons/poison-icon.webp",
  Sleep: "../img/element-icons/sleep-icon.png",
  Thunder: "../img/element-icons/thunder-icon.webp",
  Water: "../img/element-icons/water-icon.png",
};

const CARD_ICONS = {
  attackPower: "../img/card-icons/attack-icon.webp",
  sharpness: "../img/card-icons/sharpness-icon.webp",
  affinity: "../img/card-icons/affinity-icon.png",
  elementPower: "../img/card-icons/element-damage-icon.png",
  elderSeal: "../img/card-icons/elderseal-icon.webp",
  phialType: "../img/card-icons/phial-type-icon.png",
};

const CARD_LABELS = {
  attackPower: "Attack",
  sharpness: "Sharpness",
  affinity: "Affinity",
  elementPower: "Element",
  elderSeal: "Elder Seal",
  phialType: "Phial",
};

const SHARPNESS_COLORS = {
  1: "#CC0000",
  2: "#FF8800",
  3: "#FFBB33",
  4: "#00C851",
  5: "#0D47A1",
  6: "#FFFFFF",
  7: "#9933CC",
};

const SWITCH_AXE_ICONS = {
  10: "../img/switch-axe-icons/switch-axe-10.webp",
  11: "../img/switch-axe-icons/switch-axe-11.webp",
  12: "../img/switch-axe-icons/switch-axe-12.png",
};

const GREAT_SWORD_ICONS = {
  10: "../img/great-sword-icons/great-sword-10.webp",
  11: "../img/great-sword-icons/great-sword-11.webp",
  12: "../img/great-sword-icons/great-sword-12.webp",
};

const WEAPON_TYPES = {
  switchaxe: SWITCH_AXE_ICONS,
  greatsword: GREAT_SWORD_ICONS,
};

const IGNORED_KEYS = ["elementType", "isElementLocked", "tree", "rarity"];
