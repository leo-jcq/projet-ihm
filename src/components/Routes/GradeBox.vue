<script setup lang="ts">
import type { TRouteType } from '@/enums/RouteType';
import RouteType from '@/enums/RouteType';
import gradeSystemStore from '@/stores/gradeSystem';
import { convertBoulderGradeFromFontainebleau, convertRouteGradeFromFrench } from '@/utils/grades';
import { computed } from 'vue';

const props = defineProps<{ grade: string; routeType: TRouteType }>();

const converted = computed(() => {
    if (props.routeType === RouteType.Route) {
        return convertRouteGradeFromFrench(props.grade, gradeSystemStore.route);
    }

    return convertBoulderGradeFromFontainebleau(props.grade, gradeSystemStore.boulder);
});
</script>

<template>
    <span class="grade-box">{{ converted }}</span>
</template>

<style lang="scss">
@use '@/scss/placeholders';
@use '@/scss/variables' as v;

.grade-box {
    width: fit-content;
    
    padding: 0.125rem 0.375rem;

    @extend %default-border;
    border-radius: 0.25rem;

    font-size: 0.875rem;
    color: v.$very-dark-gray;

    background-color: v.$white;

    display: inline-block;
}
</style>
