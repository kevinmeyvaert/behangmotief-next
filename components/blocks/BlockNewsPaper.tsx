import React, { useEffect } from 'react';
import Image from 'next/image';

const BlockNewsPaper = ({ contentBlock }) => {
  return (
    <div className="outer">
      <div className={'inner'} style={!contentBlock.fullPageImage ? { paddingTop: '66.66%' } : {}}>
        {contentBlock.fullPageImage && (
          <div style={contentBlock.aside ? { transform: 'translateX(-25.33%)' } : {}}>
            <Image
              src={contentBlock.fullPageImage.url}
              alt={contentBlock.title}
              unsized
              className={'duoImageBlockFirstPhoto'}
              style={contentBlock.aside ? { transform: 'translateX(-25.33%)' } : {}}
            />
          </div>
        )}
        <div className={'bigWrap'} style={{ justifyContent: contentBlock.direction }}>
          <div className={'halfWrap'}>
            <div
              className={'imageInsidePicture'}
              style={{ width: `${contentBlock.firstImageSize}%` }}
            >
              <Image
                src={contentBlock.firstImage.url}
                alt={contentBlock.title}
                unsized
                className={'duoImageBlockSecondPhoto'}
              />
            </div>
          </div>
          {contentBlock.secondImage && (
            <div className={'halfWrap'}>
              <div
                className={'imageInsidePicture'}
                style={{ width: `${contentBlock.secondImageSize}%` }}
              >
                <Image src={contentBlock.secondImage.url} alt={contentBlock.title} unsized />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlockNewsPaper;
