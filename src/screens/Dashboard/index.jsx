import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
const Dashboard = () => {
  const { isAuthenticated } = useSelector(state => state.auth)
  console.log('=====>', isAuthenticated)
  return (
    <View style={styles.container}>

    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})