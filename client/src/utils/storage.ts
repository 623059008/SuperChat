// Save function to save JSON data to localStorage
function saveToLocalStorage(key: string, data: Record<string, unknown>): void {
  try {
    // Check if the browser supports localStorage
    if (typeof Storage !== 'undefined') {
      // Convert the data to a JSON string and save it to localStorage
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      // Throw an error if localStorage is not supported
      throw new Error('localStorage is not supported by this browser.');
    }
  } catch (error) {
    console.error(error);
  }
}

// Load function to load JSON data from localStorage
function loadFromLocalStorage(key: string): Record<string, unknown> | null {
  try {
    // Check if the browser supports localStorage
    if (typeof Storage !== 'undefined') {
      // Get the data from localStorage and parse it as JSON
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } else {
      // Throw an error if localStorage is not supported
      throw new Error('localStorage is not supported by this browser.');
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

function saveUserData(userdata: Record<string, unknown>) {
  saveToLocalStorage('user-data', userdata);
}
function getUserData() {
  const data = loadFromLocalStorage('user-data');
  if (data) {
    return data;
  }
  return null;
}

export { saveToLocalStorage, loadFromLocalStorage, saveUserData, getUserData };
