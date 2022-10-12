import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { Searchbar } from 'react-native-paper';
import { getSearchMenu } from "../util/store";
import StoreListInfo from "./StoreListInfo";

function SearchMenu({ query }) {
    const [stores, setStores] = useState();

    useEffect(() => {
        console.log(query);
        getSearchMenu(query).then(received => {
            setStores(received.datas);
        }).catch(err => {
            console.error(err);
        })
    }, [query]);

    return (
        <View style={{ flex: 1 }}>
            {stores && <FlatList
                data={stores}
                initialNumToRender={3}
                renderItem={({ index, item }) => {
                    return (
                        <Text>{item.MENU_NM}</Text>
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

export default SearchMenu;