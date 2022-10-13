import { useIsFocused } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Pressable, FlatList, Text } from "react-native";
import { Card, Title, Paragraph } from 'react-native-paper';
import FavoritesStoreCard from "../components/FavoritesStoreCard";
import { AppContext } from "../context/app-context";
import { getStoreFavRequest } from "../util/account";
import { getStoreImageRequest, getStoreInfoRequest } from "../util/store";

function FavoritesStore() {
    const [favStore, setFavStore] = useState();
    const fouces = useIsFocused();
    const ctx = useContext(AppContext);

    useEffect(() => {
        !async function () {
            const favData = await getStoreFavRequest(ctx.auth.email);
            console.log(favData);
            
            setFavStore(favData.datas);
        }()
    }, [fouces]);

    return (
        <View style={styles.container}>
            {favStore && 
                <FlatList data={favStore} renderItem={({ index, item }) => {
                    return <FavoritesStoreCard data={item} />
                }} />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: "row",
        margin: 5
        // justifyContent: "center",
    },
});

export default FavoritesStore;