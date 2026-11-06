import {savehh} from "./store.js"
// import {VIP, prixSiege, recetteTrajet} from "./reservations.js"
const depart = document.getElementById("depart");
const arriver = document.getElementById("arriver");
const available = document.getElementById("available");
// const occupied = document.getElementById("occupées");
// const revenue = document.getElementById("recette");
// const seats = document.querySelectorAll("#seats article");
const boxsnda9 = document.getElementById("seats");

const njiboId = Number(new URLSearchParams(location.search).get("id"));

savehh().then(trips =>{
    const trip = trips.find(dak => dak.id === njiboId);
    if(!trip){
        depart.textContent = "Trajet";
        arriver.textContent = "introvable";
        boxsnda9.classList.add("hidden");
         document.getElementById("form-reserve").classList.add("opacity-50", "pointer-events-none");
         document.getElementById("form-modi").classList.add("opacity-50", "pointer-events-none");
         document.getElementById("form-annuler").classList.add("opacity-50", "pointer-events-none");
         document.getElementById("form-attente").classList.add("opacity-50", "pointer-events-none");
        return;
    }
    depart.textContent = trip.departure;
    arriver.textContent = trip.destination;
});