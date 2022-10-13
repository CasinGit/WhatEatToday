import { launchCameraAsync, launchImageLibraryAsync, PermissionStatus, useCameraPermissions, useMediaLibraryPermissions } from "expo-image-picker";
import { View, Text, Alert, Image, Pressable, Button } from 'react-native'
import React, { useState } from 'react'
import { ActivityIndicator } from "react-native-paper";

export default function ImagePicker({ onPicked }) {
    const [imageUri, setImageUri] = useState();
    const [cameraPermission, reqCameraPermission] = useCameraPermissions();
    const [mediaPermission, reqMediaPermission] = useMediaLibraryPermissions();

    const takeFromAlbum = async () => {
        if (mediaPermission.status === PermissionStatus.UNDETERMINED ||
            mediaPermission.status === PermissionStatus.DENIED) {
            try {
                const resp = await reqMediaPermission();
                if (!resp.granted) {
                    Alert.alert("오늘, 뭐먹지?", "이기능은 갤러리 접근권한이 필요합니다.");
                    return;
                }
            } catch (e) {
                console.log(e);
                return;
            }
        }

        const result = await launchImageLibraryAsync({
            quality: 0.5,
            allowsEditing: true,
            aspect: [16, 9],
            exif: true,
            base64: true
        });
        if (!result.cancelled) {
            const lat = result.exif.GPSLatitude;
            const lng = result.exif.GPSLongitude;
            if (lat && lng) { // lat, lng 값이 있으면 실행할 코드
                console.log("GPS Data 감지");
                onPicked(result.uri, result.base64, { latitude: lat, longitude: lng })
            } else {
                console.log("GPS Data 없음");
                onPicked(result.uri, result.base64);
            }
            setImageUri(result.uri);
        }
    }
    const takeFromCamera = async () => {
        if (cameraPermission.status === PermissionStatus.DENIED ||
            cameraPermission.status === PermissionStatus.UNDETERMINED) { // 카메라 권한이 없을때
            const req = await reqCameraPermission() // 권한 요청
            if (!req.granted) {
                Alert.alert("", "이 기능은 카메라 접근 권한이 필요합니다.");
                return;
            }
        }

        const result = await launchCameraAsync({
            quality: 0.5,
            allowsEditing: true,
            aspect: [16, 9],
            exif: true,
            base64: true
        })
        if (!result.cancelled) {
            const lat = result.exif.GPSLatitude;
            const lng = result.exif.GPSLongitude;
            if (lat && lng) { // lat, lng 값이 있으면 실행할 코드
                console.log("GPS Data 감지");
                onPicked(result.uri, result.base64, { latitude: lat, longitude: lng })
            } else {
                console.log("GPS Data 없음");
                onPicked(result.uri, result.base64);
            }
            setImageUri(result.uri);
        }
    }

    return (
        <View style={{ height: 300 }}>
            <View style={{
                flex: 1, backgroundColor: "#efefef", borderRadius: 12, overflow: "hidden",
                borderColor: "silver", borderWidth: 1
            }}>
                {imageUri ?
                    <Image source={{ uri: imageUri }} style={{ flex: 1 }} /> :
                    <Pressable style={{ flex: 1 }} onPress={takeFromCamera}>
                        <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                            <Text style={{ color: "gray" }}>리뷰 이미지 등록</Text>
                        </View>
                    </Pressable>
                }
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-around", padding: 8 }}>
                <Button title="앨범" onPress={takeFromAlbum} />
                <Button title="카메라" onPress={takeFromCamera} />
            </View>
        </View>
    )
}