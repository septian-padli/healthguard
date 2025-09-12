// import StatCard from "@/app-example/components/StatCard";
// import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
// import React, { useEffect, useRef, useState } from "react";
// import {
//     Animated,
//     Dimensions,
//     Easing,
//     FlatList,
//     ImageBackground,
//     Platform,
//     SafeAreaView,
//     StatusBar,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
// } from "react-native";

// import useNavigationService from "@/app-example/hooks/useNavigationService";

// const { width: SCREEN_WIDTH } = Dimensions.get("window");
// const localHeader = require("../../assets/images/bicycle-screen.png"); // sesuaikan relatif path

// // contoh data stat
// // Konteks: iconBgColor buat Background Icon terdalam, terus buat Color buat keseluruhan card
// const statsData = [
//     {
//         id: "1",
//         title: "Kalori",
//         value: "44 / 500 Kal",
//         color: "#FFF7ED",
//         icon: "fire",
//         iconBgColor: "#FF7A2D",
//         iconColor: "#FFFFFF",
//     },
//     {
//         id: "2",
//         title: "Avg. Darah",
//         value: "120/80",
//         color: "#FEF2F2", // pale yellow
//         icon: "heart",
//         iconBgColor: "#FF6467",
//         iconColor: "#FFFFFF",
//     },

//     {
//         id: "3",
//         title: "Avg. Pace",
//         value: "5:25/Km",
//         color: "#FAF5FF", // pale cyan
//         icon: "speedometer",
//         iconBgColor: "#AD46FF",
//         iconColor: "#FFFFFF",
//     },
//     {
//         id: "4",
//         title: "Heart Rate",
//         value: "85 bpm",
//         color: "#FEF2F2", // pale pink
//         icon: "heart-pulse",
//         iconBgColor: "#FF6B6B",
//         iconColor: "#FFFFFF",
//     },
//     {
//         id: "5",
//         title: "SpO2",
//         value: "98%",
//         color: "#EDFAFA", // pale mint
//         icon: "lungs",
//         iconBgColor: "#48CFCB",
//         iconColor: "#FFFFFF",
//     },
//     {
//         id: "6",
//         title: "Langkah",
//         value: "800",
//         color: "#F5FFE7", // pale green
//         icon: "walk",
//         iconBgColor: "#8DBF46",
//         iconColor: "#FFFFFF",
//     },
// ];

// const TOP_IMAGE_HEIGHT = 240;
// const PANEL_OVERLAP = 20;

// export default function SportScreen() {
//     const nav = useNavigationService();

//     // mode: "running" (tombol hijau pause) atau "paused" (tombol merah stop)
//     const [mode, setMode] = useState<"running" | "paused">("running");
//     const [seconds, setSeconds] = useState(0);
//     const intervalRef = useRef<number | null>(null);

//     // animation untuk feedback tombol
//     const scaleAnim = useRef(new Animated.Value(1)).current;

//     useEffect(() => {
//         if (mode === "running") {
//             intervalRef.current = setInterval(() => {
//                 setSeconds((s) => s + 1);
//             }, 1000) as unknown as number;
//         } else {
//             if (intervalRef.current) {
//                 clearInterval(intervalRef.current);
//                 intervalRef.current = null;
//             }
//         }

//         return () => {
//             if (intervalRef.current) clearInterval(intervalRef.current);
//         };
//     }, [mode]);

//     const formatTime = (s: number) => {
//         const mm = Math.floor(s / 60)
//             .toString()
//             .padStart(2, "0");
//         const ss = (s % 60).toString().padStart(2, "0");
//         return `${mm}:${ss}`;
//     };

//     const animateTap = () => {
//         scaleAnim.setValue(0.95);
//         Animated.timing(scaleAnim, {
//             toValue: 1,
//             duration: 160,
//             easing: Easing.out(Easing.quad),
//             useNativeDriver: true,
//         }).start();
//     };

//     const onMainToggle = () => {
//         animateTap();
//         setMode((m) => (m === "running" ? "paused" : "running"));
//     };

//     // responsive card width (sama seperti sebelumnya)
//     const HORIZONTAL_PADDING = 36;
//     const GAP = 12;
//     let numColumns = Math.floor((SCREEN_WIDTH - HORIZONTAL_PADDING) / 120);
//     if (numColumns < 2) numColumns = 2;
//     if (numColumns > 3) numColumns = 3;
//     const cardWidth = Math.floor(
//         (SCREEN_WIDTH - HORIZONTAL_PADDING - (numColumns - 1) * GAP) / numColumns
//     );

