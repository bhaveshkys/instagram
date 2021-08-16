import Firebase from'firebase/app';
import'firebase/firestore';
import'firebase/auth';

//import{seedDatabase} from '../seed'
const config={
apiKey: "AIzaSyBuY2kTjpCF2jr_3yJb4T42Aq1-3nFOObI",
authDomain: "instagram-c3008.firebaseapp.com",
projectId: "instagram-c3008",
storageBucket: "instagram-c3008.appspot.com",
messagingSenderId: "1028383847823",
appId: "1:1028383847823:web:e06bafc78a17a0183947fa"
};
const firebase =Firebase.initializeApp(config);
const {Fieldvalue}= Firebase.firestore; 

//  seedfile stuff
console.log('firebase',firebase);

//seedDatabase(firebase);

export {firebase,Fieldvalue};
