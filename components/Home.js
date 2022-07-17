import {View, StyleSheet} from 'react-native'
import Content from './Content'
import Navbar from './Navbar'

function Home() {
  return (
    <View>
        
    <View style={styles.contContainer}>
        <View style={styles.nav}>
            <Navbar />
        </View>  
        <View style={styles.content}>
            <Content />
        </View>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    contContainer: {
        flexDirection: 'column',
        height: '100%',
    },
    nav: {
        zIndex: 99,
    },
})

export default Home