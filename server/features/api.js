import express from 'express'

const api = new express.Router()

api.get('/', (req, res) => {
    res.status(200).json({ ok: true })
})

export default api