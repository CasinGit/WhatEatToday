import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view"
import ConsumerRoute from "../components/ConsumerRoute";
import SellerRoute from "../components/SellerRoute";

const renderScene = SceneMap({
    consumer: ConsumerRoute,
    seller: SellerRoute
});

function RegisterScreen() {
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            title: "회원가입"
        });
    }, []);

    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: "consumer", title: "소비자" },
        { key: "seller", title: "판매자" }
    ]);

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    );
}

export default RegisterScreen;