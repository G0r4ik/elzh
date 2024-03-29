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
        <v-select
          class="course-select"
          :options="groups"
          v-model="currentGroup" />
      </div>
    </div>
    <div class="wrapper">
      <div class="content">
        <table class="table">
          <tr>
            <td class="inv"></td>
            <td class="f" colspan="30">Ноябрь</td>
            <td class="b" rowspan="2">Посещ. пар</td>
          </tr>
          <tr class="table__head">
            <td class="inv"></td>
            <td class="table__date" :key="i" v-for="i of 30">{{ i }}</td>
          </tr>
          <tr :key="student.id" v-for="student of students">
            <td class="table__fio">{{ student.fio }}</td>
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
              <input class="table__mark-input" type="text" :value="mark" />
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
          fio: 'Васильева Е. К.',
          marks: [
            10,
            8,
            null,
            9,
            'н',
            7,
            6,
            5,
            4,
            'б',
            null,
            null,
            null,
            null,
            'н',
            2,
            1,
            3,
            0,
            '+',
            null,
            null,
            null,
            null,
            'б',
            'б',
            'б',
            'б',
            'б',
            'б',
          ],
        },
        {
          fio: 'Соколов П. П.',
          marks: [
            17,
            18,
            null,
            'б',
            'б',
            'б',
            null,
            'б',
            null,
            'б',
            null,
            'б',
            null,
            'б',
            null,
            'б',
            null,
            'б',
            null,
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
          fio: 'Иванова А. А.',
          marks: [
            17,
            16,
            15,
            14,
            null,
            13,
            null,
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
          fio: 'Сидоров М. М.',
          marks: [
            'н',
            null,
            null,
            null,
            'н',
            null,
            null,
            null,
            'н',
            null,
            null,
            null,
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
            null,
            null,
            null,
            'н',
            'б',
          ],
        },
        {
          fio: 'Петров К. К.',
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
            null,
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
          fio: 'Васильева Е. К.',
          marks: [
            10,
            8,
            null,
            9,
            'н',
            7,
            6,
            5,
            4,
            'б',
            null,
            null,
            null,
            null,
            'н',
            2,
            1,
            3,
            0,
            '+',
            null,
            null,
            null,
            null,
            'б',
            'б',
            'б',
            'б',
            'б',
            'б',
          ],
        },
        {
          fio: 'Соколов П. П.',
          marks: [
            17,
            18,
            null,
            'б',
            'б',
            null,
            null,
            null,
            'н',
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
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
          fio: 'Иванова А. А.',
          marks: [
            17,
            16,
            15,
            14,
            'н',
            13,
            null,
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
          fio: 'Сидоров М. М.',
          marks: [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
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
            null,
            null,
            null,
            null,
            null,
            null,
          ],
        },
        {
          fio: 'Петров К. К.',
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
            null,
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
          fio: 'Васильева Е. К.',
          marks: [
            10,
            8,
            null,
            9,
            'н',
            7,
            6,
            5,
            4,
            'б',
            null,
            null,
            null,
            null,
            'н',
            2,
            1,
            3,
            0,
            '+',
            null,
            null,
            null,
            null,
            'б',
            'б',
            'б',
            'б',
            'б',
            'б',
          ],
        },
        {
          fio: 'Соколов П. П.',
          marks: [
            null,
            18,
            null,
            'б',
            'б',
            'б',
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            '+',
            'б',
            '+',
            'б',
            '+',
            null,
            null,
            null,
            null,
            '+',
            '+',
            'б',
          ],
        },
        {
          fio: 'Иванова А. А.',
          marks: [
            null,
            16,
            15,
            14,
            'н',
            13,
            null,
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
          fio: 'Сидоров М. М.',
          marks: [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
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
            null,
            null,
            null,
            null,
            null,
            null,
          ],
        },
        {
          fio: 'Петров К. К.',
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
            null,
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
  padding: 10px 35px 10px 10px;
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
  min-width: 200px;
  background: #fefefe;
  border-radius: 7px;
  border: 1px solid #5c5c5c;
  padding: 10px 15px;
  /*  */
}
.mark:nth-child(2n) {
  background: #f3f6fb;
}

.mark,
.table__date {
  width: 54px;
  height: 54px;
  min-width: 54px;
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
}
</style>
