<template>
  <HeaderVue />
  <main class="special-main">
    <div class="container">
      <div class="top">
        <h1 class="title">Журнал</h1>
        <v-select
          class="course-select"
          :options="trimester"
          label="desc"
          v-model="currentTrimester"></v-select>
      </div>
    </div>
    <div class="content">
      <table class="table">
        <tr>
          <td class="inv"></td>
          <td class="f" :colspan="daysOfMonth.length">
            {{ currentTrimester?.desc }}
          </td>
          <td class="b" rowspan="2">Посещ. пар</td>
        </tr>
        <tr>
          <td class="inv"></td>
          <td class="table__date" :key="i" v-for="(i, index) of daysOfMonth">
            {{ index + 1 }}
          </td>
        </tr>
        <tr :key="lesson.Lesson.id" v-for="(lesson, index) of lessons">
          <td class="table__fio">{{ lesson.Lesson.name }}</td>
          <td
            class="mark"
            :class="{
              td_ok: getFixme(lesson.id, index) === 'б',
              td_good: getFixme(lesson.id, index) == '5',
              td_med: getFixme(lesson.id, index) == '3',
              td_bad:
                getFixme(lesson.id, index) == '2' ||
                getFixme(lesson.id, index) == 'н',
            }"
            :key="lesson.id"
            v-for="(mark, index) of daysOfMonth">
            {{ getFixme(lesson.id, index) }}
          </td>
          <td>
            {{ daysOfMonth.length - 0 }}
            /
            {{ daysOfMonth.length }}

            <!-- // student.marks.filter(m => m.mark === 'н').length / -->
          </td>
        </tr>
      </table>
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
      trimester: [],
      currentTrimester: null,

      lessons: [],
    }
  },
  async mounted() {
    this.trimester = (await api.get('/trimester')).data
    this.currentTrimester = this.trimester.at(-1)

    const { lessons, marks } = (
      await api.get(
        `/lessonsStudent/${useUserStore().user.id}/${
          this.currentTrimester.id
        }/${useUserStore().user.idCourse}`
      )
    ).data
    this.lessons = lessons
    this.marks = marks
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

  watch: {
    async currentTrimester() {
      console.log(useUserStore().user)
      const { lessons, marks } = (
        await api.get(
          `/lessonsStudent/${useUserStore().user.id}/${
            this.currentTrimester.id
          }/${useUserStore().user.idCourse}`
        )
      ).data
      this.lessons = lessons
      this.marks = marks
    },
  },

  methods: {
    getFixme(idLesson, index) {
      return this.marks.find(
        mark => +mark.date === index + 1 && mark.idLesson === idLesson
      )?.mark
      // return 0
    },
  },
}
</script>

<style></style>
