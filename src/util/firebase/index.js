import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBBNkc1jN6u1oYiZdUrYb9VSYOUljKPa4M',
	authDomain: 'neopro-shortlink.firebaseapp.com',
	projectId: 'neopro-shortlink',
	storageBucket: 'neopro-shortlink.appspot.com',
	messagingSenderId: '200485905422',
	appId: '1:200485905422:web:c4ea9ce755b6aa05c0485f',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore
const db = getFirestore(app)

export { db }
