import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { Button, Input } from '@rneui/themed';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { THEME } from '../../utils/theme';
import { verifyOtp } from '../../services/advisorApi';
import { signin } from '../../redux/auth/authSlice';
import { ROUTES } from '../../navigation/routes';
const OTP = ({ navigation, route }) => {
    const phone_no = route.params?.phoneNo;
    const dispatch = useDispatch();

    const [otp, setOtp] = useState('');
    const [loader, setLoader] = useState(false);

    const handleSubmitOtp = async () => {
        setLoader(true);
        const body = {
            phone_no,
            otp,
        };
        const res = await verifyOtp(body);
        if (res.status) {
            await AsyncStorage.setItem('token', res.token);
            dispatch(signin(res));
            // console.log('res', res)
            // navigation.navigate(ROUTES.drawer)
        } else {
            Alert.alert(res.message);
        }
        setLoader(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mainContainer}>
                <View style={styles.subContainer1}>
                    <ScrollView>
                        <View style={styles.headerTextContainer}>
                            <Text style={styles.headerText}>
                                Please enter the 6 digit OTP that has been sent to +91{phone_no}
                            </Text>
                        </View>

                        <View style={styles.otpInputContainer}>
                            <Input
                                keyboardType="number-pad"
                                placeholder="OTP"
                                inputContainerStyle={styles.otpInputStyle}
                                errorStyle={styles.errorStyle}
                                value={otp}
                                label="6 digit OTP"
                                labelStyle={styles.otpInputlabelStyle}
                                maxLength={6}
                                onChangeText={val => {
                                    setOtp(val);
                                }}
                                onSubmitEditing={handleSubmitOtp}
                            />
                        </View>

                        <View style={styles.resendOtpContainer}>
                            <TouchableOpacity
                                onPress={() => {
                                    console.log('resend otp');
                                    // this.resendOtp()
                                }}>
                                <Text style={styles.resendOtpText}>Resend 6 digit OTP ?</Text>
                            </TouchableOpacity>
                        </View>

                        <Button
                            onPress={handleSubmitOtp}
                            buttonStyle={styles.button}
                            title="CONFIRM OTP"
                            titleStyle={styles.buttonText}
                        />
                    </ScrollView>
                </View>

                {loader && (
                    <View style={styles.loader}>
                        <ActivityIndicator color={THEME.THEME_COLOUR} size="large" />
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.BACKGROUND_COLOR_LIGHT,

    },
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    subContainer1: {
        flex: 3,
        flexDirection: 'column',
    },
    subContainer2: {
        flex: 1,
    },

    buttonText: {
        fontSize: THEME.FONT_SIZE_LARGE,
        fontWeight: THEME.FONT_WEIGHT_LIGHT,
    },

    button: {
        margin: 10,
        backgroundColor: THEME.BUTTON_COLOR,
        height: 50,
    },
    headerTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    headerText: {
        margin: 15,
        lineHeight: 30,
        fontWeight: THEME.FONT_WEIGHT_LIGHT,
        fontSize: THEME.FONT_SIZE_MEDIUM,
        color: THEME.COLOR_GRAY,
    },
    otpInputContainer: {
        flex: 1,
        marginTop: 10,
        justifyContent: 'center',
    },
    otpInputlabelStyle: {
        marginLeft: 15,
        color: THEME.COLOR_WARNING,
    },
    otpInputStyle: {
        marginLeft: 15,

        marginRight: 15,
        borderBottomColor: THEME.COLOR_WARNING,
    },
    errorStyle: {
        marginLeft: 15,
    },
    resendOtpContainer: {
        flex: 1,
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'center',
    },
    resendOtpText: {
        color: THEME.COLOR_WARNING,
        fontWeight: THEME.FONT_WEIGHT_MEDIUM,
    },
    loader: {
        ...THEME.LOADER,
    },
});
export default OTP;
