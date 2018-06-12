function capitalize(str) { 
	if(!str) return ('String is empty');
		str = str.replace(/\s+/g,' ').trim();
		str = str.replace(/(^|\s)\S/g, l => l.toUpperCase())
		return(str);
};

function createcode(str){
	str = (capitalize(str)).toUpperCase();
	str = str.replace(/\s+/g, "_");
	return str;
};

module.exports = {
	capitalize					: capitalize,
	createcode					:	createcode,
};
