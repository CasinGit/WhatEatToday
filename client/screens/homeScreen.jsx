import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Provider, Portal, ActivityIndicator, MD2Colors } from 'react-native-paper';
import MapView from "react-native-map-clustering"
import { Marker } from "react-native-maps";
import { getStoreInfoRequest } from "../util/store";

function HomeScreen() {
    const [mapData, setMapData] = useState();
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const init = {
        latitude: 35.1415081,
        longitude: 126.9321138,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }

    useEffect(() => {
        setLoading(true);
        getStoreInfoRequest().then((received) => {
            setMapData(received.datas);
        }).catch((err) => {
            console.error(err);
        }).finally(() => {
            setLoading(false);
        })
    }, [])

    return (
        <Provider>
            <View style={{ flex: 1 }}>
                {loading &&
                    <Portal>
                        <ActivityIndicator animating={loading} color={MD2Colors.red800} style={{ flex: 1 }} size="large" />
                    </Portal>
                }
                <MapView style={{ flex: 1 }} initialRegion={init}>
                    {mapData && mapData.map((one, index) => {
                        return <Marker
                            key={index}
                            tracksViewChanges={false}
                            coordinate={{ latitude: Number(one.RSTR_LA), longitude: Number(one.RSTR_LO) }}
                            title={one.RSTR_NM}
                            description={one.RSTR_RDNMADR}
                            onPress={() => {
                                navigation.navigate("storeInfo", { datas: one, place: one.RSTR_RDNMADR, places: one.RSTR_LNNO_ADRES, ph: one.RSTR_TELNO });
                            }} />
                    }
                    )}
                </MapView>
            </View>
        </Provider>
    );
}

export default HomeScreen;