import ffmpeg from 'fluent-ffmpeg'
import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg'
ffmpeg.setFfmpegPath(ffmpegPath)

export default ffmpeg
