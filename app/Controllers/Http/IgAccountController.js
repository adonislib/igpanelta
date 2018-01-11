'use strict'

const Accountig = use('App/Models/AccountIg')
const Client = require('instagram-private-api').V1

class IgAccountController {

  async index({view}){
    const account = await Accountig.all()
    return view.render('dashboard', {account})
  }

  async edit({request, session, response}){
    const {id, password} = request.post()
    const account = await Accountig.find(id)
    try{
      account.password = password
      await account.save()
      session.flash({notification:`Akun IG Berhasil Di Edit, Lakukan Check untuk mengaktifkan ! (Username: ${account.username})`})
    } catch(e) {
      session.flash({notification:`Akun IG Gagal Di Edit ! Err: ${e.message}`})
    }
    return response.redirect('back');
  }

  async check({request, session, response}){
    const {id} = request.post()
    const account = await Accountig.find(id)
    try{      
      const device = new Client.Device(account.username)
      const storage = new Client.CookieMemoryStorage()
      const IGsession = new Client.Session(device, storage)
      await Client.Session.create(device, storage, account.username, account.password)
      session.flash({notification:`Akun IG Berhasil Di CEK ! (Username: ${account.username})`})
       account.isActive = 1
      await account.save()
    } catch(e) {
      account.isActive = 0
      await account.save()
      session.flash({notification:`Akun IG Gagal Login ! Err: ${e.message}`})
    }
    return response.redirect('back');
  }

  async add({request, session, response}){
    const {username, password} = request.post()
    const device = new Client.Device(username)
    const storage = new Client.CookieMemoryStorage()
    const IGsession = new Client.Session(device, storage)
    try{
      await Client.Session.create(device, storage, username, password)
      const account = new Accountig()
      account.username = username
      account.password = password
      await account.save()
      session.flash({notification:`Akun Berhasil di tambahkan! (Username: ${username})`})
    } catch(e) {
      session.flash({notification:e.message});
    }
    return response.redirect('back')
  }

  async delete({request, session, response}){
    const {id} = request.post()
    try {
      const account = await Accountig.find(id)
      await account.delete()
      session.flash({notification:'Akun Berhasil di dihapus!'})
    } catch(e) {
      session.flash({notification:e.message});
    }
    return response.redirect('back');
  }

}

module.exports = IgAccountController
