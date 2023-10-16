import { useEffect, useState } from 'react'
export const toBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })

export const useImageUpload = <T extends FileList | undefined>(imageUpload: T) => {
  const [image, setImage] = useState<string | undefined>()

  useEffect(() => {
    if (imageUpload && imageUpload[0]) {
      toBase64(imageUpload[0]).then(base64 => {
        base64 && setImage(base64.toString())
      })
    }
  }, [imageUpload])

  return image
}
