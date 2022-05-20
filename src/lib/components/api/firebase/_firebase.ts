import { getAuth } from 'firebase/auth';
import * as firebaseui from 'firebaseui';
import { initializeApp } from 'firebase/app';
import 'firebaseui/dist/firebaseui.css';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_KEY as string,
	authDomain: 'PROJECT_ID.firebaseapp.com',
	// The value of `databaseURL` depends on the location of the database
	databaseURL: 'https://DATABASE_NAME.firebaseio.com',
	projectId: 'PROJECT_ID',
	storageBucket: 'PROJECT_ID.appspot.com',
	messagingSenderId: 'SENDER_ID',
	appId: 'APP_ID',
	// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
	measurementId: 'G-MEASUREMENT_ID'
};

export const app = initializeApp(firebaseConfig);
export const ui = new firebaseui.auth.AuthUI(getAuth(), app.name);
export const db = getFirestore(app);
