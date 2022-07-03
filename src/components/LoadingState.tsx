import React from 'react';

const LoadingState: React.FC = () => (
  <div className={`
    fixed z-50 bg-white left-0 right-0 top-0 bottom-0
    text-3xl flex justify-center pt-24 text-blue-500
  `}>
    loading...
  </div>
);

export default LoadingState;
