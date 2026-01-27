import {useEffect, useState} from "react"

export default function useDebounce(value, delay = 400) {

    const [debounced, useDebounced] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => useDebounced(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debounced;
}