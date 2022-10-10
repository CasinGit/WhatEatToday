import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { RegisterContext } from "../context/register-context";

function StoreListInfo({ item }) {
    const navigation = useNavigation();
    const ctx = useContext(RegisterContext);
    const pressHandle = () => {
        const data = { id: item.RSTR_ID, storeName: item.RSTR_NM };
        ctx.dispatch({ type: "sellerRegister", payload: data });
        console.log("ctx.store", ctx);
        navigation.goBack();
    };

    return (
        <Pressable style={({ pressed }) => pressed ? { opacity: 0.6 } : null}
            onPress={pressHandle}>
            <Card style={styles.container}>
                <Card.Content>
                    <Title>{item.RSTR_NM}</Title>
                    {item.RSTR_RDNMADR ?
                        <Paragraph>도로명: {item.RSTR_RDNMADR}</Paragraph>
                        :
                        <Paragraph>지번: {item.RSTR_LNNO_ADRES}</Paragraph>
                    }
                </Card.Content>
            </Card>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
    },
});

export default StoreListInfo;