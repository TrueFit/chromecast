import React from 'react';

export const Image = ({slide}) => {
  return (
    <div key={slide._id} style={{backgroundImage: `url(${slide.file})`}} className="full-screen-image">
    </div>
  );
};
