db.createUser({
  user: "matias",
  pwd: "admin123",
  roles: [
    {
      role: "dbOwner",
      db: "phonebook_db",
    },
  ],
});

db.createCollection("people");

db.people.insert({ name: "Pekka", number: "020-0202022" });
db.people.insert({ name: "Antti", number: "123-4567891" });
