import { useEffect, useState } from 'react';

export const useDebounce = <T>(value: T, delay: number) => {
    const [debounce, setDebounce] = useState(value);
    useEffect(() => {
        const time = setTimeout(() => setDebounce(value), delay);
        return () => clearTimeout(time);
    }, [value, delay]);
    return debounce;
};
