const jwt = require("jwt-simple");
const moment = require("moment");

const SECRET_KEY = "WdsLdZQthD0mdFpwW22vbkRtS154O1xjEg";

//Creacion de token
//momentjs.com para documentación
//JWT-simple para documentación

exports.createAccessToken = function (user) {
  const payload = {
    id: user._id,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    role: user.role,
    createToken: moment().unix(),
    exp: moment().add(3, "hours").unix(),
  };
  //encriptacion
  return jwt.encode(payload, SECRET_KEY);
};
//funcion que crea refresh token
exports.createRefreshToken = function (user) {
  const payload = {
    id: user._id,
    exp: moment().add(30, "days").unix(),
  };

  return jwt.encode(payload, SECRET_KEY);
};

//decodificacion de cualquier token
exports.decodedToken = function (token) {
  return jwt.decode(token, SECRET_KEY, true);
};
