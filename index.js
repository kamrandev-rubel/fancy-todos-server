const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json())


// user: fancy_todo
// pass: SoOv3XBjnTzhLqgy



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://fancy_todo:SoOv3XBjnTzhLqgy@cluster0.vrcma.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const todoCollection = client.db("fancy-todo").collection("todo");
        console.log('DB Conected');

        app.post('/todo', async (req, res) => {
            const todo = req.body;
            const result = await todoCollection.insertOne(todo);
            res.send(result)
        })

        app.get('/todos', async (req, res) => {
            const todos = await todoCollection.find().toArray();
            res.send(todos)
        })

        app.delete('/todoDelete/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) };
            const result = await todoCollection.deleteOne(query);
            res.send
        })
    }
    finally {

    }
}
run().catch(console.dir)





app.get('/', (req, res) => {
    res.send('Hello World!')
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})