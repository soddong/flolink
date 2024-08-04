import React, { useState } from 'react';
import styles from '../../css/setting/settingmodal.module.css';
import mouse from '../../assets/profile/mouse.png';
import mousesad from '../../assets/profile/mouse_sad.png';
import mousemad from '../../assets/profile/mouse_mad.png';
import tiger from '../../assets/profile/tiger.png';
import tigersad from '../../assets/profile/tiger_sad.png';
import tigermad from '../../assets/profile/tiger_mad.png';
import snake from '../../assets/profile/snake.png';
import snakesad from '../../assets/profile/snake_sad.png';
import snakemad from '../../assets/profile/snake_mad.png';
import dog from '../../assets/profile/dog.png';
import dogsad from '../../assets/profile/dog_sad.png';
import dogmad from '../../assets/profile/dog_mad.png';
import rabbit from '../../assets/profile/rabbit.png';
import rabbitsad from '../../assets/profile/rabbit_sad.png';
import rabbitmad from '../../assets/profile/rabbit_mad.png';
import cow from '../../assets/profile/cow.png';
import cowsad from '../../assets/profile/cow_sad.png';
import cowmad from '../../assets/profile/cow_mad.png';

function SettingModal({ setShowModal, setAnimal }) {
    const animals = {
        cow: { happy: cow, sad: cowsad, mad: cowmad },
        rabbit: { happy: rabbit, sad: rabbitsad, mad: rabbitmad },
        dog: { happy: dog, sad: dogsad, mad: dogmad },
        snake: { happy: snake, sad: snakesad, mad: snakemad },
        tiger: { happy: tiger, sad: tigersad, mad: tigermad },
        mouse: { happy: mouse, sad: mousesad, mad: mousemad }
    };

    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const [selectedEmotion, setSelectedEmotion] = useState(null);

    const handleAnimalClick = (animal) => {
        setSelectedAnimal(animal);
        setSelectedEmotion(null); 
    };

    const handleEmotionClick = (emotion) => {
        setSelectedEmotion(emotion);
    };

    const handleSave = () => {
        if (selectedAnimal && selectedEmotion) {
            setAnimal(animals[selectedAnimal][selectedEmotion]);
            setShowModal(false);
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.selectAnimalTitle}>
                    <span>동물을 선택하세요.</span>
                </div>
                <div className={styles.animalSelection}>
                    {Object.keys(animals).map((animal) => (
                        <img 
                            key={animal}
                            src={animals[animal].happy}
                            className={`${styles.animalImage} ${selectedAnimal === animal ? styles.selected : ''}`}
                            onClick={() => handleAnimalClick(animal)}
                        />
                    ))}
                </div>
                {selectedAnimal && (
                    <div className={styles.emotionSelectModal}>
                        <div className={styles.selectEmotionTitle}>
                            <span>현재 당신의 기분을 선택해주세요.</span>
                        </div>
                        <div className={styles.emotionSelection}>
                            {Object.keys(animals[selectedAnimal]).map((emotion) => (
                                <img 
                                    key={emotion}
                                    src={animals[selectedAnimal][emotion]}
                                    className={`${styles.emotionImage} ${selectedEmotion === emotion ? styles.selected : ''}`}
                                    onClick={() => handleEmotionClick(emotion)}
                                />
                            ))}
                        </div>
                        <button 
                            className={styles.saveButton} 
                            onClick={handleSave} 
                            disabled={!selectedAnimal || !selectedEmotion}
                        >
                            저장
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SettingModal;
