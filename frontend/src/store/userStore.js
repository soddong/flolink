import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getMyInfo } from '../service/user/userApi';

import dog from '../assets/profile/dog.png';
import dogmad from '../assets/profile/dog_mad.png';
import dogsad from '../assets/profile/dog_sad.png';
import cow from '../assets/profile/cow.png';
import cowmad from '../assets/profile/cow_mad.png';
import cowsad from '../assets/profile/cow_sad.png';
import mouse from '../assets/profile/mouse.png';
import mousemad from '../assets/profile/mouse_mad.png';
import mousesad from '../assets/profile/mouse_sad.png';
import rabbit from '../assets/profile/rabbit.png';
import rabbitmad from '../assets/profile/rabbit_mad.png';
import rabbitsad from '../assets/profile/rabbit_sad.png';
import snake from '../assets/profile/snake.png';
import snakemad from '../assets/profile/snake_mad.png';
import snakesad from '../assets/profile/snake_sad.png';
import tiger from '../assets/profile/tiger.png';
import tigermad from '../assets/profile/tiger_mad.png';
import tigersad from '../assets/profile/tiger_sad.png';

const userStore = create((set)=> ({
    animals : {
        cow : { happy : cow, sad : cowsad, mad : cowmad },
        dog : { happy : dog, sad : dogsad, mad : dogmad },
        mouse : { happy : mouse, sad : mousesad, mad : mousemad },
        rabbit : { happy : rabbit, sad : rabbitsad, mad : rabbitmad },
        snake : { happy : snake, sad : snakesad, mad : snakemad },
        tiger : { happy : tiger, sad : tigersad, mad : tigermad },
    },
    
}))

export default userStore;