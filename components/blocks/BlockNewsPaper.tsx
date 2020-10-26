import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';

const BlockNewsPaper = ({ contentBlock }) => {
  return (
    <ScrollAnimation
      animateOnce
      animateIn="fadeInUp"
      duration={1}
      className={'duoImageBigPicture'}
      style={!contentBlock.fullPageImage ? { paddingTop: '66.66%' } : {}}
    >
      {contentBlock.fullPageImage && (
        <picture>
          <source srcSet={`${contentBlock.fullPageImage.url}?w=1330&h=1330&fm=webp&q=80`} />
          <source srcSet={`${contentBlock.fullPageImage.url}?w=1330&h=1330&fm=jpg&q=90`} />
          <img
            alt={contentBlock.title}
            src={`${contentBlock.fullPageImage.url}?w=1330&h=1330`}
            className={'duoImageBlockFirstPhoto'}
            style={contentBlock.aside ? { transform: 'translateX(-25.33%)' } : {}}
          />
        </picture>
      )}
      <div className={'bigWrap'} style={{ justifyContent: contentBlock.direction }}>
        <div className={'halfWrap'}>
          <ScrollAnimation
            animateOnce
            animateIn="fadeInUp"
            duration={1}
            className={'imageInsidePicture'}
            style={{ width: `${contentBlock.firstImageSize}%` }}
          >
            <picture>
              <source srcSet={`${contentBlock.firstImage.url}?w=1330&h=1330&fm=webp&q=80`} />
              <source srcSet={`${contentBlock.firstImage.url}?w=1330&h=1330&fm=jpg&q=90`} />
              <img
                alt={contentBlock.title}
                src={`${contentBlock.firstImage.url}?w=1330&h=1330`}
                className={'duoImageBlockSecondPhoto'}
              />
            </picture>
          </ScrollAnimation>
        </div>
        {contentBlock.secondImage && (
          <div className={'halfWrap'}>
            <ScrollAnimation
              animateOnce
              animateIn="fadeInUp"
              duration={1}
              className={'imageInsidePicture'}
              style={{ width: `${contentBlock.secondImageSize}%` }}
            >
              <picture>
                <source srcSet={`${contentBlock.secondImage.url}?w=1330&h=1330&fm=webp&q=80`} />
                <source srcSet={`${contentBlock.secondImage.url}?w=1330&h=1330&fm=jpg&q=90`} />
                <img
                  alt={contentBlock.title}
                  src={`${contentBlock.secondImage.url}?w=1330&h=1330`}
                  className={'duoImageBlockSecondPhoto'}
                />
              </picture>
            </ScrollAnimation>
          </div>
        )}
      </div>
    </ScrollAnimation>
  );
};

export default BlockNewsPaper;
