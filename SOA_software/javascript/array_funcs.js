/*
Array.prototype.clean = function(deleteValue) {
	  for (var i = 0; i < this.length; i++) {
	    if (this[i] == deleteValue) {         
	      this.splice(i, 1);
	      i--;
	    }
	  }
	  return this;
};
*/
function cleanArr(arr, deleteValue) {
	  for (var i = 0; i < arr.length; i++) {
	    if (arr[i] == deleteValue) {         
	    	arr.splice(i, 1);
	      i--;
	    }
	  }
	  return arr;
}
