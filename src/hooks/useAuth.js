import { endpoints } from '@services/storeAPI/endpoints'
import React, { createContext, useContext, useState } from 'react'
import axios from 'axios'
import Cookie from 'js-cookie'
const AuthContext = createContext(null)

export function ProviderAuth({ children }) {
  const auth = useProvideAuth()
  return <AuthContext.Provider value={auth}> {children}</AuthContext.Provider>
}
export const useAuth = () =>{
    return useContext(AuthContext)
}

function useProvideAuth(){
    const [user, setUser] = useState(null)
    const signIn = async (email, password) => {
        const getUsersWithAccess = endpoints.auth.login
        console.log(getUsersWithAccess);
        const options = {
            headers: {
                accept: '*/*',
                'Content-type': 'application/json',
            }
        }
        
        const { data: tokens } = await axios.post(getUsersWithAccess, {email,password},options)
        if(Object.entries(tokens) !== ""){
            Cookie.set('access_token' , tokens?.access_token , {expires: 5})
        }
    }
    const logOut = () => {

    }
    return {
        user,
        signIn,
        logOut
    }
}