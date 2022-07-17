import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import NowPlaying from './sections/NowPlaying'
import TopRated from './sections/TopRated'
import TvShows from './sections/TvShows'
import Upcoming from './sections/Upcoming'
import Poster from './Poster'

const Content = () => {
  return (
    <>
    <ScrollView>
      <View style={styles.sections}>
        <View style={styles.poster}>
          <Poster />
        </View>
    <View style={styles.container}>
        <NowPlaying />
        <TopRated />
        <TvShows />
        <Upcoming />
      </View>
    </View>
    </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
    },
    sections: {

    },
    poster: {
      height: 300,
      width: '100%'
    }
})

export default Content