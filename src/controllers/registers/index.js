const controller = {}
controller.all = (req, res) => res.status(501).json({error: 'not implemented'})
controller.query = controller.all
controller.detail = controller.all
controller.insert = controller.all
controller.update = controller.all
controller.remove = controller.all
module.exports = controller
