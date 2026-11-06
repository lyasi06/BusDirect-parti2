import { savehh, save } from "./store.js";
import { VIP, prixSiege, recetteTrajet } from "./reservations.js";
import {validerTelephone, validerModification} from "./validators.js";

const seats = document.querySelectorAll("#seats article");
const available = document.querySelector("#available");
const occupied = document.querySelector("#occupées");
const revenue = document.querySelector("#recette");

const form = document.querySelector("#form-reserve");
const nameInput = document.querySelector("#Nom-dupassager");
const seatSelect = document.querySelector("#reserve-seat");
const msgReserve = document.querySelector("#msg-reserve");

let names = [];
let allTrips = [];
let trip = null;

for (let i = 0; i < 20; i++) {
  names.push("");
}

function saveNames() {
  const nouvelles = [];
  for (let i = 0; i < 20; i++) {
    if (names[i] !== "") {
      const ancienne = trip.reservations.find(r => r.seat === i + 1);
      const tel = ancienne ? ancienne.phone : "";
      nouvelles.push({ seat: i + 1, name: names[i], phone: tel });
    }
  }
  trip.reservations = nouvelles;
  save(allTrips);
}


function updatePage() {
  let count = 0;

  for (let i = 0; i < 20; i++) {
    const smia = seats[i].querySelector("h3");
    const info = seats[i].querySelector("p");
    const isVIP = VIP(i + 1);

    if (names[i] === "") {
      if (isVIP) {
        seats[i].className = "rounded-lg border border-yellow-400 bg-yellow-50 p-2 text-center";
        smia.className = "font-bold text-yellow-700";
        info.className = "text-xs text-yellow-600 font-medium";
        info.textContent = "VIP Libre";
      } else {
        seats[i].className = "rounded-lg border border-green-200 bg-white p-2 text-center";
        smia.className = "font-bold text-green-700";
        info.className = "text-xs text-slate-500";
        info.textContent = "Libre";
      }
    } else {
      count++;
      if (isVIP) {
        seats[i].className = "rounded-lg border border-yellow-400 bg-yellow-50 p-2 text-center";
        smia.className = "font-bold text-yellow-700";
        info.className = "text-xs text-yellow-800 font-bold";
        info.textContent = names[i] + " (VIP)";
      } else {
        seats[i].className = "rounded-lg border border-red-300 bg-red-100 p-2 text-center";
        smia.className = "font-bold text-red-700";
        info.className = "text-xs text-slate-700";
        info.textContent = names[i];
      }
    }
  }

  available.textContent = 20 - count;
  occupied.textContent = count;
  revenue.textContent = recetteTrajet(trip) + " DH";
}


function updateSelectOptions() {
  seatSelect.innerHTML = '<option value="auto">Premier Siège Libre (automatique)</option>';
  for (let i = 0; i < 20; i++) {
    if (names[i] === "") {
      const prix = prixSiege(trip.price, i + 1);
      const vip = VIP(i + 1) ? "VIP " : "";
      seatSelect.innerHTML += `<option value="${i + 1}">Siège ${i + 1} — ${vip}${prix} DH</option>`;
    }
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const smiya = nameInput.value.trim();
  const choix = seatSelect.value;
  const tele = document.getElementById("Téléphone").value.trim();

  function mse7Message() {
    setTimeout(function () {
      msgReserve.textContent = "";
      msgReserve.className = "";
    }, 3000);
  }

  if (smiya === "") {
    msgReserve.textContent = "Entrer votre nom";
    msgReserve.className = "w-full rounded-lg px-4 py-2 font-semibold text-white text-center bg-rose-600 mt-3 block";
    mse7Message();
    return;
  }

  let dejaExiste = false;
  for (let i = 0; i < 20; i++) {
    if (names[i].trim().toLocaleLowerCase() === smiya.toLocaleLowerCase()) {
      dejaExiste = true;
      break;
    }
  }

  if (dejaExiste) {
    msgReserve.textContent = "Cette personne a déjà une réservation!";
    msgReserve.className = "w-full rounded-lg px-4 py-2 font-semibold text-white text-center bg-rose-600 mt-3 block";
    mse7Message();
    return;
  }

   const erreurTel = validerTelephone(trip, tele);
  if (erreurTel) {
    document.getElementById("err-tel").textContent = erreurTel;
    return;
  }

  let index = -1;

  if (choix === "auto") {

    for (let i = 0; i < 20; i++) {
      if (names[i] === "" && !VIP(i + 1)) {
        index = i;
        break;
      }
    }
    if (index === -1) {
      msgReserve.textContent = "Le bus est complet!";
      msgReserve.className = "w-full rounded-lg px-4 py-2 font-semibold text-white text-center bg-rose-600 mt-3 block";
      mse7Message();
      return;
    }
  } else {
    index = parseInt(choix) - 1;

    if (names[index] !== "") {
      msgReserve.textContent = "Ce siège est déjà occupé!";
      msgReserve.className = "w-full rounded-lg px-4 py-2 font-semibold text-white text-center bg-rose-600 mt-3 block";
      mse7Message();
      return;
    }
  }

  names[index] = smiya;
  trip.reservations.push({seat: index + 1, name: smiya, phone: tele});
  // saveNames();
  save(allTrips);
  msgReserve.textContent = "Siège " + (index + 1) + " réservé pour " + smiya;
  msgReserve.className = "w-full rounded-lg px-4 py-2 font-semibold text-white text-center bg-emerald-600 mt-3 block";

  nameInput.value = "";
  updatePage();
  updateSelectOptions();
  mse7Message();
});

