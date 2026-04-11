import { db, storage } from "@/lib/firebase";
import {
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
} from "firebase/firestore";
import {
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";

const COLLECTION_NAME = "photos";

export const uploadPhoto = async (file: File) => {
    const fileRef = ref(storage, `photos/${Date.now()}-${file.name}`);

    await uploadBytes(fileRef, file);

    const url = await getDownloadURL(fileRef);

    await addDoc(collection(db, COLLECTION_NAME), {
        url,
        uploadedBy: "Invitado",
        createdAt: new Date(),
    });

    return url;
};

export const getPhotos = async () => {
    const q = query(
        collection(db, COLLECTION_NAME),
        orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as any),
    }));
};