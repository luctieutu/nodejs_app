import pool from "../configs/connectDB";

let getAllUsers = async(req, res) => {
    
    const [rows, fields] = await pool.execute('SELECT * FROM user');
    return res.status(200).json({
        message: 'ok',
        data: rows
    })
}

let createNewUser = async(req, res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let mail = req.body.mail;
    let address = req.body.address;
    if(!firstName || !lastName || !mail || !address) {
        return res.status(200).json({
            message:'missing required params'
        })
    }
    await pool.execute('insert into user(firstName, lastName, mail, address) values ( ?, ?, ?, ?)',
    [firstName, lastName, mail, address]);
    return res.status(200).json({
        message:'ok'
    })
}
let updateUser = async(req, res) => {
    let {firstName, lastName, mail, address, id} = req.body;
    if(!firstName || !lastName || !mail || !address || !id) {
        return res.status(200).json({
            message:'missing required params'
        })
    }
    await pool.execute('update user set firstName = ?, lastName = ?, mail = ?, address = ? where id = ?'
    ,[firstName, lastName, mail, address, id]);
    return res.status(200).json({
        message:'update ok'
    })

}
let deleteUser = async(req, res) => {
    let userId = req.body.id;
    await pool.execute(`delete from user where id = ?`,[userId]);
    return res.status(200).json({
        message:'delete ok'
    })
}
module.exports = {
    getAllUsers, createNewUser, updateUser, deleteUser
}