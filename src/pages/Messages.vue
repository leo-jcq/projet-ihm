<script setup lang="ts">
import ConvPreview from '@/components/Messages/ConvPreview.vue';
import Tabs from '@/components/Tabs.vue';
import usePageTitle from '@/composables/usePageTitle';
import dataStore from '@/stores/data';
import { ref } from 'vue';

usePageTitle('Messages');

const tabs = ['Tout', 'Non lus', 'Epinglés', 'Masqués'];
const activeTab = ref('Tout');

function handleTabChange(newTab: string) {
    activeTab.value = newTab;
}

function openMessage(id: number) {
    const message = dataStore.messages.find((m) => m.id === id);
    if (message) message.read = true;
    // TODO : redirection vers la page discussion
}
</script>

<template>
    <main class="messages">
        <Tabs :tabs="tabs" :current-tab="activeTab" @change="handleTabChange" />

        <div class="messages__list">
            <ConvPreview
                v-for="message in dataStore.messages"
                :key="message.id"
                :message="message"
                @open="openMessage"
            />
        </div>
    </main>
</template>

<style lang="scss">
.messages {
    grid-column: 2/3;

    &__list {
        display: flex;
        gap: 14px;
        flex-direction: column;

        margin: 0 auto;
    }
}
</style>
