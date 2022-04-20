import { defineStore } from 'pinia'
interface ImgMap {
  path?: string
  imgRect?: DOMRect
}
interface Img {
  imgMap: ImgMap
}
export const useImageStore = defineStore('imageStore', {
  state: (): Img => ({
    imgMap: {},
  }),
  getters: {
    getImg: state => state.imgMap,
  },
  actions: {
    addImg(map: ImgMap) {
      this.imgMap = map
    },
  },
})
