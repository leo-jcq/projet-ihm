import BoulderGradeSystem, { type TBoulderGradeSystem } from '@/enums/BoulderGradeSystem';
import RouteGradeSystem, { type TRouteGradeSystem } from '@/enums/RouteGradeSystem';

export const ROUTE_GRADE_REG_EXPS: Record<TRouteGradeSystem, RegExp> = {
    [RouteGradeSystem.French]:
        /^(1|2|3|4|4\+|5[abc](?:\/5[bc])?|6[abc](?:\+)?|7[abc](?:\+)?|8[abc](?:\+)?|9[abc](?:\+)?)$/,
    [RouteGradeSystem.UIAA]:
        /^(I|II|III|IV|V|VI(?:\/VIIa)?|VIIa|VIIb|VIIc|VIIIa|VIIIb|VIIIc(?:\/IXa)?|IXa|IXb|IXc(?:\/Xa)?|Xa|Xb|Xc(?:\/XIa)?|XIa|XIb|XIc(?:\/XIIa)?|XIIa|XIIb(?:\/XIIc)?|XIIc|>XIIc)$/,
    [RouteGradeSystem.USA]: /^5\.((\d|1[0-5])([a-d])?)$/
};

export const BOULDER_GRADE_REG_EXPS: Record<TBoulderGradeSystem, RegExp> = {
    [BoulderGradeSystem.Fontainebleau]:
        /^(1|2|3|4|4\+|5|5\+|6[abc](?:\+)?|7[abc](?:\+)?|8[abc](?:\+)?|9[ab](?:\+)?)$/,
    [BoulderGradeSystem.VGrade]: /^V(B|\d{1,2})(?:\+)?$/
};
