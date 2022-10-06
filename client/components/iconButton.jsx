import { Pressable, View } from "react-native";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
export default function IconButton({ onPress, style, size, name, group, color }) {
    let icons;
    switch (group) {
        default:
        case "Ionicons":
            icons = <Ionicons name={name} size={size ?? 24} color={color ?? "black"} />;
            break;
        case "FontAwesome":
            icons = <FontAwesome name={name} size={size ?? 24} color={color ?? "black"} />;
            break;
    }

    return (<Pressable onPress={onPress}
        style={({ pressed }) =>
            [pressed && { opacity: 0.6 },
            { ...style, borderRadius: 8, padding: 4, overflow: "hidden" }]} >

        <View style={{ alignItems: "center" }}>
            {icons}
        </View>
    </ Pressable >);
}

