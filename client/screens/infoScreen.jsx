import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import FlatButton from "../components/flatButton";
import { AppContext } from "../context/app-context";
import globalStyles from "./stylesheet";

function InfoScreen() {

    const ctx = useContext(AppContext);
    const navigation = useNavigation();
    const logoutHandle = () => {
        Alert.alert("With°", "로그아웃 하시겠습니까?", [
            {
                text: "취소",
            },
            {
                text: "로그아웃",
                onPress: () => {
                    ctx.dispatch({ type: "logout" });
                    AsyncStorage.removeItem("authentication");
                    navigation.navigate("home");
                },
            }
        ]);
    }

    return (
        <View style={[globalStyles.root, styles.infoContainer]}>
            <ScrollView style={{ flex: 1 }}>

            </ScrollView>
            <View>
                <FlatButton onPress={logoutHandle}>로그아웃</FlatButton>
            </View>
            <View>
                <Text style={[globalStyles.smallerFont, { textAlign: "center" }]}>WITH°</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    infoContainer: {
        flex: 1,
        justifyContent: "flex-end",
        paddingBottom: 16
    }
});
export default InfoScreen;