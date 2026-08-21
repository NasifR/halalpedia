import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { Restaurant } from "@/data/restaurants";

export type RestaurantInput = Omit<Restaurant, "id">;

export async function getAllRestaurants(): Promise<Restaurant[]> {
  const snapshot = await getDocs(collection(db, "restaurants"));
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Restaurant));
}

export async function addRestaurant(data: RestaurantInput): Promise<string> {
  const docRef = await addDoc(collection(db, "restaurants"), data);
  return docRef.id;
}

export async function updateRestaurant(
  id: string,
  data: Partial<RestaurantInput>
): Promise<void> {
  await updateDoc(doc(db, "restaurants", id), data);
}

export async function deleteRestaurant(id: string): Promise<void> {
  await deleteDoc(doc(db, "restaurants", id));
}