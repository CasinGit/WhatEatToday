import { useEffect, useState } from "react";
import { StyleSheet, FlatList, Pressable, Text, View } from "react-native";
import { Card, Paragraph, Searchbar, Title } from 'react-native-paper';
import { getSearchMenu, getStoreImageRequest, getStoreInfoRequest, getStoreNameRequest } from "../util/store";
import StoreListInfo from "./StoreListInfo";
import useDebounce from "../hooks/debounce";
import { useNavigation } from "@react-navigation/native";
import StoreSearchs from "./storeSearchs";

function SearchMenu({ query }) {
    const navigation = useNavigation();
    const [stores, setStores] = useState();

    // Debounce Technique
    useEffect(() => {

        const timer = setTimeout(() => {
            console.log("query", query);
            if (query.menu) {
                getSearchMenu(query.menu).then(received => {
                    setStores(received.datas);
                }).catch(err => {
                    console.error(err);
                })
            } else if (query.store) {
                getStoreNameRequest(query.store).then(received => {
                    setStores(received.datas);
                }).catch(err => {
                    console.error(err);
                })
            }
        }, 250);

        return () => {
            clearTimeout(timer);
        }

    }, [query]);

    return (
        <View style={styles.container}>
            {stores && <FlatList
                data={stores}
                initialNumToRender={5}
                renderItem={({ index, item }) => {
                    return (
                        <StoreSearchs item={item} />
                    )
                }} />}
            {/* {stores && <FlatList
                data={stores}
                initialNumToRender={5}
                renderItem={({ index, item }) => {
                    return <StoreListInfo item={item} />
                }} />} */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection: "column",
        // justifyContent: "center",
        // alignItems: 'center',
    },
    cardContainer: {
        width: "98%",
        margin: 5,
        // overflow: "hidden"
    },
    cardContent: {
        flexDirection: "row",
        // overflow: "hidden",
        paddingRight: 90
    },
    cardImg: {
        width: 80,
        height: 80,
    }
});


export default SearchMenu;