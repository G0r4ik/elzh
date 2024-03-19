<template>
  <HeaderVue />
  <main>
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
          <td :key="i" v-for="i of 30">{{ i }}</td>
        </tr>
        <tr :key="student.id" v-for="student of students">
          <td class="l-none">{{ student.lesson }}</td>
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
export default {
  components: { HeaderVue },
  data() {
    return {
      courses: ['1 семестр', '2 семестр', '3 семестр (текущий)'],
      currentCourse: null,

      groups: ['САП-211 ', 'САП-212 ', 'САП-213 '],
      currentGroup: null,

      students: [
        {
          lesson: 'Дискретная математика',
          marks: [
            10,
            8,
            12,
            9,
            'н',
            7,
            6,
            5,
            4,
            'б',
            13,
            11,
            15,
            14,
            'н',
            2,
            1,
            3,
            0,
            '+',
            16,
            17,
            18,
            19,
            'б',
            'б',
            'б',
            'б',
            'б',
            'б',
          ],
        },
        {
          lesson: 'Правовая культура',
          marks: [
            17,
            18,
            19,
            'б',
            'б',
            'б',
            'н',
            'б',
            'н',
            'б',
            'н',
            'б',
            'н',
            'б',
            'н',
            'б',
            'н',
            'б',
            'н',
            'б',
            '+',
            'б',
            '+',
            'б',
            '+',
            'б',
            '+',
            'б',

            '+',
            'б',
          ],
        },
        {
          lesson: 'Программирование',
          marks: [
            17,
            16,
            15,
            14,
            'н',
            13,
            12,
            11,
            10,
            'б',
            9,
            8,
            7,
            6,
            'н',
            5,
            4,
            3,
            2,
            '+',
            1,
            0,
            -1,
            -2,
            'б',
            -3,
            -4,
            -5,
            -6,
            'н',
          ],
        },
        {
          lesson: 'Английский язык',
          marks: [
            'н',
            'б',
            'н',
            'б',
            'н',
            'б',
            'н',
            'б',
            'н',
            'б',
            'н',
            'б',
            'н',
            'б',
            'н',
            '+',
            'н',
            '+',
            'н',
            '+',
            'н',
            '+',
            'н',
            '+',
            'н',
            'б',
            'н',
            'б',
            'н',
            'б',
          ],
        },
        {
          lesson: 'Проектная деятельность',
          marks: [
            -5,
            -4,
            -3,
            -2,
            'н',
            -1,
            0,
            1,
            2,
            'б',
            3,
            4,
            5,
            6,
            'н',
            7,
            9,
            10,
            '+',
            14,
            12,
            13,
            'б',
            15,
            17,
            18,
            'н',
            '+',
            'б',
            'н',
          ],
        },
        {
          lesson: 'Математика',
          marks: [
            10,
            8,
            12,
            9,
            'н',
            7,
            6,
            5,
            4,
            'б',
            13,
            11,
            15,
            14,
            'н',
            2,
            1,
            3,
            0,
            '+',
            16,
            17,
            18,
            19,
            'б',
            'б',
            'б',
            'б',
            'б',
            'б',
          ],
        },
        {
          lesson: 'Физика',
          marks: [
            17,
            18,
            19,
            'б',
            'б',
            'б',
            'н',
            'б',
            'н',
            'б',
            'н',
            'б',
            'н',
            'б',
            'н',
            'б',
            'н',
            'б',
            'н',
            'б',
            '+',
            'б',
            '+',
            'б',
            '+',
            'б',
            '+',
            'б',

            '+',
            'б',
          ],
        },
      ],
    }
  },
  mounted() {
    this.currentCourse = this.courses.at(-1)
    this.currentGroup = this.groups.at(-1)
  },
}
</script>

<style>
table {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}
.mark:nth-child(2n) {
  background: #f3f6fb;
}
.content {
  background: #fff;
  padding: 40px;
  border-radius: 18px;
  overflow-x: auto;
  margin: 0 15px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  margin-bottom: 35px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
.b {
  font-weight: bold;
  color: #5c5c5c;
}
.f {
  color: #143987;
  font-weight: 600;
}
tr {
}
td {
  min-width: 75px;
  height: 55px;
  min-height: 55px;
  vertical-align: middle;
  border: 1px solid #acacac;
  text-align: center;
  /* display: flex;
  align-items: center;
  justify-content: center; */
}

.inv {
  border: none;
}

.l-none {
  border-left: none;
  white-space: nowrap;
  padding: 15px 35px 15px 10px;
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
/*  */
main {
  background: #f3f6fb;
  padding-top: 65px;
  height: calc(100vh - 140px);
  padding-bottom: 25px;
}
.title {
  color: #143987;
  font-size: 48px;
  margin-left: 30px;
}
.top {
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 65px;
}
.course-select {
  min-width: 350px;
  background: #fefefe;
  border-radius: 7px;
  border: 1px solid #5c5c5c;
  padding: 10px 15px;

  /*  */
}
</style>
