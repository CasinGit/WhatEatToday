import { ScrollView, Text } from "react-native";

function StoreInfoRoute() {
    return ( 
        <ScrollView>
            <Text>{info_address}</Text>
            <Text>{info_tel}</Text>
            <Text>{info_time}</Text>
        </ScrollView>
     );
}

export default StoreInfoRoute;