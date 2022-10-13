import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Alert, Button, Image, Keyboard, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { TextInput } from 'react-native-paper';
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { AppContext } from "../context/app-context";
import { sendLoginRequest } from "../util/account";
import ImagePicker from "../components/imagePicker";

function WriteStoreReview({ route, navigation }) {
    console.log(route.params);

    const [reviewScore, setReviewScore] = useState();
    const [reviewComment, setReviewComment] = useState("");
    const [reviewImage, setReviewImage] = useState(null);
    const [reviewImageBase64, setReviewImageBase64] = useState(null);

    const imagePickedHandle = (uri, base64) => {
        setReviewImage(uri);
        setReviewImageBase64(base64);
    }

    const confirm = () => {
        const data = {
            RSTR_ID: route.params,
            email: "kkig30@naver.com", // 나중에 context로 변경
            score: reviewScore,
            comment: reviewComment
        }
        console.log(data);

        // sendAddPlaceRequest(data, placeImageBase64, placeImage, ctx.auth.idToken)
        //     .then(() => {
        //         // navigation.navigate("chooseLocation");
        //         navigation.goBack();

        //     }).finally(() => {
        //         setLoading(false);
        //     })
    }

    return (
        <View style={styles.container}>
            <ImagePicker onPicked={imagePickedHandle} />
            <View>
                <Text>별점:</Text>
                <TextInput keyboardType="numeric" placeholder="숫자만 입력가능" value={reviewScore} onChangeText={setReviewScore} />

                <Text style={{ marginTop: 10 }}>후기:</Text>
                <TextInput style={{
                    borderBottomColor: "#111111",
                    borderBottomWidth: 1,
                    height: 40,
                }}
                    placeholder={"후기를 입력해주세요"}
                    value={reviewComment} onChangeText={setReviewComment} />
            </View>
            <View style={{ marginTop: 50 }}>
                <Button title="리뷰 등록" onPress={confirm} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        // justifyContent: "center",
        // alignItems: 'center',
    },
    inputContainer: {
        marginBottom: 10
    },
    textInput: {
        // padding: 5,
        // borderBottomColor: "#121212",
        // borderBottomWidth: 2,
    },
});

export default WriteStoreReview;