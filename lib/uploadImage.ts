import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

/**
 * Uploads a file to Firebase Storage and returns the public download URL.
 * folder: "restaurants" | "menus"
 */
export async function uploadImage(
  file: File,
  folder: "restaurants" | "menus"
): Promise<string> {
  const filename = `${folder}/${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
  const storageRef = ref(storage, filename);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}