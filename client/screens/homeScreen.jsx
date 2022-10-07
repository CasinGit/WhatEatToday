import { useEffect, useState } from "react";
import { View } from "react-native";
import MapView from "react-native-map-clustering"
import { Marker } from "react-native-maps";
import { getStoreInfoRequest } from "../util/store";

function HomeScreen() {
    const [mapData, setMapData] = useState();

    const init = {
        latitude: 35.1595454,
        longitude: 126.8526012,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }

    useEffect(() => {
        !async function () {
            const data = await getStoreInfoRequest();
            setMapData(data.datas);
        }()
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <MapView style={{ flex: 1 }} initialRegion={init}>
                {mapData && mapData.map((one) => {
                    return <Marker key={one.RSTR_ID} coordinate={{ latitude: Number(one.RSTR_LA), longitude: Number(one.RSTR_LO) }}
                        title={one.RSTR_NM}
                        description="" />
                    }
                )}
            </MapView>
        </View>
    );
}

export default HomeScreen;