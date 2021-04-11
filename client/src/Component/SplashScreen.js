import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../lotties/28826-hello-gilbert.json';
function SplashScreen () {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div className="vh-100 vw-100 text-center">
      <Lottie options={defaultOptions} height={500} width={500} />
      {/* <h5 className="text-right" /> */}
    </div>
  );
}

export default SplashScreen;
