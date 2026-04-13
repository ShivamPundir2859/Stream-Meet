import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const handleLogin = async (username, password) => {
        const response = await fetch('http://localhost:8000/api/v1/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (response.ok) {
            setUser({ username, token: data.token });
            localStorage.setItem('token', data.token);
            return data;
        } else {
            throw new Error(data.message);
        }
    };

    const handleRegister = async (name, username, password) => {
        const response = await fetch('http://localhost:8000/api/v1/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, username, password }),
        });
        const data = await response.json();
        if (response.ok) {
            return data.message;
        } else {
            throw new Error(data.message);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleRegister, logout }}>
            {children}
        </AuthContext.Provider>
    );
};