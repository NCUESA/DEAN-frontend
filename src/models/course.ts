import { Base } from "./base";
import { CourseWeekTime } from "./courseWeekTime";

export interface Course extends Base {
    course_id: string,
    course_class: string,
    course_zh_name: string,
    course_en_name: string,
    course_syllabus: string,
    course_type1: string,
    course_type2: string,
    course_fully_eng: boolean,
    course_credit: number,
    course_teacher_name: string,
    course_teacher_link: string,
    course_building: string,
    course_time_and_loc: string,
    course_student_limit: number,
    course_student_registered: number,
    course_student_selected: number,
    course_can_cross_class: string,
    course_note: string,
    course_day_night: boolean,
    course_week_times: CourseWeekTime[],
    disabled: boolean | undefined
}