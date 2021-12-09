const express = require('express')
const router = express.Router();
const UserController = require('../controllers/UserController')
const multer = require('multer')
const fileupload = require('express-fileupload')
// app.use(fileupload());

const posts = [

    {
        id: 1,
        author: 'John',
        title: 'Templating with pug',
        body: 'Blog post 1'
    },

    {
        id: 2,
        author: 'Peter',
        title: 'React: Starting from the Bottom',
        body: 'Blog post 2'
    },

    {
        id: 3,
        author: 'Violet',
        title: 'Node.js Streams',
        body: 'Blog post 3'
    },

    {
        id: 4,
        author: 'Condy',
        title: 'Node.js Events',
        body: 'Blog post 4'
    }

]
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express', posts: posts});
});
router.get('/login',(req,res)=>{
    res.render('login');
});
router.get('/signup',(req,res)=>{
    res.render('signup');
});
router.get('/saveuser',(req,res)=>{
    res.render('signup');
});
router.get('/login',(req,res)=>{
    res.render('login');
})

// router.get('/addUser',UserController.addUser);
// const storage = multer({
//     storage:multer.diskStorage({
//         destination:function(req,file,cb){
//             cb(null,"./controllers/uploads")
//         },
//         filename:function(req,file,cb){
//             cb(null,file.fieldname+"_"+Date.now+".jpg")
//         }
//     })
// })
// const upload = multer({storage});
// router.post("/uploads",upload,(req,resp)=>{
//     resp.send("file upload")
// })
router.post('/addUser',UserController.addUser);
router.post('/login',UserController.login)
// router.get('/update',UserController.update);
// router.get('/deleteOp',UserController.deleteOp);

module.exports = router