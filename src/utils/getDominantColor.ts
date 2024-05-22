// src/utils/getDominantColor.ts
import { FastAverageColor } from 'fast-average-color';
const fac = new FastAverageColor();

export const getDominantColor = (imageUrl: string): Promise<string> => {
    const img = new window.Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;

    return new Promise((resolve, reject) => {
        img.onload = () => {
            try {
                const color = fac.getColor(img);
                resolve(color.rgb);
            } catch (e) {
                reject(e);
            }
        };
        img.onerror = (err) => reject(err);
    });
};