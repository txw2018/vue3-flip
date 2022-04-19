<script setup lang="ts">
import { images } from '~/composables/mock'
const imgRefs = ref([])

function shuffle() {

}
onMounted(() => {
})

</script>

<template>
  <button class="m-3 text-sm btn" @click="shuffle">
    shuffle
  </button>
  <div flex flex-wrap pt10>
    <img v-for="(img,i) in images" :ref="el => { if (el) imgRefs[i] = el }" :key="img" w-30 m10 inline-block :src="img">
  </div>
</template>
†åå
