const express = require('express')
const pool = require('./db')
const app = express()
const PORT = 5005

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello PostgreSQL!')
})

// ユーザー情報の取得
app.get('/users', (req, res) => {
  pool.query('SELECT * FROM users', (err, results) => {
    if (err) {
      throw err
    }
    return res.status(200).json(results.rows)
  })
})

// IDからユーザー情報の取得
app.get('/users/:id', (req, res) => {
  const id = req.params.id
  pool.query('SELECT * FROM users WHERE id = $1', [id], (err, results) => {
    if (err) {
      throw err
    }
    return res.status(200).json(results.rows)
  })
})

// ユーザーの新規登録
app.post('/users', (req, res) => {
  const { name, email, age } = req.body
  pool.query(
    'SELECT s FROM users s WHERE s.name = $1',
    [name],
    (err, results) => {
      if (results.rows.length) {
        return res.send('そのユーザー名はすでに使用されています')
      }

      pool.query(
        'INSERT INTO users (name, email, age) VALUES ($1, $2, $3)',
        [name, email, age],
        (err, results) => {
          if (err) {
            throw err
          }
          return res.status(201).send('新しいユーザーを作成しました')
        }
      )
    }
  )
})

// ユーザーの削除
app.delete('/users/:id', (req, res) => {
  const id = req.params.id

  pool.query('SELECT * FROM users WHERE id = $1', [id], (err, results) => {
    if (err) {
      throw err
    }
    const isUserExisted = results.rows.length
    if (!isUserExisted) {
      return res.send('ユーザーが存在しません')
    }
  })

  pool.query('DELETE FROM users WHERE id = $1', [id], (err, results) => {
    if (err) {
      throw err
    }

    return res.status(200).json('ユーザーを削除しました')
  })
})

// ユーザー名の更新
app.put('/users/:id', (req, res) => {
  const id = req.params.id
  const name = req.body.name

  pool.query('SELECT * FROM users WHERE id = $1', [id], (err, results) => {
    if (err) {
      throw err
    }

    const isUserExisted = results.rows.length
    if (!isUserExisted) {
      return res.send('ユーザーが存在しません')
    }
  })

  pool.query(
    'UPDATE users SET name = $1 WHERE id = $2',
    [name, id],
    (err, results) => {
      if (err) {
        throw err
      }
      return res.status(200).send('ユーザ名を更新しました')
    }
  )
})

app.listen(PORT, () => {
  console.log('listening on port')
})
