'use strict'

const Autopost = use('App/Models/Autopost')
const Accountig = use('App/Models/AccountIg')

const fs = require('fs')
const moment = require('moment')
const randomstring = require('randomstring')

class AutoPostController {

  async index({view, params, response}){
    const page = parseInt(params.page) || 1
    const post = await Autopost.query().paginate(page, 5)
    return view.render('tools/autopost/index', {post:post.toJSON()})
  }

  async addView({view, request}){
    const account = await Accountig.all()
    return view.render('tools/autopost/add', {account})
  }

  async add({view, request, session, response}){
    try {
      const req = request.post();
      const image = request.file('image', {

        types: ['image'],
        size: '2mb'
      })

      const filename = `${randomstring.generate({length: 5})}.jpg`
      await image.move('./public/Autopost', {
        name: filename
      })

      if (!image.moved()) {
        session.flash({notification:image.error()});
        return response.redirect('back');  
      }

      const mysqlTimestamp = moment(req.date+' '+req.time).format('YYYY-MM-DD HH:mm:ss')
      const post = new Autopost()
      post.account_id = req.account;
      post.caption = req.caption
      post.image = `${filename}`
      post.publish_time = mysqlTimestamp
      await post.save()
      
      session.flash({notification:'Post Berhasil di tambahkan!'});
      
      return response.redirect('back');
    } catch(e) {
      session.flash({notification:e.message});
      return response.redirect('/');
    }
  }

  async delete({request, response, session}){
    const {id} = request.post()
    try {
      const post = await Autopost.find(id)
      const filename = post.image
      await post.delete()
      await fs.unlinkSync(`./public/Autopost/${filename}`)
      session.flash({notification:'Post Berhasil di dihapus!'})
      return response.redirect('back')
    } catch (e) {
      session.flash({notification:e.message})
      return response.redirect('back')
    }
  }
}

module.exports = AutoPostController
