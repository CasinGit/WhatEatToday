import { Image, ScrollView, Text } from "react-native";

function StoreReviewRoute() {
    return ( 
        <ScrollView>
            <Image>{review_image}</Image>
            <Text>{review_consumer_score}</Text>
            <Text>{review_consumer}</Text>
            <Text>{review_content}</Text>
        </ScrollView>
     );
}

export default StoreReviewRoute;