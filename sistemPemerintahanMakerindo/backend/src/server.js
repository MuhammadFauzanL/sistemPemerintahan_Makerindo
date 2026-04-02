const express = require('express')
const cors = require('cors')
const data_dummy = require('../data_dummy.json')
const app = express()

// set app json -->
app.use(cors())
app.use(express.json())

// function check api key -->
function guardCheck(req,res,next){
    const appKeys = req.headers['x-api-key']

    if(appKeys === 'your-secret-key'){
        next()
    }else{
        res.status(403).json({
            status: 'error',
            message: 'Unauthorized access'
        })
    }
}

app.get('/api/citizens/:nik',guardCheck,(req,res)=>{
    const nik = req.params.nik

    // validate length nik --->
    if(nik.length !== 16 || isNaN(nik)){
        return res.status(400).json({
            status: 'error',
            message: 'NIK harus mengandung 16 digit angka'
        })
    // validate data ditemukan -->
    }if(nik === data_dummy.nik){
        return res.status(200).json({
            status: 'success',
            message: 'Data found',
            timestamp: new Date().toISOString(),
            data: data_dummy
        })
    // return 404 -->
    }else{
        return res.status(404).json({
            status: 'error',
            message: 'Data not found',
            timestamp: new Date().toISOString()
        })
    }
})

app.listen(5000,()=>{
    console.log('server berjalan di 5000')
})