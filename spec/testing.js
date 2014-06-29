var string_recursive = function(string) {

	var return_string, at = 0;

	function inside_recursive(st_var, at) {
		var char_ret;
		var new_str = st_var;
		var at_char = at;
		if(at < string.length) {
			 char_ret = string.charAt(at_char);
			 at_char += 2;
			 inside_recursive(new_str, at_chat);
		}
		return char_ret;
	}

	return_string = inside_recursive(string);
	return return_string;

}
