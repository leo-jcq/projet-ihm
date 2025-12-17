<template>
    <div class="not-found">
        <h2 class="not-found__title">404 Not found</h2>
        <p class="not-found__text">La ressource demandée est introuvable</p>
        <RouterLink to="/" class="not-found__return">Retour à l'accueil</RouterLink>
    </div>
</template>

<style lang="scss">
@use '@/scss/mixins' as m;
@use '@/scss/variables' as v;

.not-found {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__title {
        font-size: 2.5rem;
        font-weight: 500;
        color: v.$grayish-black;
    }

    &__text {
        font-size: 1.5rem;
        color: v.$very-dark-gray;
    }

    &__return {
        margin-top: 2rem;

        background-image: v.$main-gradient;

        padding: 1rem 1.5rem;

        font-size: 1.125rem;
        text-decoration: none;
        color: v.$white;

        cursor: pointer;

        border-radius: 9999px;

        &:hover {
            background-color: v.$main-gradient-lighten;
        }
    }
}
</style>
