import React, {FC} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Character} from '../../Types/types';
import {CURRENT_URL, ORIGIN_URL} from '../../Constants/Constants';

// Define interface for LocationContainerProps
interface LocationConatinerProps {
  image: string;
  name: string;
}

// Component to display a location with an icon and a name
const LocationConatiner: FC<LocationConatinerProps> = ({image, name}) => {
  return (
    <View style={styles.locationContainer}>
      <Image style={styles.locationIcon} source={{uri: image}} />
      <Text style={styles.locationName}>{`${name}`}</Text>
    </View>
  );
};

// a class-based component for the character card , used PureComponent for better performance
class CharacterCard extends React.PureComponent<{
  item: Character;
  handlePress: () => void;
}> {
  render() {
    const {item, handlePress} = this.props;
    return (
      <TouchableOpacity style={styles.card} onPress={handlePress}>
        <Image
          style={[
            styles.image,
            {
              // based on character status adding color
              borderColor:
                item.status === 'Alive'
                  ? 'lightgreen'
                  : item.status === 'Dead'
                  ? 'red'
                  : 'grey',
            },
          ]}
          source={{uri: item.image}}
        />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.subHeading}>
            {`${item.status} - ${item.species} - ${item.gender}`}
          </Text>
          <LocationConatiner name={item.origin.name} image={ORIGIN_URL} />
          <LocationConatiner name={item.location.name} image={CURRENT_URL} />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    shadowColor: '#000',
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
    color: 'grey',
  },
  subHeading: {
    fontWeight: 'bold',
    color: 'grey',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  locationIcon: {
    height: 15,
    width: 15,
  },
  locationName: {
    color: 'grey',
  },
});

export default CharacterCard;
