var map = new Datamap({
	  element: document.getElementById("container"),
	  projection: 'mercator',
	});

function determineBin(population) {
	if (population >= 64 && population < 67) {
		color = '#bfd3e6';
	}
	else if (population >= 67 && population < 70) {
		color = '#9ebcda';
	} 
	else if (population >= 70 && population < 73) {
		color = '#8c96c6';
	} 
	else if (population >= 76 && population < 79) {
		color = '#8856a7';
	}
	else if (population >= 79 && population < 82) {
		color = '#810f7c';
	}
	else {
		color = '#edf8fb'
	}
}

d3.json('data2.json', function(error, json) {
	if (error) return console.warn(error);
	data = json;
	console.log(data);

	dict = {};

	data.forEach(function(i){
		//console.log(i.age)
		determineBin(i.age)
		if (i.country_code.length == 3){
			dict[i.country_code] = color
		}
		//color = null; 


		
		map.updateChoropleth(dict)
  });

	

});


	
