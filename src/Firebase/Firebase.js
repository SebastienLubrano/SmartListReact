import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import config from './config';

class Firebase {
    constructor() {
        firebase.initializeApp(config);
        this.db = firebase.firestore();
        this.timestamp = firebase.firestore.Timestamp();
        this.auth = firebase.auth();
        this.auth_ = firebase.auth;
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);


    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password => 
        this.auth.currentUser.updatePassword(password);
}

export default Firebase;