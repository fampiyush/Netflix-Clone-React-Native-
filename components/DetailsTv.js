import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import WebView from 'react-native-webview'
import YoutubePlayer from 'react-native-youtube-iframe'
import {API_KEY} from '@env'

const DetailsTv = ({currentId}) => {
    const [UrlKey, setUrlKey] = useState('')
    const [details, setDetails] = useState({
        name: '',
        overview: '',
        release_date: '',
        tagline: '',
    })

    const movieUrl = `https://api.themoviedb.org/3/tv/${currentId}/videos?api_key=${API_KEY}&language=en-US`
    const movieDetails = `https://api.themoviedb.org/3/tv/${currentId}?api_key=${API_KEY}&language=en-US`

    useEffect(() => {
        const fetchUrl = async () => {
            const data = await fetch(movieUrl)
            const result = await data.json()

            const trailer = result.results.find((res) => res.type === 'Trailer' && res.name === 'Official Trailer')
            const trailer2 = result.results.find((res) => res.type === 'Trailer' && (res.name.includes('Trailer') || res.name.includes('Teaser')))
            const teaser = result.results.find((res) => res.type === 'Teaser' && (res.name.includes('Trailer') || res.name.includes('Teaser')))

            if(trailer){
                setUrlKey(trailer.key)
            }else if(trailer2) {
                setUrlKey(trailer2.key)
            }else if(teaser) {
                setUrlKey(teaser.key)
            }
        }

        const fetchDetails = async () => {
            const data = await fetch(movieDetails)
            const result = await data.json()

            const name = result.name
            const overview = result.overview
            const release_date = result.first_air_date
            const tagline = result.tagline

            setDetails({
                name,
                overview,
                release_date,
                tagline
            })
        }
 

        fetchUrl()
        fetchDetails()
    },[])


    return (
    <View style={styles.container}>
    <View style={styles.videoContainer}>
        <YoutubePlayer videoId={UrlKey} play={true} height={500} />
    </View>
    <View style={styles.textContainer}>
        <Text style={styles.headText}>{details.name}</Text>
        <Text style={styles.bodyText}>Released on : {details.release_date}</Text>
        <Text style={styles.bodyText}>{details.overview}</Text>
        <Text style={styles.tagline}>"{details.tagline}"</Text>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1c1c1c',
        height: '100%',
        flex: 1,
    },
    videoContainer: {
        flex: 4,
    },
    textContainer: {
        flex: 9,
        padding: 8,
        flexDirection: 'column',
    },
    headText: {
        color: '#ffffff',
        fontSize: 25,
    },
    bodyText: {
        color: '#ffffff',
        fontSize: 15,
        marginTop: 15,
    },
    tagline: {
        color: '#ffffff',
        fontSize: 20,
        marginTop: 100,
        textAlign: 'center',
        marginLeft: -10,
    },
    video: {
        height: 250,
        width: '100%',
    }
})

export default DetailsTv