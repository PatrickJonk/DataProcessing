/* use this to test out your function */
window.onload = function() {
	path = 'be'
	color = '#ffffff'
 	changeColor(path, color);

 	path = 'path3884'
	color = '#000000'
 	changeColor(path, color);

 	path = 'path2906'
	color = '#ffff00'
 	changeColor(path, color);

 	path = 'path2920'
	color = '#ffff00'
 	changeColor(path, color);

 	path = 'pl'
	color = '#00ffff'
 	changeColor(path, color);
}



/* changeColor takes a path ID and a color (hex value)
   and changes that path's fill color */
function changeColor(id, color) {
	area = document.getElementById(path);
	area.style.fill = color;
}