import DEFAULT_MESSAGES from '@/constants/defaultMessages';
import { reactive } from 'vue';

const messageStore = reactive({ messages: DEFAULT_MESSAGES });

export default messageStore;

export function resetMessageStore() {
    messageStore.messages = DEFAULT_MESSAGES;
}
