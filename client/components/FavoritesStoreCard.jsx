import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { getStoreImageRequest, getStoreInfoRequest } from "../util/store";

function FavoritesStoreCard({ data }) {
    // data 배열임 중 숫자
    const [storeInfo, setStoreInfo] = useState();
    const [storeImage, setStoreImage] = useState();

    useEffect(()=>{ 
        !async function () {
            const storeData = await getStoreInfoRequest();
            const getStoreData = storeData.datas.filter((one)=>{
                if(one.RSTR_ID == data) {
                    return one;
                }
            });
            // console.log(getStoreData[0])
            setStoreInfo(getStoreData[0]);
            const image = await getStoreImageRequest(data);
            // console.log(image, "이걸봐라")
            if(image.datas[0]?.RSTR_IMG_URL) {
                setStoreImage(image.datas[0].RSTR_IMG_URL);
            } else {
                setStoreImage(null);
            }
        }()
    },[])

    const navigation = useNavigation();
    const pressHandle = () => {
        navigation.navigate("storeInfo", { datas: storeInfo, place: storeInfo.RSTR_RDNMADR, places: storeInfo.RSTR_LNNO_ADRES, ph: storeInfo.RSTR_TELNO });
    };

    return (
        <Pressable
            style={({ pressed }) => pressed ? { opacity: 0.8 } : null}
            onPress={pressHandle}
        >
            <Card style={{ width: "98%", margin: 5 }}>
                <Card.Content>
                    {/* <Title>Card title</Title> */}
                    {storeImage ?
                        <Card.Cover source={{ uri: storeImage }} />
                        :
                        <Card.Cover source={require("../assets/store_defaultImage.png")} />
                    }
                    {storeInfo ? 
                        <View>
                            <Title>{storeInfo.RSTR_NM}</Title>
                            <Paragraph numberOfLines={2}>{storeInfo.RSTR_INTRCN_CONT}</Paragraph>
                        </View>
                        :
                        <View>
                            <Title>로딩중</Title>
                            <Paragraph numberOfLines={2}>로딩중</Paragraph>
                        </View>
                    }
                </Card.Content>
            </Card>
        </Pressable>
    );
}

export default FavoritesStoreCard;