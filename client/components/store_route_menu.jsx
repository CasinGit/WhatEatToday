import { Image, ScrollView, Text, View } from "react-native";

function StoreMenuRoute() {
    return ( 
        <ScrollView>
            <View>{menu_image}</View>
            <Text>{menu_name}</Text>
            <Text>{menu_intro}</Text>
            <Text>{menu_price}</Text>
        </ScrollView>
     );
}

export default StoreMenuRoute;