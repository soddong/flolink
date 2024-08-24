import React from 'react';
import Modal from 'react-modal';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ImageModal = ({ isOpen, onClose, images }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    zIndex: 1000,
                },
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    maxHeight: '90%',
                    overflow: 'hidden',
                    border: 'none',
                    padding: 0,
                    background: 'transparent',
                },
            }}
            ariaHideApp={false}
        >
            <Carousel
                showArrows={true}
                showThumbs={false}
                showStatus={false}
                infiniteLoop={true}
                swipeable={true}
                emulateTouch={true}
                useKeyboardArrows={true}
                dynamicHeight={true}
            >
                {images.map((image, index) => (
                    <div key={index}>
                        <img src={`https://flolink-s3.s3.ap-northeast-2.amazonaws.com/${image.imageUrl}`} alt={`feed-${index}`} style={{ width: '100%', height: 'auto' }} />
                    </div>
                ))}
            </Carousel>
        </Modal>
    );
};

export default ImageModal;
