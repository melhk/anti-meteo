/*
 * TWEB TE 2
 * Auteur : Mélanie Huck
 * Date : 21.01.2016
 */ 

app.controller("pageController", function($rootScope, $scope, $http) {	
		
	// Valeurs pour l'appel à l'API
	var root = 'http://api.openweathermap.org/data/2.5';
	var apiKey = '95f720261acce5190df9654a0cb94aec';
	var cnt = 1;
	var units = 'metric';
	
	var dataVis = new vis.DataSet();
	dataVis.add({id:null, x: null, y: null, z: null, style: null});
	var options = {
				width:  screen.width,
				height: '500px',
				style: 'dot-line',
				showPerspective: true,
				showGrid: true,
				showShadow: true,
				keepAspectRatio: true,
				verticalRatio: 0.5,
				xLabel: 'latitude',
				xMax: 90,
				xMin: -90,
				yLabel: 'longitude',
				yMax: 180,
				yMin: -180,
				zLabel: 'température',		
				backgroundColor: {fill: null, stroke: 'black', strokeWidth: 1},
				gridColor: 'black',
				cameraPosition: {horizontal: 2, vertical: 0, distance: 1.5}
			};
	
	// Instantiate our graph object.
	var container = document.getElementById('visualization');
	var graph3d = new vis.Graph3d(container, dataVis, options);	

	// Observation 
	$rootScope.$watch('points',  function(result) {

		// Si on n'a pas de valeurs valides, ça ne sert à rien de continuer
		if(result == undefined || result == null) { 
			return;
		} else {

			function getWeatherData(callback) {					
				var weatherData = [];
				for (var i = 0; i < result.length; ++i) {
					// Faire un appel à l'API OpenWeatherMap pour le point 0
					$http.get(root + '/find?lat=' + result[i].lat + '&lon=' + result[i].lon
						+ '&cnt=' + cnt + '&units=' + units + '&APPID=' + apiKey)
						 .success(function(data) {      
							 weatherData.push(data);    
							 if (weatherData.length == result.length) {  
								 callback(weatherData);
						}
					});
				}
			}

			getWeatherData(function(weatherData) {
				// Create and populate a data table.
				dataVis = new vis.DataSet();
									
				// Ajouter les 6 points au graphe
				for (var i = 0; i < result.length ; ++i) {
					var temp = weatherData[i].list[0].main.temp;
					dataVis.add({id:i, x: weatherData[i].list[0].coord.lat, y: weatherData[i].list[0].coord.lon, z: temp, style: temp});
					console.log('x:' + result[i].lat + 'y:' + result[i].lon + 'z: ' + temp);
				}							

				// Ajouter des légendes dynamiques sur les points
				options.tooltip = function(coords) {
							  for (var i = 0; i < weatherData.length; ++i) {
								if (weatherData[i].list[0].coord.lat == coords.x && weatherData[i].list[0].coord.lon == coords.y) {
									console.log(weatherData[i]);
								  return '<div  class="center point">'
											+' <h4>' + weatherData[i].list[0].name + '</h4>'
											+ '<p>'+ 'Lat. <span class="gras">' + (weatherData[i].list[0].coord.lat).toFixed(1) + '</span>' 
											+ 		' / Lon. <span class="gras">' + (weatherData[i].list[0].coord.lon).toFixed(1) + '</span><br>' 
											+ 		'Température : ' + (weatherData[i].list[0].main.temp).toFixed(1) + ' °C <br>' 
											+ 		'Humidité	 : ' + (weatherData[i].list[0].main.humidity).toFixed(1) + ' % <br>' 
											+ 		weatherData[i].list[0].weather[0].description;
											+ '</p>'
									   + '</div>'
								}
							  }
							  return 'not found :(';
						 };

				// Instanciation du graphe
				var graph3d = new vis.Graph3d(container, dataVis, options);	
				
				$scope.data2 = weatherData;
			});	
		}
	}, true);		
});




