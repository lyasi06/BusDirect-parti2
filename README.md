# BusDirect-partie 2

Application web de gestion des réservations de bus pour le réseau BusDirect. 
Ce projet est la Partie 2, développée de manière modulaire avec JavaScript (Modules ES6).

## Fonctionnalités

- Chargement des trajets depuis `trips.json` via `fetch`.
- Sauvegarde des données dans le `localStorage`.
- Affichage dynamique des cartes de trajets et statistiques (Recette/Passagers).
- Calcul des places libres et du statut (Disponible/Complet).

## Technologies
- HTML
- Tailwind CSS
- JavaScript (DOM)
- localStorage
- HTML5: Structure des pages.
- Tailwind CSS (via CDN) : Pour un design moderne et responsive.
- JavaScript (ES6 Modules) : Logique de l'application, manipulation du DOM, fetch API.


## Structure
- `index.html` : Liste des trajets.
- `cabine.html` : Gestion des sièges d'un trajet.
- `js/` : Code séparé (`store.js`, `render.js`, `reservations.js`, `main-trajets.js`).

## Tâches réalisées
#Jour 1 - Préparation

Création des branches Git (partie-2, feature/...).
Création de l'arborescence (data/, js/)
Configuration des modules JS (import/export) et test de base.

#Jour 2 - Données

Récupération des données depuis trips.json avec fetch.
Sauvegarde des données dans le localStorage.
Fonction initialiser() pour gérer le chargement.

## Commandes Git utilisées

```bash
git init
git add .
git commit -m "message"
git branch -M main
git remote add origin <url>
git push -u origin main
```

## Ressources utilisées

- W3Schools
- YouTube
- Google

## Auteur
ABDERRAHMANE LYASI
