import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "test"
});

// app use express json helps to call post api and get response from server.
app.use(express.json())

// app use cors need to send data from  mySQL to Client
app.use(cors())

app.get("/", (req, res)=>{
    res.json("hello backend")
})

app.get("/books", (req, res) =>{
    const q = "SELECT * FROM books";
    db.query(q,(err, data) =>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post("/books",(req, res) =>{
    const q = "INSERT INTO books (`title`, `desc`, `cover`, `price`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price
    ]

    db.query(q, [values], (err,data) => {
        if(err) return res.json(err);
        return res.json("Book has been created successfully.");
    });
});

// params represent url and id represent id.
app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?";

    db.query(q, [bookId], (err, data)=>{
        if(err) return res.json(err);
        return res.json("Book has been deleted successfully")
    })
});


app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

    const values= [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]

    db.query(q, [...values, bookId], (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    });
});




app.listen(8800,() => {
    console.log("Connect to localhost:8800");
})