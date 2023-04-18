import { createContext, useState, useContext } from "react";
import data from "../commentdata.json";
import amyrobson from "../assets/avatars/image-amyrobson.png";
import maxblagun from "../assets/avatars/image-maxblagun.png";
import ramsesmiron from "../assets/avatars/image-ramsesmiron.png";
import juliusomo  from "../assets/avatars/image-juliusomo.png";

const StateContext = createContext({
    user:null,
    token: null,
    notification: '',
    plan:null,
    admin:null,
    defaultUser:null,
    currentUser:null,
    commentSection: null,
    IMGOBJ: null,
    setAdmin: () => {},
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {},
    setPlan: () => {},
    setDefaultUser: () => {},
    addComment: () => {},
    deleteComment: () => {},
}) 

const IMGOBJ = { amyrobson, maxblagun, ramsesmiron, juliusomo };
const { comments, currentUser } = data;

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
const [commentSection, setCommentSection] = useState(comments)

const addComment = (data) => {
    setCommentSection([
        ...commentSection,
        {
            id: Math.floor(Math.random() * 10000),
            content: data,
            createdAt: "Just now",
            score: 0,
            replies: [],
            user: { username: "juliusomo" },
        }
    ]);
};

  function setPlan(plan){
     _setPlan(plan)
  }

  const deleteComment = (commentId) => {
    setCommentSection(
        commentSection.filter((comment) => comment.id !== commentId)
    );
  };

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
            //Commment Providers goes here
            currentUser,        commentSection,
            IMGOBJ,             addComment,
            deleteComment,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);
