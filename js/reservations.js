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