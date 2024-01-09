import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ROUTES } from './routes'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { THEME } from '../utils/theme';
import CustomSidebar from './CustomSidebar';
import Dashboard from './../screens/Dashboard'
import SignUp from '../screens/Auth/Signup'
import Profile from '../screens/Profile';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName={ROUTES.dashboard}
      drawerContent={props => <CustomSidebar {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: THEME.THEME_COLOUR },
        animation: 'slide_from_right',
        headerTitleStyle: {
          color: THEME.COLOR_WHITE,
        },
        orientation: 'portrait',
        headerTintColor: THEME.COLOR_WHITE,
        headerBackTitleVisible: false,
      }}
    >
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Profile" component={Profile} />

    </Drawer.Navigator>
  )
}

export default DrawerNavigation

const styles = StyleSheet.create({})