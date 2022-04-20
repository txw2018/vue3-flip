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
    imgMap: JSON.parse(localStorage.getItem('imgMap') ?? '{}'),
  }),
  getters: {
    getImg: state => state.imgMap,
  },
  actions: {
    addImg(map: ImgMap) {
      localStorage.setItem('imgMap', JSON.stringify(map))
      this.imgMap = map
    },
    clearImg() {
      localStorage.removeItem('imgMap')
      this.imgMap = {}
    },
  },
})
