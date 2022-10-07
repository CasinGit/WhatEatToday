import { useEffect, useState } from "react";
import { FlatList, TextInput, View } from "react-native";
import { getStoreNameRequest } from "../util/store";
import StoreListInfo from "./StoreListInfo";

function StoreSearch() {
    const [storeName, setStoreName] = useState();
    const [stores, setStores] = useState();
    useEffect(() => {
        !async function () {
            const data = await getStoreNameRequest(storeName);
            setStores(data.datas);
        }()
    }, [storeName]);

    return (
        <View>
            <TextInput onChangeText={setStoreName} />
            {stores && <FlatList data={stores} renderItem={({ index, item }) => {
                return <StoreListInfo item={item} />
            }} />}
        </View>
    );
}

export default StoreSearch;