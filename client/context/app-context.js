import { createContext, useEffect, useReducer, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"

export const AppContext = createContext({});

const authReducer = (state = null, action) => {
    console.log("authReducer 실행됨!")
    switch (action.type) {
        case "login":
            return action.payload;
        case "logout":
            return null;
        default:
            return null;
    }
}

export function AppContextProvider({ children }) {
    const [auth, dispatch] = useReducer(authReducer, null);
    const [done, setDone] = useState(false);

    // // 앱 실행시 스토리지에 저장된 토큰 가져오기
    // useEffect(() => {
    //     async function tokenUpdate() {
    //         try {
    //             const storageToken = await AsyncStorage.getItem("logonToken");
    //             if (storageToken !== null) {
    //                 console.log("스토리지 토큰 불러오기 성공!");
    //                 const recoveryData = await JSON.parse(storageToken);
    //                 const refreshData = await refreshToken(recoveryData.refreshToken);
    //                 const combinedData = {
    //                     ...recoveryData,
    //                     idToken: refreshData.id_token,
    //                     refreshToken: refreshData.refresh_token
    //                 };
    //                 dispatch({ type: "login", payload: combinedData });
    //                 AsyncStorage.setItem("logonToken", JSON.stringify(combinedData));
    //                 // setDone(true);
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         } finally {
    //             setDone(true);
    //         }
    //     };
    //     tokenUpdate();
    //     setInterval(tokenUpdate, 1000 * 60 * 59); // 59분마다 한번씩 실행
    // }, [])

    // if (!done) {
    //     return <LoadingOverlay />
    // }

    return (
        <AppContext.Provider value={{ auth, dispatch }}>
            {children}
        </AppContext.Provider>
    );
}