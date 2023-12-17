import { jwtDecode } from "jwt-decode"

const auth = {
  isAuthenticated() {
    if (typeof window == "undefined")
      return false

    if (sessionStorage.getItem('jwt'))
      return JSON.parse(sessionStorage.getItem('jwt'))
    else
      return false
  },
  isMycourse(insId){
    if (typeof window == "undefined")
    return false

      if (sessionStorage.getItem('jwt')){
          const userId = jwtDecode(this.isAuthenticated().token)._id

        return userId == insId
      }
      else{
        return false
      }

  },
  isEducator(){
    if (typeof window == "undefined")
      return false
    const dt = JSON.parse(sessionStorage.getItem('jwt'))
     if (dt.user.educator) return true
     return dt.user.educator;
  },
  authenticate(jwt) {
    if (typeof window !== "undefined")
      sessionStorage.setItem('jwt', JSON.stringify(jwt))
    // cb()
  },
  clearJWT(cb) {
    if (typeof window !== "undefined")
      sessionStorage.removeItem('jwt')
    cb()
    //optional
    // signout().then((data) => {
      document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    // })
  },
  updateUser(user, cb) {
    if(typeof window !== "undefined"){
      if(sessionStorage.getItem('jwt')){
         let auth = JSON.parse(sessionStorage.getItem('jwt'))
         auth.user = user
         sessionStorage.setItem('jwt', JSON.stringify(auth))
         cb()
       }
    }
  }
}

export default auth