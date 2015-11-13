// Javascript warm-up exercises
// 
// Patrick Jonk
// 10001336

var ApplePie = {
	creator : '',
	ingredients : []
};

// Exercise 1: 

ApplePie.creator = document.getElementsByTagName("p")[0].textContent

ingredients = document.getElementById("ingredient-list").getElementsByTagName("li")

// push ingredients to object ApplePie
for (var i = 0; i < ingredients.length; i++){
ApplePie.ingredients.push(ingredients[i].textContent)
}

// Exercise 2:

// print object.list elements in console 
for (var i = 0; i < ApplePie.ingredients.length ; i++) {
	console.log(ApplePie.ingredients[i])
};

// Exercise 3:

function hello(){
	console.log("Hello, chef!")
}

// Select the html element containing the img using javascript selectors.
document.getElementsByTagName("img")[0].addEventListener("click", hello)

// Exercise 4:

function createTransform(domain, range){
	// domain is a two-element array of the domain's bounds
	// range is a two-element array of the range's bounds
	// implement the actual calculation here
	
	var alpha = (range[1] - range[0]) / (domain[1] - domain[0]);
	var beta = range[0] - (alpha * domain[0]);

	return function(x){
		return alpha * x + beta;
	};
}

// to use this for instance:
var transform = createTransform([0, 2000], [300, 800]);
console.log(transform(0)); 