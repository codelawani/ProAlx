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
  get (item) {
    return window.localStorage.getItem(item);
  },

  /**
   * Sets the value(as JSON string) for the given key in local storage.
   * @param {string} item - The key of the item to set.
   * @param {string} value - The value to set.
   * @param {boolean} jsonflag - The flag to set JSON string or not.
   */
  set (item, value) {
    window.localStorage.setItem(item, value);
  },

  /**
   * Removes the item with the given key from local storage.
   * @param {string} item - The key of the item to remove.
   */
  remove (item) {
    window.localStorage.removeItem(item);
  },
  clear () {
    window.localStorage.clear();
  }
};

export default localDataMgr;
