// Patrick Jonk
// 10001336
// d3line.js

var data;

// load data
d3.json("data.json", function(error, json) {
	if (error) return console.warn(error);
	data = json;

	// some constants
	width = 1000,
	height = 500,
	margin = {
		top: 20,
		right: 20,
		bottom: 20,
		left: 50
		}

	// select html element
	var graph = d3.select("#linegraph");

		// linear transformation functions
		range_x = d3.time.scale().range([margin.left, width - margin.right]).domain([new Date(data[0][0]),
		 new Date(data[data.length - 1][0])]);
		range_y = d3.scale.linear().range([height - margin.top, margin.bottom]).domain([-5, 35]);

		// transformation from x - pixel to index
		reverse_range_x = d3.scale.linear().range([0, 365]).domain([margin.left, width - margin.right]);

		// create axis
		x_axis = d3.svg.axis().scale(range_x).tickSize(5).tickSubdivide(true);
		y_axis = d3.svg.axis().scale(range_y).tickSize(5).orient("left");

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
			return range_x(new Date(d[0]));
		})
		.y(function(d) {
			return range_y(d[1]/10);
		})

	// append plot tot graph
	graph.append('svg:path')
		.attr('d', line(data))
		.attr('stroke', 'blue')
		.attr('stroke-width', 2)
		.attr('fill', 'none');

	// gets data info boxes
	var date_box = d3.select(".date")
	var temp_box = d3.select(".temperature")

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

	// define timer for tooltip delay
	timer = null;

	// if the mouse is moved the crosshair moves and the data shown after a delay
	graph.on('mousemove', function(d) {

		// tooltip is not shown if mouse moves
		clearTimeout(timer);

		// gets the position of the mouse
		position = d3.mouse(this);
		x = position[0];
		y = position[1];

		// converts horizontal position into an index for looking up data
		index = Math.round(reverse_range_x(x));

		// update crosshair position
		vertical_line.style("opacity", 1)
			.attr("x1", x)
			.attr("x2", x);

		// data for tooltip and crosshair
		temperature = data[Math.round(reverse_range_x(x))][1] / 10;
		date = data[index][0];

		// update crosshair position
		horizontal_line.style("opacity", 1)
			.attr("y1", range_y(temperature))
			.attr("y2", range_y(temperature));


		//date_box.style('left', x + 'px').style('top', y + 'px');
		date_box.text(date);

		
		temp_box.text(temperature);

		// adjust div elements positions
		if (x < width/2){
			temp_box.style('left', (3 * width / 4) +'px');
			temp_box.style('top', range_y(temperature) - 12 + 'px');
							
		}
		else if (x => width / 2){

			temp_box.style('left', (width / 4) +'px');
			temp_box.style('top', range_y(temperature) - 12 + 'px');
		}

		if (range_y(temperature) < height / 2){	
			date_box.style('left', (x - 40) + 'px');
			date_box.style('top', (3 * height / 4) + 'px');							
		}
		// else if (range_y(temperature) => height / 2){
		// 	date_box.style('left', (x - 52) + 'px');
		// 	date_box.style('top', 10 + (height / 4) +'px');
		// }

		// gives di elements an outline
		date_box.style('border', 1 + 'px solid #000000')
		temp_box.style('border', 1 + 'px solid #000000');

		// hide div elements if mouse moves
		date_box.style("visibility", 'hidden');
		temp_box.style("visibility", 'hidden');
	    
		// make tooltip visible after delay
		timer = setTimeout(function(){ 
			date_box.style("visibility", 'visible');
			temp_box.style("visibility", 'visible');
		}, 1000);
  });
		

});
