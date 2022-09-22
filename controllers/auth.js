const jwt = require("../services/jwt");
const moment = require("moment");
const User = require("../models/user");

function willExpireToken(token) {
  const { exp } = jwt.decodedToken(token);
  const CurrentDate = moment().unix();

  if (CurrentDate > exp) {
    return true;
  }
  return false;
}

function refreshAccessToken(req, res) {
  const { refreshToken } = req.body;
  const isTokenExpired = willExpireToken(refreshToken);
  console.log(isTokenExpired);

  if (isTokenExpired) {
    res.status(404).send({ msg: "El refreshToken ha expirado." });
  } else {
    const { id } = jwt.decodedToken(refreshToken);

    User.findOne({ _id: id }, (err, userStored) => {
      if (err) {
        res.status(500).send({ msg: "Error del servidor." });
      } else {
        if (!userStored) {
          res.status(404).send({ msg: "Usuario no ecnontrado." });
        } else {
          res.status(200).send({
            accessToken: jwt.createAccessToken(userStored),
            refreshToken: refreshToken,
          });
        }
      }
    });
  }
}

module.exports = {
  refreshAccessToken,
};
