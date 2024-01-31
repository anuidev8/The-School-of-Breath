export interface MusicResponse {
    info: string
    success: boolean
    data: Music[]
  }
  
  export interface Music {
    _id: string
    name: string
    position: number
    favorites: string[]
    audioFilename: string
    imageFilename: string
    categories: string[]
    slug: string
    createdAt: string
    updatedAt: string
    __v: number
    id: string;
    description:string;
  }
  