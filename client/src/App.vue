<template>
  <RouterView />
</template>

<script>
import api from './api'
import { useUserStore } from './store.js'
export default {
  //
  async mounted() {
    const token = localStorage.getItem('token')
    const a = await api.post('/getUserByToken', { token })
    useUserStore().user = a.data
  },
}
</script>
./store.js
