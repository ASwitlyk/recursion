var getElementsByClassName = function(string) {

	var test;

	var element = document.body;

	var ret_arr = []; // empty arrary to populate with elements that have classes in the string

	var classes = string.split(' '); // split string into array populated with each class to match
	var classes_length = classes.length;

	var matchclass = function(elem) {

		var elem_classes;

		if(elem.classList) {
			elem_classes = elem.classList;
		} else {
			elem_classes = undefined;
		}

		var child_nodes = elem.childNodes;

		if(elem_classes != undefined || elem_classes != null || child_nodes.length > 0) { //If element variable has classes or child nodes

			// Check to see if classes in element match the list of classes to be matched
			if(_.intersection(classes, elem_classes).length === classes_length) { 
				ret_arr.push(elem);
			}

			if(child_nodes.length > 0) {  // Element has child nodes to check

				_.each(child_nodes, function(value) {

					matchclass(value);
				});

			}
		} 

		
	} // End of matchclass()


	console.log('works!');
	matchclass(element);

	return ret_arr;


}

/* getElementsByClassName(string) - accepts a string of classes and returns an array like object of all child elements which
 have all of the given class names

*/

/* document.body - returns the <body> element of the current document
*/

/* element.childNodes - returns an array of all of the child nodes for that element

   element.classList - returns a token list of the class attributes of the element


*/
