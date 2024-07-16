import { Post } from '../types/wannabes.types';

export const filterOwnAlbums = (albums?: Post[]) => {
  return albums?.map((album) => {
    if (album.thumbnail.photographer?.firstName !== 'Kevin') {
      const kevThumbnail = album.images.filter((i) => i.photographer?.firstName === 'Kevin')[0];
      return {
        ...album,
        thumbnail: {
          blurhash: kevThumbnail.blurhash,
          hires: kevThumbnail.resized,
        },
      };
    } else {
      return album;
    }
  });
};
