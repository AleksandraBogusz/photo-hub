let db = connect("mongodb://admin:pass@localhost:27017/admin");
let mydb = db.getSiblingDB('photo_hub_db');
mydb.createUser({
    user: 'dev-user',
    pwd: 'dev-pwd',
    roles: [
        {
            role: 'readWrite',
            db: 'photo_hub_db'
        }
    ]
})
