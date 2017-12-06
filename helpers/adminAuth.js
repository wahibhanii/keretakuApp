// middleware for admin access auth
let adminAuthHandler = (req, res, next) => {
  console.log('masuk auth admiiiiiiiin')
  let isAdmin = (req.session.user.role === 'admin')
  console.log(isAdmin, req.session)
  if (isAdmin){
    next()
  } else (
    res.redirect('/users/login')
  )
}

module.exports = {
  adminAuthHandler : adminAuthHandler
} 