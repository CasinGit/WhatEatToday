import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { TextInput } from 'react-native-paper';
import { AppContext } from "../context/app-context";
import ImagePicker from "../components/imagePicker";
import { writeStoreReview } from "../util/review";
import { writeReviewData } from "../util/reservation";
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function WriteStoreReview({ route, navigation }) {
    console.log(route.params.RSTR_ID);
    console.log(route.params._ID);

    const ctx = useContext(AppContext);

    const [reviewScore, setReviewScore] = useState(1);
    const [reviewComment, setReviewComment] = useState("");
    const [reviewImage, setReviewImage] = useState(null);
    const [reviewImageBase64, setReviewImageBase64] = useState(null);

    const imagePickedHandle = (uri, base64) => {
        setReviewImage(uri);
        setReviewImageBase64(base64);
    }

    const confirm = () => {
        const data = {
            RSTR_ID: route.params.RSTR_ID,
            email: ctx.auth.email,
            score: reviewScore,
            comment: reviewComment
        }
        console.log(reviewImage)

        const file = {
            name: `reviewImg.jpg`,
            uri: reviewImage,
            type: 'image/jpg',
        }
        // console.log(file);

        const formData = new FormData();
        if (file.uri) formData.append("file", file);
        formData.append("data", JSON.stringify(data))

        writeStoreReview(formData).then((received) => {
            console.log(received);
            if (received.result) {
                writeReviewData(route.params._ID).then((received) => {
                    console.log(received)
                })
                navigation.goBack();
            }
        })
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.innerContainer}>

                    <ImagePicker onPicked={imagePickedHandle} />
                    <View>

                        <View style={{ alignItems: 'center', flexDirection: "row", marginTop: 10 }}>
                            <Text style={{ marginRight: 10 }}>별점:</Text>
                            <Stars
                                default={1}
                                count={5}
                                // half={true}
                                // starSize={0}
                                update={(val) => { setReviewScore(val) }}
                                fullStar={<Icon name={'star'} style={[styles.myStarStyle]} />}
                                emptyStar={<Icon name={'star'} style={[styles.myStarStyle, styles.myEmptyStarStyle]} />}
                                halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]} />}
                            />
                            <Text style={{ marginLeft: 10 }}>{reviewScore}점</Text>
                        </View>

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
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        flexDirection: "column",
        // justifyContent: "center",
        // alignItems: 'center',
    },
    innerContainer: {
        margin: 10
    },
    textInput: {
        // padding: 5,
        // borderBottomColor: "#121212",
        // borderBottomWidth: 2,
    },
    myStarStyle: {
        color: 'yellow',
        backgroundColor: 'transparent',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10,
        fontSize: 40
    },
    myEmptyStarStyle: {
        color: 'white',
    }
});

export default WriteStoreReview;