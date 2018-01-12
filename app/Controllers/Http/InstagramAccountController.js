'use strict'

const Client = require('instagram-private-api').V1

const Accountig = use('App/Models/AccountIg')

class InstagramAccountController {

  async index({view, auth, response, params, request, session}){
    const page = params.params

    const isAdd = page === "add"
    if(isAdd){
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

    const isDelete = page === "delete"
    if (isDelete) {
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

    const isCheck = page === "check"
    if (isCheck) {
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

    const isEdit = page === "edit"
    if (isEdit) {
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

    return response.redirect('back');
  }
}

module.exports = InstagramAccountController
