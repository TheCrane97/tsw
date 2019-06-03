/* jshint strict: global, esversion: 6, devel: true */
'use strict';


String.prototype.nbsp = function() {
	return this.replace(/(\s[aoiuwz])/g, function(p1){
		return p1+'&nbsp;';
	});
};

let tekst = 'Ala i As poszli w las';
console.log(tekst.nbsp());
