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

    this.info(`Set Admin`)
    const user = new User()

    user.username = await this.ask('Username:'); // INSERT YOUR USERNAME
    user.email = await this.ask('Email address:'); // INSERT YOUR EMAIL
    user.password = await this.secure('Password:'); // INSERT YOUR PASSWORD

    try {
      await user.save()
      this.completed('set:admin', `Created Admin ${user.username} row successfuly!`);
    } catch(e) {
      this.warn(e)
    }
    return;
  }
}

module.exports = SetAdmin
