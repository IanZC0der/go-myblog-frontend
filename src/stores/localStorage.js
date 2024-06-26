import { useStorage } from '@vueuse/core'

export const blogStore = useStorage(
  'my-blog-store',
  {
    is_login: false,
    token: {},
    menu: {
      selectedKeys: [],
      selectedOpenKeys: []
    }
  },
  localStorage,
  { mergeDefaults: true } // <--
)
