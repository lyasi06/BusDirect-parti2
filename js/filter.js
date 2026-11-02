
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
    
    trajetsrendrer(filterTrip);
}