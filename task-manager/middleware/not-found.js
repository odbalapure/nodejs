const notFound = (err, req, res, next) => {
  console.log("Request resource not found...")
  res.status(404).send({ msg: err });
}

module.exports = notFound;