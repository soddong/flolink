import {create} from 'zustand';

const myroomStore = create((set) => ({

    items: [],
    userInventory: {},

}))