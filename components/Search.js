import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useState, useEffect } from "react";
import SearchBar from "react-native-dynamic-search-bar";
import Details from "./Details";
import DetailsTv from "./DetailsTv";
import {API_KEY} from '@env'

const Search = () => {
  const [text, setText] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [currentMedia, setCurrentMedia] = useState("");
  const [result, setResult] = useState([]);
  const [handleTouch, setHandleTouch] = useState(false);

  const url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&page=1&query=${text}`;
  const imgUrl = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    setResult(() => []);
  }, [text]);

  useEffect(() => {
    const fetchUrl = async () => {
      if (text) {
        const data = await fetch(url);
        const result = await data.json();

        result.results.forEach((res) => {
          if (res.poster_path !== null) {
            const response = {
              id: res.id,
              poster_path: res.poster_path,
              media_type: res.media_type,
            };
            setResult((prevState) => [...prevState, response]);
          }
        });
      }
    };

    fetchUrl();
  }, [text]);

  useEffect(() => {
    setResult((prevState) => [...prevState]);
  }, [text]);

  const handlePress = (item) => {
    setCurrentId(item.id);
    setCurrentMedia(item.media_type);
    setHandleTouch(true);
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={handleTouch}
        animationType="slide"
        onRequestClose={() => setHandleTouch(false)}
      >
        {currentMedia === "movie" ? (
          <Details currentId={currentId} />
        ) : (
          <DetailsTv currentId={currentId} />
        )}
      </Modal>
      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="Search here"
          value={text}
          onChangeText={(text) => setText(text)}
        />
      </View>
      <View style={styles.resultContainer}>
        <FlatList
          data={result}
          numColumns={2}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePress(item)}>
              <Image
                style={styles.img}
                source={{ uri: imgUrl + item.poster_path }}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1c1c1c",
    height: "100%",
  },
  searchContainer: {
    marginTop: 10,
  },
  resultContainer: {
    marginTop: 20,
    marginHorizontal: "2%",
    alignItems: "center",
  },
  img: {
    height: 200,
    width: 150,
    marginBottom: 10,
    marginHorizontal: 20,
  },
});

export default Search;
