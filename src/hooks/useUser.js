import React, { useEffect, useState } from 'react'

const useUser = () => {
    const [user, setUser] = useState();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            return;
        }
        setUser(user);

        // Cleanup function to remove user from local storage if needed
        return () => {

        }
    }, []);

    return {user};
}

export default useUser