'use strict'

const Autopost = use('App/Models/Autopost')
const Accountig = use('App/Models/AccountIg')

const fs = require('fs')
const moment = require('moment')
const randomstring = require('randomstring')

class ToolController {

  async autoPost({response, view, request, session, params}){
    var page = params.params
    const isPOST = request.method() === "POST"

    if (isPOST) {
      const isAdd = page === "add"
      if (isAdd) {
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

          const isJPEG = image.subtype !== "jpeg"
          if (isJPEG) {
            session.flash({notification:'Gambar harus format JPG'});
            return response.redirect('back');             
          }

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

      const isDelete = page === "delete"
      if (isDelete) {
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

      const isEdit = page === "edit"
      if (isEdit) {
        const id = params.id
        const req = request.post()
        try{
          const post = await Autopost.find(id)
          post.caption = req.caption || post.caption
          const publish_time = moment(req.date+' '+req.time).format('YYYY-MM-DD HH:mm:ss')
          post.publish_time = publish_time || post.publish_time
          await post.save()
          session.flash({notification:'Post Berhasil di edit!'})
          return response.redirect('back')
        } catch (e) {
          session.flash({notification:'Post Gagal di edit! Error :'+e.meesage})
          return response.redirect('back')
        }
      }
    }

    const isAdd = page === "add"
    if (isAdd) {
      const account = await Accountig.all()
      return view.render('tools/autopost/add', {account})
    }

    const isEdit = page === "edit"
    if(isEdit){
      const id = params.id
      const isId = id ? id : false
      if (isId) {
        const post = await Autopost.find(id)
        const datetime = moment(post.publish_time).format('YYYY-MM-DD HH:mm:ss').split(' ')
        post.date = datetime[0]
        post.time = datetime[1]
        return view.render('tools/autopost/edit', {post})
      }
    }

    page = parseInt(page) || 1
    const post = await Autopost.query().paginate(page, 5)
    return view.render('tools/autopost/index', {post:post.toJSON()})
  }
}

module.exports = ToolController
