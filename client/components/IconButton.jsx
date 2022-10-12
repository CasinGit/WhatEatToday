import { Pressable } from "react-native";
import { Ionicons} from "@expo/vector-icons";

function IconButton({onPress, name}) {
    
    return (
        <Pressable onPress={onPress} style={({pressed})=>
            pressed ? {opacity : 0.6} : null
        }>
            <Ionicons name={name} color={"white"} size={24}/>
        </Pressable>    
    );
}

export default IconButton;