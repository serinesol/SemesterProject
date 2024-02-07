import DBManager from "./storageManager.mjs"

class User {

    constructor() { // Initializing instance of the 'User' class
        ///TODO: Are these the correct fields for your project?
        this.email;
        this.pswHash;
        this.name;
        this.id;
    }

    // He likes the "save" function
    save() {
        if (this.id == null) {
            DBManager.createUser(this);
        } else {
            DBManager.updateUser(this);
        }
    }

    delete() {
        DBManager.deleteUser(this);
    }

}

export default User;