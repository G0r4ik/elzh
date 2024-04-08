<template>
  <HeaderVue />
  <main class="special-main">
    <div class="container">
      <div class="top">
        <h1 class="title">Журнал</h1>
        <v-select
          v-if="currentTrimester"
          class="course-select fit"
          :options="trimester"
          label="desc"
          v-model="currentTrimester" />
        <v-select
          class="course-select fit"
          :options="courses"
          label="name"
          v-model="currentCourse"></v-select>
        <v-select
          class="course-select fit"
          :options="lessons"
          label="name"
          v-model="currentLesson"></v-select>
      </div>
    </div>
    <div class="wrapper">
      <div class="content">
        <table class="table">
          <tr>
            <td class="inv"></td>
            <td class="f" :colspan="daysOfMonth.length">
              {{ currentTrimester?.desc }}
            </td>
            <td class="b" rowspan="2">Посещ. пар</td>
          </tr>
          <tr class="table__head">
            <td class="inv"></td>
            <td class="table__date" :key="i" v-for="(i, index) of daysOfMonth">
              {{ index + 1 }}
            </td>
          </tr>
          <tr :key="student.id" v-for="student of students">
            <td class="table__fio">
              {{ student.lastName }}
              {{ student.firstName }}
              {{ student.patronymic }}
            </td>
            <td
              class="mark"
              :class="{
                td_ok: getFixme(student, index) === 'б',
                td_good: getFixme(student, index) == '5',
                td_med: getFixme(student, index) == '3',
                td_bad:
                  getFixme(student, index) == '2' ||
                  getFixme(student, index) == 'н',
              }"
              :key="student.id"
              v-for="(mark, index) of daysOfMonth">
              <input
                class="table__mark-input"
                type="text"
                :value="getFixme(student, index)"
                @change="
                  event =>
                    setMark(event.target.value, student.id, index + 1, event)
                " />
            </td>
            <td>
              {{
                daysOfMonth.length -
                student.marks.filter(m => m.mark === 'н').length
              }}(?) /
              {{ daysOfMonth.length }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </main>
</template>

<script>
import HeaderVue from './Header.vue'
import api from '../api.js'
import { useUserStore } from '../store'

export default {
  components: { HeaderVue },
  data() {
    return {
      courses: [],
      currentCourse: null,

      trimester: [],
      currentTrimester: null,

      lessons: [],
      currentLesson: null,

      students: [],
    }
  },
  async mounted() {
    this.trimester = (await api.get('/trimester')).data
    this.currentTrimester = this.trimester.at(-1)

    this.courses = (await api.get('/courses')).data
    this.currentCourse = this.courses.at(-1)

    this.lessons = (await api.get(`/lessons`)).data
    this.currentLesson = this.lessons.at(-1)
  },

  computed: {
    daysOfMonth() {
      if (!this.currentTrimester) return 0
      const date = new Date(this.currentTrimester.dateStart)
      return Array.from({
        length: new Date(date.getFullYear(), date.getMonth(), 0).getDate(),
      })
    },
  },

  methods: {
    getFixme(student, index) {
      return student.marks.find(mark => +mark.date === index + 1)?.mark
    },
    async setMark(mark, idStudent, date, event) {
      event.target.offsetParent.classList.add(
        mark === 'б'
          ? 'td_ok'
          : mark == '5'
          ? 'td_good'
          : mark == '3'
          ? 'td_med'
          : mark == '2' || mark == 'н'
          ? 'td_bad'
          : ''
      )
      await api.post(`/mark`, {
        idStudent,
        date,
        idTrimester: this.currentTrimester.id,
        mark,
        idLesson: this.currentLesson.id,
      })
    },
  },
  watch: {
    async currentCourse(val) {
      if (!this.currentTrimester || !this.currentLesson) return
      const res = await api.get(`/studentsByT`, {
        params: {
          idCourse: this.currentCourse.id,
          idTrimester: this.currentTrimester.id,
          idLesson: this.currentLesson.id,
        },
      })

      this.students = res.data
    },
    async currentTrimester(val) {
      if (!this.currentCourse || !this.currentLesson) return
      const res = await api.get(`/studentsByT`, {
        params: {
          idCourse: this.currentCourse.id,
          idTrimester: this.currentTrimester.id,
          idLesson: this.currentLesson.id,
        },
      })
      this.students = res.data
    },
    async currentLesson(val) {
      if (!this.currentCourse || !this.currentTrimester) return
      const res = await api.get(`/studentsByT`, {
        params: {
          idCourse: this.currentCourse.id,
          idTrimester: this.currentTrimester.id,
          idLesson: this.currentLesson.id,
        },
      })
      this.students = res.data
    },
  },
}
</script>

<style>
.table {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  width: 100%;
  border-collapse: collapse;
}
.mark:nth-child(2n) {
  background: #f3f6fb;
}

.f {
  color: #143987;
  font-weight: 600;
  padding: 5px;
}

.b {
  font-weight: bold;
  color: #5c5c5c;
}

td {
  border: 1px solid #acacac;
  vertical-align: middle;
  text-align: center;
}

.inv {
  border: none;
}

.table__fio {
  border-left: none;
  white-space: nowrap;
  padding: 10px 15px 10px 10px;
  position: sticky;
  left: -20px;
  background: rgba(255, 255, 255, 0.9);
  font-size: 14px;
}
.td_bad {
  background: rgba(255, 80, 80, 0.43) !important;
}
.td_med {
  background: rgba(255, 224, 165, 0.65) !important;
}
.td_ok {
  background: var(--ok) !important;
}
.td_good {
  background: var(--good) !important;
}
/*  */
/*  */
.content {
  background: #fff;
  padding: 40px 20px;
  border-radius: 18px;
  overflow-x: auto;
  margin: 0 15px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  margin-bottom: 35px;
}

.special-main {
  background: #f3f6fb;
  padding-top: 65px;
  height: calc(100vh - 140px);
  padding-bottom: 25px;
}

.top {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px 30px;
  margin-bottom: 65px;
}
.course-select {
  /* min-width: 200px; */
  /* width: 200px; */
  background: #fefefe;
  border-radius: 7px;
  border: 1px solid #5c5c5c;
  padding: 10px 15px;
}
.mark:nth-child(2n) {
  background: #f3f6fb;
}

.mark,
.table__date {
  width: 44px;
  height: 44px;
  min-width: 44px;
  font-size: 18px;
}

.table__head {
  position: sticky;
  top: 0;
  background: #fff;
  border-bottom: 1px solid #000;
}
.table__mark-input {
  background: none;
  border: none;
  text-align: center;
  width: 100%;
  height: 100%;
}

@media (max-width: 768px) {
  .mark,
  .table__date {
    width: 36px;
    height: 36px;
    min-width: 36px;
    font-size: 14px;
  }

  .table__mark-input {
    font-size: 14px;
  }
  .table__fio {
    padding: 0;
    padding-right: 15px;
  }

  .v-select {
    width: 100%;
  }
  .vs__actions {
    display: none;
  }
}
</style>
