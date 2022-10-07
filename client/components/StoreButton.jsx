import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function StoreButton() {
    const navigation = useNavigation();
    const pressHandle = () => {
        return navigation.navigate("storeSearch" );
    };
    return (
        <View style={{ marginRight: 15 }}>
            <Pressable style={({ pressed }) =>
                pressed ? { opacity: 0.6 } : null
            } onPress={pressHandle}>
                <Ionicons name="search-circle" color={"blue"} size={30} />
            </Pressable>
        </View>
    );
}

export default StoreButton;