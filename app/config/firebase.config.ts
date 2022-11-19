import { initializeApp } from "firebase/app";

interface firebaseConfigInterface {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

const projectId: string = [{}]["FIREBASE_PROJECT_ID"];
const authDomain: string =
  [{}]["FIREBASE_AUTH_DOMAIN"] || `${projectId}.firebaseapp.com`;
const storageBucket: string =
  [{}]["FIREBASE_STORAGE_BUCKET"] || `${projectId}.appspot.com`;

const firebaseConfig: firebaseConfigInterface = {
  apiKey: [{}]["FIREBASE_API_KEY"],
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: [{}]["FIREBASE_MESSAGING_SENDER_ID"],
  appId: [{}]["FIREBASE_APP_ID"],
};

const app = initializeApp(firebaseConfig);
export default app;
