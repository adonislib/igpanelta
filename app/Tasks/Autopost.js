'use strict'

const moment = require('moment')
const Client = require('instagram-private-api').V1
const fs = require('fs')

const Accountig = use('App/Models/AccountIg')
const AutoPost = use('App/Models/Autopost')
const Database = use('Database')

class Autopost {

  // This is required. This is the schedule for which the task will run.
  // More docs here: https://github.com/node-schedule/node-schedule#cron-style-scheduling
  static get schedule () {
    // once every minute
    return '*/1 * * * *'
  }

  // This is the function that is called at the defined schedule
  async handle() {
    // Do stuff here
    // Supports `async/await`

    try {
      const nowTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
      const post = await Database.table('autoposts').where('publish_time', nowTimestamp)
      if (post.length > 0) {
        await Promise.all(post.map(async(post)=>{
          const account = await Accountig.findBy('id', post.account_id)
          const device = new Client.Device(account.username)
          const storage = new Client.CookieMemoryStorage()
          const IGsession = new Client.Session(device, storage)
          await Client.Session.create(device, storage, account.username, account.password)
          const upload = await Client.Upload.photo(IGsession, './public/Autopost/'+post.image)
          const result = await Client.Media.configurePhoto(IGsession, upload.params.uploadId, post.caption)
          const publishedUpdate = await AutoPost.findBy('id', post.id)
          publishedUpdate.is_published = 1
          await publishedUpdate.save()
        }))
      }
    } catch(e){
      console.log(e)
    }

    
  }
}

module.exports = Autopost
