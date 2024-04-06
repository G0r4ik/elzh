<template>
  <div class="admin">
    <div class="admin__card">
      <b class="admin__title">Создание пользователей</b>
      <form @submit.prevent="createUser">
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input type="text" id="firstName" v-model="user.firstName" required />
        </div>
        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input type="text" id="lastName" v-model="user.lastName" required />
        </div>
        <div class="form-group">
          <label for="patronymic">Patronymic</label>
          <input type="text" id="patronymic" v-model="user.patronymic" />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="user.email" required />
        </div>
        <div class="form-group">
          <label for="password">password</label>
          <input type="" id="password" v-model="user.password" required />
        </div>
        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input type="tel" id="phone" v-model="user.phone" required />
        </div>
        <div class="form-group">
          <label for="dob">Date of Birth</label>
          <input type="date" id="dob" v-model="user.dob" />
        </div>
        <div class="form-group">
          <label for="passport">Passport Number</label>
          <input type="text" id="passport" v-model="user.passport" />
        </div>
        <div class="form-group">
          <label for="role">User Role</label>
          <select id="role" v-model="user.role" required>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
        </div>
        <div v-if="user.role === 'student'">
          <div class="form-group">
            <label for="studentTicket">Student Ticket Number</label>
            <input
              type="text"
              id="studentTicket"
              v-model="user.studentTicket" />
          </div>
        </div>
        <div v-if="user.role === 'student'">
          <div class="form-group">
            <label for="course">User course</label>
            <select id="course" v-model="user.course" required>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
          </div>
        </div>
        <button type="submit" @click="createUser">Create User</button>
      </form>
      <ErrorNote v-if="errorText" :text="errorText" />
    </div>
  </div>
</template>

<script>
import ErrorNote from './ErrorNote.vue'
import api from '../api.js'

export default {
  components: { ErrorNote },

  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        patronymic: '',
        email: '',
        password: '',
        phone: '',
        dob: null,
        role: 'teacher',
        course: '',
        studentTicket: '',
        passport: '',
      },
      errorText: null,
    }
  },
  methods: {
    async createUser() {
      try {
        const response = await (this.user.role === 'teacher'
          ? api.post('/teachers', { user: this.user })
          : api.post('/students', { user: this.user }))
        console.log('User created successfully:', response.data)
        this.errorText = 'Создано успешно!'
      } catch (error) {
        console.error('Error creating user:', error)
        this.errorText = 'Ошибка при создании пользователя'
      }
    },
  },
}
</script>

<style scoped>
.admin__title {
  margin-bottom: 15px;
  display: block;
}
.admin__card {
  padding: 15px;
  margin: 15px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 5px;
}
.form-group {
  margin-bottom: 10px;
}
</style>
