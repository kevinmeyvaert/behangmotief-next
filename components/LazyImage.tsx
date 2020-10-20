import { useState, FC, useEffect, useRef } from 'react';
import { Dimensions, Image } from '../types/wannabes.types';
import { Blurhash } from 'react-blurhash';

const useImageLoaded = () => {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef();

  const onLoad = () => {
    setLoaded(true);
  };

  useEffect(() => {
    if (ref.current && ref.current.complete) {
      onLoad();
    }
  });

  return [ref, loaded, onLoad];
};

interface Props {
  className?: string;
  src: string;
  srcSet: string;
  sizes?: string;
  alt: string;
  dimensions: Dimensions;
  blurhash: Image['blurhash'];
}

const LazyImage: FC<Props> = ({ src, alt, dimensions, className, srcSet, sizes, blurhash }) => {
  const [ref, loaded, onLoad] = useImageLoaded();
  const [isError, setIsError] = useState(false);

  const setSizes =
    sizes || '(min-width: 90em) 25vw, (min-width: 73.75em) 33vw, (min-width: 35.5em) 50vw, 100vw';

  const validatedBlurhash = (incomingBlurhash) => {
    const isValid = incomingBlurhash?.length >= 6;
    return isValid ? incomingBlurhash : 'LEHV6nWB2yk8pyo0adR*.7kCMdnj';
  };
  const aspectRatio = (width, height) => {
    return (height / width) * 100;
  };

  const fallbackWidth = dimensions?.width || '800';
  const fallbackHeight = dimensions?.height || '800';

  return (
    <>
      <Blurhash
        hash={validatedBlurhash(blurhash)}
        width={`${fallbackWidth}px`}
        resolutionX={50}
        resolutionY={50}
        punch={1}
        aria-hidden="true"
        style={{
          maxWidth: '100%',
          paddingTop: `${aspectRatio(fallbackWidth, fallbackHeight)}%`,
          display: loaded ? 'none' : 'block',
        }}
      />
      <img
        srcSet={!isError ? srcSet : '/placeholder.jpg'}
        sizes={setSizes}
        src={!isError ? src : '/placeholder.jpg'}
        alt={alt}
        onError={(e) => {
          setIsError(true);
        }}
        className={className}
        ref={ref}
        onLoad={onLoad}
        width={fallbackWidth}
        height={fallbackHeight}
        style={{ position: loaded ? 'relative' : 'absolute', maxWidth: '100%' }}
      />
    </>
  );
};

export default LazyImage;
