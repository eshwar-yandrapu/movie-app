const express = require('express')
const request = require('request')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
//middlewares
app.set("view engine", "ejs")
/* routing
*/
app.get('/', (req,res)=>{
    //res.send('Home page')
    res.render("home")//home.ejs .ejs is not necessary keep "(html file name)"
    //when we use render express by default looks at a directory named views so we cannot have a different name for views directory
})



app.get('/result', (req, res)=>{
    console.log(req.query)
   // res.send(`you have searched for ${req.query.Moviename}`)
    const url = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${req.query.Moviename}`
    request(url, function(error, response, body){ // here using request dependency we made a request to a url which expects a callback [function]
        if(!error && response.statusCode===200){  //google http statuscode mdn : status code 200 means success
            const data = JSON.parse(body) //json is not essentially a javascript object we have to convert json into javascript objects this line does that
            //res.send(data)
            res.render("result", {Moviesdump: data})  //here moviesdump is a js variable which is accessable in ejs file
        }else{
             res.send('something went wrong')
        }
    })

}) 
app.get('/result/:id', (req,res)=>{   //:rollno  here you can keep anything after student/ which doesnt matter but it shows the page
    //console.log(req.params)   //request is a complete js object and params is one of the proprerties of the objects and this param contains whatever data we send in rollno
    //template string in javascript
    //res.send(`student roll number ${req.params.rollno}`)   // in js we should use ` not ' this
    const url = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${req.params.id}`
    request(url, function(error, response, body){ // here using request dependency we made a request to a url which expects a callback [function]
        if(!error && response.statusCode===200){  //google http statuscode mdn : status code 200 means success
            const data = JSON.parse(body) //json is not essentially a javascript object we have to convert json into javascript objects this line does that
            //res.send(data)
            res.render("details", {data: data})  //here moviesdump is a js variable which is accessable in ejs file
        }else{
             res.send('something went wrong')  
        }
    })
})

app.get('/about', (req, res)=>{
    res.send('this is about page')
})

app.get('*', (req, res)=>{
    res.send('404 NOT FOUND')
})

app.listen(3000, ()=>{
    console.log("server has started")
})