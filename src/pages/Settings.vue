<script setup lang="ts">
import usePageTitle from '@/composables/usePageTitle';
import BoulderGradeSystem, { BoulderGradeSystemToString } from '@/enums/BoulderGradeSystem';
import RouteGradeSystem, { RouteGradeSystemToString } from '@/enums/RouteGradeSystem';
import gradeSystemStore from '@/stores/gradeSystem';

usePageTitle('Paramètres');
</script>

<template>
    <main class="main">
        <h2>Paramètres</h2>

        <section id="privacy" class="panel">
            <h3>Confidentialité (informations affichées sur mon profile)</h3>

            <div class="field">
                <span class="field-title">Âge</span>
                <div class="options">
                    <label class="opt">
                        <input type="radio" name="age" checked /> Tout le monde
                    </label>
                    <label class="opt">
                        <input type="radio" name="age" /> Uniquement pour les amis
                    </label>
                    <label class="opt"><input type="radio" name="age" /> Privé</label>
                </div>
            </div>

            <div class="field">
                <span class="field-title">Niveau d'escalade</span>
                <div class="options">
                    <label class="opt">
                        <input type="radio" name="level" checked /> Tout le monde
                    </label>
                    <label class="opt">
                        <input type="radio" name="level" /> Uniquement pour les amis
                    </label>
                    <label class="opt"><input type="radio" name="level" /> Privé</label>
                </div>
            </div>

            <div class="field">
                <span class="field-title">Style(s) d'escalade pratiqué(s)</span>
                <div class="options">
                    <label class="opt">
                        <input type="radio" name="styles" checked />Tout le monde
                    </label>
                    <label class="opt">
                        <input type="radio" name="styles" /> Uniquement pour les amis
                    </label>
                    <label class="opt"><input type="radio" name="styles" /> Privé</label>
                </div>
            </div>

            <div class="field">
                <span class="field-title">Salles fréquentées</span>
                <div class="options">
                    <label class="opt">
                        <input type="radio" name="gyms" checked /> Tout le monde
                    </label>
                    <label class="opt">
                        <input type="radio" name="gyms" /> Uniquement pour les amis
                    </label>
                    <label class="opt"><input type="radio" name="gyms" /> Privé</label>
                </div>
            </div>

            <div class="field">
                <span class="field-title">Journal d'ascension</span>
                <div class="options">
                    <label class="opt">
                        <input type="radio" name="ascents" checked /> Tout le monde
                    </label>
                    <label class="opt">
                        <input type="radio" name="ascents" /> Uniquement pour les amis
                    </label>
                    <label class="opt"><input type="radio" name="ascents" /> Privé</label>
                </div>
            </div>
        </section>

        <section id="notifications" class="panel">
            <h3>Notifications</h3>

            <div class="field">
                <span class="field-title">Lorsque je reçois un nouveau message</span>
                <div class="options">
                    <label class="opt"><input type="radio" name="msg" checked /> Toujours</label>
                    <label class="opt">
                        <input type="radio" name="msg" /> Que des profils que je suis
                    </label>
                    <label class="opt"><input type="radio" name="msg" /> Jamais</label>
                </div>
            </div>

            <div class="field">
                <span class="field-title">Lorsque je reçois un j'aime sur une publication</span>
                <div class="options">
                    <label class="opt"><input type="radio" name="like" checked /> Toujours</label>
                    <label class="opt">
                        <input type="radio" name="like" /> Que des profils que je suis
                    </label>
                    <label class="opt"><input type="radio" name="like" /> Jamais</label>
                </div>
            </div>

            <div class="field">
                <span class="field-title">
                    Lorsque je reçois un commentaire sur une publication
                </span>
                <div class="options">
                    <label class="opt">
                        <input type="radio" name="comment" checked /> Toujours
                    </label>
                    <label class="opt">
                        <input type="radio" name="comment" /> Que des profils que je suis
                    </label>
                    <label class="opt"><input type="radio" name="comment" /> Jamais</label>
                </div>
            </div>

            <div class="field">
                <span class="field-title">Lorsque j'ai un nouvel abonné</span>
                <div class="options single">
                    <label class="opt"><input type="radio" name="follow" checked /> Toujours</label>
                    <label class="opt"><input type="radio" name="follow" /> Jamais</label>
                </div>
            </div>
        </section>

        <section id="languages" class="panel">
            <h3>Langue et système de cotation</h3>

            <div class="field">
                <span class="field-title">Langue de l'application</span>
                <div class="language-row">
                    <label class="opt"><input type="radio" name="lang" checked /> Français</label>
                    <input class="lang-search" placeholder="Rechercher..." />
                </div>
            </div>

            <div class="field">
                <span class="field-title">Système de cotation (voie)</span>
                <div class="options rating">
                    <label
                        v-for="gradeSystem in Object.values(RouteGradeSystem)"
                        :key="gradeSystem"
                        class="opt"
                    >
                        <input
                            type="radio"
                            :checked="gradeSystemStore.route === gradeSystem"
                            @click="gradeSystemStore.route = gradeSystem"
                        />
                        {{ RouteGradeSystemToString[gradeSystem] }}
                    </label>
                </div>
            </div>

            <div class="field">
                <span class="field-title">Système de cotation (bloc)</span>
                <div class="options rating">
                    <label
                        v-for="gradeSystem in Object.values(BoulderGradeSystem)"
                        :key="gradeSystem"
                        class="opt"
                    >
                        <input
                            type="radio"
                            :checked="gradeSystemStore.boulder === gradeSystem"
                            @click="gradeSystemStore.boulder = gradeSystem"
                        />
                        {{ BoulderGradeSystemToString[gradeSystem] }}
                    </label>
                </div>
            </div>
        </section>
    </main>

    <nav class="settings-nav">
        <a href="#privacy" class="settings-nav__link">
            Confidentialité
            <div class="settings-nav__link__bg" />
        </a>
        <a href="#notifications" class="settings-nav__link">
            Notifications
            <div class="settings-nav__link__bg" />
        </a>
        <a href="#languages" class="settings-nav__link">
            Languages
            <div class="settings-nav__link__bg" />
        </a>
    </nav>
