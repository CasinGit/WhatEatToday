import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useReducer, useState } from "react";

export const RegisterContext = createContext({});

const authReducer = (state=null, action) => {
    switch(action.type) {
        case "sellerRegister" :
            return action.payload;
        case "logoutSellerRegister" :
            return null;
    }
    return null;
};

export function RegisterContextProvider({ children }) {
    // const [auth, setAuth] = useState(null);
    const [store, dispatch] = useReducer(authReducer, null);
    const [done, setDone] = useState(false);
    // async Storage 이용해서 auth 값을 저장
    //useEffect로 최초마운트 될때 auth에 값이 있다면 그걸로 ctx auth 값 업데이트
    console.log("!!");
    useEffect(()=>{
        AsyncStorage.getItem("authentication").then((data)=>{
            if(data) {
                dispatch({type:"sellerRegister", payload : JSON.parse(data)});
            }
        });
    },[]);

    // useEffect(()=>{
    //     !async function load() {
    //         const savedLogin = await AsyncStorage.getItem("authentication");
    //         if(savedLogin !== null) {
    //             setFavName(JSON.parse(savedLogin));
    //         }
    //     }();
    // },[]);

    // function login(data) {
    //     setAuth(data);
    // }
    
    // function logOut() {
    //     setAuth(null);
    // }

    return (
        <RegisterContext.Provider value={{ store, dispatch }}>
            {children}
        </RegisterContext.Provider>
        // <AppContext.Provider value={{ auth, login, logOut }}>
        //     {children}
        // </AppContext.Provider>
    );
}