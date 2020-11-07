import Image from 'next/image';
import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';

const BlockDuoPhoto = ({ contentBlock }) => {
  switch (contentBlock.style) {
    case 'secondLower':
      return (
        <div className="duo-image-block">
          <ScrollAnimation
            animateOnce
            animateIn="fadeInLeft"
            duration={1.5}
            className="duo-image-block--column"
          >
            <Image
              sizes="(max-width: 48em) 50vw, (min-width: 90em) calc(50vw - 6rem), calc(50vw - 6rem)"
              src={contentBlock.firstPhoto.url}
              alt={contentBlock.firstPhotoDescription}
              width={contentBlock.firstPhoto.width}
              height={contentBlock.firstPhoto.height}
            />
            <p>{contentBlock.firstPhotoDescription}</p>
          </ScrollAnimation>
          <ScrollAnimation
            animateOnce
            animateIn="fadeInRight"
            duration={1.5}
            className="duo-image-block--column"
          >
            <Image
              sizes="(max-width: 48em) 50vw, (min-width: 90em) calc(50vw - 6rem), calc(50vw - 6rem)"
              src={contentBlock.secondPhoto.url}
              alt={contentBlock.secondPhotoDescription}
              width={contentBlock.secondPhoto.width}
              height={contentBlock.secondPhoto.height}
            />
            <p>{contentBlock.secondPhotoDescription}</p>
          </ScrollAnimation>
        </div>
      );
    case 'pictureInPicture':
      return (
        <ScrollAnimation
          animateOnce
          animateIn="fadeInUp"
          duration={1}
          className="duo-image-big-picture"
        >
          <Image
            sizes="(max-width: 48em) calc(100vw - 3rem), (min-width: 90em) calc(100vw - 6rem), calc(90em - 6rem)"
            src={contentBlock.firstPhoto.url}
            alt={contentBlock.firstPhotoDescription}
            width={contentBlock.firstPhoto.width}
            height={contentBlock.firstPhoto.height}
          />
          <p>{contentBlock.firstPhotoDescription}</p>
          <ScrollAnimation
            animateOnce
            animateIn="fadeInUp"
            duration={1}
            className="duo-image-inside-picture"
          >
            <Image
              sizes="(max-width: 48em) 50vw, (min-width: 90em) calc(50vw - 6rem), calc(50vw - 6rem)"
              src={contentBlock.secondPhoto.url}
              alt={contentBlock.secondPhotoDescription}
              width={contentBlock.secondPhoto.width}
              height={contentBlock.secondPhoto.height}
            />
            <p>{contentBlock.secondPhotoDescription}</p>
          </ScrollAnimation>
        </ScrollAnimation>
      );
    default:
      return null;
  }
};

export default BlockDuoPhoto;
