

export const REGEX_TELEPHONE = /^0[67]\d{8}$/;

export function validerTelephone(trip, telephone) {
  if (!REGEX_TELEPHONE.test(telephone)) {
    return "10 chiffres commençant par 06 ou 07 et aussi selement 10 chiffres.";
  }
  const telReserve = trip.reservations.some(r => r.phone === telephone);
  const telAttente = trip.waitingList ? trip.waitingList.some(w => w.phone === telephone) : false;
  if (telReserve || telAttente) {
    return "Ce numéro est déjà utilisé sur ce trajet.";
  }
  return null; 
}