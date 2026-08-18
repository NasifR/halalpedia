import { db } from "@/lib/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { Restaurant } from "@/data/restaurants";

// Fetch all restaurants
export async function getRestaurants(): Promise<Restaurant[]> {
  const snapshot = await getDocs(collection(db, "restaurants"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Restaurant));
}

// Fetch a single restaurant by ID
export async function getRestaurantById(id: string): Promise<Restaurant | null> {
  const snap = await getDoc(doc(db, "restaurants", id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Restaurant;
}