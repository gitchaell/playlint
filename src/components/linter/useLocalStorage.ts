import { useEffect, useState } from 'react';

export function useLocalStorage<T>(
	key: string,
	initialValue: T | (() => T),
): [T, React.Dispatch<React.SetStateAction<T>>] {
	// State to store our value
	// Pass initial state function to useState so logic is only executed once
	const [storedValue, setStoredValue] = useState<T>(() => {
		if (typeof window === 'undefined') {
			return initialValue instanceof Function ? initialValue() : initialValue;
		}
		try {
			// Get from local storage by key
			const item = window.localStorage.getItem(key);
			// Parse stored json or if none return initialValue
			return item
				? JSON.parse(item)
				: initialValue instanceof Function
					? initialValue()
					: initialValue;
		} catch (error) {
			// If error also return initialValue
			console.warn(`Error reading localStorage key "${key}":`, error);
			return initialValue instanceof Function ? initialValue() : initialValue;
		}
	});

	// Return a wrapped version of useState's setter function that ...
	// ... persists the new value to localStorage.
	useEffect(() => {
		if (typeof window !== 'undefined') {
			try {
				// Save state
				window.localStorage.setItem(key, JSON.stringify(storedValue));
			} catch (error) {
				// A more advanced implementation would handle the error case
				console.warn(`Error setting localStorage key "${key}":`, error);
			}
		}
	}, [key, storedValue]);

	return [storedValue, setStoredValue];
}
