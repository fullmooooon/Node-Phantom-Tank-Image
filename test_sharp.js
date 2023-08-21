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
    console.log(downArray);
})()



// 不加.greyscale

// Uint8ClampedArray(3000000) [
//     235, 235, 237, 233, 233, 235, 236, 236, 238, 236, 236, 238,
//     233, 233, 235, 241, 241, 242, 237, 237, 237, 241, 241, 241,
//     237, 237, 237, 239, 239, 238, 239, 239, 240, 237, 237, 239,
//     238, 238, 240, 238, 238, 240, 235, 235, 237, 236, 236, 238,
//     235, 235, 235, 237, 237, 237, 239, 239, 239, 237, 237, 237,
//     237, 237, 237, 235, 235, 235, 237, 237, 237, 238, 238, 238,
//     236, 236, 235, 242, 242, 244, 232, 230, 224, 214, 196, 172,
//     211, 190, 167, 216, 195, 174, 228, 219, 206, 239, 240, 241,
//     240, 240, 239, 240,
//     ... 2999900 more items
//   ]


// 加上.greyscale

// Uint8ClampedArray(1000000) [
//     108, 129, 173, 173, 173, 174, 174, 174, 174, 175, 176, 176,
//     177, 176, 177, 177, 177, 179, 178, 178, 179, 179, 179, 179,
//     180, 184, 189, 191, 193, 187, 181, 184, 179, 181, 181, 181,
//     181, 181, 180, 180, 181, 180, 180, 180, 180, 178, 178, 187,
//     188, 179, 179, 179, 179, 178, 178, 178, 178, 175, 182, 183,
//     176, 176, 177, 176, 176, 175, 174, 175, 175, 173, 176, 165,
//     123,  88, 103, 116, 118, 119, 119, 119, 118, 118, 117, 117,
//     117, 117, 119, 120, 119, 120, 113, 156, 198, 189, 189, 190,
//     190, 189, 190, 189,
//     ... 999900 more items
//   ]