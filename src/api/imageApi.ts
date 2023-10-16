import { instance } from './common/api/commonApi'

export const imageApi = {
  postImage: async (formData: FormData | undefined) => {
    return instance.post<string, any>('api/Image/SaveImage', formData)
  },
  getUploadedImage: async (imageFile: File) => {
    const formData = new FormData()
    formData.append('file', imageFile)
    return await imageApi.postImage(formData)
  },
}
