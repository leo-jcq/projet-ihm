import comments from '@/data/comments.json';
import gyms from '@/data/gyms.json';
import notifications from '@/data/notifications.json';
import posts from '@/data/posts.json';
import routes from '@/data/routes.json';
import users from '@/data/users.json';
import type { Comment, Gym, Notification, Post, Route, User } from '@/types/model';
import { reactive } from 'vue';

interface IDataStore {
    comments: Comment[];
    gyms: Gym[];
    notifications: Notification[];
    posts: Post[];
    routes: Route[];
    users: User[];
}

const dataStore = reactive<IDataStore>({
    comments: comments.map((comment) => ({
        ...comment,
        timestamp: new Date(comment.timestamp)
    })) as Comment[],
    gyms,
    notifications: notifications.map((notification) => ({
        ...notification,
        timestamp: new Date(notification.timestamp)
    })) as Notification[],
    posts: posts.map((post) => ({ ...post, timestamp: new Date(post.timestamp) })) as Post[],
    routes: routes as Route[],
    users
});

export default dataStore;
