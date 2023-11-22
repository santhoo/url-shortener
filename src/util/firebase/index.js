import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: proccess.env.FB_API_KEY,
	authDomain: proccess.env.FB_AUTH_DOMAIN,
	projectId: proccess.env.FB_PROJECT_ID,
	storageBucket: proccess.env.FB_STORAGE_BUCKET,
	messagingSenderId: proccess.env.FB_MESSAGING_SENDER_ID,
	appId: proccess.env.FB_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore
const db = getFirestore(app)

export { db }
