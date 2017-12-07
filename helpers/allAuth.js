// middleware for admin access auth
let allAuthHandler = (req, res, next) => {
  if(req.session.user){
    let isAdmin = (req.session.user.role === 'admin')
    let isUser = (req.session.user.role == 'user')
    if(isAdmin){
      next()
    } else {
      if (req.params.id == req.session.user.userId){
        next()
      } else {
        res.render('./',{
          loginMessage : 'Restricted Access!'
        })
      }
    }
  } else {
    res.render('./',{
      loginMessage : 'You need to Login to access!'
    })
  }
}

module.exports = {
  allAuthHandler : allAuthHandler
}