</template>

<style lang="scss">
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.main {
    grid-template-columns: 2/4;
    h2 {
        font-size: 1.5rem;
        font-weight: 500;

        margin-bottom: 0.75rem;
    }

    .panel {
        margin-bottom: 1.375rem;
        h3 {
            font-size: 1.25rem;
            font-weight: 500;

            margin-bottom: 0.75rem;
        }
        .field {
            background: v.$white;
            padding: 1.25rem;
            border-radius: 0.625rem;
            @extend %default-shadow;
            margin-bottom: 1.25rem;
            .field-title {
                display: block;
                font-weight: 600;
                color: v.$very-dark-gray;
                margin-bottom: 0.5rem;
            }

            .options {
                display: flex;
                gap: 1.75rem;
                align-items: center;
                justify-content: center;
                flex-wrap: wrap;
                padding: 0.5rem 0;

                .opt {
                    display: flex;
                    gap: 0.625rem;
                    align-items: center;
                    justify-content: center;
                    color: #333;
                    min-width: 160px;
                    padding: 0.625rem 0.875rem;
                    border-radius: 0.625rem;
                    user-select: none;
                    cursor: pointer;
                }

                &.single {
                    gap: 2.25rem;
                }
            }

            .language-row {
                display: flex;
                gap: 0.75rem;
                align-items: center;
                justify-content: space-between; /* place la barre de recherche à droite */
                width: 100%;

                .opt {
                    margin-right: 0.5rem;
                    min-width: 140px;
                    justify-content: center;
                }

                .lang-search {
                    flex: 1;
                    height: 2.25rem;
                    border-radius: 0.5rem;
                    border: 1px solid #e6e6e8;
                    padding: 0 0.75rem;
                    background: #fafafa;
                }
            }
            .rating {
                flex-wrap: wrap;
            }
        }
    }

    input[type='radio'] {
        @extend %custom-checkbox;
    }
}

.settings-nav {
    height: fit-content;

    grid-column: 3/4;

    background-color: v.$white;

    @extend %default-box;

    padding: 1.5rem;

    display: flex;
    gap: 0.75rem;
    flex-direction: column;

    position: sticky;
    top: calc(v.$header-height + v.$top-gap);

    &__link {
        width: 100%;

        padding: 1.375rem;

        font-size: 1.125rem;
        text-decoration: none;
        color: v.$black;

        overflow: hidden;

        border-radius: 10px;

        position: relative;

        transition: color 0.3s ease;

        &:hover {
            color: v.$white;
        }

        &__bg {
            position: absolute;
            z-index: -1;
            inset: 0;

            opacity: 0;

            user-select: none;

            background-image: v.$main-gradient;

            transition: opacity 0.3s ease;
        }

        &:hover &__bg {
            opacity: 1;
        }
    }
}
</style>
