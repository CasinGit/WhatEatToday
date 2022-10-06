import { View } from "react-native";
import MapView from "react-native-maps";

function HomeScreen() {

    const init = {
        latitude: 126.8526012,
        longitude: 35.1595454,
        latitudeDelta: 0.01922,
        longitudeDelta: 0.01421
    }

    return (
        <View >
            <MapView style={{ flex: 1 }} initialRegion={init} />
        </View>
    );
}

export default HomeScreen;