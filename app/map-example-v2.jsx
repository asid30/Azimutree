import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';

// Data pohon
const trees = [
    { id: 1, jenis: 'puspa', azimuth: 0, jarak: 0 },
    { id: 2, jenis: 'sawo', azimuth: 359, jarak: 2.3 },
    { id: 3, jenis: 'mahoni', azimuth: 30, jarak: 4.2 },
    { id: 4, jenis: 'cemara', azimuth: 90, jarak: 2.8 },
    { id: 5, jenis: 'pinus', azimuth: 120, jarak: 5.9 },
    { id: 6, jenis: 'jambon', azimuth: 144, jarak: 5.1 },
    { id: 7, jenis: 'sempu batu', azimuth: 213, jarak: 6.9 },
    { id: 8, jenis: 'alpukat', azimuth: 240, jarak: 4.5 },
    { id: 9, jenis: 'rambutan', azimuth: 300, jarak: 5.1 },
    { id: 10, jenis: 'nangka', azimuth: 330, jarak: 5.5 }
];

// Titik pusat (pohon1) yang menjadi acuan
const baseCoordinate = { latitude: -5.419810, longitude: 105.181111 };

// Fungsi untuk mengonversi data polar ke koordinat (latitude & longitude)
const convertPolarToCoordinate = (tree, base) => {
    const angleRad = tree.azimuth * (Math.PI / 180); // konversi ke radian
    const deltaLat = (tree.jarak * Math.cos(angleRad)) / 111320; // perhitungan latitude
    const deltaLng = (tree.jarak * Math.sin(angleRad)) / (111320 * Math.cos(base.latitude * Math.PI / 180)); // perhitungan longitude
    return {
        latitude: base.latitude + deltaLat,
        longitude: base.longitude + deltaLng,
    };
};

export default function TreeMap() {
    // Atur region peta agar menampilkan titik-titik dengan zoom yang cukup
    const region = {
        ...baseCoordinate,
        latitudeDelta: 0.001, // sesuaikan zoom, nilai kecil berarti zoom dekat
        longitudeDelta: 0.001,
    };

    return (
        <View style={styles.container}>
            <MapView provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={region}
                mapType="satellite">

                {/* Gambar lingkaran dengan radius 10 m dan border warna merah */}
                <Circle
                    center={baseCoordinate}
                    radius={10} // radius dalam meter
                    strokeColor="red"
                    strokeWidth={2}
                    fillColor="rgba(255,0,0,0.1)" // opsional, transparansi isian
                />

                {trees.map(tree => {
                    const coordinate = convertPolarToCoordinate(tree, baseCoordinate);
                    return (
                        <Marker
                            key={tree.id}
                            coordinate={coordinate}
                            title={tree.jenis}
                            description={`Azimuth: ${tree.azimuth}°, Jarak: ${tree.jarak} m`}
                        >
                            <View style={styles.customMarker}>
                                <Text style={styles.markerText}>{tree.id}</Text>
                            </View>
                        </Marker>
                    );
                })}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    customMarker: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 5,
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1,
    },
    markerText: {
        fontSize: 10,
        fontWeight: 'bold',
    },
});
