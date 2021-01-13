const db = connect("mongodb://admin:pass@localhost:27017/admin");
const mydb = db.getSiblingDB('photo_hub_db');
mydb.createUser({
    user: 'dev-user',
    pwd: 'dev-pwd',
    roles: [
        {
            role: 'readWrite',
            db: 'photo_hub_db'
        }
    ]
});

mydb.createCollection('users');
mydb.users.insertOne({
    _id: "login1",
    login: "login1",
    password: "pass",
    displayName: "login1display",
    role: "USER"
});
