import React from 'react';
import Image from 'next/image';

const BlockNewsPaper = ({ contentBlock }) => {
  return (
    <div className="outer">
      <div className={'inner'} style={!contentBlock.fullPageImage ? { paddingTop: '66.66%' } : {}}>
        {contentBlock.fullPageImage && (
          <Image src={contentBlock.fullPageImage.url} alt={contentBlock.title} unsized />
        )}
        <div className={'bigWrap'} style={{ justifyContent: contentBlock.direction }}>
          <div className={'halfWrap'}>
            <div
              className={'imageInsidePicture'}
              style={{ width: `${contentBlock.firstImageSize}%` }}
            >
              <Image src={contentBlock.firstImage.url} alt={contentBlock.title} unsized />
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
