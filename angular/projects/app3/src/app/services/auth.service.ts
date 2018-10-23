import { User } from './../access/models/user.model';
import * as firebase from 'firebase';

export class Authentication {
  public registerUser(user: User): void {
    console.log('We got here', user);

    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then((response: any) => {

        // removes the attribute password from the object user
        delete user.password;

        // registering complimentary user data in the email path
        firebase.database().ref(`user_detail/${btoa(user.email)}`)
          .set( user );
      })
      .catch((error: Error) => {
        alert(error);
      });
  }

  public auth(email: string, password: string): void {

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((response: any) => console.log(response))
      .catch((error: Error) => console.log(error));
  }
}
