import { useState } from "react";
import { Image, Text, View } from "react-native";
import {TabView} from "react-native-tab-view"

function StoreInfoScreen() {

    const [store_info_tabs] = useState([
        { title:"메뉴", key:"menu" },
        { title:"정보", key:"info" },
        { title:"리뷰", key:"review" }
    ]);


    return (
        <View>
            <View>
                <Image source={{}} />
            </View>
            <View>
                <Text>식당명</Text>
            </View>
            <View>
                <Text>별점</Text>
            </View>
            <View>
                <TabView>
                    {}
                </TabView>
            </View>
        </View>
    );
}

export default StoreInfoScreen;