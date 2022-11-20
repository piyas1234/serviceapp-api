export default (err, req, res, next) => {
    if (err.isServer) {
      
    }
    return res.status(err.output.statusCode).json(err.output.payload)
}
