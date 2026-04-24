import { initializeApp } from "firebase/app";
import { getAuth ,GoogleAuthProvider} from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "llmightyui.firebaseapp.com",
  projectId: "llmightyui",
  storageBucket: "llmightyui.firebasestorage.app",
  messagingSenderId: "349190823974",
  appId: "1:349190823974:web:3bfc2b8e375e1ff2ee86e7"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };