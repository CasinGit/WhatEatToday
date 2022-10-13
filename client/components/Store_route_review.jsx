import { FlatList, Image, ScrollView, Text, View } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { SERVER_URL } from '@env';

function StoreReviewRoute({ reviews }) {
    // console.log("reviews", reviews);

    return (
        <View style={{ flex: 1 }}>
            {reviews &&
                <FlatList data={reviews} renderItem={({ item }) => {
                    return (
                        <Card style={{ margin: 5 }}>
                            <Card.Content>
                                {item.img &&
                                    <Card.Cover source={{ uri: `${SERVER_URL}${item.img}` }} />
                                }
                                <Paragraph>
                                    평점: {item.score} / 작성자: {item.email}
                                </Paragraph>
                                <Title>{item.comment}</Title>
                            </Card.Content>
                        </Card>
                    )
                }} />
            }
        </View>
    );
}

export default StoreReviewRoute;