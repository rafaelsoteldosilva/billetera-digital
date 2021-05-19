import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    TextInput,
    Modal,
    FlatList,
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView,
    Platform,
    Dimensions,
    StatusBar,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { COLOR, SIZES, FONTS, icons, images, COLORS } from "../constants";

const SignUp = ({ navigation }) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const [areas, setAreas] = React.useState([]);
    const [selectedArea, setSelectedArea] = React.useState(null);
    const [modalVisible, setModalVisible] = React.useState(false);

    React.useEffect(() => {
        fetch("https://restcountries.eu/rest/v2/all")
            .then((response) => response.json())
            .then((data) => {
                let areaData = data.map((item) => {
                    return {
                        code: item.alpha2Code,
                        name: item.name,
                        callingCode: `+${item.callingCodes[0]}`,
                        flag: `https://www.countryflags.io/${item.alpha2Code}/flat/64.png`,
                    };
                });

                setAreas(areaData);
                // areas.forEach(item => console.log(item.flag))

                if (areaData.length > 0) {
                    let defaultData = areaData.filter((a) => a.code == "US");

                    if (defaultData.length > 0) {
                        setSelectedArea(defaultData[0]);
                    }
                }
            });
    }, []);

    function RenderHeader() {
        return (
            <TouchableOpacity
                style={styles.renderHeader}
                onPress={() => console.log("SignUp")}
            >
                <Image
                    source={icons.back}
                    resizeMode="contain"
                    style={styles.imageInRenderHeader}
                />
                <Text style={styles.textInRenderHeader}>Sign Up</Text>
            </TouchableOpacity>
        );
    }
    function RenderLogo() {
        return (
            <View style={styles.renderLogo}>
                <Image
                    source={require("../assets/images/wallet.png")}
                    resizeMode="contain"
                    style={styles.renderLogoImage}
                />
            </View>
        );
    }

    function RenderForm() {
        return (
            <View style={styles.renderForm}>
                {/* Full Name */}
                <View style={styles.renderFormFullNameView}>
                    <Text style={styles.fullNameText}>Name</Text>
                    <TextInput
                        style={styles.fullNameTextInput}
                        placeholder="Type your name"
                        placeholderTextColor={COLORS.dodgerBlue}
                        selectionColor={COLORS.white}
                    />
                </View>
                {/* Phone Number */}
                <View style={{ marginTop: SIZES.padding * 2 }}>
                    <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>
                        Número Telefónico
                    </Text>

                    <View style={{ flexDirection: "row" }}>
                        {/* Country Code */}
                        <TouchableOpacity
                            style={{
                                width: 100,
                                height: 50,
                                marginHorizontal: 5,
                                borderBottomColor: COLORS.white,
                                borderBottomWidth: 1,
                                flexDirection: "row",
                                ...FONTS.body2,
                            }}
                            onPress={() => setModalVisible(true)}
                        >
                            <View style={{ justifyContent: "center" }}>
                                <Image
                                    source={icons.down}
                                    style={{
                                        width: 10,
                                        height: 10,
                                        tintColor: COLORS.white,
                                    }}
                                />
                            </View>
                            <View
                                style={{
                                    justifyContent: "center",
                                    marginLeft: 5,
                                }}
                            >
                                <Image
                                    source={{ uri: selectedArea?.flag }}
                                    resizeMode="contain"
                                    style={{
                                        width: 30,
                                        height: 30,
                                    }}
                                />
                            </View>

                            <View
                                style={{
                                    justifyContent: "center",
                                    marginLeft: 5,
                                }}
                            >
                                <Text
                                    style={{
                                        color: COLORS.white,
                                        ...FONTS.body3,
                                    }}
                                >
                                    {selectedArea?.callingCode}
                                </Text>
                            </View>
                        </TouchableOpacity>

                        {/* Phone Number */}
                        <TextInput
                            style={{
                                flex: 1,
                                marginVertical: SIZES.padding,
                                borderBottomColor: COLORS.white,
                                borderBottomWidth: 1,
                                height: 40,
                                color: COLORS.white,
                                ...FONTS.body3,
                            }}
                            placeholder="Phone number"
                            placeholderTextColor={COLORS.dodgerBlue}
                            selectionColor={COLORS.white}
                            keyboardType="numeric"
                        />
                    </View>
                </View>
                {/* Password */}
                <View style={{ marginTop: SIZES.padding * 2 }}>
                    <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>
                        Contraseña
                    </Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.white,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.white,
                            ...FONTS.body3,
                        }}
                        placeholder="Password"
                        placeholderTextColor={COLORS.dodgerBlue}
                        selectionColor={COLORS.white}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                        style={{
                            position: "absolute",
                            right: 0,
                            bottom: 10,
                            height: 30,
                            width: 30,
                        }}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Image
                            source={
                                showPassword ? icons.eye : icons.disable_eye
                            }
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.white,
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    function renderButton() {
        return (
            <View style={{ margin: SIZES.padding * 3 }}>
                <TouchableOpacity
                    style={{
                        height: 60,
                        backgroundColor: COLORS.blue,
                        borderRadius: SIZES.radius / 1.5,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                        Continue
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    function renderAreaCodesModal() {
 
        function renderItem({ item }) {
            return (
                <TouchableOpacity 
                    style={{ padding: SIZES.padding, flexDirection: 'row' }}
                    onPress={() => {
                        setSelectedArea(item)
                        setModalVisible(false)
                    }}
                >
                    <Image
                        source={{ uri: item.flag }}
                        style={{
                            width: 30,
                            height: 30,
                            marginRight: 10,
                        }}
                    />
                    <Text style={styles.countryName}>{item.name}</Text>
                </TouchableOpacity>
            );
        }

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <TouchableWithoutFeedback
                    onPress={() => setModalVisible(false)}
                >
                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <View
                            style={{
                                height: 400,
                                width: SIZES.width * 0.8,
                                backgroundColor: COLORS.lightGreen,
                                borderRadius: SIZES.radius,
                            }}
                        >
                            <FlatList
                                data={areas}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.code}
                                showsVerticalScrollIndicator={false}
                                style={{
                                    padding: SIZES.padding * 2,
                                    marginBottom: SIZES.padding * 2,
                                }}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }

    return (
        <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
            <LinearGradient
                colors={[COLORS.cornflowerBlue, COLORS.cyan]}
                style={styles.gradient}
            >
                <ScrollView>
                    {/* {RenderHeader()} */}
                    {RenderLogo()}
                    {RenderForm()}
                    {renderButton()}
                </ScrollView>
            </LinearGradient>
            {renderAreaCodesModal()}
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({

    centerText: {
        textAlign: "center",
    },
    gradient: {
        // width: Dimensions.get('window').width,
        // height: Dimensions.get('window').height,
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 25,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    renderHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: SIZES.padding * 3,
    },
    renderLogo: {
        marginTop: SIZES.padding * 9,
        height: 80,
        alignItems: "center",
        justifyContent: "center",
    },
    renderLogoImage: {
        width: "60%",
    },
    imageInRenderHeader: {
        width: 20,
        height: 20,
        tintColor: COLORS.white,
    },
    textInRenderHeader: {
        marginLeft: SIZES.padding * 1,
        color: COLORS.white,
        ...FONTS.h4,
    },
    renderForm: {
        marginTop: SIZES.padding * 3,
        marginHorizontal: SIZES.padding * 3,
    },
    renderFormFullNameView: {},
    fullNameText: {
        color: COLORS.white,
        ...FONTS.body3,
    },
    fullNameTextInput: {
        marginVertical: SIZES.padding,
        borderBottomColor: COLORS.white,
        borderBottomWidth: 1,
        height: 40,
        color: COLORS.white,
        ...FONTS.body3,
    },
});

export default SignUp;
