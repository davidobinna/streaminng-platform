import { createContext, useState, useContext } from "react";

const StateContext = createContext({
    user:null,
    token: null,
    notification: '',
    plan:null,
    type:null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {},
    setPlan: () => {},
    setType: () => {},
})

export const ContextProvider = ({children}) => {
const [user, setUser] = useState({
    name: '',
    email: ''
});
const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));//localStorage.getItem('ACCESS_TOKEN')
const [notification, _setNotification]  = useState('');
const [plan, _setPlan] = useState('');
const [type, _setType] = useState(localStorage.getItem('ACCESS_TYPE'));

  function setPlan(plan){
     _setPlan(plan)
  }

  function setType(type){
   _setType(type)
   if (type) {
    localStorage.setItem('ACCESS_TYPE',type)
   } else {
    localStorage.removeItem('ACCESS_TYPE')
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

  const setNotification = message => {
        _setNotification(message)
        setTimeout(()=>{
          _setNotification('')
        }, 5000)
 }

    return (
        <StateContext.Provider value={{
            user,             setUser,
            token,            plan,
            type,            setToken,
            notification,            setNotification,
            setPlan,            setType,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);
