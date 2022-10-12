import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable, FlatList } from "react-native";
import { Card, Searchbar, Title, Chip, Modal, Portal, Provider } from 'react-native-paper';
import SearchMenu from "../components/SearchMenu";
import CategorySelectScreen from "./categorySelect";
import StoreInfoScreen from "./storeinfoscreen";

const category = [
    { key: "중국식", value: "중식", img: require("../assets/category/중식.png") },
    { key: "한식", value: "한식", img: require("../assets/category/한식.png") },
    { key: "일식", value: "일식", img: require("../assets/category/일식.png") },
    { key: "경양식", value: "양식", img: require("../assets/category/양식.png") },
    { key: "뷔페식", value: "뷔페식", img: require("../assets/category/뷔페식.png") },
    { key: "회집", value: "회집", img: require("../assets/category/회집.png") },
    { key: "호프/통닭", value: "호프/통닭", img: require("../assets/category/호프통닭.png") },
    { key: "식육(숯불구이)", value: "식육", img: require("../assets/category/식육.png") },
    { key: "패밀리레스토랑", value: "패밀리레스토랑", img: require("../assets/category/패밀리레스토랑.png") },
    { key: "냉면집", value: "냉면집", img: require("../assets/category/냉면.png") },
];
Object.freeze(category);

function SearchScreen() {
    const navigation = useNavigation();
    const [searchFocus, setSearchFocus] = useState(false);
    const onSearch = () => setSearchFocus(true);
    const blurSearch = () => setSearchFocus(false);
    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = query => setSearchQuery(query);

    // 상세 페이지 모달
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    return (
        <Provider>
            <Searchbar
                placeholder="메뉴 검색"
                placeholderTextColor="gray"
                onChangeText={onChangeSearch}
                value={searchQuery}
                onFocus={onSearch}
                onBlur={blurSearch}
            />

            <Portal>
                <Modal visible={visible} onDismiss={hideModal}
                    style={styles.modalOuterStyle}
                    contentContainerStyle={styles.modalInnerStyle}>
                    <StoreInfoScreen />
                </Modal>
            </Portal>

            {!searchFocus && !searchQuery && // 검색 포커스 X && 검색 쿼리 X
                <View style={styles.container}>
                    <View View style={{ flexDirection: "row", margin: 10 }}>
                        <FlatList data={category} numColumns="4"
                            renderItem={one => {
                                return (
                                    <Pressable
                                        style={({ pressed }) => pressed ? { opacity: 0.8 } : null}
                                        onPress={() => {
                                            navigation.navigate("categorySelect", one.item.key);
                                        }}
                                    >
                                        <Card style={{ margin: 3 }}>
                                            <Card.Cover source={one.item.img} style={{ width: 77, height: 70, margin: 5 }} resizeMode="contain" />
                                            <Title style={{ textAlign: "center", fontSize: 12 }}>{one.item.value}</Title>
                                        </Card>
                                    </Pressable>
                                )
                            }} />
                    </View >

                    <Text style={{ fontWeight: "bold", fontSize: 24 }}>인기검색어</Text>
                    <View style={{ flexDirection: "row", margin: 10 }}>
                        <Chip icon="numeric-0-box" mode="outlined" style={{ margin: 2 }} onPress={showModal}>모달테스트</Chip>
                        <Chip icon="numeric-1-box" mode="outlined" style={{ margin: 2 }} onPress={() => onChangeSearch("국밥")}>국밥</Chip>
                        <Chip icon="numeric-2-box" mode="outlined" style={{ margin: 2 }} onPress={() => onChangeSearch("김치볶음밥")}>김치볶음밥</Chip>
                    </View>
                </View >
            }

            {searchFocus && searchQuery ? // 검색 포커스 O && 검색 쿼리 O
                <View style={styles.container}>
                    <SearchMenu query={searchQuery} />
                </View>
                : (!searchFocus && searchQuery && // 검색 포커스 X && 검색 쿼리 O
                    <View style={styles.container}>
                        <SearchMenu query={searchQuery} />
                    </View>
                )
            }
        </Provider >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        // justifyContent: "center",
        alignItems: 'center',
    },
    modalOuterStyle: {
        alignItems: "flex-end",
        // marginLeft: 30,
        marginBottom: 5
    },
    modalInnerStyle: {
        backgroundColor: 'white',
        padding: 5,
        flex: 1,
        width: "90%",
    },
});

export default SearchScreen;