<script setup lang="ts">
import ImageCaroussel from '@/components/ImageCaroussel.vue';
import GradeBox from '@/components/Routes/GradeBox.vue';
import { ClimbStyleToString } from '@/enums/ClimbStyle';
import PostType from '@/enums/PostType';
import { RouteTypeToString } from '@/enums/RouteType';
import router from '@/router';
import dataStore from '@/stores/data';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const routerRoute = useRoute();

const route = computed(() => {
    return dataStore.routes.find((r) => r.id.toString() === routerRoute.params.id);
});

if (!route.value) {
    router.push('/not-found');
}

const nbSends = computed(
    () =>
        dataStore.posts.filter((p) => p.routeId === route.value!.id && p.type == PostType.Success)
            .length
);

const images = computed(() =>
    dataStore.posts.filter((p) => p.routeId === route.value!.id && p.image).map((p) => p.image!)
);
</script>

<template>
    <main v-if="route" class="route">
        <!-- Top -->
        <div class="route__top">
            <h2 class="route__name">
                {{ route.name }},
                <span class="route__location">{{ route.location }}</span>
            </h2>

            <div class="route__top__info">
                <GradeBox :grade="route.grade" :route-type="route.type" />

                <span class="route__type">{{ RouteTypeToString[route.type] }}</span>
            </div>

            <div class="route__styles">
                <span v-for="style in route.styles" :key="style" class="route__styles__style">
                    {{ ClimbStyleToString[style] }}
                </span>
            </div>

            <span class="route__send">
                {{ nbSends === 0 ? 'Aucune' : nbSends }} réussite{{ nbSends > 1 ? 's' : '' }}
            </span>
        </div>

        <!-- Images -->
        <h3 class="route__sub-title">Dernières images</h3>
        <ImageCaroussel v-if="images.length > 0" :images="images" />
        <span v-else class="route__images-empty">Aucune image pour l'instant</span>
    </main>
</template>

<style lang="scss">
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.route {
    grid-template-columns: 2/3;

    &__top {
        @extend %default-box;

        padding: 1.5rem;

        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        &__info {
            display: flex;
            gap: 0.75rem;
            align-items: center;
        }
    }

    &__name {
        font-size: 1.5rem;
        font-weight: 500;
    }

    &__location {
        font-size: 1.125rem;
        font-weight: 400;
        color: v.$dark-gray;
    }

    &__type {
        width: fit-content;

        padding: 0.375rem 0.75rem;

        font-size: 0.875rem;
        color: v.$grayish-black;

        border-radius: 9999px;

        background-color: v.$very-light-gray;
    }

    &__styles {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        align-items: center;

        &__style {
            width: fit-content;

            padding: 0.375rem 0.75rem;

            font-size: 0.875rem;
            color: v.$grayish-black;

            border-radius: 9999px;

            background-color: v.$very-light-gray;
        }
    }

    &__send {
        color: v.$very-dark-gray;
    }

    &__sub-title {
        font-size: 1.25rem;
        font-weight: 500;

        display: flex;
        gap: 0.5rem;
        align-items: baseline;

        margin: 1.5rem 0 0.625rem;
    }

    &__images-empty {
        width: 100%;

        display: inline-block;

        text-align: center;

        color: v.$dark-gray;
    }
}
</style>
