import type { User } from '@/types/model';
import { generateNumberId } from '@/utils/generateId';
import { reactive } from 'vue';
import dataStore from './data';

// TODO: remove default user ?
const userStore = reactive<{ user: User | null }>({
    user: {
        id: generateNumberId(),
        name: 'John Doe',
        pseudo: 'john-doe',
        avatar: 'connected.jpg'
    }
});

dataStore.users.push(userStore.user!);

export default userStore;
