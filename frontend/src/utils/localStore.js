// Helper functions to maintain local storage

export function setValueInLocalStore(keyName, value) {
    localStorage.setItem(keyName, JSON.stringify(value));
}

export function getValueFromLocalStore(keyName) {
    return JSON.parse(localStorage.getItem(keyName));
}

export function deleteValueFromLocalStore(keyName) {
    localStorage.removeItem(keyName);
}