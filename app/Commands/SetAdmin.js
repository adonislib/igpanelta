'use strict'

const { Command } = require('@adonisjs/ace')
const User = use('App/Models/User')

class SetAdmin extends Command {
  static get signature () {
    return 'set:admin'
  }

  static get description () {
    return 'Edit app/Commands/SetAdmin.js For Credentials'
  }

  async handle (args, options) {
    const user = new User()
    user.username = '' // INSERT YOUR USERNAME
    user.email = '' // INSERT YOUR EMAIL
    user.password = '' // INSERT YOUR USERNAME
    try {
      await user.save()
      this.info(`Admin Created !`)
      this.info(`Username: ${user.username} !`)
      this.info(`Email: ${user.email}`)
      this.info(`Password: ${user.password} !`)
    } catch(e) {
      this.warn(e)
    }
  }
}

module.exports = SetAdmin
