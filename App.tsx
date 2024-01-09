import 'react-native-gesture-handler';
import React from 'react';
import {View, StyleSheet, Text, Button, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RootNavigation from './src/navigation/RootNavigation';
import {persistor, store} from './src/redux/store';
import {Provider as StoreProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {ThemeProvider} from '@rneui/themed';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <NavigationContainer>
            <StatusBar backgroundColor={'#00796B'} barStyle={'light-content'} />
            <RootNavigation />
          </NavigationContainer>
        </ThemeProvider>
      </PersistGate>
    </StoreProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
