import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Button, Text, View } from "react-native";
import { AppContext } from "../context/app-context";

function InfoScreen() {
    const ctx = useContext(AppContext);
    const navigation = useNavigation();

    const logoutHandle = () => {
        ctx.dispatch({ type: "logout" })
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