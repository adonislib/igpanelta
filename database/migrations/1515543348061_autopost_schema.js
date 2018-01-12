'use strict'

const Schema = use('Schema')

class AutopostSchema extends Schema {
  up () {
    this.create('autoposts', (table) => {
      table.increments()
      table.integer('account_id').unsigned().references('id').inTable('account_igs').notNullable()
      table.text('caption').notNullable()
      table.text('image').notNullable()
      table.dateTime('publish_time').notNullable()
      table.boolean('is_published').defaultTo(false).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('autoposts')
  }
}

module.exports = AutopostSchema
