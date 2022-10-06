import { StyleSheet } from "react-native";




const globalStyles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "space-around",
        paddingHorizontal: 8,
        backgroundColor: "#ffffff"
    },
    font: {
        fontFamily: "brush-regular"
    },
    smallFont: {
        fontFamily: "brush-regular",
        fontSize: 18,
    },
    smallerFont: {
        fontFamily: "brush-regular",
        fontSize: 14,
    },
    largeFont: {
        fontFamily: "brush-regular",
        fontSize: 80,
    },
    regularFont: {
        fontFamily: "brush-regular",
        fontSize: 24
    },
});

export default globalStyles;