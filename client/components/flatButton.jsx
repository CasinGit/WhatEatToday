import { Pressable, Text, View } from "react-native";
import globalStyles from "../screens/stylesheet";

export default function FlatButton({ children, onPress }) {

    return (<View >
        <Pressable onPress={onPress} android_ripple={{ color: "#dddddd" }} style={{ padding: 4 }}>
            <Text style={[globalStyles.smallFont, { textAlign: "center" }]}>{children}</Text>
        </Pressable>
    </View>);
}

