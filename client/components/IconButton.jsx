import { Pressable } from "react-native";
import { Ionicons} from "@expo/vector-icons";

function IconButton({onPress, name}) {
    
    return (
        <Pressable onPress={onPress} style={({pressed})=>
            pressed ? {opacity : 0.6} : null
        }>
            <Ionicons name={name} color={"gold"} size={32} style={{marginRight : 15, marginTop: 5}}/>
        </Pressable>    
    );
}

export default IconButton;