var htmlStrings = [
  '<p class="targetClassName"></p>',
  '<p class="otherClassName targetClassName"></p>',
  '<p><p class="targetClassName"></p></p>',
  '<p><p class="targetClassName"><p class="targetClassName"></p></p></p>',
  '<p><p></p><p><p class="targetClassName"></p></p></p>',
  '<p><p class="targetClassName"></p><p class="targetClassName"></p></p>',
  '<p><div class="somediv"><div class="innerdiv"><span class="targetClassName">yay</span></div></div></p>'
];

describe('getElementsByClassName', function(){

  //Declare and define getElementsByClassName()
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


} // End of getElementsByClassName()


  it('should match the results of calling the built-in function', function(){
    $('body').addClass('targetClassName');
    htmlStrings.forEach(function(htmlString){
      var $rootElement = $(htmlString);
      $('body').append($rootElement);

      var result = getElementsByClassName('targetClassName');
      var expectedNodeList = document.getElementsByClassName('targetClassName');
      var expectedArray = Array.prototype.slice.apply(expectedNodeList);
      var equality = _.isEqual(result, expectedArray); // why can't we use `===` here?
      expect(equality).to.equal(true);

      $rootElement.remove();
    });
    $('body').removeClass('targetClassName');
  });

});
