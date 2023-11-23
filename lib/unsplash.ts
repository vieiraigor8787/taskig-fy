import { createApi } from 'unsplash-js'

export const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLICK_UNSPLASH_KEY!,
  fetch: fetch,
})
