import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle, Line, Text as SvgText } from 'react-native-svg';

// Ambil ukuran layar untuk mengatur ukuran kanvas
const { width, height } = Dimensions.get('window');
// Ukuran kanvas (disini kita gunakan 90% dari lebar layar, bisa disesuaikan)
const canvasSize = Math.min(width, height) * 0.9;
// Titik pusat kanvas (dalam pixel)
const center = canvasSize / 2;

// Faktor skala untuk mengkonversi jarak (meter) ke pixel
const scale = 21; // misal, 1 m = 30 pixel (sesuaikan sesuai kebutuhan)

// Data pohon (dalam satuan meter dan derajat)
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

// Fungsi untuk mengonversi data polar (jarak, azimuth) ke koordinat kartesian (x,y)
const polarToCartesian = (jarak, azimuth) => {
    // Konversi azimuth dari derajat ke radian
    const rad = (azimuth * Math.PI) / 180;
    const x = jarak * Math.sin(rad);      // Perhitungan x
    const y = -jarak * Math.cos(rad);       // Perhitungan y (negatif agar 0° di atas)
    return { x, y };
};

export default function TreeChart() {
    return (
        <View style={styles.container}>
            <Svg height={canvasSize} width={canvasSize} style={styles.svg}>
                {/* Gambar sumbu X dan Y */}
                <Line
                    x1={0}
                    y1={center}
                    x2={canvasSize}
                    y2={center}
                    stroke="gray"
                    strokeWidth="1"
                />
                <Line
                    x1={center}
                    y1={0}
                    x2={center}
                    y2={canvasSize}
                    stroke="gray"
                    strokeWidth="1"
                />

                {/* Gambar titik-titik untuk masing-masing pohon */}
                {trees.map((tree) => {
                    const { x, y } = polarToCartesian(tree.jarak, tree.azimuth);
                    // Transformasi koordinat: dari (0,0) di tengah ke posisi di kanvas
                    const cx = center + x * scale;
                    const cy = center + y * scale;
                    return (
                        <Circle
                            key={tree.id}
                            cx={cx}
                            cy={cy}
                            r="5"
                            fill="red"
                        />
                    );
                })}

                {/* Gambar label untuk tiap pohon */}
                {trees.map((tree) => {
                    const { x, y } = polarToCartesian(tree.jarak, tree.azimuth);
                    const cx = center + x * scale;
                    const cy = center + y * scale;
                    return (
                        <SvgText
                            key={'label' + tree.id}
                            x={cx + 8}
                            y={cy - 8}
                            fontSize="10"
                            fill="black"
                        >
                            {tree.id}-{tree.jenis}-{tree.azimuth}
                        </SvgText>
                    );
                })}
            </Svg>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    svg: {
        borderWidth: 1,
        borderColor: 'gray'
    }
});
