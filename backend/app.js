const express = require('express')
const app = express();
const db = require('./db');
const routes = require('./routes/routes')
const fileupload = require('express-fileupload')
const port = process.env.PORT || 7000  
const cookieParser = require('cookie-parser')

const multer = require('multer')


app.use(cookieParser);
app.use(express.json({extended: false}));
app.use(express.urlencoded({extended: true}));
app.listen(port,()=>{
    console.log('app connected:' + port)
})
// router.get('/addUser',UserController.addUser);
const storage = multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,"./controllers/uploads")
        },
        filename:function(req,file,cb){
            cb(null,file.fieldname+"_"+Date.now+".jpg")
        }
    })
})
const upload = multer({storage});
// router.post("/uploads",upload,(req,resp)=>{
//     resp.send("file upload")
// })
app.set('view engine','ejs')
app.use(fileupload());
app.use('/',routes)

