import type { User } from '@/types/model';
import { reactive } from 'vue';
import dataStore from './data';

// TODO: remove default user ?
const userStore = reactive<{ user: User | null }>({
    user: {
        id: -1,
        name: 'John Doe',
        pseudo: 'john-doe',
        description: '',
        avatar: 'connected.jpg',
        styles: [],
        gymsIds: [],
        availabilities: []
    }
});

dataStore.users.push(userStore.user!);

export default userStore;
