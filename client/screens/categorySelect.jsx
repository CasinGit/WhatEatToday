import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable, FlatList } from "react-native";
import { Card, Searchbar, Title, Paragraph, Chip, Modal, Portal, Provider } from 'react-native-paper';
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

    const pressHandle = () => {
        console.log("카테고리에서 가게 상세 페이지 들어가는곳");
        //todo navigate params 설정해야함.
        navigation.navigate("storeInfo");
    }

    return (
        <View style={styles.container}>
            <FlatList data={storeDatas} renderItem={one => {
                return (
                    <Pressable
                        style={({ pressed }) => pressed ? { opacity: 0.8 } : null}
                        onPress={pressHandle}
                    >
                        <Card style={{ width: "98%", margin: 5 }}>
                            <Card.Content>
                                {/* <Title>Card title</Title> */}
                                {one.item.rstrImg ?
                                    <Card.Cover source={{ uri: one.item.rstrImg?.RSTR_IMG_URL }} />
                                    :
                                    <Card.Cover source={require("../assets/store_defaultImage.png")} />
                                }
                                <Title>{one.item.RSTR_NM}</Title>
                                <Paragraph numberOfLines={2}>{one.item.RSTR_INTRCN_CONT}</Paragraph>
                            </Card.Content>
                        </Card>
                    </Pressable>
                )
            }} />
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