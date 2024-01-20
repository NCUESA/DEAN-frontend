import { Base } from "./base";

export interface CourseWeekTime extends Base {
    week: number,
    time: number,
    course_id: number
}