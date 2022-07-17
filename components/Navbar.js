import { View, Text, Image, StyleSheet, Pressable, Modal } from 'react-native'
import {useState} from 'react'
import Search from './Search'

const navbar = () => {
  const [visibility, setVisibility] = useState(false)
  
  return (
    <>
    <Modal visible={visibility} animationType='fade' onRequestClose={() => setVisibility(false)}>
      <Search />
    </Modal>
    <View style={styles.nav}>
      <View>
        <Image style={styles.imgLogo} source={require('../assets/images/logo.png')} />
      </View>
      <View>
      <Pressable onPress={() => setVisibility(true)}>
      <View style={styles.searchContainer}>
        <Image style={styles.imgSearch} source={require('../assets/images/search.png')} />
      </View>
      </Pressable>
      </View>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
    nav: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        position: 'absolute',
        width: '100%',
    },
    imgLogo: {
        height: 40,
        width: 40,
    },
    imgSearch: {
        height: 28,
        width: 28,
    },
    searchContainer: {
      padding: 10,
    }
})

export default navbar