import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { getStoreImageRequest, getStoreNameRequest, getStoreOperRequest } from "../util/store";
import { Card, Paragraph, Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

function StoreSearchs({ item }) {
    const [storeImg, setStoreImg] = useState();
    const [store, setStore] = useState();
    const [sotres, setStores] = useState();
    useEffect(() => {
        !async function () {
            const result = await getStoreImageRequest(item.RSTR_ID);
            setStoreImg(result.datas[0]);
            // const results = await getStoreOperRequest(item.RSTR_ID);
            // setStore(results.datas[0]);
            const resultss = await getStoreNameRequest(item.RSTR_NM);
            setStores(resultss.datas[0]);
        }()
    }, []);
    const navigation = useNavigation();
    const pressHandle = () => {
        console.log("메뉴 검색해서 가게 상세 페이지 들어가는곳");
        //todo navigate params 설정해야함.
        navigation.navigate("storeInfo", { datas: sotres, place: sotres.RSTR_RDNMADR, places: sotres.RSTR_LNNO_ADRES, ph: sotres.RSTR_TELNO });
    }

    return (
        <Pressable
            style={({ pressed }) => pressed ? { opacity: 0.7 } : null}
            onPress={pressHandle}
        >
            <Card style={styles.cardContainer}>
                <Card.Content style={styles.cardContent}>
                    {storeImg?.RSTR_IMG_URL ?
                        <Card.Cover source={{ uri: storeImg.RSTR_IMG_URL }} style={styles.cardImg} resizeMode="cover" />
                        :
                        <Card.Cover source={require("../assets/store_defaultImage.png")} style={styles.cardImg} resizeMode="cover" />
                    }
                    <View style={{ marginLeft: 10 }}>
                        <Title>{item.RSTR_NM}</Title>
                        <Paragraph numberOfLines={2}>
                            {
                                item.getMenu ?
                                    item.getMenu.map(one => {
                                        return one.MENU_NM + ", ";
                                    })
                                    :
                                    item.RSTR_INTRCN_CONT
                            }
                        </Paragraph>
                    </View>
                </Card.Content>
            </Card>
        </Pressable>
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

export default StoreSearchs;