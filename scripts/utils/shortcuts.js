;(function() {
	let bindings = {};

	function handleKeypress(event) {
		const keys = [event.key.toLowerCase()];
		if (event.shiftKey) {
			keys.push("shift");
		}
		if ((event.ctrlKey || event.metaKey)) {
			keys.push("ctrl");
		}
		if (event.altKey) {
			keys.push("alt");
		}
		for (let key in bindings) {
			if (keysEqual(key.split("+"), keys)) {
				event.preventDefault();
				bindings[key]();
			}
		}
	}

	function addBinding(shortcut, callback) {
		bindings[shortcut] = callback;
	}

	function addBindings(newBindings) {
		for (let binding in newBindings) {
			bindings[binding] = newBindings[binding];
		}
	}

	function keysEqual(keys1, keys2) {
		if (!keys1 || !keys2) {
			return false;
		}
		if (keys1.length !== keys2.length) {
			return false;
		}
		keys1.sort();
		keys2.sort();
		for (let i = 0; i < keys1.length; i++) {
			if (keys1[i] instanceof Array && keys2[i] instanceof Array) {
				if (!keys1[i].equals(keys2[i])) {
					return false;
				}
			} else if (keys1[i] !== keys2[i]) {
				return false;
			}
		}
		return true;
	}

	module.exports = {
		addBinding,
		addBindings,
		handleKeypress
	};
}());