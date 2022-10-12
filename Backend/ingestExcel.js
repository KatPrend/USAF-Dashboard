const path = require('path')
const fs = require('fs');
const router = express.Router()
const bodyparser = require('body-parser')
router.use(express.static('./public'))
router.use(bodyparser.json())
router.use(
    bodyparser.urlencoded({
        extended: true,
    }),
    )    
const readXlsxFile = require('read-excel-file/node')
const multer = require('multer')  
  
const storage = multer.diskStorage({
        destination: (req, file, cb) => {
        cb(null, __dirname + '/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    },
})

const uploadFile = multer({ storage: storage })
    router.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html')
})

router.post('/import-excel', uploadFile.single('import-excel'), (req, res) => {
    importFileToDb(__dirname + '/uploads/' + req.file.filename)
    console.log(res)
})

function importFileToDb(exFile) {
    readXlsxFile(exFile).then((rows) => {
        rows.shift()
        
        let query = 'INSERT INTO project_info_import (`TASK ID`, `Task Description`,  `Month`,  `WBS`, `CLIN`, `Source Type`, `Resource`, `Resource Description`, `Resource Type`, `Rate`, `Hours`, `Units`, `Cost`, `Base Cost`, `Direct Cost`, `Total Price`) VALUES ?'
        db.query(query, [rows], (error, response) => {
        console.log(error || response)
        })
        
    })
}

exports.module = router;