// create map
var map = new Datamap({
	  element: document.getElementById("container"),
	  projection: 'mercator',
	  
	// give linegrpah of the clicked country  
   	done: function(datamap) {
            datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
            	d3.selectAll("#linegraph > *").remove();
            	lineGraph(geography.properties.name, geography.id, 53);
            });
        },

    // show popup on hover with data info
    geographyConfig: {
    		borderColor: '#d3d3d3',
            popupTemplate: function(geo) {
        	console.log(dict2[geo.id][53][1]);
            	
                return ['<div class="hoverinfo"><strong>'
                      	+ geo.properties.name,
                        ': ' + dict2[geo.id][53][1],
                        '</strong></div>'].join('');
            }
        }
	});
var yearbox = d3.select("#yearbox");
yearbox.append('year')
	.text('1960')
	.attr('x', 100)
	.attr('y', 5);



var colors2 = ['#f7fcfd', 
			'#e0ecf4', 
			'#bfd3e6', 
			'#9ebcda', 
			'#8c96c6', 
			'#8c6bb1', 
			'#88419d', 
			'#6e016b']; 

// determine color for a given fertility rate
function bin(rate) {
	if (rate < 1) {
		color = colors2[0];
	}
	else if (rate >= 1 && rate < 2) {
		color = colors2[1];
	} 
	else if (rate >= 2 && rate < 3) {
		color = colors2[2];
	} 
	else if (rate >= 3 && rate < 4) {
		color = colors2[3];
	}
	else if (rate >= 4 && rate < 5) {
		color = colors2[4];
	}
	else if (rate >= 5 && rate < 6) {
		color = colors2[5];
	}
	else if (rate >= 6 && rate < 7) {
		color = colors2[6];
	}else if (rate >= 7 && rate < 8) {
		color = colors2[7];
	}
}

colors = []

// inverse the array order
for (var i = 0; i < colors2.length; i ++) {
	colors.push(colors2[colors2.length - 1 - i])
};

function colorDatamap(year) {
	// dictionary for updateChloropleth()
	dict = {};

	// determine color for each country 
	data.forEach(function(i){
		// console.log(i.countryCode)

		if (i.fertilityRate[year] != ''){
			bin(i.fertilityRate[year][1])

			dict[i.countryCode] = color
		};
	});
	// change map colors	
	map.updateChoropleth(dict)
	yearbox.text(year + 1960)

	// change the popup data to the right year
	map.options.geographyConfig.popupTemplate = function(geo) {
    	console.log(geo.id);
        return ['<div class="hoverinfo"><strong>'
          	+ geo.properties.name,
            ': ' + dict2[geo.id][year - 1960][1],
            '</strong></div>'].join('');
    };
};

