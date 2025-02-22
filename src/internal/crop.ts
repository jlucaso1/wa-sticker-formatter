import { readFile } from 'fs-extra'
import { tmpdir } from 'os'
import ffmpeg from './ffmpeg'

const crop = async (filename: string): Promise<Buffer> => {
    const file = await new Promise<string>((resolve) => {
        const name = `${tmpdir()}/${Math.random().toString(36)}.webp`
        ffmpeg(filename)
            // eslint-disable-next-line no-useless-escape
            .outputOptions([
                '-vcodec',
                'libwebp',
                '-vf',
                // eslint-disable-next-line no-useless-escape
                `crop=w='min(min(iw\,ih)\,500)':h='min(min(iw\,ih)\,500)',scale=500:500,setsar=1,fps=15`,
                '-loop',
                '0',
                '-preset',
                'default',
                '-an',
                '-vsync',
                '0',
                '-s',
                '512:512'
            ])
            .save(name)
            .on('end', () => resolve(name))
    })
    return await readFile(file)
}

export default crop
