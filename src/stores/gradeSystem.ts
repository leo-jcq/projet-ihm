import BoulderGradeSystem, { type TBoulderGradeSystem } from '@/enums/BoulderGradeSystem';
import RouteGradeSystem, { type TRouteGradeSystem } from '@/enums/RouteGradeSystem';
import { reactive } from 'vue';

interface IGradeSystemStore {
    route: TRouteGradeSystem;
    boulder: TBoulderGradeSystem;
}

const gradeSystemStore = reactive<IGradeSystemStore>({
    route: RouteGradeSystem.French,
    boulder: BoulderGradeSystem.Fontainebleau
});

export default gradeSystemStore;
