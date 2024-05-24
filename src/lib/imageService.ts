import { storage } from "@/lib/firebaseConfig";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { getAuth, onAuthStateChanged, Unsubscribe } from "firebase/auth";
import { getDominantColor } from "@/utils/getDominantColor";

interface ImageData {
    src: string;
    alt: string;
    background: string;
    width: number;
    height: number;
}

let fetchedItems: any[] = [];

export const fetchImagesFromStorage = async (page: number, limit: number = 6): Promise<ImageData[]> => {
    const auth = getAuth();
    const unsubscribe: Unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (!user) {
            console.error('User not authenticated');
            return [];
        }
    });

    try {
        const imagesRef = ref(storage, 'Images/');
        if (fetchedItems.length === 0) {
            const result = await listAll(imagesRef);
            fetchedItems = result.items;
        }
        const imagesToFetch = fetchedItems.slice(page * limit, (page + 1) * limit);
        const imagePromises = imagesToFetch.map(async (item) => {
            const url = await getDownloadURL(item);
            const background = await getDominantColor(url);
            const img = new window.Image();
            img.src = url;
            await new Promise((resolve) => {
                img.onload = resolve;
            });
            return {
                src: url,
                alt: `Image ${item.name}`,
                background,
                width: img.width,
                height: img.height,
            };
        });

        return Promise.all(imagePromises);
    } catch (error) {
        console.error('Error fetching images from storage:', error);
        return [];
    } finally {
        if (unsubscribe) unsubscribe();
    }
};
