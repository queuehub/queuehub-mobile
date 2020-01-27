import { useState, useEffect } from 'react';
import Spotify from 'rn-spotify-sdk';
import { useInterval } from 'Hooks';
import { useSelector } from 'jamstate';

import { useRoomChannel } from 'Components/RoomChannelProvider';

/**
 * useSpotifyPlayer : State hook for playing songs and listening for when a song is over
 * @author [Zach Banducci](https://github.com/zchbndcc9)
 */

export default function useSpotifyPlayer() {
  const { nextSong } = useRoomChannel();
  const currentSongUri = useSelector(s => s.songs.current.uri);
  const isPlaying = useSelector(s => s.songs.isPlaying);
  const [elapsed, setElapsed] = useState(0);
  const [startTimer, stopTimer] = useInterval(() => {
    async function getElapsedTime() {
      const { position } = await Spotify.getPlaybackStateAsync();
      setElapsed(position * 1000);
    }

    getElapsedTime();
  }, 500);

  useEffect(() => {
    if (currentSongUri) {
      Spotify.playURI(currentSongUri, 0, 0);
    }

    return () => {
      Spotify.setPlaying(false);
    };
  }, [currentSongUri]);

  useEffect(() => {
    Spotify.setPlaying(isPlaying);
  }, [isPlaying]);

  // Event listener to see if the track has finished and if it has it changes to the next song
  useEffect(() => {
    Spotify.on('audioDeliveryDone', nextSong);
    Spotify.on('pause', stopTimer);
    Spotify.on('play', startTimer);
    return () => {
      Spotify.removeListener('audioDeliveryDone', nextSong);
      Spotify.removeListener('pause', stopTimer);
      Spotify.removeListener('play', startTimer);
    };
  }, [nextSong, startTimer, stopTimer]);

  return { elapsed };
}
