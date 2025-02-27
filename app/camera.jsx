import { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button, ScrollView, ImageBackground } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView, useCameraPermissions } from 'expo-camera';
// import * as MediaLibrary from 'expo-media-library';

import BackgroundApp from "@/assets/images/background-app.png";

export default function cameraOCR() {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    // const [mediaPermission, setMediaPermission] = useState(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [visionResult, setVisionResult] = useState(null);
    const cameraRef = useRef(null);

    // Permissions untuk media library
    // useEffect(() => {
    //     (async () => {
    //         const { status } = await MediaLibrary.requestPermissionsAsync();
    //         setMediaPermission(status === 'granted');
    //     })();
    // }, []);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>Izin kamera diperlukan</Text>
                <Button title="Berikan Izin" onPress={requestPermission} />
            </View>
        );
    }

    // if (mediaPermission === false) {
    //     return (
    //         <View style={styles.container}>
    //             <Text style={{ textAlign: 'center' }}>Izin penyimpanan diperlukan</Text>
    //         </View>
    //     );
    // }

    const takePhoto = async () => {
        if (cameraRef.current) {
            // Pastikan kita meminta base64 dari gambar
            const photo = await cameraRef.current.takePictureAsync({ base64: true });
            setCapturedImage(photo.uri);

            // Kirim gambar ke backend untuk analisis dengan Google Cloud Vision
            if (photo.base64) {
                analyzePhoto(photo.base64);
            }
        }
    };

    const analyzePhoto = async (photoBase64) => {
        try {
            const response = await fetch('https://desired-iguana-scarcely.ngrok-free.app/analyze', {  // Ganti dengan URL backend Anda
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: photoBase64 })
            });
            const result = await response.json();
            console.log('Vision API text detection result:', result);
            setVisionResult(result);
        } catch (error) {
            console.error('Error analyzing photo:', error);
        }
    };

    // const savePhoto = async () => {
    //     if (capturedImage) {
    //         await MediaLibrary.saveToLibraryAsync(capturedImage);
    //         alert('Foto berhasil disimpan!');
    //         setCapturedImage(null);
    //         setVisionResult(null);
    //     }
    // };

    return (
        <SafeAreaView>
            <ImageBackground source={BackgroundApp} resizeMode="cover" style={styles.container}>
                <View style={styles.linearRow}>
                    <Text style={styles.title}>
                        Scanner
                    </Text>
                </View>
                <View style={styles.linearRow}>
                    {!capturedImage ? (
                        < CameraView style={styles.camera} facing={facing} ref={cameraRef}>
                        </CameraView>
                    ) : (
                        <View style={styles.camera}>
                            <Image source={{ uri: capturedImage }} style={styles.preview} />
                        </View>)}

                    {/* <View style={styles.camera}>
                    </View> */}
                </View>

                {!capturedImage ? (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.flipButton} onPress={() => setFacing(current => current === 'back' ? 'front' : 'back')}>
                            <Text style={styles.text}>Putar Kamera</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
                            <View style={styles.captureInner} />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View></View>
                )}

                <View style={styles.linearRow}>
                    <Text style={styles.text}>
                        Teks yang terdeteksi:
                    </Text>
                </View>

                <ScrollView style={styles.linearRow}>
                    {!visionResult ? (
                        <View style={styles.visionContainer}>
                            <Text style={styles.text}>
                                Tidak ada teks yang terdeteksi
                            </Text>
                        </View>
                    ) : (
                        <View>
                            <ul>
                                {visionResult && visionResult.detections && (
                                    visionResult.detections.map((detection, index) => (
                                        <li>
                                            <TouchableOpacity style={styles.visionContainer}>
                                                <Text key={index} style={styles.visionText}>{detection.description}</Text>
                                            </TouchableOpacity>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </View>
                    )}
                </ScrollView>

                <View style={[styles.linearRow, { marginBottom: 30 }]}>
                    <Text style={styles.text}>
                        Sulit mendeteksi? Coba gunakan mode manual
                    </Text>
                    <TouchableOpacity style={[styles.visionContainer, { alignSelf: "center", padding: 10 }]}>
                        <Text style={styles.text}>
                            Input Manual
                        </Text>
                    </TouchableOpacity>
                </View>
                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={{ color: "white" }}>© 2025 Azimutree | Sidz</Text>
                </View>
            </ImageBackground>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: "column",
        width: "100%",
        height: "100%",
        // justifyContent: "flex-start",
        alignContent: "flex-start"
    },
    linearRow: {
        marginHorizontal: 20,
        marginBottom: 10,
    },
    camera: {
        // flex: 1,
        // justifyContent: 'flex-start',
        backgroundColor: 'yellow',
        height: 300,
        width: "100%",
        borderRadius: 10,
    },
    buttonContainer: {
        // flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        // margin: 20,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    flipButton: {
        padding: 15,
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 10,
    },
    captureButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    captureInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#ff4040',
    },
    title: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 10,
        textAlign: "center",
    },
    text: {
        fontSize: 16,
        color: 'white',
    },
    preview: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    previewButtons: {
        flexDirection: 'row',
        marginTop: 20,
        gap: 20,
    },
    retakeButton: {
        backgroundColor: '#ff4040',
        padding: 15,
        borderRadius: 10,
    },
    saveButton: {
        backgroundColor: '#40cc40',
        padding: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    visionContainer: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 7,
        borderRadius: 10,
        marginTop: 5,
        alignSelf: "flex-start"
    },
    visionTitle: {
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    visionText: {
        color: '#fff',
    },
    footer: {
        paddingTop: 20,
        flexDirection: "row",
        justifyContent: "center",
        position: 'absolute',
        bottom: 0,
        // flex: 1,
        alignSelf: 'stretch',
        right: 0,
        left: 0,
    },
});
