export interface Video {
  id: string
  key: string
  title: string
  coverImage: CoverImage
  primaryPlaybackUrl: PrimaryPlaybackUrl
}

interface CoverImage {
  sizes: Sizes
}

interface Sizes {
  large: string
  medium: string
  small: string
}

interface PrimaryPlaybackUrl {
  name: string
  hls: HLS
}

interface HLS {
  name: string
  url: string
}
