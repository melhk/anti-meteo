# Anti-meteO

Application déployée sur Heroku : http://tweb-app.herokuapp.com/    (/!\ y accéder en HTTP et non pas HTTPS)

## Introduction

Le but de ce travail est de développer une application AngularJS afin d'afficher du contenu via l'API OpenWeatherMap. Une fois l'application terminée, elle sera déployée sur le site https://www.heroku.com/.

## L'API OpenWeatherMap

L'API choisie est l'API d'OpenWeatherMap ( http://openweathermap.org/api ). OpenWeatherMap est un service inspiré par OpenStreetMap et Wikipédia, "offrant de l'information libre pour tout le monde".

A travers son API, ce service expose des relevés météorologiques pour plus de 200'000 villes. Ces données sont des données historiques, des données à propos du temps actuel, ou des prévisions pour les jours à venir.

L'accès à cette API est gratuit ou payant (avec plusieurs tarifs sont possibles). Les principales différences entre l'accès gratuit et l'accès payant sont les suivantes : 
Un accès gratuit est limité à 60 appels par minute et 50'000 appels par jour, et les prévisions météorologiques ne sont disponible que pour les 5 jours suivants. L'accès payant étend ces limites jusqu'à 200'000 appels par minute et 200'000'000 appels par jours, avec des prévisions météorologiques sur les 16 prochains jours. Un accès payant inclu également un support de la part des développeurs, ainsi que l'utilisation de serveurs distribués, voir même une possible personnalisation de l'API dans le cas de l'offre la plus chère.

Dans tous les cas, l'utilisation de l'API nécessite une clé que l'on obtient simplement en s'inscrivant sur le site.

## Spécification de la fonctionnalité et interface utilisateur

L'API offre la possibilité de récupérer la liste des villes autour d'un point géographique avec leurs relevés météorologiques actuels associées. L'idée est de permettre à l'utilisateur de saisir un point de son choix (point de référence) en entrant une latitude et une longitude, puis que l'application lui retourne les données météorologiques pour les 5 autres "coins" de la Terre opposés à ce point de référence.

![alt text][sphere]

Les résultats retournés sont affichés en tant que points sur un graphe 3D. Les axes X et Y correspondent à la latitude et la longitude, l'axe Z à la température en un endroit donné.

![alt text][interface]

Des informations supplémentaires relatives à un point apparaissent dynamiquement lorsque l'utilisateur pointe sur celui-ci, telles que le nom de la station météo, la température, l'humidité et le temps actuel.

![alt text][infos]


## Réalisation

#### Structure du projet

Comme cette application est une toute petite application, ne faisant qu'afficher des informations sur une page côté client, il est tout à fait possible de se passer d'un générateur qui fournirait plus d'outils que nécessaire. Cette application a été développée à l'aide d'AngularJs, Bootstrap pour la mise en forme, et la bibiothèque vis.js pour la visualisation des données.

#### AngularJs

Un contrôleur a été développé pour gérer la saisie des données utilisateur, et un pour l'exécution des requêtes à l'API et l'affichage du graphe. Il a été nécessaire d'implémenter un mécanisme de communication entre ces contrôleurs afin de passer le résultat de la saisie utilisateur au contrôleur de la page une fois le bouton "GO !" cliqué. Cela a été réalisé à l'aide de la fonction $watch permettant d'observer des changements sur une variable globale.

#### Appels à l'API

L'API d'OpenWeatherMap peut être consultée à l'adresse suivante : http://openweathermap.org/api

Pour ce projet, seul l'appel "Cities in a circle" a été utilisé. Cet appel retourne les données pour un nombre de villes désiré autour d'un point donné. Les paramètres de cet appel sont la latitude (lat) et la longitude (lon) de l'endroit désiré, ainsi que le nombre de résultats attendus en réponse (cnt). La spécification des unités est optionnelle.

Exemple d'appel avec les paramètres "lat = 55, lon = 37, cnt = 30, mètres" :

http://api.openweathermap.org/data/2.5/find?lat=55.5&lon=37.5&cnt=30&units=metric&APPID=95f720261acce5190df9654a0cb94aec

Résultat type, pour une seule ville uniquement :

![alt text][resultat]

L'API n'offre malheureusement pas la possibilité de grouper ce type de requêtes, et il a été nécessaire de faire une requête pour chacun des points, donc 6 requêtes au total, à chaque fois que l'utilisateur saisi un nouveau point de référence. Chaque requête a été exécutée avec le paramètre cnt = 1, ce qui retourna donc les valeurs météorologiques de la station étant la plus proche du point cible.


#### Visualisation des données 

Pour la visualisation des données, la bibliothèque vis.js a été utilisée ( http://visjs.org/ ). Cette bibliothèque met a disposition plusieurs types de graphes, 2D, 3D, timeline, etc. Les graphes peuvent être personnalisés très facilement en modifiant quelques options prédéfinies.


## Conclusion

Ce travail a été très intéressant à réaliser et m'a certainement plus apporté qu'un travail écrit. Il m'a obligée à mettre en pratique certains concepts vu en cours, m'a permis de me familiariser avec Javascript, et j'ai commencé à trouver amusant ce qui avant était plutôt abstrait et intimidant.


## Quelques liens en vrac qui m'ont été (bien) utiles

#### A propos de Bootstrap

- http://startbootstrap.com/template-overviews/simple-sidebar/
- https://bootstrapbay.com/blog/bootstrap-button-styles/
- http://www.w3schools.com/bootstrap/bootstrap_modal.asp

#### A propos d'Angular

- http://www.w3schools.com/angular/angular_application.asp
- http://www.sitepoint.com/api-calls-angularjs-http-service/
- https://spring.io/guides/gs/consuming-rest-angularjs/
- http://campus.codeschool.com/courses/shaping-up-with-angular-js/level/1/section/1/video/1
- https://docs.angularjs.org/tutorial/step_00
- http://code.tutsplus.com/tutorials/building-a-web-app-from-scratch-in-angularjs--net-32944
- https://www.quora.com/How-do-I-get-HTML-form-input-value-in-AngularJs-controller
- http://www.angulartutorial.net/2014/03/communicate-with-controllers-in-angular.html
- http://www.angulartutorial.net/2014/03/how-to-use-watch-concept-in-angular-js.html
- http://tutorials.jenkov.com/angularjs/watch-digest-apply.html

[sphere]: illustrations/sphere.png "Les 6 "coins" de la Terre"
[interface]: illustrations/interface.png "Interface de l'application"
[infos]: illustrations/infos.png "Informations supplémentaires pour un point"
[resultat]: illustrations/resultat.png "Resultat retourné par l'API"

