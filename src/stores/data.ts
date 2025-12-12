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
    comments: comments.map((comment) => ({
        ...comment,
        date: new Date(comment.date)
    })) as Comment[],
    gyms,
    messages: messages.map((message) => ({
        ...message,
        date: new Date(message.date)
    })),
    notifications: notifications.map((notification) => ({
        ...notification,
        date: new Date(notification.date)
    })) as Notification[],
    posts: posts.map((post) => ({ ...post, date: new Date(post.date) })) as Post[],
    routes: routes as Route[],
    users: users as User[]
});

export default dataStore;
