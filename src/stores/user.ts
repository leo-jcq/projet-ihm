import type { User } from '@/types/model';
import { reactive } from 'vue';
import dataStore from './data';

const userStore = reactive<{ user: User | null }>({
    user: {
        id: -1,
        name: 'John Doe',
        pseudo: 'john-doe',
        age: 20,
        description: '',
        avatar: 'connected.jpg',
        styles: [],
        gymsIds: [],
        availabilities: []
    }
});

dataStore.users.push(userStore.user!);

export default userStore;
