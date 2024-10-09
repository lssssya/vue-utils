import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {},
  }),
  getters: {
    language: state => state.userInfo.language,
    skin: state => state.userInfo.skin,
  },
  actions: {
    async loadUser() {
      // 可以做请求
      this.userInfo = {
        languageId: 'zh_CN',
        skin: 'blue'
      }
      return this.userInfo
    }
  }
})