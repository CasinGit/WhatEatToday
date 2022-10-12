import { Image, StyleSheet, View } from "react-native";
import test_check_image from "../assets/test_Check_green_circle.png";



function ReservationConfirmScreen() {
    return ( 
        <View style={styles.container}>
            <View style={styles.container_check}>
                <Image source={test_check_image}/>
            </View>
        </View>
     );
}


const styles = StyleSheet.create({
    
    container : {
        flex : 1
    },
    container_check : {
        width : 500,
        height : 500
    }

})

export default ReservationConfirmScreen;