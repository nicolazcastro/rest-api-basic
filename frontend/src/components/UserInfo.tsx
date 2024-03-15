import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../services/userServices';

const UserInfo: React.FC = () => {
    const [user, setUser] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userInfo = await getUserInfo();
                setUser(userInfo);
            } catch (error) {
                // Handle error
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>User Information</h2>
            {user && (
                <div>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
            )}
        </div>
    );
};

export default UserInfo;
