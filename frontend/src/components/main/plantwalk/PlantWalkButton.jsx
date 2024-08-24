import React from 'react';
import PropTypes from 'prop-types';

const PlantWalkButton = ({ buttonStatus, onStartWalk, onViewCurrentLocation, onEndWalk, walkerNickname }) => {
  return (
    <>
      {buttonStatus === 1 && (
        <button
          className="absolute right-0 rounded-lg bg-rose-400 text-white text-sm font-bold w-24 h-8 z-10"
          style={{ top: '-40px' }}
          onClick={onStartWalk}
        >
          산책 시작
        </button>
      )}
      {buttonStatus === 2 && (
        <>
          <button
            className="absolute right-0 rounded-lg bg-rose-400 text-white text-sm font-bold w-24 h-8 z-10"
            style={{ top: '-40px' }}
            onClick={onViewCurrentLocation}
          >
            현재 위치 보기
          </button>
        </>
      )}
      {buttonStatus === 3 && (
        <button
          className="absolute right-0 rounded-lg bg-rose-400 text-white text-sm font-bold w-24 h-8 z-10"
          style={{ top: '-40px' }}
          onClick={onViewCurrentLocation}
        >
          {walkerNickname}님이 산책중
        </button>
      )}
    </>
  );
};

PlantWalkButton.propTypes = {
  buttonStatus: PropTypes.number.isRequired,
  onStartWalk: PropTypes.func.isRequired,
  onViewCurrentLocation: PropTypes.func.isRequired,
  onEndWalk: PropTypes.func.isRequired,
};

export default PlantWalkButton;
