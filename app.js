const express= require('express');
const {connectDB}=require('./controllers/connectDb.js')
const app=express();
app.use(express.json())
const auth = require('./routes/registerLogin.js')
const {logger}=require('./controllers/activityLogger.js');
const getUsers=require('./routes/get-all-users.js')
const profileRoute=require('./routes/me.js');
const createjobRoute=require('./routes/JobCreateRoute.js')
const jobfindRoute=require('./routes/jobFindRoutes.js')
app.use(logger);
app.use(express.json());


app.use('/api/auth',auth);
app.use('/api/user',profileRoute)
app.use('/api/users',getUsers)
app.use('/api/job-create',createjobRoute)
app.use('/api/all-jobs',jobfindRoute)

app.listen(5000,()=>{
    connectDB();
    console.log('app listening on port 5000')
})