//     return (
//         <SafeAreaView style={styles.safe}>
//             <StatusBar barStyle="dark-content" />
//             <View style={styles.topImageContainer}>
//                 <ImageBackground
//                     source={localHeader}
//                     style={styles.topImage}
//                     resizeMode="cover"
//                 >
//                     <View style={styles.topOverlay} />
//                 </ImageBackground>
//             </View>

//             <View style={styles.panel}>
//                 <View style={styles.handle} />

//                 {/* Kontrol utama: tombol tengah (sudah tanpa ikon merah kanan) */}
//                 <View style={styles.controls}>
//                     <Animated.View
//                         style={[
//                             styles.mainButtonWrap,
//                             { transform: [{ scale: scaleAnim }] },
//                         ]}
//                     >
//                         <TouchableOpacity
//                             activeOpacity={0.85}
//                             onPress={onMainToggle}
//                             style={[
//                                 styles.mainButton,
//                                 mode === "running"
//                                     ? styles.mainButtonRunning
//                                     : styles.mainButtonPaused,
//                             ]}
//                         >
//                             {mode === "running" ? (
//                                 <MaterialIcons name="pause" size={26} color="#0B1220" />
//                             ) : (
//                                 <MaterialCommunityIcons name="square" size={22} color="#fff" />
//                             )}
//                         </TouchableOpacity>
//                     </Animated.View>
//                 </View>

//                 {/* Timer (posisi tetap di bawah tombol utama) */}
//                 <View style={styles.timer}>
//                     <Text style={styles.timerText}>{formatTime(seconds)}</Text>
//                     <Text style={styles.timerSub}>Total Duration</Text>
//                 </View>

//                 {/* grid stat */}
//                 <FlatList
//                     data={statsData}
//                     keyExtractor={(i) => i.id}
//                     numColumns={numColumns}
//                     columnWrapperStyle={{ justifyContent: "space-between" }}
//                     renderItem={({ item }) => (
//                         <StatCard
//                             title={item.title}
//                             value={item.value}
//                             color={item.color}
//                             icon={item.icon as any}
//                             iconBgColor={item.iconBgColor}
//                             iconColor={item.iconColor}
//                             width={cardWidth}
//                             onPress={() => { }}
//                         />
//                     )}
//                 />

//                 <TouchableOpacity
//                     style={styles.emergencyBtn}
//                     activeOpacity={0.9}
//                     onPress={() => nav.openEmergency("run")}
//                 >
//                     <Text style={styles.emergencyText}>Emergency</Text>
//                 </TouchableOpacity>
//             </View>
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     safe: { flex: 1, backgroundColor: "#F2F6FA" },
//     topImageContainer: { height: TOP_IMAGE_HEIGHT },
//     topImage: {
//         width: SCREEN_WIDTH,
//         height: "100%",
//         justifyContent: "flex-start",
//     },
//     topOverlay: {
//         ...StyleSheet.absoluteFillObject,
//         backgroundColor: "rgba(255,255,255,0.04)",
//     },

//     panel: {
//         flex: 1,
//         backgroundColor: "#fff",
//         borderTopLeftRadius: 22,
//         borderTopRightRadius: 22,
//         marginTop: -PANEL_OVERLAP,
//         paddingHorizontal: 18,
//         paddingTop: 12,
//     },
//     handle: {
//         width: 56,
//         height: 6,
//         backgroundColor: "#e6e9ee",
//         borderRadius: 20,
//         alignSelf: "center",
//         marginBottom: 12,
//     },

//     controls: {
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "center", // center the main button horizontally
//         marginBottom: 8,
//         paddingHorizontal: 6,
//     },

//     // main central button wrap
//     mainButtonWrap: {
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     mainButton: {
//         width: 64,
//         height: 64,
//         borderRadius: 14,
//         alignItems: "center",
//         justifyContent: "center",
//         elevation: 2,
//     },
//     mainButtonRunning: {
//         backgroundColor: "#BCFE5D", // hijau lembut (running -> pause icon)
//     },
//     mainButtonPaused: {
//         backgroundColor: "#FF6B6B", // merah (paused -> stop look)
//     },

//     timer: { alignItems: "center", marginBottom: 12 },
//     timerText: { fontSize: 28, fontWeight: "700", color: "#0B1220" },
//     timerSub: { fontSize: 12, color: "#6B7684", marginTop: 4 },

//     statsList: { paddingTop: 6, paddingBottom: Platform.OS === "ios" ? 24 : 12 },

//     emergencyBtn: {
//         backgroundColor: "#FF5C6B",
//         marginVertical: 12,
//         paddingVertical: 14,
//         borderRadius: 12,
//         alignItems: "center",
//     },
//     emergencyText: { color: "#fff", fontWeight: "700", fontSize: 16 },
// });