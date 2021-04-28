//load express module
const express = require('express');
const app = express();

const courses = [
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'}
]

// HTTP Methods
//GET Method: implement some end points
// Takes two arguments: the first argument is the path or the url (the route)
//the second one is a callback function (round handler)
app.get('/', (req,res)=>{
//it gives us some properties with a lot of information
  res.send('Hello World');
});
app.get('/api/courses',(req,res)=>{
  //return an array of numbers
  res.send(courses);
})

// /api/courses/1
app.get('/api/courses/:id', (req, res)=>{
    const course = courses.find(c => c.id === parseInt (req.params.id));
    if (!course) res.status(404).send('The course with the given id not found') // 404 object not found
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));