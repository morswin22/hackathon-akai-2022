export default function getLocalStorage(key, initialValue) {
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    } catch (error) {
        console.log(error);
        return initialValue;
    }
}