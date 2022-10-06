import { ActivityIndicator, View } from "react-native";


function LoadingOverlay() {
    return (<View style={{ flex: 1, justifyContent: "center", backgroundColor: "#ffffff" }}>
        <ActivityIndicator size={36} />
    </View >);
}

export default LoadingOverlay;  