import { useEffect, useState } from "react";
import { FlatList, TextInput, View } from "react-native";
import { Searchbar } from 'react-native-paper';
import { getStoreNameRequest } from "../util/store";
import StoreListInfo from "./StoreListInfo";

function StoreSearch() {
    const [storeName, setStoreName] = useState();
    const [stores, setStores] = useState();

    // Debounce Technique
    useEffect(() => {
        if (!storeName) {
            setStores(null);
            return;
        };

        const timer = setTimeout(() => {
            console.log("storeName", storeName);
            getStoreNameRequest(storeName).then(received => {
                setStores(received.datas);
            }).catch(err => {
                console.error(err);
            })
        }, 200);

        return () => {
            clearTimeout(timer);
        }
    }, [storeName]);

    return (
        <View style={{ flex: 1 }}>
            <Searchbar
                placeholder="Search"
                onChangeText={setStoreName}
                value={storeName}
            />
            {stores && <FlatList
                data={stores}
                initialNumToRender={5}
                renderItem={({ index, item }) => {
                    return <StoreListInfo item={item} />
                }} />}
        </View>
    );
}

export default StoreSearch;