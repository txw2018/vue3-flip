<script setup lang="ts">
import { images } from '~/composables/mock'
import { shuffle as shuffleFn } from '~/composables/utils'
import { useImageStore } from '~/store/image'
const router = useRouter()
const imageStore = useImageStore()

let count = 1

const imgSrc = $computed(() => imageStore.getImg.path)
const imgRect = $computed(() => imageStore.getImg.imgRect)

let imgs = $ref(images)
const imgRefs = $ref<HTMLImageElement[]>([])

function shuffle() {
  transitionTo(() => {
    imgs = shuffleFn(imgs)
  })
}

async function transitionTo(update: Function) {
  const prevImgs = imgRefs.slice()
  const prevSrcRectMap = createSrcRectMap(prevImgs)
  update()
  await nextTick()
  const currentSrcRectMap = createSrcRectMap(prevImgs)
  Object.keys(prevSrcRectMap).forEach((src) => {
    const currentRect = currentSrcRectMap[src]
    const prevRect = prevSrcRectMap[src]

    const invert = {
      left: prevRect.left - currentRect.left,
      top: prevRect.top - currentRect.top,
    }

    const keyframes = [
      {
        transform: `translate(${invert.left}px, ${invert.top}px)`,
      },
      { transform: 'translate(0, 0)' },
    ]
    const options = {
      duration: 1000,
      easing: 'cubic-bezier(0,0,0.32,1)',
    }
    currentRect.img.animate(keyframes, options)

    // currentRect.img.style = `transform: translate(${invert.left}px, ${invert.top}px);`
    // requestAnimationFrame(() => {
    //   currentRect.img.style = 'transition: all 1s'
    //   currentRect.img.style.transform = ''
    // })
  })
}

function createSrcRectMap(imgs: HTMLImageElement[]) {
  return imgs.reduce((prev: any, img) => {
    const rect = img.getBoundingClientRect()
    const { left, top } = rect
    prev[img.src] = { left, top, img }
    return prev
  }, {})
}

function go(i: number, img: string) {
  const imgEl = imgRefs[i] as HTMLImageElement
  const imgRect = imgEl.getBoundingClientRect()
  imageStore.addImg({
    imgRect,
    path: img,
  })
  router.push(`/${i}`)
}

function transitionFrom() {
  const prevRect = imgRect

  for (let i = 0; i < imgRefs.length; i++) {
    const currentImg = imgRefs[i]

    if (currentImg.src === imgSrc) {
      const currentRect = currentImg?.getBoundingClientRect()
      const invert = {
        left: prevRect!.left - currentRect!.left,
        top: prevRect!.top - currentRect!.top,
      }
      currentImg.style.zIndex = String(count++)
      const keyframes = [
        {
          transform: `translate(${invert.left}px, ${invert.top}px)`,
          width: `${prevRect?.width}px`,
          height: `${prevRect?.height}px`,
        },
        {
          transform: 'translate(0, 0)',
          width: `${currentRect?.width}px`,
          height: `${currentRect?.height}px`,
        },
      ]
      const options = {
        duration: 1000,
        easing: 'cubic-bezier(0,0,0.32,1)',
      }
      currentImg!.animate(keyframes, options)
      imageStore.clearImg()
      return false
    }
  }
}

onActivated(() => {
  if (imgSrc)
    transitionFrom()
})
</script>

<template>
  <button class="m-3 text-sm btn" @click="shuffle">
    shuffle
  </button>
  <div flex flex-wrap pt10>
    <div v-for="(img,i) in imgs" :key="img" w-30 h-50 m10>
      <img
        :ref="el => { if (el) imgRefs[i] = el }"
        inline-block
        w-30 h-50
        object-cover
        :src="img"
        @click="go(i,img)"
      >
    </div>
  </div>
</template>
