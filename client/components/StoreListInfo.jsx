import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Text, View } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { RegisterContext } from "../context/register-context";

function StoreListInfo({ item }) {
    const navigation = useNavigation();
    const ctx = useContext(RegisterContext);
    const pressHandle = ()=>{
        const data = { id : item.RSTR_ID, storeName : item.RSTR_NM};
        ctx.dispatch({ type: "sellerRegister", payload : data});
        console.log("ctx.store",ctx);
        navigation.goBack();
    };

    return (
        <Pressable style={({ pressed }) => pressed ? { opacity: 0.6 } : null } onPress={pressHandle}>
            <View>
                <Text>{item.RSTR_NM}</Text>
                <Text>{item.RSTR_RDNMADR}</Text>
            </View>
        </Pressable>
    );
}

export default StoreListInfo;