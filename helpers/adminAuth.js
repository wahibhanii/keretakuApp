// middleware for admin access auth
let adminAuthHandler = (req, res, next) => {
  if(req.session.user){
    let isAdmin = (req.session.user.role === 'admin')
    console.log(isAdmin, req.session)
    if (isAdmin){
      next()
    } else (
      res.render('./', {
        loginMessage : 'Only Admin can access!'
      })
    )
  } else {
    res.render('./',{
      loginMessage : 'Only Admin can access!'
    })
  }
}

module.exports = {
  adminAuthHandler : adminAuthHandler
}
