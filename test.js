const sharp = require('sharp')

;(async () => {
    const downImg = await sharp('./up.jpg')
        .resize({
            width: 1000,
            height: 1000,
        })
        .greyscale()
        .png()
        .raw()
        .toBuffer({ resolveWithObject: true })
    const downArray = new Uint8ClampedArray(downImg.data.buffer)
    const upImg = await sharp('./down.jpg')
        .resize({
            width: 1000,
            height: 1000,
        })
        .greyscale()
        .png()
        .raw()
        .toBuffer({ resolveWithObject: true })
    const upArray = new Uint8ClampedArray(upImg.data.buffer)
    let outputArray = new Uint8ClampedArray(1000 * 1000 * 4)

    for (let y = 0; y < 1000; y++) {
        for (let x = 0; x < 1000; x++) {
            let aGray = downArray[y * 1 * 1000 + x * 1 + 0]
            let bGray = upArray[y * 1 * 1000 + x * 1 + 0]

            let alpha = 255 - aGray + bGray
            let cGray = alpha != 0 ? Math.round((255 * bGray) / alpha) : 0
            outputArray[y * 4 * 1000 + x * 4 + 0] = cGray
            outputArray[y * 4 * 1000 + x * 4 + 1] = cGray
            outputArray[y * 4 * 1000 + x * 4 + 2] = cGray
            outputArray[y * 4 * 1000 + x * 4 + 3] = Math.max(alpha, 0) - 100
        }
    }
    sharp(outputArray, { raw: { width: 1000, height: 1000, channels: 4 } })
        .png()
        .toFile('./output.png')
})()
