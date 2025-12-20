<script setup lang="ts">
import dataStore from '@/stores/data';
import { Search2Outlined } from '@lineiconshq/free-icons';
import Lineicons from '@lineiconshq/vue-lineicons';
import { computed, reactive, ref } from 'vue';
import PopUp from '../PopUp.vue';
import UserModal from '../Users/UserModal.vue';

defineEmits<{ close: [] }>();

// Selected
const selectedUsers = reactive<number[]>([]);

function switchSelectUser(id: number) {
    const index = selectedUsers.indexOf(id);
    if (index === -1) {
        selectedUsers.push(id);
    } else {
        selectedUsers.splice(index, 1);
    }
}

// Search
const query = ref('');

const users = computed(() => {
    const loweredQuery = query.value.toString();
    return dataStore.users.filter(
        (u) =>
            u.name.toLowerCase().includes(loweredQuery) ||
            u.pseudo.toLowerCase().includes(loweredQuery)
    );
});
</script>

<template>
    <PopUp title="Partager un post" @close="$emit('close')">
        <div class="share-post">
            <div class="share-post__search-bar">
                <input
                    v-model="query"
                    type="text"
                    class="share-post__search-bar__input"
                    placeholder="Rechercher"
                />

                <Lineicons :icon="Search2Outlined" class="share-post__search-bar__icon" />
            </div>

            <div class="share-post__users">
                <div
                    v-for="user in users"
                    :key="user.id"
                    class="share-post__user"
                    :class="{ 'share-post__user--selected': selectedUsers.includes(user.id) }"
                    @click="switchSelectUser(user.id)"
                >
                    <UserModal :user="user" />

                    <input
                        type="checkbox"
                        class="share-post__user__checkbox"
                        :checked="selectedUsers.includes(user.id)"
                    />
                </div>
            </div>

            <button v-if="selectedUsers.length > 0" class="share-post__share" @click="$emit('close')">Envoyer</button>
        </div>
    </PopUp>
</template>

<style lang="scss">
@use '@/scss/mixins' as m;
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.share-post {
    width: 550px;

    padding: 1rem 1.5rem;

    &__search-bar {
        position: relative;

        margin-bottom: 1rem;

        &__input {
            @include m.size(100%, 42px);

            font-size: 1rem;

            padding: 0 1rem 0 2.5rem;

            @extend %default-border;
            border-radius: 0.5rem;
            outline-color: v.$accent;

            background-color: v.$white;

            &::placeholder {
                color: v.$dark-gray;
            }
        }

        &__icon {
            height: 1.25rem;

            color: v.$dark-gray;

            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
        }
    }

    &__users {
        max-height: 70vh;

        padding: 0 1rem;

        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        overflow: auto;
    }

    &__user {
        @extend %flex-between;

        cursor: pointer;

        &__checkbox {
            @extend %custom-checkbox;
        }
    }

    &__share {
        width: 100%;

        margin-top: 1.5rem;
        padding: 0.75rem;

        @extend %default-btn;

        border-radius: 9999px;
    }
}
</style>
