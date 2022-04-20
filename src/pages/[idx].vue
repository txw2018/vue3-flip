<script setup lang="ts"   >
import { useImageStore } from '~/store/image'
const router = useRouter()
const imageStore = useImageStore()
const imgRef = $ref<HTMLImageElement| null>(null)
const imgMap = imageStore.getImg
onMounted(() => {
  transitionTo()
})
// 执行动画
async function transitionTo() {
  const prevSrcRectMap = imgMap!.imgRect

  const currentSrcRectMap = imgRef!.getBoundingClientRect()

  const invert = {
    left: prevSrcRectMap!.left - currentSrcRectMap.left,
    top: prevSrcRectMap!.top - currentSrcRectMap.top,
  }

  const keyframes = [
    {
      transform: `translate(${invert.left}px, ${invert.top}px)`,
      width: `${prevSrcRectMap?.width}px`,
      height: `${prevSrcRectMap?.height}px`,
    },
    {
      transform: 'translate(0, 0)',
      width: `${currentSrcRectMap?.width}px`,
      height: `${currentSrcRectMap?.height}px`,
    },
  ]
  const options = {
    duration: 300,
    easing: 'cubic-bezier(0,0,0.32,1)',
  }
  imgRef!.animate(keyframes, options)
}

async function back() {
  imageStore.addImg({
    path: imgMap!.path,
    imgRect: imgRef?.getBoundingClientRect(),
  })
  await nextTick()
  router.back()
}

</script>
<template>
  <div>
    <button class="m-3 text-sm btn" @click="back">
      Back
    </button>
    <div mt10 h150>
      <img ref="imgRef" w="100" h="150" inline-block :src="imgMap!.path" alt="">
    </div>
  </div>
</template>

<style scoped lang='less'>
</style>
