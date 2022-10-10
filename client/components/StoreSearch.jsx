import { useEffect, useState } from "react";
import { FlatList, TextInput, View } from "react-native";
import { Searchbar } from 'react-native-paper';
import { getStoreNameRequest } from "../util/store";
import StoreListInfo from "./StoreListInfo";

function StoreSearch() {
    const [storeName, setStoreName] = useState();
    const [stores, setStores] = useState();

    useEffect(() => {
        !async function () {
            if (!storeName) {
                setStores(null);
                return;
            };
            const data = await getStoreNameRequest(storeName);
            setStores(data.datas);
            // console.log(data);
        }()
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