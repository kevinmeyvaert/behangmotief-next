import React, { FC } from 'react';
import Image from 'next/image';
import ScrollAnimation from 'react-animate-on-scroll';

interface Props {
  contentBlock: any;
}

const BlockNewsPaper: FC<Props> = ({ contentBlock }) => {
  return (
    <ScrollAnimation animateOnce animateIn="fadeInUp" duration={1}>
      <section className="outer">
        <div
          className={'inner'}
          style={!contentBlock.fullPageImage ? { paddingTop: '66.66%' } : {}}
        >
          {contentBlock.fullPageImage ? (
            <figure style={contentBlock.aside ? { transform: 'translateX(-25.33%)' } : {}}>
              <Image
                // TODO: Add sizes
                src={contentBlock.fullPageImage.url}
                alt={contentBlock.title}
                unsized
                style={contentBlock.aside ? { transform: 'translateX(-25.33%)' } : {}}
              />
            </figure>
          ) : null}
          <div className="big-wrap" style={{ justifyContent: contentBlock.direction }}>
            <div className="half-wrap">
              <figure style={{ width: `${contentBlock.firstImageSize}%` }}>
                <ScrollAnimation animateOnce animateIn="fadeInUp" duration={1}>
                  <Image
                    // TODO: Add sizes
                    src={contentBlock.firstImage.url}
                    alt={contentBlock.title}
                    unsized
                    className={'duoImageBlockSecondPhoto'}
                  />
                </ScrollAnimation>
              </figure>
            </div>
            {contentBlock.secondImage ? (
              <div className="half-wrap">
                <figure style={{ width: `${contentBlock.secondImageSize}%` }}>
                  <ScrollAnimation animateOnce animateIn="fadeInUp" duration={1}>
                    <Image
                      // TODO: Add sizes
                      src={contentBlock.secondImage.url}
                      alt={contentBlock.title}
                      unsized
                    />
                  </ScrollAnimation>
                </figure>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </ScrollAnimation>
  );
};

export default BlockNewsPaper;
