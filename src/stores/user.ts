import type { User } from '@/types/model';
import { reactive } from 'vue';
import dataStore from './data';

const userStore = reactive<{ user: User }>({
    user: {
        id: -1,
        name: 'John Doe',
        pseudo: 'john-doe',
        age: 20,
        description:
            'Grimpeur du dimanche devenu accro. Voie sportive principalement, niveau 6c/7a.',
        avatar: `${import.meta.env.BASE_URL}connected.jpg`,
        level: '7a',
        styles: ['route', 'boulder'],
        gymsIds: [1, 2, 3],
        availabilities: ['week-ends', 'week-evenings']
    }
});

dataStore.users.push(userStore.user);

export default userStore;
