import { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Portal, Provider, ActivityIndicator, MD2Colors } from 'react-native-paper';
import CategoryStoreCard from "../components/CategoryStoreCard";
import { getCategoryStore } from "../util/store";

function CategorySelectScreen({ route, navigation }) {
    console.log("route", route);
    const [storeDatas, setStoreDatas] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        navigation.setOptions({ title: route.params });
        getCategoryStore(route.params).then(received => {
            // console.log(received);
            setStoreDatas(received.datas);
        }).finally(() => {
            setLoading(false);
        })
    }, [])

    return (
        <Provider>
            <View style={styles.container}>
                {loading &&
                    <Portal>
                        <ActivityIndicator animating={loading} color={MD2Colors.red800} style={{ flex: 1 }} size="large" />
                    </Portal>
                }
                {storeDatas &&
                    <FlatList data={storeDatas} initialNumToRender={5} renderItem={({ index, item }) => {
                        return <CategoryStoreCard data={item.RSTR_ID} />
                    }} />
                }
            </View>
        </Provider>
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

export default CategorySelectScreen;