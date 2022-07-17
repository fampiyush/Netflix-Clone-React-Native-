import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal } from 'react-native'
import {useState, useEffect} from 'react'
import Details from '../DetailsTv'
import {API_KEY} from '@env'

const TvShows = () => {
    const url = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
    const imgUrl = 'https://image.tmdb.org/t/p/w500'

    const [posterArray, setPosterArray] = useState([])
    const [id, setId] = useState([]);
    const [currentId, setCurrentId] = useState("");
    const [handleTouch, setHandleTouch] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUrl = async () => {
            const data = await fetch(url)
            const result = await data.json()

            result.results.forEach((res) => {
                setPosterArray((prevState) => [...prevState, res.poster_path])
                setId((prevState) => [...prevState, res.id]);
            })

            
                setLoading(false);
        }

        fetchUrl()
    },[])

    const handlePress = (index) => {
        setHandleTouch(true)
        setCurrentId(id[index])
      }

    return (
    <View style={styles.container}>
    <Modal visible={handleTouch} animationType="slide" onRequestClose={() => setHandleTouch(false)}>
        <Details currentId={currentId} />
      </Modal>
      <Text style={styles.textHead}>TV Shows</Text>
        <ScrollView horizontal={true}>
        <View style={styles.posterContainer}>
        {posterArray.map((poster, index) => {
            return (
              <TouchableOpacity key={poster} onPress={() => handlePress(index)}>
                {loading ? (
                  <View style={styles.imgLoad}>
                    <Image style={styles.loading} source={require('../../assets/images/loading.webp')} />
                  </View>
                ) : (
                  <Image style={styles.img} source={{ uri: imgUrl + poster }} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    textHead: {
        color: '#ffffff',
        fontSize: 20,
    },
    posterContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    img: {
        height: 200,
        width: 150,
        marginRight: 10,
    },
    imgLoad: {
        height: 200,
        width: 150,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000'
      },
      loading: {
        height: 100,
        width: 100,
      }
})

export default TvShows