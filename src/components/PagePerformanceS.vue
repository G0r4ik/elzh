<template>
  <HeaderVue />
  <main class="special-main">
    <div class="container">
      <div class="top">
        <h1 class="title">Журнал</h1>
        <v-select
          class="course-select"
          :options="courses"
          v-model="currentCourse"></v-select>
      </div>
    </div>
    <div class="content">
      <table class="table">
        <tr>
          <td class="inv"></td>
          <td class="f" colspan="30">Ноябрь</td>
          <td class="b" rowspan="2">Посещ. пар</td>
        </tr>
        <tr>
          <td class="inv"></td>
          <td class="table__date" :key="i" v-for="i of 30">{{ i }}</td>
        </tr>
        <tr :key="student.id" v-for="student of students">
          <td class="table__fio">{{ student.lesson }}</td>
          <td
            class="mark"
            :class="{
              // td_good: Math.random() > 0.5,
              // td_med: Math.random() < 0.5,
              td_ok: mark === 'б',
              td_bad: mark == 'н',
            }"
            :key="student.id"
            v-for="mark of student.marks">
            {{ mark }}
          </td>
          <td
            :class="{
              td_good: Math.random() > 0.5,
              td_med: Math.random() < 0.5,
            }">
            {{ Math.floor(Math.random() * 30) }} /30
          </td>
        </tr>
      </table>
    </div>
  </main>
</template>

<script>
import HeaderVue from './Header.vue'
import students from '../assets/test.json'

export default {
  components: { HeaderVue },
  data() {
    return {
      courses: ['1 семестр', '2 семестр', '3 семестр (текущий)'],
      currentCourse: null,

      groups: ['САП-211 ', 'САП-212 ', 'САП-213 '],
      currentGroup: null,
      students: [],
    }
  },
  mounted() {
    this.currentCourse = this.courses.at(-1)
    this.currentGroup = this.groups.at(-1)
    this.students = students
  },
}
</script>

<style></style>
