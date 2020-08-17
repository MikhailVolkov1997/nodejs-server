const {Router} = require('express')
const Card = require('../models/Card')
const Course = require('../models/Course')

const router = Router()

router.get('/', async (req, res) => {
  const card = await Card.fetch()

  res.render('card', {
    isCard: true,
    courses: card.courses,
    price: card.price
  })
})

router.delete('/remove/:id', async (req, res) => {
  const card = await Card.remove(req.params.id)
  res.status(200).json(card)
})

router.post('/add', async (req, res) => {
  const course = await Course.getById(req.body.id)
  await Card.add(course)

  res.redirect('/card')
})

module.exports = router