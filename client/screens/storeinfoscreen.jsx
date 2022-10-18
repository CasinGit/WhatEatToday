import { useContext, useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { TabView } from "react-native-tab-view"
import Store_Route_Menu from "../components/Store_route_menu";
import Store_Route_Info from "../components/Store_route_info";
import Store_Route_Review from "../components/Store_route_review";
import { getStoreImageRequest, getStoreMenuRequest, getStoreOperRequest } from "../util/store";
import { addStoreFavRequest, getStoreFavRequest, removeStoreFavRequest } from "../util/account";
import { getStoreReviews } from "../util/review";
import IconButton from "../components/IconButton";
import { AppContext } from "../context/app-context";
import CustomButton from "../components/CustomButton";
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsFocused } from "@react-navigation/native";
import { ActivityIndicator, MD2Colors, Portal, Provider } from "react-native-paper";

function StoreInfoScreen({ navigation, route }) {
    // console.log("StoreInfoScreen!!");
    // const navigation = useNavigation();

    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);

    const data = route.params.datas;
    const [loading, setLoading] = useState(false);
    const [storeImage, setStoreImage] = useState();
    const [storeMenu, setStoreMenu] = useState();
    const [storeOper, setStoreOper] = useState();
    const [storeReviews, setStoreReviews] = useState();
    const [scoreAverage, setScoreAverage] = useState(0);

    const [routes] = useState([
        { key: "menu", title: "메뉴" },
        { key: "info", title: "정보" },
        { key: "review", title: "리뷰", }
    ]);

    const [marking, setMarking] = useState(false);
    const ctx = useContext(AppContext);
    const isFocused = useIsFocused();

    // 즐겨찾기 버튼 클릭 핸들러
    const pressHandle = async () => {
        if (!ctx.auth) {
            Alert.alert("", "로그인이 필요한 서비스 입니다.");
            navigation.navigate("accountStack");
            return;
        };
        setMarking((current) => !marking);
        marking ? await removeStoreFavRequest(ctx.auth.email, data.RSTR_ID) : await addStoreFavRequest(ctx.auth.email, data.RSTR_ID);
    };

    // 예약 버튼 핸들러
    const reservationHandle = () => {
        if (!ctx.auth) {
            Alert.alert("", "로그인이 필요한 서비스 입니다.");
            navigation.navigate("accountStack");
            return;
        }
        navigation.navigate("reservation", { datas: data });
    };

    useEffect(() => {
        console.log("useEffect => [data.RSTR_ID]");
        setLoading(true);

        getStoreImageRequest(data.RSTR_ID).then((received) => {
            setStoreImage(received.datas[0]?.RSTR_IMG_URL ? received.datas[0].RSTR_IMG_URL : null);
        }).catch((err) => console.error(err));

        getStoreMenuRequest(data.RSTR_ID).then((received) => {
            setStoreMenu(received);
        }).catch((err) => console.error(err));

        getStoreOperRequest(data.RSTR_ID).then((received) => {
            setStoreOper(received);
        }).catch((err) => console.error(err));


        // 리뷰 데이터 불러올때 경고 발생해서 catch문 사용
        getStoreReviews(data.RSTR_ID).then((received) => {
            setStoreReviews(received.datas);
        }).catch((err) => console.error(err));

        setLoading(false);
    }, [data.RSTR_ID]);

    useEffect(() => {
        console.log("useEffect => [marking, isFocused]");

        // 로그인 했을때만 실행
        if (ctx.auth?.email) {
            getStoreFavRequest(ctx.auth.email).then((received) => {
                received.datas.includes(data.RSTR_ID) ? setMarking(true) : setMarking(false);
            }).catch((err) => {
                console.error(err);
            })
        }

        !async function () {
            console.log(ctx.auth, "auth");

            navigation.setOptions({
                headerRight: () => {
                    // 로그인 했을때만 실행
                    if (ctx.auth) {
                        return <IconButton onPress={pressHandle} name={marking ? "star" : "star-outline"} />
                    } else {
                        return <IconButton onPress={pressHandle} name={"star-outline"} />
                    }
                }
            });
        }()
    }, [marking, isFocused]);

    const [starRating, setStarRating] = useState();
    // 리뷰 데이터가 들어오면 별점 평균 설정
    useEffect(() => {
        setLoading(true);

        if (!storeReviews) return;
        // console.log(storeReviews);
        let sumScore = 0;
        storeReviews.forEach(item => {
            // console.log(item.score);
            sumScore += item.score;
        });
        console.log("별점 총합:", sumScore);
        console.log("리뷰 갯수:", storeReviews.length);
        if ((sumScore / storeReviews.length).toFixed(1) * 1 % 1 > 0 && (sumScore / storeReviews.length).toFixed(1) * 1 % 1 < 1) {
            setScoreAverage((sumScore / storeReviews.length).toFixed(1) * 1);
            setStarRating(Math.floor((sumScore / storeReviews.length).toFixed(1) * 1) + 0.5);
        } else if ((sumScore / storeReviews.length).toFixed(1) * 1 % 1 === 0) {
            setScoreAverage((sumScore / storeReviews.length).toFixed(1) * 1);
            setStarRating((sumScore / storeReviews.length).toFixed(1) * 1);
        }

        setLoading(false);
    }, [storeReviews])

    const place = route.params.place;
    const places = route.params.places;
    const ph = route.params.ph;
    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'menu':
                return <Store_Route_Menu data={storeMenu} />;
            case 'info':
                return <Store_Route_Info data={storeOper} place={place} places={places} ph={ph} />;
            case 'review':
                return <Store_Route_Review reviews={storeReviews} />;
            default:
                return null;
        }
    };

    return (
        <Provider>
            {loading &&
                <Portal>
                    <ActivityIndicator animating={loading} color={MD2Colors.red800} style={{ flex: 1 }} size="large" />
                </Portal>
            }
            <View style={styles.container}>
                <View style={styles.a1}>
                    {storeImage !== null ?
                        <Image source={{ uri: storeImage }} style={{ flex: 1 }} />
                        : <Image source={require("../assets/store_defaultImage.png")} style={{ flex: 1, width: "100%", height: "100%" }} />
                    }
                </View>
                <View style={styles.a2}>
                    <Text style={{ fontSize: 36, textAlign: "center" }}>{data.RSTR_NM}
                        <Text style={{ fontSize: 20, textAlign: "center", flexWrap: "wrap" }}>
                            {` [${data.BSNS_STATM_BZCND_NM ? data.BSNS_STATM_BZCND_NM : " - "}]`}
                        </Text>
                    </Text>
                </View>
                <View style={styles.a3}>
                    <Stars
                        default={starRating}
                        count={5}
                        half={true}
                        // starSize={0}
                        fullStar={<Icon name={'star'} style={[styles.myStarStyle]} />}
                        emptyStar={<Icon name={'star-outline'} style={[styles.myStarStyle, styles.myEmptyStarStyle]} />}
                        halfStar={<Icon name={'star-half-full'} style={[styles.myStarStyle]} />}
                    />
                    <Text style={{ fontSize: 20, marginTop: 15 }}>{"(" + scoreAverage + ")"}</Text>
                </View>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                />
                {/* {ctx.auth?.email &&
                <CustomButton reservationHandle={reservationHandle} />
            } */}
                <CustomButton reservationHandle={reservationHandle} />
            </View>
        </Provider>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    a1: {
        backgroundColor: "white",
        height: 210,
    },
    a2: {
        backgroundColor: "white",
        marginTop: 8,
    },
    a3: {
        backgroundColor: "white",
        marginBottom: 8,
        flexDirection: "row",
        justifyContent: "center"
    },
    myStarStyle: {
        color: 'yellow',
        backgroundColor: 'transparent',
        textShadowColor: 'black',
        // textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10,
        fontSize: 40
    },
    myEmptyStarStyle: {
        color: 'white',
    }
});

export default StoreInfoScreen;