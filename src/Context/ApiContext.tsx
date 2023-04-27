import React, {ReactNode, createContext, useContext, useState} from 'react';
import {Episode, Location} from '../Types/types';

// Define the type of the context value
type ContextType = {
  getLocation: (url: string) => Promise<Location | null>;
  getEpisodes: (urls: string[]) => Promise<Episode[]>;
};

// Create the context with an initial value of undefined
const APIContext = createContext<ContextType | undefined>(undefined);

// Create a provider component for the context
const APIProvider = ({children}: {children: ReactNode}) => {
  // Initialize state for the location and episode caches
  const [locationCache, setLocationCache] = useState<{[url: string]: Location}>(
    {},
  );
  const [episodeCache, setEpisodeCache] = useState<{[url: string]: Episode}>(
    {},
  );

  // Define a function to get a location from an API endpoint
  const getLocation = async (url: string): Promise<Location | null> => {
    // If the location is already cached, return it
    if (locationCache[url]) {
      return locationCache[url];
    } else {
      try {
        // Otherwise, fetch the location data from the API endpoint
        const response = await fetch(url);
        const data = await response.json();
        // Cache the location data and return it
        setLocationCache(prevLocationCache => {
          return {...prevLocationCache, [url]: data};
        });
        return data;
      } catch (error) {
        console.log('Error fetching location:', error);
        return null;
      }
    }
  };

  // Define a function to get an episode from an API endpoint
  const getEpisode = async (url: string): Promise<Episode | null> => {
    // If the episode is already cached, return it
    if (episodeCache[url]) {
      return episodeCache[url];
    } else {
      try {
        // Otherwise, fetch the episode data from the API endpoint
        const response = await fetch(url);
        const data = await response.json();
        // Cache the episode data and return it
        setEpisodeCache(prevEpCache => {
          return {...prevEpCache, [url]: data};
        });
        return data;
      } catch (error) {
        console.log('Error fetching episode:', error);
        return null;
      }
    }
  };

  // Define a function to get multiple episodes from API endpoints
  const getEpisodes = async (urls: string[]): Promise<Episode[]> => {
    const episodes: Episode[] = [];
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      // Call getEpisode for each URL and add the returned episode to the array if it exists
      const episode = await getEpisode(url);
      if (episode) episodes.push(episode);
    }
    return episodes;
  };

  // Render the APIContext.Provider with the getLocation and getEpisodes functions as the value
  return (
    <APIContext.Provider value={{getLocation, getEpisodes}}>
      {children}
    </APIContext.Provider>
  );
};

// Define a custom hook to access the APIContext
const useAPI = () => {
  const context = useContext(APIContext);
  // If the hook is used outside of an APIProvider, throw an error
  if (!context) {
    throw new Error('useAPI must be used within an APIProvider');
  }
  return context;
};

export {APIProvider, useAPI};
