const express = require('express')
require('./db/conn')
const Student = require('./models/students')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('hello from the other side')
})

// create a new student
// app.post('/students', (req, res) => {
//   const user = new Student(req.body)
//   user
//     .save()
//     .then(() => {
//       res.status(201).send(user)
//     })
//     .catch((e) => {
//       res.status(400).send(e)
//     })
// })

app.post('/students', async (req, res) => {
  try {
    const user = new Student(req.body)
    const createUser = await user.save()
    res.status(201).send(createUser)
  } catch (e) {
    res.status(400).send(e)
  }
})

// read the data of all students
app.get('/students', async (req, res) => {
  try {
    const studentsData = await Student.find()
    res.send(studentsData)
  } catch (e) {
    res.send(e)
  }
})

// get the individual student using id
app.get('/students/:id', async (req, res) => {
  try {
    const studentData = await Student.findById(
      req.params.id
    )
    if (!studentData) {
      return res.status(404).send()
    } else {
      res.send(studentData)
    }
  } catch (e) {
    res.status(500).send(e)
  }
})

app.listen(port, () => {
  console.log(`connection is setup at ${port}`)
})
