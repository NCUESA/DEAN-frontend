<template>
    <h2 class="text-center">課程列表讀取需要時間，若十秒後仍未讀取完成，請直接刷新頁面。</h2>
    <div class="table-responsive">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <td><button type="button" class="btn btn-danger" @click="resetChart">重置課表</button></td>
                    <td>星期一</td>
                    <td>星期二</td>
                    <td>星期三</td>
                    <td>星期四</td>
                    <td>星期五</td>
                    <td>星期六</td>
                    <td>星期日</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="idx in 14" :key="idx">
                    <td>
                        <div>{{ secs[idx - 1] }}</div>
                        <div>{{ startTimes[idx - 1] }}</div>
                        <div>{{ endTimes[idx - 1] }}</div>
                    </td>
                    <td v-for="i in 7">
                        <div>{{ array2D[idx - 1][i - 1]?.course_id }}{{ array2D[idx - 1][i - 1]?.course_zh_name }}</div>
                        <div v-if="array2D[idx - 1][i - 1] != null">{{ array2D[idx - 1][i - 1]?.course_credit }}學分</div>
                        <div v-else>{{ array2D[idx - 1][i - 1] }}</div>
                        <div>{{ array2D[idx - 1][i - 1]?.course_time_and_loc }}</div>
                        <div>{{ array2D[idx - 1][i - 1]?.course_teacher_name }}</div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <form @submit.prevent="filter" @reset.prevent="resetQuery" class="mb-4">
        <h2 class="text-center">快速搜尋</h2>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-4">
            <div class="col">
                <label for="day-night-select" class="form-label">日間/夜間</label>
                <select id="day-night-select" class="form-select" v-model="query.course_day_night">
                    <option :value="true" selected>日間</option>
                    <option :value="false">夜間</option>
                </select>
            </div>
            <div class="col">
                <label for="class-input" class="form-label">修課班別</label>
                <input id="class-input" class="form-control" type="text" v-model="query.course_class">
            </div>
            <div class="col">
                <label for="name-input" class="form-label">課程名稱</label>
                <input id="name-input" class="form-control" type="text" v-model="query.course_name">
            </div>
            <div class="col">
                <label for="fully-eng-select" class="form-label">全英文授課</label>
                <select id="fully-eng-select" class="form-select" v-model="query.course_fully_eng">
                    <option :value="null" selected></option>
                    <option :value="true">是</option>
                    <option :value="false">否</option>
                </select>
            </div>
            <div class="col">
                <label for="id-input" class="form-label">課程代碼</label>
                <input id="id-input" class="form-control" type="text" v-model="query.course_id">
            </div>
            <div class="col">
                <label for="time-select" class="form-label">上課時間</label>
                <select id="time-select" class="form-select" v-model="query.course_time">
                    <option :value="null" selected></option>
                    <option :value="1">星期一</option>
                    <option :value="2">星期二</option>
                    <option :value="3">星期三</option>
                    <option :value="4">星期四</option>
                    <option :value="5">星期五</option>
                    <option :value="6">星期六</option>
                    <option :value="0">星期日</option>
                </select>
            </div>
            <div class="col">
                <label for="teacher-name-input" class="form-label">老師姓名</label>
                <input id="teacher-name-input" class="form-control" type="text" v-model="query.course_teacher_name">
            </div>
            <div class="col">
                <div class="btn-group mt-3" role="group" aria-label="Basic example">
                    <button type="submit" class="btn btn-primary">查詢</button>
                    <button type="reset" class="btn btn-danger">清除</button>
                </div>
            </div>
        </div>
    </form>
    <div class="table-responsive">
        <table class="table">
            <thead>
                <tr>
                    <th class="col-1">序號</th>
                    <th class="col-1">課程代碼</th>
                    <th class="col-1">開課班別</th>
                    <th class="col-1">課程名稱<br>及性質<br>及教學大綱</th>
                    <th class="col-1">全英語授課</th>
                    <th class="col-1">學分</th>
                    <th class="col-1">教師姓名</th>
                    <th class="col-1">上課大樓<br>及節次<br>及地點</th>
                    <th class="col-1">上限<br>登記<br>選上人數</th>
                    <th class="col-1">可跨班</th>
                    <th class="col-1">備註</th>
                    <th class="col-1">選取</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(course, idx) in viewData" :key="course.id">
                    <td>{{ idx + 1 }}</td>
                    <td>{{ course.course_id }}</td>
                    <td>{{ course.course_class }}</td>
                    <td>
                        <div>{{ course.course_zh_name }}</div>
                        <div>{{ course.course_en_name }}</div>
                        <div><b>{{ course.course_type1 }}</b></div>
                        <div><b>{{ course.course_type2 }}</b></div>
                        <div>
                            <a :href="course.course_syllabus" v-if="course.course_syllabus != ''">查看教學大綱</a>
                        </div>
                    </td>
                    <td>{{ course.course_fully_eng ? "是" : "否" }}</td>
                    <td>{{ course.course_credit }}</td>
                    <td>
                        <div v-if="course.course_teacher_link != ''"><a :href="course.course_teacher_link">{{
                            course.course_teacher_name }}</a></div>
                        <div></div>
                    </td>
                    <td>
                        <div>{{ course.course_building }}</div>
                        <div>{{ course.course_time_and_loc }}</div>
                    </td>
                    <td>
                        <div>上限：{{ course.course_student_limit }}</div>
                        <div>登記：{{ course.course_student_registered }}</div>
                        <div>選上：{{ course.course_student_selected }}</div>
                    </td>
                    <td>{{ course.course_can_cross_class }}</td>
                    <td>{{ course.course_note }}</td>
                    <td><input type="checkbox" class="form-check" v-model="selected" :value="course"
                            :disabled="(course.disabled as boolean)"></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { jsonInstance } from '../api';
