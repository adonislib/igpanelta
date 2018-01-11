'use strict'

const Schema = use('Schema')

class AccountIgSchema extends Schema {
  up () {
    this.create('account_igs', (table) => {
      table.increments()
      table.string('username', 50).notNullable().unique()
      table.string('password', 100).notNullable()
      table.boolean('isActive').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('account_igs')
  }
}

module.exports = AccountIgSchema
