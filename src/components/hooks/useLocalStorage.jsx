import React, { useEffect, useState } from "react";

const useLocalStarage = (key, initial) => { 
    const [value, setValue] = useState(() => {
        const saved = localStorage.getItem(key)
        return saved ? JSON.parse(saved) : initial
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])

    return [value, setValue]
}

export default useLocalStarage