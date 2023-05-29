// localDataMgr.js

/**
 * A utility object for managing local storage data.
 */
const localDataMgr = {
  /**
   * Retrieves the value(JSON parsed) associated with the given key from local storage.
   * @param {string} item - The key of the item to retrieve.
   * @returns {string|null} - The JSON parsed retrieved value, or null if not found.
   */
  get (item) {
    return JSON.parse(window.localStorage.getItem(item));
  },

  /**
   * Sets the value(as JSON string) for the given key in local storage.
   * @param {string} item - The key of the item to set.
   * @param {string} value - The value to set.
   */
  set (item, value) {
    window.localStorage.setItem(item, JSON.stringify(value));
  },

  /**
   * Removes the item with the given key from local storage.
   * @param {string} item - The key of the item to remove.
   */
  remove (item) {
    window.localStorage.removeItem(item);
  }
};

export default localDataMgr;
