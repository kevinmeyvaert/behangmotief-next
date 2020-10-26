import React from 'react';

const BlockNewsPaper = ({ contentBlock }) => {
  return (
    <div
      className={'duoImageBigPicture'}
      style={!contentBlock.fullPageImage ? { paddingTop: '66.66%' } : {}}
    >
      {contentBlock.fullPageImage && (
        <picture>
          <source
            media="(min-width: 1440px)"
            srcSet={`${contentBlock.fullPageImage.url}?w=2000&h=2000&fm=webp&q=80`}
          />
          <source
            media="(min-width: 800px)"
            srcSet={`${contentBlock.fullPageImage.url}?w=1330&h=1330&fm=webp&q=80`}
          />
          <source
            media="(max-width: 800px)"
            srcSet={`${contentBlock.fullPageImage.url}?w=800&h=800&fm=webp&q=80`}
          />

          <source
            media="(min-width: 1440px)"
            srcSet={`${contentBlock.fullPageImage.url}?w=2000&h=2000&fm=jpg&q=90`}
          />
          <source
            media="(min-width: 800px)"
            srcSet={`${contentBlock.fullPageImage.url}?w=1330&h=1330&fm=jpg&q=90`}
          />
          <source
            media="(max-width: 800px)"
            srcSet={`${contentBlock.fullPageImage.url}?w=800&h=800&fm=jpg&q=90`}
          />
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
          <div
            className={'imageInsidePicture'}
            style={{ width: `${contentBlock.firstImageSize}%` }}
          >
            <picture>
              <source
                media="(min-width: 1440px)"
                srcSet={`${contentBlock.firstImage.url}?w=2000&h=2000&fm=webp&q=80`}
              />
              <source
                media="(min-width: 800px)"
                srcSet={`${contentBlock.firstImage.url}?w=1330&h=1330&fm=webp&q=80`}
              />
              <source
                media="(max-width: 800px)"
                srcSet={`${contentBlock.firstImage.url}?w=800&h=800&fm=webp&q=80`}
              />

              <source
                media="(min-width: 1440px)"
                srcSet={`${contentBlock.firstImage.url}?w=2000&h=2000&fm=jpg&q=90`}
              />
              <source
                media="(min-width: 800px)"
                srcSet={`${contentBlock.firstImage.url}?w=1330&h=1330&fm=jpg&q=90`}
              />
              <source
                media="(max-width: 800px)"
                srcSet={`${contentBlock.firstImage.url}?w=800&h=800&fm=jpg&q=90`}
              />
              <img
                alt={contentBlock.title}
                src={`${contentBlock.firstImage.url}?w=1330&h=1330`}
                className={'duoImageBlockSecondPhoto'}
              />
            </picture>
          </div>
        </div>
        {contentBlock.secondImage && (
          <div className={'halfWrap'}>
            <div
              className={'imageInsidePicture'}
              style={{ width: `${contentBlock.secondImageSize}%` }}
            >
              <picture>
                <source
                  media="(min-width: 1440px)"
                  srcSet={`${contentBlock.secondImage.url}?w=2000&h=2000&fm=webp&q=80`}
                />
                <source
                  media="(min-width: 800px)"
                  srcSet={`${contentBlock.secondImage.url}?w=1330&h=1330&fm=webp&q=80`}
                />
                <source
                  media="(max-width: 800px)"
                  srcSet={`${contentBlock.secondImage.url}?w=800&h=800&fm=webp&q=80`}
                />

                <source
                  media="(min-width: 1440px)"
                  srcSet={`${contentBlock.secondImage.url}?w=2000&h=2000&fm=jpg&q=90`}
                />
                <source
                  media="(min-width: 800px)"
                  srcSet={`${contentBlock.secondImage.url}?w=1330&h=1330&fm=jpg&q=90`}
                />
                <source
                  media="(max-width: 800px)"
                  srcSet={`${contentBlock.secondImage.url}?w=800&h=800&fm=jpg&q=90`}
                />
                <img
                  alt={contentBlock.title}
                  src={`${contentBlock.secondImage.url}?w=1330&h=1330`}
                  className={'duoImageBlockSecondPhoto'}
                />
              </picture>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockNewsPaper;