function modifierReservation() {
  const btnModify = document.querySelector("#btnmodify");
  const selectPass = document.querySelector("#Passager");
  const inputNewName = document.querySelector("#Nouveau-nom");
  const selectNewSeat = document.querySelector("#Nouveau-siège");
  const inputNewTel = document.getElementById("niv-Téléphone");

  function refreshLists() {
    selectPass.innerHTML = '<option value="">Choisir un passager...</option>';
    selectNewSeat.innerHTML = '<option value="">Choisir un siège...</option>';

    for (let i = 0; i < 20; i++) {
      if (names[i] !== "") {
        selectPass.innerHTML += `<option value="${i}">${names[i]} (Siège ${i + 1})</option>`;
      } else {
        selectNewSeat.innerHTML += `<option value="${i + 1}">Siège ${i + 1}</option>`;
      }
    }
  }

  const msgModify = document.createElement("p");
  btnModify.parentElement.appendChild(msgModify);

  function afficherlemessage(texte, couleur) {
    msgModify.textContent = texte;
    msgModify.className = "w-full rounded-lg px-4 py-2 font-semibold text-white text-center mt-3 block bg-" + couleur + "-600";

    setTimeout(function () {
      msgModify.textContent = "";
      msgModify.className = "";
    }, 3000);
  }
selectPass.addEventListener("change", function(){
    const seatSelected = Number(this.value);
    if(!seatSelected)
      return;
    const res = trip.reservations.find(r => r.seat === seatSelected);
    if(res){
      inputNewName.value = res.name;
      inputNewTel.value = res.phone;
      selectNewSeat.value = ""; 
    }
  });
  btnModify.addEventListener("click", function (e) {
    e.preventDefault();

    if (selectPass.value === "") {
      afficherlemessage("Choisir un passager!", "rose");
      return;
    }

    const index = Number(selectPass.value);
    const newName = inputNewName.value.trim();
    const newSeat = selectNewSeat.value;
    const newTel = inputNewTel.value.trim();

    const erreurTel = validerModification(trip, newTel, (index + 1)); 
    if (erreurTel) {
      afficherlemessage(erreurTel, "rose");
      return;
    }

    // if (newName === "" && newSeat === "") {
    //   afficherlemessage("Entrer un nouveau nom ou choisir un siège!", "rose");
    //   return;
    // }

    if (newName !== "") {
      names[index] = newName;
    }

    if (newSeat !== "") {
      const newIndex = parseInt(newSeat) - 1;
      const currentName = names[index];
      names[index] = "";
      names[newIndex] = currentName;
    }

    const seatToUpdate = newSeat !== "" ? (parseInt(newSeat)) : (index + 1);
    const resToUpdate = trip.reservations.find(r => r.seat === (index + 1)); // الحجز القديم
    if (resToUpdate) {
      resToUpdate.phone = inputNewTel.value.trim(); 
      if (newSeat !== "") resToUpdate.seat = seatToUpdate; 
    }
    save(allTrips);

    inputNewName.value = "";
    updatePage();
    updateSelectOptions();
    refreshLists();
    afficherlemessage("Modification enregistrée!", "green");
  });

  form.addEventListener("submit", function () {
    setTimeout(refreshLists, 100);
  });
  refreshLists();
}

function supprimerReservation() {
  const btnDelete = document.querySelector("#btnSupprimer");
  const selectDelete = document.querySelector("#Pass-ager");

  const msgDelete = document.createElement("p");
  btnDelete.parentElement.appendChild(msgDelete);

  function refreshListssuprimer() {
    selectDelete.innerHTML = '<option value="">Choisir un passager...</option>';
    for (let i = 0; i < 20; i++) {
      if (names[i]) {
        selectDelete.innerHTML += `<option value="${i}">${names[i]} (Siège ${i + 1})</option>`;
      }
    }
  }

  function afficherMsgDelete(texte, couleur) {
    msgDelete.textContent = texte;
    msgDelete.className = "w-full rounded-lg px-4 py-2 font-semibold text-white text-center mt-3 block bg-" + couleur + "-600";
    setTimeout(function () {
      msgDelete.textContent = "";
      msgDelete.className = "";
    }, 3000);
  }

  btnDelete.addEventListener("click", function (e) {
    e.preventDefault();

    if (selectDelete.value === "") {
      afficherMsgDelete("Choisir un passager à supprimer!", "red");
      return;
    }

    const index = Number(selectDelete.value);
    names[index] = "";
    saveNames();
    updatePage();
    updateSelectOptions();
    refreshListssuprimer();
    afficherMsgDelete("Réservation supprimée avec succès!", "green");
  });

  form.addEventListener("submit", function () {
    setTimeout(refreshListssuprimer, 100);
  });
  refreshListssuprimer();
}

const njiboId = Number(new URLSearchParams(location.search).get("id"));

savehh().then(function (trips) {
  allTrips = trips;
  trip = trips.find(dak => dak.id === njiboId);
  if (!trip) {
    return;
  }

  for (let i = 0; i < trip.reservations.length; i++) {
    const r = trip.reservations[i];
    names[r.seat - 1] = r.name;
  }

  updatePage();
  updateSelectOptions();
  modifierReservation();
  supprimerReservation();
});
