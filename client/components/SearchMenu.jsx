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
            if (query.is == "menu") {
                getSearchMenu(query.value).then(received => {
                    setStores(received.datas);
                }).catch(err => {
                    console.error(err);
                })
            } else if (query.is == "store") {
                getStoreNameRequest(query.value).then(received => {
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

    const pressHandle = (item) => {
        console.log("메뉴 검색해서 가게 상세 페이지 들어가는곳");
        navigation.navigate("storeInfo", { datas: item, place: item.RSTR_RDNMADR, places: item.RSTR_LNNO_ADRES, ph: item.RSTR_TELNO })
    }

    return (
        <View style={styles.container}>
            {stores && <FlatList
                data={stores}
                initialNumToRender={5}
                renderItem={({ index, item }) => {
                    return (
                        <Pressable
                            style={({ pressed }) => pressed ? { opacity: 0.7 } : null}
                            onPress={() => { pressHandle(item) }}
                        >
                            <Card style={styles.cardContainer}>
                                <Card.Content style={styles.cardContent}>
                                    {item.rstrImg ?
                                        <Card.Cover source={{ uri: item.rstrImg?.RSTR_IMG_URL }} style={styles.cardImg} resizeMode="cover" />
                                        :
                                        <Card.Cover source={require("../assets/store_defaultImage.png")} style={styles.cardImg} resizeMode="cover" />
                                    }
                                    <View style={{ marginLeft: 10 }}>
                                        <Title>{item.RSTR_NM}</Title>
                                        <Paragraph numberOfLines={2}>
                                            {item.getMenu ?
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
                    )
                }} />}
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