function lineGraph(countryname, countrycode){
	width = 500.0,
	height = 300.0,
	margin = {
		top: 20.0,
		right: 20.0,
		bottom: 20.0,
		left: 50.0
		}

	// select html element
	var graph = d3.select("#linegraph");

		// linear transformation functions
		range_x = d3.scale.linear().range([margin.left, width - margin.right]).domain([1960, 2013]);
		range_y = d3.scale.linear().range([height - margin.top, margin.bottom]).domain([0, 8]);

		// create axis
		x_axis = d3.svg.axis().scale(range_x).tickSize(2).tickSubdivide(true);
		y_axis = d3.svg.axis().scale(range_y).tickSize(2).orient("left");

	// add legend / background colors
	for (var k = 0 ; k < colors.length; k++) {
		marge = margin.top + k * (height - margin.top - margin.bottom) / colors.length

		graph.append("rect")
	    .attr("width", width - margin.left - margin.right)
	    .attr("height", (height - margin.top - margin.bottom) / colors.length) 
	    .attr("fill", colors[k])
	    .attr("transform", "translate(" + margin.left + "," + marge + ")");
    };																																					

	// append axis to graph
	graph.append('svg:g')
	.attr('class', 'x axis')
	.attr('transform', 'translate(0,' + (height - margin.bottom) + ')')
	.call(x_axis);

	graph.append('svg:g')
	.attr('class', 'y axis')
	.attr('transform', 'translate(' + margin.left + ', 0)')
	.call(y_axis);

	// plot graph
	var line = d3.svg.line()
		.x(function(d) {
			return range_x(d[0]);
		})
		.y(function(d) {
			return range_y(d[1]);
		})

	// append plot tot graph
	graph.append('svg:path')
		.attr('d', line(dict2[countrycode]))
		.attr('stroke', '#8856a7') // #8856a7
		.attr('stroke-width', 2)
		.attr('fill', 'none');

	// make lines for crosshair
	var vertical_line = graph.append('line')
			.style("stroke", "black")
			.style("opacity", 0)  
		    .attr("x1", 0)     
		    .attr("y1", margin.top)    
		    .attr("x2", 0)    
		    .attr("y2", height - margin.bottom);

    var horizontal_line = graph.append('line')
			.style("stroke", "black")
			.style("opacity", 0)  
		    .attr("x1", margin.left)     
		    .attr("y1", 0)    
		    .attr("x2", width - margin.right)    
		    .attr("y2", 0);

    // add all text elements to graph
	graph.append("text")
		.attr("transform", "rotate(90)")
        .attr("x", height / 2 )
        .attr("y", 0)
        .style("text-anchor", "middle")
        .text('fertility rate (births per women)');

    graph.append("text") 
        .attr("x", width / 2 )
        .attr("y", height + 15)
        .style("text-anchor", "middle")
        .text('Date (years)');

	var year_box = graph.append("text") 
		.attr("transform", "rotate(-90)")
        .attr("x", 0 )
        .attr("y", 0 )
        .style("border",  1 + 'px solid #000000')
        .style("text-anchor", "middle")
        .style("opacity", 0);

    var value_box = graph.append("text") 
        .attr("x", 100 )
        .attr("y", 100 )
        .style("border",  1 + 'px solid #000000')
        .style("text-anchor", "middle")
        .style("opacity", 0);

    var countryname = graph.append("text") 
        .attr("x", width / 2 )
        .attr("y", margin.top -3 )
        .style("text-anchor", "middle")
        .text(countryname);

	// if the mouse is moved the crosshair moves and the data shown after a delay
	graph.on('mousemove', function(d) {

		// gets the position of the mouse
		position = d3.mouse(this);
		x = position[0];
		y = position[1];

		year = Math.round(range_x.invert(x))

		x = range_x(year)

		if (x <= width - margin.right && x >= margin.left){
		// update crosshair position
			vertical_line.style("opacity", 1)
				.attr("x1", x)
				.attr("x2", x);

			horizontal_line.style("opacity", 1)
				.attr("y1", range_y(dict2[countrycode][year - 1960][1]))
				.attr("y2", range_y(dict2[countrycode][year - 1960][1]));

		year_box.attr("y", x + 15 )
			.attr("x", - 50 )
			.style("opacity", 1) 
			.text(year);

		value_box.attr("y", range_y(dict2[countrycode][year - 1960][1]) - 2)
			.style("opacity", 1) 
			.text(dict2[countrycode][year - 1960][1]);
        
        if (x <= width / 2){
        	value_box.attr('x', 3 * width / 4);
        }
        else {
        	value_box.attr('x', width / 4);
        }
		year_box.text(year);	
		};
		
		}).on('click', function(d) {
			
			colorDatamap(year - 1960);

			map.options.geographyConfig.popupTemplate = function(geo) {
	
		        return ['<div class="hoverinfo"><strong>'
		          	+ geo.properties.name,
		            ': ' + dict2[geo.id][year - 1960][1],
		            '</strong></div>'].join('');
        	}   
		})
}

// function colors map for all years consecutively
var i = 0;                    
function timelapse() {          
   setTimeout(function () {    
      colorDatamap(i);        
      i++;                   
      if (i < 53) {           
         timelapse();             
      }                        
   }, 300)
}

d3.json('fertilityRate.json', function(error, json) {
	if (error) return console.warn(error);
	data = json;
	
	// dictionary for plotting linegraph 
	dict2 = {};	
	data.forEach(function(j){
		dict2[j.countryCode] = j.fertilityRate;
	});

	// load graphs
	colorDatamap(0); 
	lineGraph('The Netherlands','NLD');
});

