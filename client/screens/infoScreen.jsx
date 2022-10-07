import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Button, Text, View } from "react-native";
import { AppContext } from "../context/app-context";
import { RegisterContext } from "../context/register-context";

function InfoScreen() {
    const ctx = useContext(AppContext);
    const ctxR = useContext(RegisterContext);
    const navigation = useNavigation();

    const logoutHandle = () => {
        ctx.dispatch({ type: "logout" });
        ctxR.dispatch({type : "logoutSellerRegister"});
        AsyncStorage.removeItem("authentication");
    };

    return (
        <View>
            <Text>로그인됨</Text>
            <Button title="로그아웃" onPress={logoutHandle} />
        </View>
    );
}

export default InfoScreen;