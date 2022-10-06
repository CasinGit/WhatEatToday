import { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import globalStyles from "./stylesheet";

import IconButton from "../components/iconButton";
import LoadingOverlay from "../components/loadingOverlay";
import { AppContext } from "../context/app-context";
import { sendReadAllPlacesRequest } from "../util/places";
import PlaceItem from "../components/placeItem";



function addRangeFieldAndSort(arr, lat = 35.1653428, lng = 126.9092003) {
    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }
    const cvt = arr.map((one) => {
        console.log(one.location?.coordinate);
        const targetLat = one.location?.coordinate.latitude;
        const targetLng = one.location?.coordinate.longitude;

        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(targetLat - lat);  // deg2rad below
        var dLon = deg2rad(targetLng - lng);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
            + Math.cos(deg2rad(targetLat)) * Math.cos(deg2rad(lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        console.log(d);

        return { ...one, range: d };
    });

    // 가까운 거리순 정렬

    return cvt;
}


function HomeScreen({ navigation, route }) {

    const [refresh, setRefresh] = useState(false);

    const [loaded, setLoaded] = useState(false);
    const [places, setPlaces] = useState([]);

    const ctx = useContext(AppContext);
    const focused = useIsFocused();
    const moveToPlaceAddScreen = () => {
        navigation.navigate("placeAdd");
    }

    const updateItems = async () => {
        setLoaded(false);
        const result = await sendReadAllPlacesRequest();
        // setPlaces(result);
        const resultV2 = addRangeFieldAndSort(result);
        setPlaces(resultV2);
        setLoaded(true);
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <View View style={{ justifyContent: "flex-end" }}>
                        {
                            ctx.auth &&
                            <View style={{ marginHorizontal: 8 }}>
                                <IconButton name={"earth-outline"} onPress={moveToPlaceAddScreen} />
                            </View>
                        }
                    </View >
                )
            }
        });
    }, [ctx.auth]);

    useEffect(() => {
        // if (focused && route.params.refresh) {
        if (focused) {
            updateItems();
        }
    }, [focused])

    if (!loaded) {
        return <LoadingOverlay />
    }




    return (<View style={globalStyles.root}>
        <FlatList data={places} refreshing={refresh} style={{ flex: 1 }}
            onRefresh={async () => {
                setRefresh(true);
                const result = await sendReadAllPlacesRequest();
                setPlaces(addRangeFieldAndSort(result));
                setRefresh(false);
            }}
            renderItem={({ item }) => {
                return <PlaceItem data={item} />
            }}
        />
    </View>);
}
const styles = StyleSheet.create({

});


export default HomeScreen;