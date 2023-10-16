import { instance } from './common/api/commonApi'

// Ваши методы API
export const imageApi = {
  // Метод сохранения изображения
  postImage: async (formData: FormData) => {
    return instance.post<string, any>('api/Image/SaveImage', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  // Этот метод теперь принимает объект 'File', а не строку.
  getUploadedImage: async (imageFile: File) => {
    const formData = new FormData()
    formData.append('file', imageFile) // 'file' должно соответствовать ожидаемому ключу на сервере.

    let res = await imageApi.postImage(formData)

    return res.data
  },
}
