<template>
  <RouterView />
</template>

<script>
import api from './api'
import { useUserStore } from './store.js'
export default {
  async mounted() {
    const token = localStorage.getItem('token')
    if (token) {
      const res = await api.post('/getUserByToken', { token })
      useUserStore().user = res.data
      localStorage.setItem('role', res.data.role)
    }
  },
}
</script>
./store.js
