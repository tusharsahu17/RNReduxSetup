import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ROUTES } from './routes';
import { THEME } from '../utils/theme';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Avatar, Card } from '@rneui/themed';

import {

    LayoutGrid,
    LogIn,
    LogOut

} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../redux/auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
const CustomSidebar = (props) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [sideLinks] = useState([
        {
            id: ROUTES.dashboard,
            title: 'Dashboard',
            icon: <LayoutGrid strokeWidth={2} size={21} color={THEME.COLOR_BLACK} />,
            onPress: () => navigation.navigate(ROUTES.dashboard),
        },
        {
            id: ROUTES.profile,
            title: 'Profile',
            icon: <LayoutGrid strokeWidth={2} size={21} color={THEME.COLOR_BLACK} />,
            onPress: () => navigation.navigate(ROUTES.profile),
        },

    ]);

    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        dispatch(logout());
    };

    return (
        <View style={{ flex: 1 }}>

            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{
                    backgroundColor: THEME.THEME_COLOUR,
                }}>
                <View
                    style={{ flex: 1, backgroundColor: THEME.COLOR_WHITE, paddingTop: 10 }}>
                    <Card >
                        <View>
                            <View style={{ flexDirection: 'row', gap: 10 }}>
                                <Avatar
                                    source={{ uri: 'https://example.com/avatar.jpg' }}
                                    rounded
                                    size="large"
                                />
                                <View>
                                    <Card.Title >Advisor Name</Card.Title>
                                    <Card.Title >(Senior Advisor)</Card.Title>
                                </View>
                            </View>

                        </View>
                    </Card>

                    {sideLinks.map(item => (
                        <DrawerItem
                            key={item.id}
                            label={item.title}
                            icon={() => item.icon}
                            onPress={item.onPress}
                        />
                    ))}

                </View>
            </DrawerContentScrollView>
            <View
                style={{
                    padding: 5,
                    borderTopWidth: 1,
                    borderTopColor: THEME.COLOR_GRAY,

                }}>
                <Pressable onPress={handleLogout}>
                    {({ pressed }) => (
                        <View
                            style={{
                                transform: [
                                    {
                                        scale: pressed ? 0.98 : 1,
                                    },
                                ],
                            }}>
                            <Text style={styles.logoutbtn}>
                                <LogOut
                                    strokeWidth={3}
                                    size={16}
                                    //   color={colors.white}
                                    absoluteStrokeWidth
                                />{' '}
                                Logout
                            </Text>
                        </View>
                    )}
                </Pressable>
            </View>
        </View>
    )
}

export default CustomSidebar

const styles = StyleSheet.create({
    logoutbtn: {
        height: 45,
        textAlign: 'center',
        fontSize: 20,
        borderRadius: 5,
        paddingTop: 6,
        fontWeight: 'bold',
        color: THEME.COLOR_WHITE,
        backgroundColor: THEME.COLOR_DANGER,
    },
})