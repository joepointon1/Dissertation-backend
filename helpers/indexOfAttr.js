function indexOfAttr(array, attr, value) {
	for (let i = 0; i < array.length; i++) {
		if (array[i][attr] == value) {
			return i;
		}
	}
	return -1;
}

export default indexOfAttr;
