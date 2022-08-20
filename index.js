const express = require('express')
const cors = require('cors');
require('dotenv').config()
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000


app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fc5gvnx.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

 async function run (){

    try{
await client.connect()
console.log('database connected')
const courseCollection=client.db('edtech_course').collection('courses')
app.get('/course', async(req, res) => {
    const query={}
    const cursor=courseCollection.find(query)
    const courses=await cursor.toArray()
    res.send(courses)
  })
  app.get('/course/:id',async(req,res)=>{
   
    const id=req.params.id
    console.log(id)
    const query= {_id:ObjectId(id)}
    const item=await courseCollection.findOne(query)
res.send(item)
console.log(item)


  })
  
    }
    finally{

    }
}
run().catch(console.dir)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})