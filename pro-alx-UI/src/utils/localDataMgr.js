// localDataMgr.js

/**
 * A utility object for managing local storage data.
 */
const localDataMgr = {
	/**
	 * Retrieves the value(JSON parsed) associated with the given key from local storage.
	 * @param {string} item - The key of the item to retrieve.
	 * @returns {string|null} - The JSON parsed retrieved value, or null if not found.
	 * @param {boolean} jsonflag - The flag to set JSON string or not.
	 */
	get(item) {
		return window.localStorage.getItem(item);
	},

	/**
	 * Sets the value(as JSON string) for the given key in local storage.
	 * @param {string} item - The key of the item to set.
	 * @param {string} value - The value to set.
	 * @param {boolean} jsonflag - The flag to set JSON string or not.
	 */
	set(item, value) {
		if (typeof value === 'string') {
			window.localStorage.setItem(item, value);
		}
	},

	/**
	 * Removes the item with the given key from local storage.
	 * @param {string} item - The key of the item to remove.
	 */
	remove(item) {
		window.localStorage.removeItem(item);
	},
	clear() {
		window.localStorage.clear();
	},
};

function base64UrlDecode(str) {
	const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
	const padding = base64.length % 4 === 0 ? 0 : 4 - (base64.length % 4);
	const decoded = atob(base64 + '==='.slice(0, padding));
	return decoded;
}

function decodeJWTToken(token) {
	const tokenParts = token.split('.');
	const encodedPayload = tokenParts[1];
	const decodedPayload = base64UrlDecode(encodedPayload);
	const payload = JSON.parse(decodedPayload);
	return payload;
}

// retrieve user info from token stored in local storage
export function getUser() {
	const token = localDataMgr.get('access_token');
	if (token) {
		const payload = decodeJWTToken(token);
		return payload.user_data;
	}
	return null;
}

export default localDataMgr;
