import React, { FC } from 'react';
import Image from 'next/image';
import ScrollAnimation from 'react-animate-on-scroll';

interface Props {
  contentBlock: any;
  single?: boolean;
}

const BlockNewsPaper: FC<Props> = ({ contentBlock, single = false }) => {
  return (
    <ScrollAnimation animateOnce animateIn="fadeInUp" duration={single ? 0 : 1}>
      <section className="outer" style={{ marginBottom: single ? '0' : '2rem' }}>
        <div
          className={'inner'}
          style={!contentBlock.fullPageImage ? { paddingTop: '66.66%' } : {}}
        >
          {contentBlock.fullPageImage ? (
            <figure style={contentBlock.aside ? { transform: 'translateX(-25.33%)' } : {}}>
              <Image
                sizes="(max-width: 48em) calc(100vw - 3rem), (min-width: 90em) calc(100vw - 6rem), calc(90em - 6rem)"
                src={contentBlock.fullPageImage.url}
                alt={contentBlock.title}
                unsized
                style={contentBlock.aside ? { transform: 'translateX(-25.33%)' } : {}}
                loading={single ? 'eager' : 'lazy'}
              />
            </figure>
          ) : null}
          <div className="big-wrap" style={{ justifyContent: contentBlock.direction }}>
            <div className="half-wrap">
              <figure style={{ width: `${contentBlock.firstImageSize}%` }}>
                <ScrollAnimation animateOnce animateIn="fadeInUp" duration={single ? 0 : 1}>
                  <Image
                    sizes="(max-width: 48em) 50vw, (min-width: 90em) calc(50vw - 6rem), calc(50vw - 6rem)"
                    src={contentBlock.firstImage.url}
                    alt={contentBlock.title}
                    unsized
                    loading={single ? 'eager' : 'lazy'}
                  />
                </ScrollAnimation>
              </figure>
            </div>
            {contentBlock.secondImage ? (
              <div className="half-wrap">
                <figure style={{ width: `${contentBlock.secondImageSize}%` }}>
                  <ScrollAnimation animateOnce animateIn="fadeInUp" duration={single ? 0 : 1}>
                    <Image
                      sizes="(max-width: 48em) 50vw, 
                      (min-width: 90em) calc(50vw - 6rem), calc(50vw - 6rem)"
                      src={contentBlock.secondImage.url}
                      alt={contentBlock.title}
                      unsized
                      loading={single ? 'eager' : 'lazy'}
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
