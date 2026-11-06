// placesLibres(trip) = capacity - reservations.length, puis
// estComplet(trip).

export function placesLibres(trip){
    return trip.capacity - trip.reservations.length;
}

export function estComplet(trip){
    return placesLibres(trip) === 0;
}

export function totalPassagers(trips){
    return trips.reduce((total, trip) => total + trip.reservations.length, 0);
}

export function recetteTotale(trips){
    return trips.reduce((total, trip) => total + (trip.reservations.length * trip.price),0);
}


export function VIP(siege){
    return siege >= 1 && siege <= 4;
}

export function prixSiege(prixBase, seige){
    if(VIP(seige)){
        return Math.round(prixBase * 1.1);
    }
    return prixBase;
}

export function recetteTrajet(trip){
    return trip.reservations.reduce((total, r)=>{
        return total + prixSiege(trip.price, r.seat);
    }, 0);
}