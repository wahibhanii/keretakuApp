// middleware for admin access auth
let userAuthHandler = (req, res, next) => {
  if(req.session.user){
    let isUser = (req.session.user.role === 'user')
    console.log(isUser, req.session)
    if (isUser){
      next()
    } else (
      res.redirect('/users/login')
    )
  } else {
    res.render('./',{
      loginMessage : 'Please log in first to access!'
    })
  }
}

module.exports = {
  userAuthHandler : userAuthHandler
}
