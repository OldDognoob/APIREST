const Joi = require('joi');
//load express module
const express = require('express');
const { join } = require('node:path');
const app = express();

app.use(express.json());

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

//POST method
app.post('/api/courses', (req,res)=>{
    const schema = {
        name: join.toString().min(3).requires()
    };

    const result = Join.validate(req.body.schema)
    

    if(result.error) {
        // 400 bad request
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

//PUT Method
app.put('/api/course/:id', (req,res)=>{
    const course = courses.find(c=>c.id===parseInt(req.params.id));
    if(!course)res.status(404).send('The course with the given ID was not found');

    const result = validateCourse(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    // Update Course
    course.name = req.body.name;

    //Return the update course
    res.send(course);
})

function validateCourse(course){
    const schema={
        name: Join.string().min(3).required()
    };
    return Join.validate(course, schema)
}

// /api/courses/1
app.get('/api/courses/:id', (req, res)=>{
    const course = courses.find(c => c.id === parseInt (req.params.id));
    if (!course) res.status(404).send('The course with the given id not found') // 404 object not found
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));