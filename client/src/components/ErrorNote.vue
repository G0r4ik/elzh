<template>
  <div class="error" :style="{ background: bgColor || 'tomato' }">
    <p class="error__text">{{ text }}</p>
  </div>
</template>

<script>
export default {
  props: ['bgColor', 'text'],
}
</script>

<style>
.error {
  padding: 5px 15px;
  border-radius: 5px;
  margin: 15px;
}
.error__text {
  color: white;
}
</style>
