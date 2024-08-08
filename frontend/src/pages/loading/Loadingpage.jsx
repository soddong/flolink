import React from 'react';
import loadingImage from '../../assets/logo/logo.png';
import waveImage from '../../assets/loading_background/image.png';
import LoadingPageStyle from '../../css/loading/Loadingpage.module.css';

function LoadingPage() {
  return (
    <div className={LoadingPageStyle.root}>
      <img src={loadingImage} alt="Loading" className={LoadingPageStyle.logo} />
      <p className={LoadingPageStyle.subtitle}>하나로, 연결 된 우리</p>
      <p className={LoadingPageStyle.title}>'동행'이 함께합니다</p>
      <img src={waveImage} alt="Wave" className={LoadingPageStyle.wave} />
    </div>
  );
}

export default LoadingPage;
