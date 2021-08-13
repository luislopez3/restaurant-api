const User = {
  create(db, user) {
    return db("users").insert(user);
  },
  findOne(db, query) {
    return db("users").select("*").where(query).first();
  },
};

module.exports = User;
