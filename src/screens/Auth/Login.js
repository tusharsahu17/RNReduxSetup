import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import { Button, Input } from '@rneui/themed';
import { LOGO } from '../../utils/images';
import { THEME } from '../../utils/theme';
import { ROUTES } from '../../navigation/routes';
import { useDispatch } from 'react-redux';
import { signin } from '../../redux/auth/authSlice';
import { sendOtp } from '../../services/advisorApi';

const Login = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [phoneNo, setPhoneNo] = useState('6565386898');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    console.log('login')
    // navigation.navigate(ROUTES.drawer);

    // setLoader(true);
    const body = {
      phone_no: phoneNo,
    };
    const res = await sendOtp(body);
    if (res.status) {
        console.log('otp', res.message);
      navigation.navigate(ROUTES.otp, { phoneNo });
    } else {
      Alert.alert(res.message);
    }
    // // console.log("res", res);
    // setLoader(false);

  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.topContainer}>
          <View style={styles.imageConatiner}>
            <Image
              style={{ width: 400, height: 200, resizeMode: 'center' }}
              source={LOGO}
            />
          </View>

          <View style={styles.headingTextContainer}>
            <Text style={styles.headingTextStyle}>
              Please enter your phone number to login
            </Text>
            {errorMessage && (
              <Text style={[styles.headingTextStyle, styles.error]}>
                {errorMessage}
              </Text>
            )}
          </View>

          <View style={styles.MobileNumberContainer}>
            <Input
              keyboardType="number-pad"
              placeholder=""
              errorStyle={{ marginBottom: 40 }}
              value={phoneNo}
              // errorMessage={errorMessage}
              label="Mobile Number"
              maxLength={10}
              inputStyle={styles.mobileInput}
              leftIcon={<Text style={styles.icon91}>+91</Text>}
              onChangeText={val => {
                setPhoneNo(val);
              }}
              onSubmitEditing={handleLogin}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            //color= "red"
            buttonStyle={styles.button}
            title="Login"
            titleStyle={styles.buttonText}
            onPress={handleLogin}
          />

          <Button
            buttonStyle={{ backgroundColor: '#328cce', margin: 10 }}
            title="SignUp"
            titleStyle={styles.buttonText}
            onPress={() => navigation.navigate(ROUTES.signup)}
          />
        </View>
      </View>

      {loader && (
        <View style={styles.loader}>
          <ActivityIndicator color={THEME.THEME_COLOUR} size="large" />
        </View>
      )}
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.BACKGROUND_COLOR_LIGHT,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  topContainer: {
    flex: 2,
  },
  error: {
    color: THEME.COLOR_DANGER_DARK,
  },
  imageConatiner: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: Colors.COLOR_PRIMARY,
  },
  headingTextContainer: {
    flex: 0.5,
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingTextStyle: {
    marginLeft: 10,
    fontSize: THEME.FONT_SIZE_MEDIUM,
    fontWeight: THEME.FONT_WEIGHT_MEDIUM,
    color: THEME.COLOR_GRAY,
  },
  MobileNumberContainer: {
    flex: 0.8,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 7,
  },
  mobileInput: {
    fontWeight: THEME.FONT_WEIGHT_MEDIUM,
    fontSize: THEME.FONT_SIZE_LARGE,
  },
  icon91: {
    fontWeight: THEME.FONT_WEIGHT_BOLD,
    fontSize: THEME.FONT_SIZE_LARGE,
    marginRight: 10,
    color: THEME.COLOR_GRAY,
  },

  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  loader: {
    ...THEME.LOADER,
  },
  buttonText: {
    //color: themeStyles.COLOR_WARNING,
    fontSize: THEME.FONT_SIZE_LARGE,
    fontWeight: THEME.FONT_WEIGHT_BOLD,
  },
  button: {
    margin: 10,
    backgroundColor: THEME.BUTTON_COLOR,
    height: 50,
  },
})