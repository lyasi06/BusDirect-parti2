
import {getTrips} from "./store.js"

import {trajetsrendrer} from "./render.js"


export function handleFilter(){
    const trips = getTrips();
    const searchCity = document.getElementById("recherch");
    const searchSelector = document.getElementById("status");

    const City = searchCity.value.toLowerCase().trim();
    const status = searchSelector.value;

    const filterTrip = trips.filter((trip)=>{
        const matchCity = trip.departure.toLowerCase().includes(City) || trip.destination.toLowerCase().includes(City)
    
        let matchFilter = false;

        if(status === "tous"){
            matchFilter = true;
        }
        else if(status === "disponible"){
            matchFilter = trip.capacity > trip.reservations.length;
        }
        else if(status === "Complet"){
            matchFilter = trip.capacity === trip.reservations.length;
        }
        return matchCity && matchFilter;
    })
    
    initialisePagination(filterTrip);
}


//pagination 
let resulta = [];
const size = 6;
let pageprincipal = 1
export function initialisePagination(trips){
    resulta = trips;
    pageprincipal = 1;
    aficherlespage();
}

export function aficherlespage(){
    const startindex = (pageprincipal - 1) * size;
    const endindex = startindex + size;

    const pagetrips = resulta.slice(startindex, endindex);

    trajetsrendrer(pagetrips);
    addButton();

}

function addButton(){
    const pagination = document.getElementById("pagination");
    const ra9mpage = Math.ceil(resulta.length / size);

    let htmlKhawi = "";

    if(pageprincipal === 1){
        htmlKhawi += `<button data-page="${pageprincipal - 1}" class="font-bold border bg-white rounded-lg text-gray-400 border-gray-100 w-10 h-10 hover:bg-blue-700"disabled>&lt;</button>`;
    }
    else
        {
            htmlKhawi += `<button data-page="${pageprincipal - 1}" class="font-bold border bg-white rounded-lg text-gray-400 border-gray-100 w-10 h-10 hover:bg-blue-700">&lt;</button>`;
        }
        for(let i = 1; i <= ra9mpage; i++){
            if(i === pageprincipal){
                htmlKhawi += `<button data-page="${i}" class="font-bold border bg-white rounded-lg text-gray-400 border-gray-100 w-10 h-10 hover:bg-blue-700">${i}</button>`
            }
            else{
                htmlKhawi += `<button data-page="${i}" class="font-bold border bg-white rounded-lg text-gray-400 border-gray-100 w-10 h-10 hover:bg-blue-700">${i}</button>`;
            }
        }
        if(pageprincipal >= ra9mpage){
            htmlKhawi += `<button data-page="${pageprincipal + 1}" class="font-bold border bg-white rounded-lg text-gray-400 border-gray-100 w-10 h-10 hover:bg-blue-700" disabled>&gt;</button>`;
        }
        else{
            htmlKhawi += `<button data-page="${pageprincipal + 1}" class="font-bold border bg-white rounded-lg text-gray-400 border-gray-100 w-10 h-10 hover:bg-blue-700">&gt;</button>`;
        }
        pagination.innerHTML = htmlKhawi;
    }
    const paginationNav = document.getElementById("pagination")
    paginationNav.addEventListener("click", function(event){
        const button = event.target.closest("[data-page]");
        if(!button){
            return;
        }
        pageprincipal = Number(button.getAttribute("data-page"));
        aficherlespage();
    })