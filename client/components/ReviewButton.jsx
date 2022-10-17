import { Pressable } from "react-native";
import { Ionicons} from "@expo/vector-icons";

function ReviewButton({onPress, name}) {
    
    return (
        <Pressable onPress={onPress} style={({pressed})=>
            pressed ? {opacity : 0.6} : null
        }>
            <Ionicons name={name} color={"black"} size={50}/>
        </Pressable>    
    );
}

export default ReviewButton;