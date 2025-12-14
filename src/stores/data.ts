import comments from '@/data/comments.json';
import gyms from '@/data/gyms.json';
import messages from '@/data/messages.json';
import notifications from '@/data/notifications.json';
import posts from '@/data/posts.json';
import routes from '@/data/routes.json';
import users from '@/data/users.json';
import type { Comment, Gym, Message, Notification, Post, Route, User } from '@/types/model';
import { reactive } from 'vue';

interface IDataStore {
    comments: Comment[];
    gyms: Gym[];
    messages: Message[];
    notifications: Notification[];
    posts: Post[];
    routes: Route[];
    users: User[];
}

const dataStore = reactive<IDataStore>({
    comments: comments,
    gyms: gyms as Gym[],
    messages: messages,
    notifications: notifications,
    posts: posts as Post[],
    routes: routes as Route[],
    users: users as User[]
});

export default dataStore;
