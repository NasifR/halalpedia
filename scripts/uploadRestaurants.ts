import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { restaurants } from "../data/restaurants";
import * as dotenv from "dotenv";

// Load .env.local
dotenv.config({ path: ".env.local" });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function upload() {
  console.log(`Uploading ${restaurants.length} restaurants to Firestore...`);

  for (const restaurant of restaurants) {
    const { id, ...data } = restaurant;
    await setDoc(doc(db, "restaurants", id), data);
    console.log(`✓ ${restaurant.name}`);
  }

  console.log("Done!");
  process.exit(0);
}

upload().catch((err) => {
  console.error("Upload failed:", err);
  process.exit(1);
});