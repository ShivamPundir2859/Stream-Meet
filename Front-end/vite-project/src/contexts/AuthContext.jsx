import axios, { HttpStatusCode } from "axios"
import { Children, createContext, useContext, useState } from "react"
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

const client = axios.create({
    baseURL: "http://localhost:8000/api/v1/users"
})

export const AuthProvider = ({children}) =>{
    const [ userData, setUserData ] =  useState(null);

    const router = useNavigate();

    const handleRegister = async(name , username, password)=>{
        try{
            let request = await client.post("/register",{
                name: name,
                username: username,
                password: password
            })
            if(request.status === HttpStatusCode.Created){
                return request.data.message;
            }
        } catch(err) {
            throw err;
        }
    }

    const handleLogin = async (username,password)=>{
        try{
            let request = await client.post("/login", {
                username: username,
                password: password
            });
            if(request.status === HttpStatusCode.Ok){
                localStorage.setItem("token", request.data.token);
            }
        }catch(err){
            throw err; 
        }
    };

    const data = {
        userData, setUserData, handleRegister, handleLogin
    }
    return (
        <AuthContext.Provider value ={data}>
            {children}
        </AuthContext.Provider>
    )
}





// import React, { createContext, useState } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);

//     const handleLogin = async (username, password) => {
//         const response = await fetch('http://localhost:8000/api/v1/users/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ username, password }),
//         });
//         const data = await response.json();
//         if (response.ok) {
//             setUser({ username, token: data.token });
//             localStorage.setItem('token', data.token);
//             return data;
//         } else {
//             throw new Error(data.message);
//         }
//     };

//     const handleRegister = async (name, username, password) => {
//         const response = await fetch('http://localhost:8000/api/v1/users/register', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ name, username, password }),
//         });
//         const data = await response.json();
//         if (response.ok) {
//             return data.message;
//         } else {
//             throw new Error(data.message);
//         }
//     };

//     const logout = () => {
//         setUser(null);
//         localStorage.removeItem('token');
//     };

//     return (
//         <AuthContext.Provider value={{ user, handleLogin, handleRegister, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };