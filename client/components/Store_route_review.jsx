import { FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { SERVER_URL } from '@env';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
                                <Paragraph style={{marginTop:8}}>
                                    평점: <Stars
                                        default={item.score}
                                        count={5}
                                        // half={true}
                                        // starSize={0}
                                        fullStar={<Icon name={'star'} style={[styles.myStarStyle]} />}
                                        emptyStar={<Icon name={'star'} style={[styles.myStarStyle, styles.myEmptyStarStyle]} />}
                                        halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]} />}
                                    />{"("+item.score+")"}  / 작성자: {item.email.slice(0,3)+"****"}
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

const styles = StyleSheet.create({
    myStarStyle: {
        color: 'yellow',
        backgroundColor: 'transparent',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10,
        fontSize: 15,
    },
    myEmptyStarStyle: {
        color: 'white',
    }
});
export default StoreReviewRoute;