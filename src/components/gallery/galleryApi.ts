import { GalleryGetResponse } from './types'

export async function getGalleryData(): Promise<GalleryGetResponse> {
  const response = await fetch('/api/Gallery')
  return await response.json()
}