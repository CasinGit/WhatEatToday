import { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { TabView } from "react-native-tab-view"
import DefaultImage from "../assets/store_defaultImage.png";
import Store_Route_Menu from "../components/Store_route_menu";
import Store_Route_Info from "../components/Store_route_info";
import Store_Route_Review from "../components/Store_route_review";
import { getStoreImageRequest, getStoreMenuRequest, getStoreOperRequest } from "../util/store";
import IconButton from "../components/IconButton";
import { addStoreFavRequest, removeStoreFavRequest } from "../util/account";
import { AppContext } from "../context/app-context";
import CustomButton from "../components/CustomButton";

// const renderScene = SceneMap({
//     menu: Store_Route_Menu,
//     info: Store_Route_Info,
//     review: Store_Route_Review
// });

function StoreInfoScreen({ navigation, route }) {
    // console.log("StoreInfoScreen!!");
    // const navigation = useNavigation();

    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);

    const data = route.params.datas;
    const [storeImage, setStoreImage] = useState();
    const [storeMenu, setStoreMenu] = useState();
    const [storeOper, setStoreOper] = useState();

    const [routes] = useState([
        { key: "menu", title: "메뉴" },
        { key: "info", title: "정보" },
        { key: "review", title: "리뷰", }
    ]);

    // const [marking, setMarking] = useState();
    
    // const ctx = useContext(AppContext);

    // const pressHandle = async()=> {
    //     // console.log(name)
    //     setMarking((current) => !marking);
    //     marking ? await removeStoreFavRequest(ctx.auth.email, data.RSTR_ID) : await addStoreFavRequest(ctx.auth.email, data.RSTR_ID)
    //     alert(marking ?  "즐겨찾기에 삭제되었습니다." : "즐겨찾기에 추가되었습니다.");
    // }

    useEffect(() => {
        console.log(data.RSTR_ID)

        !async function () {
            // navigation.setOptions({headerRight : ()=>{
            //     return <IconButton onPress={pressHandle} name={marking ? "star" : "star-outline"}/>
            // }});

            try {
                const image = await getStoreImageRequest(data.RSTR_ID);
                const menu = await getStoreMenuRequest(data.RSTR_ID);
                const oper = await getStoreOperRequest(data.RSTR_ID);

                // console.log(image.datas)
                // console.log(menu.datas, "menu")
                // console.log(oper, "oper")
                setStoreMenu(menu);
                setStoreOper(oper);
                setStoreImage(image.datas[0].RSTR_IMG_URL ? image.datas[0].RSTR_IMG_URL : null);
            } catch (e) {
                console.log("error", e)
            }
        }()
    }, []);

    const place = route.params.place;
    const places = route.params.places;
    const ph = route.params.ph;
    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'menu':
                return <Store_Route_Menu data={storeMenu} />;
            case 'info':
                return <Store_Route_Info data={storeOper} place={place} places={places} ph={ph}/>;
            case 'review':
                return <Store_Route_Review />;
            default:
                return null;
        }
    };
    console.log(data)
    return (
        <View style={styles.container}>
            <View style={styles.a1}>
                {storeImage ?
                    <Image source={{ uri: storeImage }} style={{ flex: 1 }} />
                    : <Image source={DefaultImage} style={{ flex: 1, width: "100%", height: "100%" }} />
                }
            </View>
            <View style={styles.a2}>
                <Text style={{ fontSize: 50, textAlign: "center" }}>{data.RSTR_NM }
                    <Text style={{ fontSize: 30, textAlign: "center", flexWrap :"wrap" }}>{"["+data.BSNS_STATM_BZCND_NM+"]"}</Text>
                </Text>
            </View>
            <View style={styles.a3}>
                <Text style={{ fontSize: 20, textAlign: 'center' }}>별점</Text>
            </View>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />
            <CustomButton/>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    a1: {
        backgroundColor: "#white",
        height: "30%"
    },
    a2: {
        backgroundColor: "white",
        marginTop: 8,
        height: "8%"
    },
    a3: {
        backgroundColor: "white",
        marginTop: 5,
        height: "10%"
    }
});

export default StoreInfoScreen;