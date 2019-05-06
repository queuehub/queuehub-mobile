import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spotify from 'rn-spotify-sdk';
import uuidv4 from 'uuid/v4';

import Grid from '../components/Grid';
import extractAlbum from '../data/extractors/album';
import withLinks from '../hocs/withLinks';
import Album from '../components/Album';

const AlbumLink = withLinks(Album, 'Album');

const Albums = props => {
  const { navigation } = props;

  const [list, setList] = useState([]);
  useEffect(() => {
    Spotify.sendRequest('v1/me/albums', 'GET', {}, false).then(res => {
      const { items } = res;
      const albums = items.map(({ album }) => extractAlbum(album));
      setList(albums);
    });
  }, []);

  return (
    <Grid>
      {list.map(album => (
        <AlbumLink dim={150} key={uuidv4()} navigation={navigation} {...album} />
      ))}
    </Grid>
  );
};

Albums.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Albums;