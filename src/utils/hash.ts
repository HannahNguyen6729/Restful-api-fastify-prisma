const bcrypt = require("bcrypt");

const saltRounds = 10;

export const hashPassword = (password: string) => {
  //create a random string
  const salt = bcrypt.genSaltSync(saltRounds);
  //encode the password
  const hash = bcrypt.hashSync(password, salt);

  return { hash, salt };
};

export const verifyPassword = (candidatePassword: string, hash: string) => {
  //check and compare the password and the encoded password
  bcrypt.compareSync(candidatePassword, hash); // true
};
