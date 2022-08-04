export default (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);
