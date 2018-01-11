'use strict'

class AuthController {

  async index({view, auth, response}){
    try {
      await auth.check();
      return response.redirect('/');
    } catch (e) {
      return view.render('login');
    }
  }

  async login({request, auth, session, response }){
    const {email,password} = request.post();
    try {
      await auth.attempt(email,password);
      session.flash({notification:'Login Sukses !'});
      return response.redirect('/');
    } catch (e) {
      var message = 'Email atau Password salah boy, coba lagi tahun depan !11!!1!';
      if (e.message === 'E_CANNOT_LOGIN: Cannot login multiple users at once, since a user is already logged in') {
        message = 'Org lain lagi login pake akun ini boy ...';
      }
      session.flash({notification:message});
      await session.commit();
      return response.redirect('back');
    }
  }

  async logout({auth, response, session}){
    await auth.logout();
    session.flash({notification:'Anda Telah Logout ...'});
    return response.redirect('/auth');
  }

}

module.exports = AuthController
