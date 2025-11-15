export interface GalleryEmbedResponse {
    url: string
    description: string
}

export interface GalleryAuthorResponse {
    username: string
    url: string
}

export interface GalleryEntryResponse {
    id: string
    rank: number
    name: string
    displayName?: string
    downloadLink?: string
    description: string
    embeds: GalleryEmbedResponse[]
    authors: GalleryAuthorResponse[]
}

export interface GallerySeasonResponse {
    season: number
    entries: GalleryEntryResponse[]
}

export interface GalleryGetResponse {
    seasons: GallerySeasonResponse[]
}
