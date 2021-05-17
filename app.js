const express = require('express');

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sabanokirimi',
    database: 'list_app'
  });

  connection.connect((err) => {
    if (err) {
      console.log('error connecting: ' + err.stack);
      return;
    }
    console.log('success');
  });  

  app.get('/index', (req, res) => {
    connection.query(
      'SELECT * FROM users',
      (error, results) => {
        console.log(results);
        res.render('index.ejs',{items:results});
      }
    );
  });

app.get('/', (req, res) => {
    res.render('hello.ejs');
  });

app.get('/new', (req, res) => {
    res.render('news.ejs');
  });

 app.post('/create',(req,res)=>{
 connection.query(
   'INSERT INTO users(name,smoke,charge,station) VALUE (?,?,?,?)',
   [req.body.userName, req.body.smokeType, req.body.chargeType, req.body.stationName],
   (error,results)=>{
    console.log(error); 
    res.redirect('/index');
}
  );
});
 
 app.post('/delete/:id',(req,res)=>{
   connection.query(
     'DELETE FROM users WHERE id = ?',[req.params.id],
     (error,results)=>{
       console.log(error);
       res.redirect('/index');
     }
   );
 });
 app.get('/edit/:id',(req,res)=>{
  connection.query('SELECT * FROM users WHERE id = ?',
  [req.params.id],(error,results)=>{
    console.log(error);
    res.render('edit.ejs',{item:results[0]});});});

 app.post('/update/:id',(req,res)=>{
   connection.query(
     'UPDATE users SET name =?,smoke=?,charge=?,station=? WHERE id =?',
     [req.body.itemName,req.body.smokeType,req.body.chargeType,req.body.stationName,req.params.id],
     (error,results)=>{
       console.log(error);
       res.redirect('/index');
     }
   );
 });
  app.listen(3030); 
