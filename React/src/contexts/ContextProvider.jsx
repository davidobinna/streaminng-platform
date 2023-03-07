import { createContext, useState, useContext } from "react";

const StateContext = createContext({
    user:null,
    token: null,
    notification: '',
    plan:null,
    admin:null,
    defaultUser:null,
    setAdmin: () => {},
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {},
    setPlan: () => {},
    setDefaultUser: () => {},
})

export const ContextProvider = ({children}) => {
const [user, setUser] = useState({
    name: '',
    email: ''
});
const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));//localStorage.getItem('ACCESS_TOKEN')
const [notification, _setNotification]  = useState('');
const [plan, _setPlan] = useState('');
const [defaultUser, _setDefaultUser] = useState(localStorage.getItem('ACCESS_DEFAULT'));
const [admin, _setAdmin] = useState(localStorage.getItem('ACCESS_ADMIN'));


  function setPlan(plan){
     _setPlan(plan)
  }

  function setDefaultUser(value){
   _setDefaultUser(value)
   if (value) {
    localStorage.setItem('ACCESS_DEFAULT',value)
   } else {
    localStorage.removeItem('ACCESS_DEFAULT')
   }
  }

  function setAdmin(admin){
    _setAdmin(admin)
    if (admin) {
     localStorage.setItem('ACCESS_ADMIN',admin)
    } else {
     localStorage.removeItem('ACCESS_ADMIN')
    }
   }

  function setToken(token) {
         _setToken(token)
     if (token) {
         localStorage.setItem('ACCESS_TOKEN', token);
     } else {
        localStorage.removeItem('ACCESS_TOKEN');
     }
}

  const setNotification = (message, out = 5000 )=> {
        _setNotification(message)
        setTimeout(()=>{
          _setNotification('')
        }, out)
 }

    return (
        <StateContext.Provider value={{
            user,               setUser,
            token,              plan,
            admin,              setAdmin,
            defaultUser,        setToken,
            notification,       setNotification,
            setPlan,            setDefaultUser,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);
