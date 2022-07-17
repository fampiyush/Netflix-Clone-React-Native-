import { View, Text, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import {useEffect, useState} from 'react'
import Details from './Details'
import {API_KEY} from '@env'

const Poster = () => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`

    const [posterImage, setPosterImage] = useState('')
    const [currentId, setCurrentId] = useState("");
    const [handleTouch, setHandleTouch] = useState(false);

    const imgUrl = 'https://image.tmdb.org/t/p/w500'

    useEffect(() => {
        const fetchUrl = async () => {
            const data = await fetch(url)
            const result = await data.json()
            const rand = Math.floor(Math.random() * 20)
            const firstImg = result.results[rand].poster_path
            const id = result.results[rand].id
            setPosterImage(firstImg)
            setCurrentId(id)
        }

        fetchUrl()
    },[])

    const handlePress = (index) => {
        setHandleTouch(true)
      }

    return (
    <View>
    <Modal visible={handleTouch} animationType="slide" onRequestClose={() => setHandleTouch(false)}>
        <Details currentId={currentId} />
      </Modal>
      <TouchableOpacity onPress={() => handlePress()}>
        <Image style={styles.img} source={{uri: imgUrl+posterImage}} resizeMode='stretch' />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    img: {
        width: '100%',
        height: '100%',
    }
})

export default Poster