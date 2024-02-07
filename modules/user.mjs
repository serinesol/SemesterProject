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
        DBManager.save(this);
    }

}

export default User;