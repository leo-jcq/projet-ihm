<script setup lang="ts">
import dataStore from '@/stores/data';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import FollowBtn from '../Users/FollowBtn.vue';
import UserModal from '../Users/UserModal.vue';

const props = defineProps<{ preDisplay: boolean }>();

const route = useRoute();

const users = computed(() => {
    const query = route.query.q ? String(route.query.q).toLowerCase() : '';

    const users = dataStore.users.filter(
        (user) => user.name.toLowerCase().includes(query) || user.pseudo.toLowerCase().includes(query)
    );

    return props.preDisplay ? users.slice(0, 3) : users;
});
</script>

<template>
    <div v-if="users.length > 0 || !preDisplay" class="search-users-tab">
        <h3 v-if="preDisplay" class="search-users-tab__title">Personnes</h3>

        <ul class="search-users-tab__list">
            <li v-for="user in users" :key="user.id" class="search-users-tab__list__user">
                <UserModal :user="user" link />
                <FollowBtn />
            </li>
            <li v-if="users.length === 0" class="search-users-tab__list__empty">
                Aucun utilisateur trouvé.
            </li>
        </ul>
        
        <hr v-if="preDisplay" class="search__content__divider" />
    </div>
</template>

<style lang="scss">
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.search-users-tab {
    &__title {
        margin-bottom: 1em;

        font-size: 1rem;
        font-weight: 500;
    }

    &__list {
        list-style: none;

        &__user {
            margin-bottom: 0.8rem;

            @extend %flex-between;
        }

        &__empty {
            color: v.$grayish-black;
        }
    }
}
</style>
