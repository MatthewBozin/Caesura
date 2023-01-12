module.exports = {
  ensureAuth: function (req: any, res: any, next: any) {
    if (req.isAuthenticated()) {
      return next()
    }
  }
}
