class LocalStore {
    get(key) {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : [];
    }

    set(key, value) {
        const items = this.get(key);  // Get existing items or an empty array
        items.push(value);  // Add the new value
        const uniqueItems = [...new Set(items)];  // Remove duplicates
        localStorage.setItem(key, JSON.stringify(uniqueItems));  // Store the updated array
    }

    remove(key) {
        localStorage.removeItem(key);  // Remove the specific key from localStorage
    }

    clear() {
        localStorage.clear();  // Clear all items from localStorage
    }
}

const localStore = new LocalStore();
export default localStore;
