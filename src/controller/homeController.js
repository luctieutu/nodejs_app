import pool from "../configs/connectDB";
import multer from "multer";
import path from "path";

let getHomepage = async(req, res) => {

    const [rows, fields] = await pool.execute('SELECT * FROM user');
    return res.render('index.ejs', { dataUser: rows })
    }

let getDatailPage = async(req, res) => {
    let UserId = req.params.userId;
    let [user] = await pool.execute(`select * from user where id = ?`, [UserId]);
    return res.render('getUser.ejs', {dataUser: user[0]})
}
let createNewUser = async (req,res) => {
    console.log('ckeck req:',req.body);
    //C1:
    //let {firstName,lastName,mail,address} = req.body;
    // c2:
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let mail = req.body.mail;
    let address = req.body.Address;
    await pool.execute('insert into user(firstName, lastName, mail, address) values ( ?, ?, ?, ?)',
    [firstName, lastName, mail, address]);
    return res.redirect('/');
}
let deleteUser = async(req,res) => {
    let userId = req.body.id;
    await pool.execute(`delete from user where id = ?`,[userId]);
    return res.redirect('/');
}
let getEditPage = async(req, res) => {
    let UserId = req.params.userId;
    let [user] = await pool.execute(`select * from user where id = ?`, [UserId]);
    return res.render('update.ejs', {dataUser: user[0]})
}
let getSaveUpdate = async(req, res) => {
    let {firstName, lastName, mail, address, id} = req.body;
    // let firstName = req.body.firstName;
    // let lastName = req.body.lastName;
    // let mail = req.body.mail;
    // let address = req.body.Address;
    // let id = req.body.id;
    await pool.execute('update user set firstName = ?, lastName = ?, mail = ?, address = ? where id = ?'
    ,[firstName, lastName, mail, address, id]);
    return res.redirect('/');
}

let uploadFilePage = async(req, res) => {
    return res.render('uploadfile.ejs');
}

let handleUploadFile = async(req, res) => {
    if (req.fileValidationError) {

        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }

    // Display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    // });
}
 
let handleUploadMultipleFiles = async (req, res) => {
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }

    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="/upload">Upload more images</a>';
    res.send(result);
}
module.exports = {
    getHomepage, getDatailPage, createNewUser, deleteUser, getEditPage, getSaveUpdate,
     uploadFilePage, handleUploadFile, handleUploadMultipleFiles
}