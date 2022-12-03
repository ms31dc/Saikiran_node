const http= require('http');
const fs= require('fs');
const path = require('path');

const { MongoClient, ServerApiVersion } = require('mongodb');

async function connectionMongo()
{

    const uri = "mongodb+srv://smoha:smoha_passwd01@cluster0.i9im2ny.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri)

    
        await client.connect()

        const result= await client.db("reviews_db").collection("reviews").find({})
        let reviews_arr = await result.toArray()
        return reviews_arr
        //console.log(reviews_arr)


}



 
const server   =http.createServer(async(req,res) => {

////kkkkk
const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Max-Age": 2592000, // 30 days
    "Content-Type": 'application/json' 
  };

/////kkkk

console.log(req.url)

if(req.url === '/'){

    fs.readFile( path.join(__dirname,'public','index.html'),(err,data)=>{
    if (err) throw err;

    res.writeHead(200,{ 'Content-Type' : 'text/html'});
    res.end(data);
    })
   
}
else if(req.url=='/api')
{
/*
I have commented this part as I am using data from Mongo DB
    fs.readFile( path.join(__dirname,'public','db.json'),(err,data)=>{
        if (err) throw err;
    
        res.writeHead(200,headers);
        res.end(data);
        })

*/
       /*
            Mongo DB COde to access data from Mongo DB and serve it as JSON on /api
       */
            const aa = await connectionMongo();
            res.writeHead(200,headers);
            res.end(JSON.stringify(aa))
            //console.log(aa)
            

}
else{

    res.end("Eror 404 Page not found")
}

});

const PORT = process.env.PORT || 5959;

server.listen(PORT,() => console.log(`yay the server is running finally ${PORT}`));
