<script setup lang="ts">
import Chat from '@/components/Messages/Chat.vue';
import ConvPreview from '@/components/Messages/ConvPreview.vue';
import Tabs from '@/components/Tabs.vue';
import usePageTitle from '@/composables/usePageTitle';
import dataStore from '@/stores/data';
import type { Message, User } from '@/types/model';
import { computed, ref } from 'vue';

usePageTitle('Messages');

// Tabs
const tabs = ['Tout', 'Non lus'];
const activeTab = ref('Tout');

function handleTabChange(newTab: string) {
    activeTab.value = newTab;
}

// Chat
const currentUser = ref<User | null>(null);

// Convs
function openMessage(message: Message) {
    message.read = true;
    currentUser.value = dataStore.users.find((u) => u.id === message.userId) ?? null;
}

const filteredMessages = computed(() => {
    if (activeTab.value === tabs[0]) {
        return dataStore.messages;
    }

    return dataStore.messages.filter((m) => !m.read);
});
</script>

<template>
    <div class="messages">
        <div class="messages__convs">
            <Tabs :tabs="tabs" :current-tab="activeTab" @change="handleTabChange" />

            <div class="messages__convs__list">
                <ConvPreview
                    v-for="message in filteredMessages"
                    :key="message.id"
                    :message="message"
                    @open="openMessage"
                />
            </div>
        </div>

        <Chat :user="currentUser" />
    </div>
</template>

<style lang="scss">
.messages {
    display: grid;
    grid-template-columns: 325px 1fr;
    gap: 1.5rem;

    grid-column: 2/4;

    &__convs {
        grid-column: 1/2;

        &__list {
            display: flex;
            gap: 14px;
            flex-direction: column;

            margin: 0 auto;
        }
    }
}
</style>
