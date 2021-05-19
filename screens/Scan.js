import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import * as WebBrowser from 'expo-web-browser';

import { COLORS, FONTS, SIZES, icons, images } from "../constants";

const Scan = ({ navigation }) => {
    const [hasPermission, setHasPermission] = React.useState(null);
    const [scanned, setScanned] = React.useState(false);

    React.useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: "row",
                    marginTop: SIZES.padding * 4,
                    paddingHorizontal: SIZES.padding * 3,
                }}
            >
                <TouchableOpacity
                    style={{
                        width: 45,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Image
                        source={icons.close}
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.white,
                        }}
                    />
                </TouchableOpacity>

                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.body3 }}>
                        Scan para pago
                    </Text>
                </View>

                <TouchableOpacity
                    style={{
                        height: 45,
                        width: 45,
                        backgroundColor: COLORS.green,
                        borderRadius: 10,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    onPress={() => alert("Info")}
                >
                    <Image
                        source={icons.info}
                        style={{
                            height: 25,
                            width: 25,
                            tintColor: COLORS.white,
                        }}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    function renderScanFocus() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Image
                    source={images.focus}
                    resizeMode="stretch"
                    style={{
                        marginTop: "-45%",
                        width: 280,
                        height: 280,
                    }}
                />
            </View>
        );
    }

    function renderPaymentMethods() {
        return (
            <View
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 150,
                    padding: SIZES.padding * 3,
                    borderTopLeftRadius: SIZES.radius,
                    borderTopRightRadius: SIZES.radius,
                    backgroundColor: COLORS.white,
                }}
            >
                <Text style={{ ...FONTS.h4 }}>Other payment methods</Text>

                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: SIZES.padding * 2,
                    }}
                >
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                        onPress={() => alert("Phone number")}
                    >
                        <View
                            style={{
                                width: 40,
                                height: 40,
                                backgroundColor: COLORS.lightpurple,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 10,
                            }}
                        >
                            <Image
                                source={icons.phone}
                                resizeMode="cover"
                                style={{
                                    height: 25,
                                    width: 25,
                                    tintColor: COLORS.purple,
                                }}
                            />
                        </View>
                        <Text
                            style={{
                                marginLeft: SIZES.padding,
                                ...FONTS.body4,
                            }}
                        >
                            Phone
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginLeft: SIZES.padding * 2,
                        }}
                        onPress={() => alert("Barcode")}
                    >
                        <View
                            style={{
                                width: 40,
                                height: 40,
                                backgroundColor: COLORS.lightGreen,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 10,
                            }}
                        >
                            <Image
                                source={icons.barcode}
                                resizeMode="cover"
                                style={{
                                    height: 25,
                                    width: 25,
                                    tintColor: COLORS.primary,
                                }}
                            />
                        </View>
                        <Text
                            style={{
                                marginLeft: SIZES.padding,
                                ...FONTS.body4,
                            }}
                        >
                            Barcode
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    function onBarCodeRead(result) {
        setScanned(true);
        WebBrowser.openBrowserAsync(result.data);
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.transparent }}>
            <Camera
                ref={(ref) => {
                    this.camera = ref;
                }}
                style={{ flex: 1 }}
                captureAudio={false}
                type={Camera.Constants.Type.back}
                flashMode={Camera.Constants.FlashMode.off}
                onBarCodeScanned={onBarCodeRead}
                androidCameraPermissionOptions={{
                    title: "Permission to use the camera",
                    message:
                        "Camera is required in order to read QR codes",
                    buttonPositive: "OK",
                    buttonNegative: "Cancel",
                }}
            >
                {renderHeader()}
                {renderScanFocus()}
                {renderPaymentMethods()}
            </Camera>
        </View>
    );
};

export default Scan;
