import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable, FlatList, Button } from "react-native";
import { Card, Searchbar, Title, Paragraph, Chip, Modal, Portal, Provider } from 'react-native-paper';
import { format } from "date-fns";
import ko from "date-fns/esm/locale/ko/index.js"
import { useNavigation } from "@react-navigation/native";

function HistoryCard({ route, data }) {
    // console.log(data);
    const navigation = useNavigation();
    const [disable, setDisable] = useState(true);

    useEffect(() => {
        const nowDate = format(new Date(), 'yyyy-MM-dd');
        const nowTime = format(new Date(), "HH:mm");
        if (data.date < nowDate) { // 날짜가 지났을때
            // console.log("예약 날짜 지났음");
            setDisable(false);
        } else if (data.date === nowDate && data.time < nowTime) { // 날짜가 같고 시간이 지났을때
            // console.log("날짜가 같고 시간이 지났음");
            setDisable(false);
        }
    }, [])

    return (
        <Card style={{ margin: 5 }}>
            <Card.Content>
                <Title>{data.getRstr?.RSTR_NM}</Title>
                <Paragraph>
                    예약 날짜: {data.date} / 예약 시간: {data.time}
                </Paragraph>
                <Paragraph>
                    방문 인원 : {data.num}명
                </Paragraph>
                <Paragraph>
                    요구사항 : {data.message}
                </Paragraph>

                <View style={{ marginTop: 10 }}>
                    <Button
                        title="리뷰 남기기"
                        disabled={disable}
                        onPress={() => navigation.navigate("writeReview", data.RSTR_ID)}
                    />

                </View>
            </Card.Content>
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        flexDirection: "row",
        margin: 5
        // justifyContent: "center",
    },
});

export default HistoryCard;