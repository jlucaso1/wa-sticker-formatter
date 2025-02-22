import { readFile } from 'fs-extra'
import { tmpdir } from 'os'
import ffmpeg from './ffmpeg'

const imagesToWebp = async (filename: string): Promise<Buffer> => {
    const file = await new Promise<string>((resolve) => {
        const name = `${tmpdir()}/${Math.random().toString(36)}.webp`
        ffmpeg(filename)
            .outputOption('-lavfi split[v],palettegen,[v]paletteuse')
            .outputOption('-vcodec libwebp')
            .outputFPS(10)
            .loop(0)
            .save(name)
            .on('end', () => resolve(name))
    })
    return await readFile(file)
}

export default imagesToWebp
