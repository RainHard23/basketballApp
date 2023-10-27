import { instance } from './common/api/commonApi'

export const imageApi = {
  // Метод сохранения изображения
  postImage: async (formData: FormData) => {
    return instance.post<string>('api/Image/SaveImage', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  getUploadedImage: async (imageFile: File) => {
    const formData = new FormData()
    formData.append('file', imageFile)

    let res = await imageApi.postImage(formData)

    return res.data
  },
}
