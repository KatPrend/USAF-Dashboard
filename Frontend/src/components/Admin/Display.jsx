import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Display = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();

    useEffect(() => {
        axios.get(`/api/user/userId/${props.userid}`).then(response => {
            setData(response.data);
            setLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div className="mx-auto w-100">Loading...</div>;
    } else if (data[0].user_role == "Admin") {
        return <>
            Hi Admin!
        </>
    } else {
        return <div>
            You do not have access to this page.
        </div>
    }
}