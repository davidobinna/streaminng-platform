import { createContext, useState, useContext } from "react";

const StateContext = createContext({
    user:null,
    token: null,
    notification: '',
    plan:null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {},
    setPlan: () => {},
})

export const ContextProvider = ({children}) => {
const [user, setUser] = useState({
    name: '',
    email: ''
});
const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
const [notification, _setNotification]  = useState('');
const [plan, _setPlan] = useState('');

  function setPlan(plan){
     _setPlan(plan)
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
            user,
            setUser,
            token,
            plan,
            setToken,
            notification,
            setNotification,
            setPlan,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);
