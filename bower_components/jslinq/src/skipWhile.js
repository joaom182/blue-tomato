Array.prototype.skipWhile = function (predicate) {
	predicate = predicate || Predicate;
	var l = this.length;
	var i = 0;
	for (i = 0; i < l; i++)
		if (predicate(this[i], i) === false) break;

	return this.skip(i);
};