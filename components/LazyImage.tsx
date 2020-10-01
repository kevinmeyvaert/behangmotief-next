import { useState, useEffect, useRef, FC } from 'react';

interface Props {
  className?: string;
  src: string;
  srcSet: string;
  sizes: string;
  alt: string;
  lowQualitySrc: string;
  aspectRatio?: number;
}

const LazyImage: FC<Props> = ({
  className,
  src,
  srcSet,
  sizes,
  alt,
  lowQualitySrc,
  aspectRatio = 1,
}) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);
  useEffect(() => {
    if (imgRef?.current?.complete) {
      setLoaded(true);
    }
  }, []);
  return (
    <div className={className ? `lazy-image--wrapper ${className}` : 'lazy-image--wrapper'}>
      <div style={{ paddingBottom: `${100 / aspectRatio}%` }} />
      <img src={lowQualitySrc} aria-hidden="true" className={!loaded ? "lazy-image--blurred" : "lazy-image--blurred lazy-image-blurred-loaded"} />
      <img
        loading="lazy"
        src={src}
        sizes={sizes}
        srcSet={srcSet}
        alt={alt}
        ref={imgRef}
        onLoad={() => setLoaded(true)}
        className={loaded ? 'lazy-image--source lazy-image--loaded' : 'lazy-image--source'}
      />
    </div>
  );
};
export default LazyImage;
