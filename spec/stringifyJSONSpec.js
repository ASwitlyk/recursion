// test cases are described in fixtures.js
describe('stringifyJSON', function(){
  it('should match the result of calling JSON.stringify', function(){

    // stringifyJSON function - should equal result of calling JSON.stringify(obj)
    var stringifyJSON = function(value, replaces) {

      var string = '', // declare and initialize string variable (will contain JSON string from value)

          error = function(m) {
            // Call error when something wrong
            throw {

              name: 'SyntaxError',
              message: m
            };

          }, 

          isEmpty = function(obj) { // helper function to check if object value is empty

            for(key in obj) {
              return false;
            }
            return true;

          }, 

          check_value = function(v) { // function to check the value of a variable, and run appropriate parcer on it

        var type = typeof v;  // Get typeof v to run through switch statement

        switch(type) {
        case 'object':
          if(v instanceof Array) {
            stringify_array(v);
            break;
          }
          if(v === null) {
            stringify_null();
            break;
          }
          if(v instanceof Object) {
            stringify_obj(v);
            break;
          }

        case 'number':
          stringify_num(v);
          break;

        case 'string':
          stringify_string(v);
          break;

        case 'boolean':
          stringify_boolean(v);
          break;

        default:

          console.log('error!!');

        }  // End of Switch Statement        

      }, // End of check_value()

      stringify_string = function(v) {

        string += '"' + v + '"';

      },

      stringify_num = function(v) {

        string += v.toString();

      },

      stringify_null = function() {

        string += 'null';

      },

      stringify_boolean = function(v) {

        if(v === true) {
          string += 'true';
        } else {
          string += 'false';
        }


      },

      stringify_obj = function(v) {

        var slice = true;

        var obj = v;
        string += '{';
      
        if(!_.isEmpty(obj)) {
          for(key in obj) {
            if(!(_.isFunction(obj[key]) || _.isUndefined(obj[key]))) {
              string += '"' + key + '":';
              check_value(obj[key]);
              string += ',';
              slice = true;
            } else {
              slice = false; // slice will be false if last obj[key] evaluated is a function or undefined
            } 
          }
          if(slice) string = string.slice(0, -1); // to get rid of extra comma from for loop above
        }
        string += '}';
      },

      stringify_array = function(v) {

        var arr = v;
        string += '[';
        if(arr.length > 0) {
          for (var i = 0; i < arr.length; i++) {
            check_value(arr[i]);
            string += ',';
          };
          string = string.slice(0, -1); // to get rid of extra comma from the for loop
        }
        string += ']';
      }; // end of declaring variables

      check_value(value);

      return string;

      
    }  // End of stringifyJSON()

    stringifiableObjects.forEach(function(test){
      var result = stringifyJSON(test);
      var expected = JSON.stringify(test);
      expect(result).to.equal(expected);
    });

    unstringifiableValues.forEach(function(obj){
      var result = stringifyJSON(obj);
      var expected = JSON.stringify(obj);
      expect(result).to.equal(expected);
    });

    console.log('hello');

  });


});
