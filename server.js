//  var AWS = require('aws-sdk');
// AWS.config.loadFromPath("./config.json");
// const express = require('express')
// const async = require('async')
// AWS.config.apiVersions = {
//   rekognition: '2016-06-27',
//   // other service API versions
// }
// process.setMaxListeners(Infinity);
// const rekognition = new AWS.Rekognition()
// const bodyParser = require('body-parser');
// // const fetch =require('node-fetch')
// const request = require("request").defaults({ encoding: null });
// // App
// // const imagerouter= require('./routes/images')
// const app = express()
// // Morgan
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(bodyParser.raw());
// app.use(bodyParser.text())



// app.get('/', (req, res) => {
//     res.json({ message: 'Hello world' })
// })

// app.post('/image/', (req, res) => {
       
  
 
//  var obj
// let urls= req.body
// let requests = []
  

// var requestAsync = function(url) {
//     return new Promise((resolve, reject) => {
//         var req = request(url, (err, response, body) => {
//             if (err) return reject(err, response, body);
//             resolve(new Buffer.from(body,'base64'));
//         });
//     });
// };
// var getParallel = async function(callback) {
//   //transform requests into Promises, await all
//   try {
    
//       var data = await Promise.all(urls.map(requestAsync));
//       const parms =     {
//     Image: {
//       Bytes: data[0] 
      
//     },
   
//     MaxLabels: 10,
//   }
//   rekognition.detectLabels(parms, function (err, data) {
//        //  req.setHeader(‘Content-Type’, ‘application/json’)
//        if (!err) {
      
//           requests.push((data.Labels));
//           console.log(requests)
  
//        }
//   })
//     }
//    catch (err) {
//       console.error(err);
//   }
//   console.log(data);
// }
// getParallel();
// }

// )


//   // .then(() => console.log(obj))

  

  
//   // console.log(t)
//   // const parms =     {
//   //   Image: {
//   //     Bytes: texts,
//   //   },
//   //   MaxLabels: 10,
//   // }
//   // ;rekognition.detectLabels(parms, function (err, data) {
//   //   //  req.setHeader(‘Content-Type’, ‘application/json’)
//   //   if (!err) {
    
//   //      requests.push((data.Labels));
//   //      console.log(requests)

//   //   }
  
  
// // })



  













// app.listen('3002')
var AWS = require('aws-sdk');
AWS.config.loadFromPath("./config.json");
const express = require('express')

AWS.config.apiVersions = {
  rekognition: '2016-06-27',
  // other service API versions
}
process.setMaxListeners(Infinity);
const rekognition = new AWS.Rekognition()
const bodyParser = require('body-parser');

const request = require("request").defaults({ encoding: null });
// App
// const imagerouter= require('./routes/images')
const app = express()
// Morgan
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text())



app.get('/', (req, res) => {
    res.json({ message: 'Hello world' })
})

app.post('/image/', (req, res) => {
let url= req.body


Promise.all(url).then(resonses => resonses.forEach( resonse => {
  request.get(resonse,function(err, re, body){
    const buffer = new Buffer.from(body);
    const parms =     {
      Image: {
        Bytes: buffer,
      },
      MaxLabels: 10,
    };rekognition.detectLabels(parms,  (err, data) => {
        if (err) {
          console.log(err, err.stack);
        } else {
          let leb =[]
          
            leb.push(data)
            for(i in data){
            res.write(JSON.stringify(leb));
        
        }
      }
      }
    );
    setInterval(function () {
      res.end();
    },   7000);

 
    })

  })
)
})

app.listen('3003')