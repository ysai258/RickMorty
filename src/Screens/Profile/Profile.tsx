import {RouteProp} from '@react-navigation/native';
import {Episode, Location, RootStackParamList} from '../../Types/types';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useAPI} from '../../Context/ApiContext';
import {FC, useEffect, useState} from 'react';
import {CURRENT_URL, ORIGIN_URL} from '../../Constants/Constants';
import Loader from '../../Components/Loader/Loader';
import React from 'react';

type ProfileRouteProp = RouteProp<RootStackParamList, 'Profile'>;

type ProfileProps = {
  route: ProfileRouteProp;
};

// Interface to define props for the LocationContainer component
interface LocationProps {
  location: Location;
  image: string;
  title: string;
}

// component to render location information
const LocationContainer: FC<LocationProps> = ({location, image, title}) => {
  return (
    <View style={styles.locationContainer}>
      <Image style={styles.locationIcon} source={{uri: image}} />
      <Text style={styles.locationTitle}>{title}</Text>
      <Text style={styles.locationDetails}>{`${location.name}`}</Text>
      <Text style={styles.locationDetails}>{`${location.type}`}</Text>
      <Text style={styles.locationDetails}>{`${location.dimension}`}</Text>
      <Text style={styles.locationDetails}>
        {`${location.residents.length} residents`}
      </Text>
    </View>
  );
};

// Profile component which renders the profile screen
const Profile = (props: ProfileProps) => {
  // Get the character object from navigation params
  const {character} = props.route.params;

  // Initialize states to store location and episode data
  const [orginLocation, setOriginLocation] = useState<Location | null>();
  const [currentLocation, setCurrentLocation] = useState<Location | null>();
  const [episodes, setEpisodes] = useState<Episode[]>();

  // Get location and episode API methods from the context
  const {getLocation, getEpisodes} = useAPI();

  // Fetch location and episode data using API calls
  const fetchData = () => {
    try {
      getLocation(character.origin.url).then(origin =>
        setOriginLocation(origin),
      );
      getLocation(character.location.url).then(location =>
        setCurrentLocation(location),
      );
      getEpisodes(character.episode).then(eps => setEpisodes(eps));
    } catch (error) {
      console.log('Error while fetching profile data', error);
    }
  };

  // Call fetchData() function when component mounts
  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Render the profile screen UI
  return (
    <View style={styles.container}>
      <Image source={{uri: character.image}} style={styles.image} />
      <ScrollView>
        <View style={styles.characterInfoContainer}>
          <View style={styles.characterDetailsContainer}>
            <Text style={styles.characterName}>{character.name}</Text>
            <View style={styles.statusContainer}>
              {/* Display a colored circle to represent character status */}
              <View
                style={[
                  styles.status,
                  {
                    backgroundColor:
                      character.status === 'Alive'
                        ? 'lightgreen'
                        : character.status === 'Dead'
                        ? 'red'
                        : 'grey',
                  },
                ]}
              />
              <Text style={styles.characterDetails}>
                {`${character.status} - ${character.species} - ${character.gender}`}
              </Text>
            </View>
          </View>
          {/* Display character's origin and current location */}
          <View style={{flexDirection: 'row'}}>
            {orginLocation && (
              <LocationContainer
                location={orginLocation}
                image={ORIGIN_URL}
                title={'Origin'}
              />
            )}
            {currentLocation && (
              <LocationContainer
                location={currentLocation}
                image={CURRENT_URL}
                title={'Current'}
              />
            )}
          </View>
          {/* Displaying the episodes of the character */}
          {!episodes ? (
            <Loader />
          ) : (
            episodes.length > 0 && (
              <View style={styles.episodesContainer}>
                <Text style={styles.episodesTitle}>Episodes</Text>
                {episodes.map((ep, index) => (
                  <Text style={styles.episodeDetails} key={index}>
                    {ep.episode} - {ep.name}
                  </Text>
                ))}
              </View>
            )
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '40%',
  },
  characterInfoContainer: {
    padding: 20,
  },
  characterDetailsContainer: {
    alignItems: 'center',
  },
  characterName: {
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'grey',
  },
  characterDetails: {
    fontSize: 18,
    marginBottom: 5,
    color: 'grey',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  status: {
    height: 12,
    width: 12,
    borderRadius: 20,
  },
  locationContainer: {
    marginTop: 20,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: '#ccc',
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  locationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'grey',
  },
  locationIcon: {
    height: 20,
    width: 20,
  },
  locationDetails: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 5,
    color: 'grey',
  },
  episodesContainer: {
    marginTop: 20,
  },
  episodesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'grey',
  },
  episodeDetails: {
    fontSize: 16,
    marginBottom: 5,
    color: 'grey',
  },
});

export default Profile;
