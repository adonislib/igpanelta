const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
  const Exception = use('Exception')

  Exception.handle('HttpException', async (error, {response, session, view}) => {
    if (error.status === 404) {
      response.send(view.render('404'))
    }
    return
  })

  Exception.handle('InvalidSessionException', async (error, { response, session }) => {
    session.flash({notification:'Login dulu boy, biar ganteng !'});
    await session.commit();
    response.redirect('/auth');
    return
  })

})