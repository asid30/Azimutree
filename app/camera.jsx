import { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button, ScrollView } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

export default function cameraOCR() {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [mediaPermission, setMediaPermission] = useState(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [visionResult, setVisionResult] = useState(null);
    const cameraRef = useRef(null);

    // Permissions untuk media library
    useEffect(() => {
        (async () => {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            setMediaPermission(status === 'granted');
        })();
    }, []);

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

    if (mediaPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>Izin penyimpanan diperlukan</Text>
            </View>
        );
    }

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

    const savePhoto = async () => {
        if (capturedImage) {
            await MediaLibrary.saveToLibraryAsync(capturedImage);
            alert('Foto berhasil disimpan!');
            setCapturedImage(null);
            setVisionResult(null);
        }
    };

    return (
        <View style={styles.container}>
            {!capturedImage ? (
                <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.flipButton} onPress={() => setFacing(current => current === 'back' ? 'front' : 'back')}>
                            <Text style={styles.text}>Flip Kamera</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
                            <View style={styles.captureInner} />
                        </TouchableOpacity>
                    </View>
                </CameraView>
            ) : (
                <View style={styles.previewContainer}>
                    <ScrollView>
                        <Image source={{ uri: capturedImage }} style={styles.preview} />
                        {visionResult && visionResult.detections && (
                            <View style={styles.visionContainer}>
                                <Text style={styles.visionTitle}>Teks yang terdeteksi:</Text>
                                {visionResult.detections.map((detection, index) => (
                                    // Biasanya elemen pertama adalah teks lengkap, jadi bisa ditampilkan secara terpisah
                                    <Text key={index} style={styles.visionText}>{detection.description}</Text>
                                ))}
                            </View>
                        )}
                        <View style={styles.previewButtons}>
                            <TouchableOpacity style={styles.retakeButton} onPress={() => { setCapturedImage(null); setVisionResult(null); }}>
                                <Text style={styles.buttonText}>Ambil Ulang</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.saveButton} onPress={savePhoto}>
                                <Text style={styles.buttonText}>Simpan</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 20,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    flipButton: {
        padding: 15,
        backgroundColor: 'rgba(0,0,0,0.4)',
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
    text: {
        fontSize: 16,
        color: 'white',
    },
    previewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    preview: {
        width: '90%',
        height: '80%',
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
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    visionTitle: {
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    visionText: {
        color: '#fff',
    },
});
