/*
 * TWEB TE 2
 * Auteur : Mélanie Huck
 * Date : 21.01.2016
 * 
 * Contrôleur se chargeant de la saisie utilisateur.
 */ 
 
app.controller("inputController", function($rootScope, $scope) {	
	
	/* La latitude : C'est la valeur angulaire du point dans l'axe Nord-Sud. 
	 * Elle vaut 0° à l'équateur, - 90° au pole sud et +90° au pole nord. 
	 * La longitude : C'est la valeur angulaire du point dans l'axe Ouest-Est. 
	 * Elle vaut 0° sur le méridien de GreenWich varie d'Ouest en 
	 * Est de -180° à +180° */

	// Variable contenant les points des 6 endroits autour desquels
	// sera faite la requête à l'API
	var points = [{lat:'', lon:''},
				  {lat:'', lon:''},
				  {lat:'', lon:''},
				  {lat:'', lon:''},
				  {lat:'', lon:''},
				  {lat:'', lon:''}];
		
	// Valeurs par défaut, à Lausanne
	$scope.point0 = new Object();			
	$scope.point0.lat = 46.521;  
	$scope.point0.lon = 6.631;			  
	
	// Récupérer les coordonnées des 2 points données par l'utilisateur
	$scope.getPoints = function() {
				
		// Faire quelques petites vérifications pour s'assurer que les
		// coordonnées sont bien valables
		if ($scope.point0 == undefined || $scope.point0.lat == null
		    || $scope.point0.lon == null) {

			console.log('Coordonnées non valables !');
			return null;
		} else {
			points[0].lat = parseFloat($scope.point0.lat);
			points[0].lon = parseFloat($scope.point0.lon);
		}
		    
		if ( points[0].lat < -90 || points[0].lat > 90
			 || points[0].lon < -180 || points[0] > 180) {
			console.log('Coordonnées non valables !');
			return null;
		}

		// Calculer le point 1 (antipode) 
		points[1].lat = - points[0].lat;  
		if(points[0].lon >= 0) {
			points[1].lon = points[0].lon - 180; 
		} else {
			points[1].lon = points[0].lon + 180;
		}
		
		// Calculer le point 2 
		if(points[0].lat >= 0) {
			points[2].lat = 90 - points[0].lat; 
		} else {
			points[2].lat = points[0].lat + 90; 
		}	
		if(points[0].lat >= 0) {
			if(points[0].lon >=0) {
				points[2].lon = points[0].lon - 180; 
			} else {
				points[2].lon = points[0].lon + 180;
			}			
		} else {
			points[2].lon = points[0].lon;
		}

		// Calculer le point 3 OK
		if(points[0].lat >= 0) {
			points[3].lat = points[0].lat - 90; 
		} else {
			points[3].lat = - 90 - points[0].lat;
		}
		if(points[0].lat >= 0) {
			points[3].lon = points[0].lon;
		} else {
			if(points[0].lon >= 0) {
				points[3].lon = points[0].lon - 180; 
			} else {
				points[3].lon = points[0].lon + 180;
			}
		}	
			
		// Calculer le point 4	
		points[4].lat = 0;	
		if(points[0].lon >= - 90) {
			points[4].lon = points[0].lon - 90;
		} else {
			points[4].lon = points[0].lon + 270;
		} 
		
		// Calculer le point 5
		points[5].lat = 0;	
		if(points[0].lon <= 90) {
			points[5].lon = points[0].lon + 90;
		} else {
			points[5].lon = points[0].lon - 270;
		} 
		
		console.log(points);
		$rootScope.points = points;
	}; 	
});
