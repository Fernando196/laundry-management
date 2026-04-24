const jsonServer = require('json-server')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const PORT = 3001
const DB_PATH = path.join(__dirname, 'db.json')
const UPLOADS_DIR = path.join(__dirname, 'uploads')

if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true })

const server = jsonServer.create()
const router = jsonServer.router(DB_PATH)
const middlewares = jsonServer.defaults({ noCors: false })

// ── Image upload storage ────────────────────────────────────
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    cb(null, `machine-${Date.now()}${ext}`)
  },
})
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (_req, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png', '.webp']
    const ext = path.extname(file.originalname).toLowerCase()
    cb(null, allowed.includes(ext))
  },
})

server.use(middlewares)

// Serve uploaded files statically at /uploads/<filename>
server.use('/uploads', require('express').static(UPLOADS_DIR))

// POST /upload/machine-image  →  { url, filename }
server.post('/upload/machine-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ error: 'No se recibió ninguna imagen o formato no soportado (jpg, png, webp)' })
  }
  res.json({
    url: `http://localhost:${PORT}/uploads/${req.file.filename}`,
    filename: req.file.filename,
  })
})

server.use(router)

server.listen(PORT, () => {
  console.log('')
  console.log('  JSON Server corriendo en http://localhost:' + PORT)
  console.log('')
  console.log('  Recursos disponibles:')
  console.log('    GET/POST   http://localhost:' + PORT + '/machines')
  console.log('    GET/POST   http://localhost:' + PORT + '/orders')
  console.log('    GET/POST   http://localhost:' + PORT + '/order_products')
  console.log('    GET/POST   http://localhost:' + PORT + '/users')
  console.log('    GET/POST   http://localhost:' + PORT + '/products')
  console.log('')
  console.log('  Upload de imagen:')
  console.log('    POST       http://localhost:' + PORT + '/upload/machine-image')
  console.log('    field:     image (multipart/form-data)')
  console.log('    response:  { url, filename }')
  console.log('')
  console.log('  Archivos estáticos:')
  console.log('    http://localhost:' + PORT + '/uploads/<filename>')
  console.log('')
})
