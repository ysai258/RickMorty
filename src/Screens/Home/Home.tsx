import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import {Character, RootStackParamList} from '../../Types/types';
import CharacterCard from '../../Components/CharacterCard/CharacterCard';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BASE_CHARACTER_URL, UP_ARROW_URL} from '../../Constants/Constants';
import Loader from '../../Components/Loader/Loader';
import SearchBar from '../../Components/SearchBar/SearchBar';

const Home = () => {
  // Declare state variables
  const [characters, setCharacters] = useState<Character[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(BASE_CHARACTER_URL);
  const [searchText, setSearchText] = useState<string>('');
  const [showButton, setShowButton] = useState(false);

  // Declare useRef variables
  const fetching = useRef<boolean>(false);
  const scrollRef = useRef<FlatList<Character>>(null);

  // Define navigation object for navigating between screens
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Define function to fetch characters data from API
  const fetchCharacters = async (
    url: string | null = '',
    appendPrev: boolean,
  ) => {
    // If another fetch is already in progress, do nothing
    if (fetching.current) {
      return;
    }
    fetching.current = true;
    try {
      // Fetch characters if url is valid used for pagination
      if (url) {
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();

        // If data is available, update state variables
        if (data?.info) {
          setCharacters(prevData => {
            // Append or replace characters data in state
            return appendPrev
              ? [...prevData, ...data.results]
              : [...data.results];
          });
          // Update nextUrl to the next page of data used for pagination
          setNextUrl(data.info.next);
        } else {
          // If no data is available, reset state variables
          setCharacters([]);
          setNextUrl(null);
        }
      }
    } catch (error) {
      console.log('Error fetching characters ', error);
    } finally {
      fetching.current = false;
    }
  };

  // Call fetchCharacters on component mount
  useEffect(() => {
    fetchCharacters(nextUrl, true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Define function to handle presses on character cards which redirects to Profile Screen
  const handlePress = async (item: Character) => {
    navigation.navigate('Profile', {character: item});
  };

  // Define function to render each character card
  const renderItem = ({item}: {item: Character}) => (
    <CharacterCard item={item} handlePress={() => handlePress(item)} />
  );

  // Define function to render the footer (loader or message indicating no more characters)
  const renderFooter = () => {
    if (!nextUrl) {
      return <Text style={{color: 'grey'}}>No characters.</Text>;
    }
    return <Loader />;
  };

  // Define function to handle scroll (to show scroll to top button)
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    setShowButton(yOffset > 0);
  };

  // Define function to handle scroll to top of characters list
  const handleScrollToTop = () => {
    if (scrollRef.current)
      scrollRef.current.scrollToOffset({animated: true, offset: 0});
  };
  return (
    <View style={{flex: 1}}>
      <Text style={styles.title}>Rick and Morty Characters</Text>
      <SearchBar
        value={searchText}
        onChangeText={text => {
          // When the user types, set fetching to false so that new data can be fetched
          fetching.current = false;
          handleScrollToTop();
          setSearchText(text);
          fetchCharacters(`${BASE_CHARACTER_URL}/?name=${text}`, false);
        }}
        onSubmit={() => {
          fetchCharacters(`${BASE_CHARACTER_URL}/?name=${searchText}`, false);
        }}
        placeholder={'Search by name'}
      />
      <FlatList
        data={characters}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
        style={{marginBottom: 10}}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          // When the user reaches the end of the list, fetch more data with the API
          fetchCharacters(nextUrl, true);
        }}
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        onScroll={handleScroll}
        ref={scrollRef}
      />

      {showButton && (
        // floating button to scroll to the top of the list when clicked
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={handleScrollToTop}>
          <Image style={{height: 50, width: 50}} source={{uri: UP_ARROW_URL}} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'grey',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 10,
  },
});

export default Home;
