import { useEffect, useState } from "react";
import { StyleSheet, FlatList, Pressable, Text, View } from "react-native";
import { Card, Paragraph, Portal, Searchbar, Title, ActivityIndicator, MD2Colors, Provider } from 'react-native-paper';
import { getSearchMenu, getStoreImageRequest, getStoreInfoRequest, getStoreNameRequest } from "../util/store";
import { useNavigation } from "@react-navigation/native";

function SearchMenu({ query }) {
    const navigation = useNavigation();
    const [stores, setStores] = useState();
    const [loading, setLoading] = useState(false);

    // Debounce Technique
    useEffect(() => {
        const timer = setTimeout(() => {
            console.log("query", query);
            if (query.is == "menu") {
                setLoading(true);
                getSearchMenu(query.value).then(received => {
                    setStores(received.datas);
                }).catch(err => {
                    console.error(err);
                }).finally(() => {
                    setLoading(false);
                })
            } else if (query.is == "store") {
                setLoading(true);
                getStoreNameRequest(query.value).then(received => {
                    setStores(received.datas);
                }).catch(err => {
                    console.error(err);
                }).finally(() => {
                    setLoading(false);
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
        <Provider>
            <View style={styles.container}>
                {loading &&
                    <Portal>
                        <ActivityIndicator animating={loading} color={MD2Colors.red800} style={{ flex: 1 }} size="large" />
                    </Portal>
                }
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
        </Provider>
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