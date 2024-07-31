import {create} from 'zustand';
import rug1 from '../assets/myroom/items/rug1.png';
import rug2 from '../assets/myroom/items/rug2.png';
import shelf1 from '../assets/myroom/items/shelf1.png';
import shelf2 from '../assets/myroom/items/shelf2.png';
import stand1 from '../assets/myroom/items/stand1.png';
import stand2 from '../assets/myroom/items/stand2.png';
import bed1 from '../assets/myroom/items/bed1.png';
import bed2 from '../assets/myroom/items/bed2.png';
import minitable1 from '../assets/myroom/items/minitable1.png';
import minitable2 from '../assets/myroom/items/minitable2.png';
import vase1 from '../assets/myroom/items/vase1.png';
import vase2 from '../assets/myroom/items/vase2.png';
import bigtable1 from '../assets/myroom/items/bigtable1.png';
import bigtable2 from '../assets/myroom/items/bigtable2.png';

const useItemStore = create((set) => ({
    items : [
        { name: 'rug', variants: [rug1, rug2] },
        { name: 'shelf', variants: [shelf1, shelf2] },
        { name: 'stand', variants: [stand1, stand2] },
        { name: 'bed', variants: [bed1, bed2] },
        { name: 'minitable', variants: [minitable1, minitable2] },
        { name: 'vase', variants: [vase1, vase2] },
        { name: 'bigtable', variants: [bigtable1, bigtable2] },
    ],
    images : {
        rug: [rug1, rug2],
        shelf: [shelf1, shelf2],
        stand: [stand1, stand2],
        bed: [bed1, bed2],
        minitable: [minitable1, minitable2],
        vase: [vase1, vase2],
        bigtable: [bigtable1, bigtable2],
    },
    userInventory : {
        rug: [1, 2],
        shelf: [1, 2],
        stand: [1, 2],
        bed: [1, 2],
        minitable: [1,2],
        vase: [1, 2],
        bigtable: [1, 2],
    },
    selectedItems : {
        rug: 1,
        shelf: 1,
        stand: 1,
        bed: 1,
        minitable: 1,
        vase: 1,
        bigtable: 1
    },
    setSelectedItems : (itemName, variantIndex) => set((state) => ({
        selectedItems: {
          ...state.selectedItems,
          [itemName]: variantIndex,
        },
    })),
    addToInventory: (itemName, variantIndex) => set((state) => ({
        userInventory: {
          ...state.userInventory,
          [itemName]: [...(state.userInventory[itemName] || []), variantIndex],
        },
    })),
}))

export default useItemStore;