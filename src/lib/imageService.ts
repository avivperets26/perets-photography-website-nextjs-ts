// src/lib/imageService.ts
import { storage } from "@/lib/firebaseConfig";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { getAuth, onAuthStateChanged, Unsubscribe } from "firebase/auth";
import { getDominantColor } from "@/utils/getDominantColor";

export const fetchImagesFromStorage = async (callback: (image: { src: string, alt: string, background: string }) => void) => {
    const auth = getAuth();
    const unsubscribe: Unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
            try {
                const imagesRef = ref(storage, 'Images/');
                const result = await listAll(imagesRef);

                for (const item of result.items) {
                    const url = await getDownloadURL(item);
                    const background = await getDominantColor(url);
                    callback({
                        src: url,
                        alt: `Image ${item.name}`,
                        background
                    });
                }
            } catch (error) {
                console.error('Error fetching images from storage:', error);
            }
        } else {
            console.error('User not authenticated');
        }
    });
    return unsubscribe;
};