import { Course } from '../models/course';
import { CourseQuery } from '../models/query';
const data = ref<Course[]>([]);
const viewData = ref<Course[]>([]);
const secs: string[] = ["第1節", "第2節", "第3節", "第4節", "第14節", "第5節", "第6節", "第7節", "第8節", "第9節", "第10節", "第11節", "第12節", "第13節"];
const startTimes: string[] = ["8:10", "9:05", "10:15", "11:10", "12:05", "13.10", "14:05", "15:15", "16:10", "17:10", "18:20", "19:15", "20:10", "21:05"];
const endTimes: string[] = ["9:00", "9:55", "11:05", "12:00", "12:55", "14:00", "14:55", "16:05", "17:00", "18:00", "19:10", "20:05", "21:00", "21:55"];
const array2D = ref<(null | Course)[][]>([
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]
]);
const resetArray2D = () => {
    array2D.value = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null]
    ];
}
const selected = ref<Course[]>([]);
const query = ref<CourseQuery>({
    course_day_night: null,
    course_class: null,
    course_fully_eng: null,
    course_id: null,
    course_name: null,
    course_teacher_name: null,
    course_time: null,
});
const transformQuery = () => {
    if (query.value.course_class === "")
        query.value.course_class = null;
    if (query.value.course_id === "")
        query.value.course_id = null;
    if (query.value.course_name === "")
        query.value.course_name = null;
    if (query.value.course_teacher_name === "")
        query.value.course_teacher_name = null;
    if (query.value.course_time as unknown as string === "")
        query.value.course_time = null;
}
const filter = () => {
    transformQuery();
    let filterArray = [...data.value];
    if (query.value.course_class !== null)
        filterArray = filterArray.filter((course) => { return course.course_class.includes(query.value.course_class as string) })
    if (query.value.course_id !== null)
        filterArray = filterArray.filter((course) => { return course.course_id.includes(query.value.course_id as string) })
    if (query.value.course_name !== null)
        filterArray = filterArray.filter((course) => { return course.course_zh_name.includes(query.value.course_name as string) })
    if (query.value.course_teacher_name !== null)
        filterArray = filterArray.filter((course) => { return course.course_teacher_name.includes(query.value.course_teacher_name as string) })
    if (query.value.course_day_night !== null)
        filterArray = filterArray.filter((course) => { return course.course_day_night === query.value.course_day_night })
    if (query.value.course_fully_eng !== null)
        filterArray = filterArray.filter((course) => { return course.course_fully_eng === query.value.course_fully_eng })
    if (query.value.course_time !== null)
        filterArray = filterArray.filter(course => course.course_week_times.filter(weekTime => weekTime.week == query.value.course_time).length > 0);
    console.log(filterArray);
    viewData.value = [...filterArray];
}
const resetQuery = () => {
    query.value = {
        course_day_night: true,
        course_class: null,
        course_fully_eng: null,
        course_id: null,
        course_name: null,
        course_teacher_name: null,
        course_time: null,
    };
    filter();
}
const fetchData = async () => {
    data.value = await jsonInstance.get<Course[]>("/courses", query.value);
    data.value.forEach((element) => {
        element.disabled = false;
    });
    query.value.course_day_night = true;
    viewData.value = [...data.value];
    filter();
}
watch(selected, () => {
    resetArray2D();
    selected.value.forEach((element) => {
        element.course_week_times.forEach((weekTime) => {
            if (weekTime.time == 14) {
                if (array2D.value[4][(weekTime.week + 6) % 7] == null)
                    array2D.value[4][(weekTime.week + 6) % 7] = element;
                else
                    array2D.value[4][(weekTime.week + 6) % 7] = null;
            }
            else if (weekTime.time <= 4) {
                if (array2D.value[weekTime.time - 1][(weekTime.week + 6) % 7] == null)
                    array2D.value[weekTime.time - 1][(weekTime.week + 6) % 7] = element;
                else
                    array2D.value[weekTime.time - 1][(weekTime.week + 6) % 7] = null;
            }
            else {
                if (array2D.value[weekTime.time][(weekTime.week + 6) % 7] == null)
                    array2D.value[weekTime.time][(weekTime.week + 6) % 7] = element;
                else
                    array2D.value[weekTime.time][(weekTime.week + 6) % 7] = null;
            }
        })
    });
    if (selected.value.length === 0) {
        data.value.forEach((element) => {
            element.disabled = false;
        })
    }
    else {
        data.value.forEach((element) => {
            try {
                selected.value.forEach((sel) => {
                    if (element.id != sel.id) {
                        element.course_week_times.forEach((eleWeekTime) => {
                            sel.course_week_times.forEach((selWeekTime) => {
                                if (eleWeekTime.week == selWeekTime.week && eleWeekTime.time == selWeekTime.time)
                                    throw new Error();
                            })
                        })
                        element.disabled = false;
                    }
                })
            }
            catch {
                element.disabled = true;
            }
        })
    }
})
const resetChart = () => {
    selected.value = [];
}
fetchData();
</script>