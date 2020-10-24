import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';

const BlockNewsPaper = ({ contentBlock }) => {
  return (
    <ScrollAnimation
      animateOnce
      animateIn="fadeInUp"
      duration={1}
      className={"duoImageBigPicture"}
      style={!contentBlock.fullPageImage ? { paddingTop: '66.66%' } : {}}
    >
      {contentBlock.fullPageImage && (
        <img
          alt={contentBlock.title}
          src={contentBlock.fullPageImage.url}
          className={"duoImageBlockFirstPhoto"}
          style={contentBlock.aside ? { transform: 'translateX(-25.33%)' } : {}}
        />
      )}
      <div
        className={"bigWrap"}
        style={{ justifyContent: contentBlock.direction }}
      >
        <div className={"halfWrap"}>
          <ScrollAnimation
            animateOnce
            animateIn="fadeInUp"
            duration={1}
            className={"imageInsidePicture"}
            style={{ width: `${contentBlock.firstImageSize}%` }}
          >
            <img
              alt={contentBlock.title}
              src={contentBlock.firstImage.url}
              className={"duoImageBlockSecondPhoto"}
            />
          </ScrollAnimation>
        </div>
        {contentBlock.secondImage && (
          <div className={"halfWrap"}>
            <ScrollAnimation
              animateOnce
              animateIn="fadeInUp"
              duration={1}
              className={"imageInsidePicture"}
              style={{ width: `${contentBlock.secondImageSize}%` }}
            >
              <img
                alt={contentBlock.title}
                src={contentBlock.secondImage.url}
                className={"duoImageBlockSecondPhoto"}
              />
            </ScrollAnimation>
          </div>
        )}
      </div>
    </ScrollAnimation>
  );
};

export default BlockNewsPaper;
