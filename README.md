# BusDirect

Ce projet est la deuxième partie de l'application BusDirect, dédiée à la gestion des réservations de bus. Durant cette partie, j'ai travaillé sur plusieurs fonctionnalités pour rendre l'application plus complète et professionnelle.

## Ce que j'ai réalisé
J'ai découpé le travail en 11 challenges répartis sur 8 jours. Voici les principales fonctionnalités développées :

Structure et Modules : J'ai organisé le code dans plusieurs fichiers dans le dossier js (comme store.js, render.js, etc.) et je les ai liés au HTML avec type="module".

Chargement des données : J'ai lu les trajets depuis trips.json avec fetch, puis je les ai sauvegardés dans le localStorage pour qu'ils ne disparaissent pas lors d'un rafraîchissement de la page.

Affichage des trajets : J'ai créé des cartes pour afficher les trajets avec un design propre, ainsi que les statistiques globales (recette totale et nombre de passagers).

Recherche et Filtre : J'ai ajouté une barre de recherche et un filtre par statut (Disponible / Complet), avec une pagination pour afficher 6 trajets par page.

La Cabine : J'ai créé une page dédiée pour chaque trajet, avec 20 sièges. On peut voir si un siège est libre ou occupé, avec le nom du passager.

Sièges VIP : Les sièges 1 à 4 sont des VIP, avec une couleur dorée et un prix majoré de 10%.

Réservation et Validation : J'ai mis en place le formulaire de réservation avec la validation du nom (non vide et non dupliqué) et du téléphone (avec un Regex pour vérifier les 10 chiffres commençant par 06 ou 07, et éviter les doublons).

Modification et Annulation : Un passager peut changer son nom, son téléphone ou son siège. Il peut aussi annuler sa réservation.

Liste d'attente : Si le bus est complet, le formulaire de réservation est désactivé et celui de la liste d'attente s'active. Lorsqu'une place se libère, le premier de la liste l'obtient automatiquement.

Déploiement : J'ai connecté le projet à Vercel pour qu'il soit accessible en ligne.

## Organisation des fichiers

-index.html : La page principale avec la liste des trajets.
-cabine.html : La page de la cabine avec les sièges et les formulaires.
-data/trips.json : Le fichier contenant les données des trajets (lecture seule).
-js/ : Le code JavaScript divisé en plusieurs fichiers :
-store.js : Gère le chargement des données depuis le JSON et la sauvegarde dans le localStorage.
-validators.js : Contient les règles de validation (nom et téléphone).
-reservations.js : Contient les calculs (places libres, prix VIP, recette).
-render.js : S'occupe de l'affichage des cartes et des sièges dans le HTML.
-main-trajets.js : Le script principal pour la page index.html.
-main-cabine.js : Le script principal pour la page cabine.html.

## Technologies
- HTML
- Tailwind CSS
- JavaScript (DOM)
- localStorage

## Lancer le projet

1. Télécharger ou cloner le projet
2. Ouvrir `index.html` dans le navigateur

## Tâches réalisées

- Création de la page HTML
- Design avec Tailwind CSS
- Affichage dynamique des sièges
- Formulaires : réserver, modifier, supprimer
- Messages d'erreur et de succès
- Sauvegarde avec localStorage
- Publication sur GitHub

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

- 
## Remarques
-Le projet est lancé avec Live Server (nécessaire pour fetch et les Modules).
-Toutes les données sont sauvegardées dans le localStorage, donc les réservations sont conservées même après actualisation de la page.
## Auteur
ABDERRAHMANE LYASI
