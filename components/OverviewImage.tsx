import { useState, useEffect } from 'react';
import type { FC } from 'react';
import ContentLoader from 'react-content-loader';
import type { Dimensions } from '../types/wannabes.types';

interface Props {
  src: string;
  alt: string;
  dimensions: Dimensions;
  className?: string;
  srcSet: string;
}

const OverviewImage: FC<Props> = ({ src, alt, dimensions, className, srcSet }) => {
  const [isLoading, setIsLoading] = useState(true);
  const handleFallbackImage = (e) => (e.target.src = '/placeholder.jpg');

  let imageEl = null;
  const imageRefCb = (image) => {
    if (image) {
      imageEl = image;
      if (image.complete) {
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    imageRefCb(imageEl);
  });

  const getHeight = (d: Dimensions) => {
    if (!d) {
      return 425;
    }
    if (d.width > d.height) {
      return 283;
    }
    if (d.width < d.height) {
      return 627;
    }
    return 425;
  };

  return (
    <>
      <img
        srcSet={srcSet}
        sizes="(min-width: 90em) 25vw, (min-width: 73.75em) 33vw, (min-width: 35.5em) 50vw, 100vw"
        src={src}
        alt={alt}
        ref={imageRefCb}
        onError={handleFallbackImage}
        onLoad={() => setIsLoading(false)}
        className={className}
      />
      {isLoading && (
        <ContentLoader
          speed={2}
          viewBox={`0 0 425 ${getHeight(dimensions)}`}
          height={getHeight(dimensions)}
          backgroundColor="#F2F0F4"
          foregroundColor="#C9C5CE"
          style={{ width: '100%', height: 'auto' }}
          className={className}
        >
          <rect x="0" y="0" rx="0" ry="0" width="425" height={getHeight(dimensions)} />
        </ContentLoader>
      )}
    </>
  );
};

export default OverviewImage;
