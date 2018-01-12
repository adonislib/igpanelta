'use strict'

const Accountig = use('App/Models/AccountIg')

class DashboardController {

  async index({view}){
    const account = await Accountig.all()
    return view.render('main', {account})    
  }

}

module.exports = DashboardController
