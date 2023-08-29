import { endpoints } from '@services/storeAPI/endpoints'
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Cookie from 'js-cookie'
const AuthContext = createContext(null)
const accessTokenInCookie = 'access_token';
export function ProviderAuth({ children }) {
  const auth = useProvideAuth()
  return <AuthContext.Provider value={auth}> {children}</AuthContext.Provider>
}
export const useAuth = () =>{
    return useContext(AuthContext)
}

function useProvideAuth(){
    const [user, setUser] = useState(null)
    const getUserInCookie = async() => {
        try {
          const savedOnCookie = Cookie.get(accessTokenInCookie)
          if (savedOnCookie) {
               const options = {
            headers: {
              "Authorization": `Bearer ${savedOnCookie}`
            }
        }
    
            const { data: user } = await axios.get(endpoints.auth.profile, options);
            setUser(user);
          }
        } catch (_) {
          setUser(null);
        }
      }
    const signIn = async (email, password) => {
        const getUsersWithAccess = endpoints.auth.login
        const options = {
            headers: {
                accept: '*/*',
                'Content-type': 'application/json',
                
            }
        }
        
        const { data: tokens } = await axios.post(getUsersWithAccess, {email,password},options)
        if(Object.entries(tokens) !== ""){
            Cookie.set(accessTokenInCookie , tokens?.access_token , {expires: 5})
            await getUserInCookie()
        }
    }
    const logOut = () => {

    }
    useEffect(()=>getUserInCookie,[])
    return {
        user,
        signIn,
        logOut
    }
}