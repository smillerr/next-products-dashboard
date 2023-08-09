import React, { createContext, useContext, useState } from 'react'

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

    }
    const logOut = () => {

    }
    return {
        user,
        signIn,
        logOut
    }
}