import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable, FlatList } from "react-native";
import { Card, Searchbar, Title, Paragraph, Chip, Modal, Portal, Provider } from 'react-native-paper';
import CategoryStoreCard from "../components/CategoryStoreCard";
import { getCategoryStore } from "../util/store";

function CategorySelectScreen({ route, navigation }) {
    console.log("route", route);
    const [storeDatas, setStoreDatas] = useState();

    useEffect(() => {
        navigation.setOptions({ title: route.params });
        getCategoryStore(route.params).then(received => {
            // console.log(received);
            setStoreDatas(received.datas);
        })
    }, [])

    // const pressHandle = (one) => {
    //     console.log("카테고리에서 가게 상세 페이지 들어가는곳");
    //     //todo navigate params 설정해야함.
    //     navigation.navigate("storeInfo", { datas: one, place: one.RSTR_RDNMADR, places: one.RSTR_LNNO_ADRES, ph: one.RSTR_TELNO });
    // }

    return (
        <View style={styles.container}>
            {storeDatas &&
                <FlatList data={storeDatas} renderItem={({ index, item }) => {
                    return <CategoryStoreCard data={item.RSTR_ID} />
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

export default CategorySelectScreen;