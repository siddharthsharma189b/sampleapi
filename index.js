const express = require('express');
const Joi = require('joi');

const app = express();

// sets request.bosy property after parsing the JSON in the input
app.use(express.json());

const courses = [
    {id:1,name:'course1'},
    {id:2,name:'course2'},
    {id:3,name:'course3'}
]

app.get("/", (request,response) => {
   response.send("Hello World"); 
});

app.get("/api/courses", (request,response)=> {
    response.send(courses);
});

app.get("/api/courses/:id",(request,response) => {
    let course = courses.find( c => c.id === parseInt(request.params.id));
    if (!course) {
        response.status(400).send('The course with given id was not found');
    } else {
        response.status(200).send(course);
    }
});

app.post('/api/courses', (request,response) => {
    const schema = {
        id: Joi.string().required(),
        name: Joi.string().min(3).required()
    }
    const result = Joi.validate(request.body, schema);
    if(result.error) {
        result.status(400).send(result.error.details[0].message);
        return;
    }
    const course = {
        id: parseInt(request.body.id),
        name: request.body.name
    };
    courses.push(course);
    response.status(200).send(`${request.body.name} added to the courses`);
});

//PORTS
const port = process.env.PORT || 3000
app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
});