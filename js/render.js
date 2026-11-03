
import {placesLibres, estComplet, totalPassagers, recetteTotale} from "./reservations.js";
export function trajetsrendrer(trips){
    const container = document.querySelector("#listeTrajets");
    if(!container)
        return;

container.innerHTML = "";

trips.forEach(trip => {
     const libres = placesLibres(trip);
    const complet = estComplet(trip);
    
    const statutCouleur = complet ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700";
    const statutTexte = complet ? "Complet" : "Disponible";

    container.innerHTML += `
    <div class="flex flex-col h-full">
    <article class="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col">
        <div class="flex justify-between items-start mb-2">
          <h2 class="text-lg font-bold text-slate-800">${trip.departure} → ${trip.destination}</h2>
          <span class="text-xs font-semibold px-2 py-1 rounded-full ${statutCouleur}">${statutTexte}</span>
        </div>
        
        <p class="text-sm text-slate-500 mb-3 flex items-center gap-1">
          ${trip.departureTime} → ${trip.arrivalTime}
        </p>
        
        <p class="text-xl font-bold text-blue-700 mb-4">${trip.price} DH</p>
        
        <div class="mt-auto">
          <div class="flex justify-between text-sm mb-1">
            <span class="text-slate-600">Places libres</span>
            <span class="font-bold text-slate-800">${libres} / ${trip.capacity}</span>
          </div>
          
          
            
          
          <p class="text-xs text-slate-500 mb-4 flex items-center gap-1">
            En attente : <span class="font-bold">${trip.waitingList.length}</span>
          </p>
          
          <a href="cabine.html?id=${trip.id}" class="block text-center w-full bg-blue-700 text-white font-semibold py-2 rounded-lg hover:bg-blue-800 transition">
            Ouvrir la cabine
          </a>
        </div>
      </article>
      </div>
      `
});
if(trips.length === 0){
   container.innerHTML +=`
   <div class="col-span-full flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow text-center">
            
            <p class="text-base font-semibold text-gray-700">Aucun résultat trouvé</p>
        </div>;`
}
}
export function rederStatistique(trips){
    const passagers = document.querySelector("#disponible");
    const recett = document.querySelector("#recette");

    if (passagers) passagers.textContent = totalPassagers(trips);
    if (recett) recett.textContent = recetteTotale(trips) + " DH";
}