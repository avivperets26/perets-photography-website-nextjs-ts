import { PrismaClient } from '@prisma/client';

import { config } from 'dotenv';
config({ path: 'env.local' });
console.log(`DATABASE_URL: ${process.env.DATABASE_URL}`);
const prisma = new PrismaClient();

// const images = [
//     { src: "https://drive.google.com/drive/folders/17eJjkQ-vaKIeXqLH9VU1Upx6erD3556f/834-Enhanced-SR.jpg", alt: "Image 834", background: "#6f7c7f" },
//     { src: "https://drive.google.com/drive/folders/17eJjkQ-vaKIeXqLH9VU1Upx6erD3556f/1928-Enhanced-SR.jpg", alt: "Image 1928", background: "#958a83" },
//     { src: "https://drive.google.com/drive/folders/17eJjkQ-vaKIeXqLH9VU1Upx6erD3556f/2444-Enhanced-SR.jpg", alt: "Image 2444", background: "#8c6c59" },
//     { src: "https://drive.google.com/drive/folders/17eJjkQ-vaKIeXqLH9VU1Upx6erD3556f/DJI_0077-Enhanced-SR.jpg", alt: "Image DJI 0077", background: "#626456" },
//     { src: "https://drive.google.com/drive/folders/17eJjkQ-vaKIeXqLH9VU1Upx6erD3556f/DJI_0135-Enhanced-SR.jpg", alt: "Image DJI 0135", background: "#5d554c" },
//     { src: "https://drive.google.com/drive/folders/17eJjkQ-vaKIeXqLH9VU1Upx6erD3556f/DJI_0337-aviv-Enhanced-SR.jpg", alt: "Image DJI 0337", background: "#3b5867" },
//     { src: "https://drive.google.com/drive/folders/17eJjkQ-vaKIeXqLH9VU1Upx6erD3556f/DJI_0359-Aviv-Enhanced-SR.jpg", alt: "Image DJI 0359", background: "#5d6a5a" },
//     { src: "https://drive.google.com/drive/folders/17eJjkQ-vaKIeXqLH9VU1Upx6erD3556f/DJI_0402-Aviv-Enhanced-SR.jpg", alt: "Image DJI 0402", background: "#2d331c" },
//     { src: "https://drive.google.com/drive/folders/17eJjkQ-vaKIeXqLH9VU1Upx6erD3556f/DJI_0586-Aviv-Enhanced-SR.jpg", alt: "Image DJI 0586", background: "#565d42" },
//     { src: "https://drive.google.com/drive/folders/17eJjkQ-vaKIeXqLH9VU1Upx6erD3556f/DSC00394-Enhanced-SR.jpg", alt: "Image DSC00394", background: "#919291" },
//     { src: "https://drive.google.com/drive/folders/17eJjkQ-vaKIeXqLH9VU1Upx6erD3556f/DSC04114.jpg", alt: "Image DSC04114", background: "#443d27" },
//     { src: "https://drive.google.com/drive/folders/17eJjkQ-vaKIeXqLH9VU1Upx6erD3556f/DSC05677-Aviv-Enhanced-SR.jpg", alt: "Image DSC05677", background: "#949790" },
//     { src: "https://drive.google.com/drive/folders/17eJjkQ-vaKIeXqLH9VU1Upx6erD3556f/DSC07821-Enhanced-SR.jpg", alt: "Image DSC07821", background: "#767d74" },
//     { src: "https://drive.google.com/drive/folders/17eJjkQ-vaKIeXqLH9VU1Upx6erD3556f/DSC09559-Enhanced-SR.jpg", alt: "Image DSC09559", background: "#946e38" },
//     { src: "https://drive.google.com/drive/folders/17eJjkQ-vaKIeXqLH9VU1Upx6erD3556f/zin.jpg", alt: "Image zin", background: "#4c5360" }
// ];

const images = [
    { src: "https://drive.google.com/file/d/1ZHZEl1iTACqYbBzrVZwgwlwhtq644_tq/view", alt: "Image 834", background: "#6f7c7f" },
    { src: "/images/1928-Enhanced-SR.jpg", alt: "Image 1928", background: "#958a83" },
    { src: "/images/2444-Enhanced-SR.jpg", alt: "Image 2444", background: "#8c6c59" },
    { src: "/images/DJI_0077-Enhanced-SR.jpg", alt: "Image DJI 0077", background: "#626456" },
    { src: "/images/DJI_0135-Enhanced-SR.jpg", alt: "Image DJI 0135", background: "#5d554c" },
    { src: "/images/DJI_0337-aviv-Enhanced-SR.jpg", alt: "Image DJI 0337", background: "#3b5867" },
    { src: "/images/DJI_0359-Aviv-Enhanced-SR.jpg", alt: "Image DJI 0359", background: "#5d6a5a" },
    { src: "/images/DJI_0402-Aviv-Enhanced-SR.jpg", alt: "Image DJI 0402", background: "#2d331c" },
    { src: "/images/DJI_0586-Aviv-Enhanced-SR.jpg", alt: "Image DJI 0586", background: "#565d42" },
    { src: "/images/DSC00394-Enhanced-SR.jpg", alt: "Image DSC00394", background: "#919291" },
    { src: "/images/DSC04114.jpg", alt: "Image DSC04114", background: "#443d27" },
    { src: "/images/DSC05677-Aviv-Enhanced-SR.jpg", alt: "Image DSC05677", background: "#949790" },
    { src: "/images/DSC07821-Enhanced-SR.jpg", alt: "Image DSC07821", background: "#767d74" },
    { src: "/images/DSC09559-Enhanced-SR.jpg", alt: "Image DSC09559", background: "#946e38" },
    { src: "/images/zin.jpg", alt: "Image zin", background: "#4c5360" }
];


async function main() {
    console.log('Start seeding...');
    console.log(`DATABASE_URL: ${process.env.DATABASE_URL}`);
    for (const image of images) {
        await prisma.image.create({
            data: image,
        });
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
