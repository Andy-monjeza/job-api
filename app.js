const express= require('express');
const {connectDB}=require('./controllers/connectDb.js')
const app=express();
app.use(express.json())

const {limit, limitLogin}=require('./middleware/express-rate-limit.js')
const auth = require('./routes/registerLogin.js')
const {logger}=require('./controllers/activityLogger.js');
const getUsers=require('./routes/get-all-users.js')
const profileRoute=require('./routes/me.js');
const createjobRoute=require('./routes/JobCreateRoute.js')
const jobfindRoute=require('./routes/jobFindRoutes.js')
const apply = require('./routes/applyRoute.js')
const reviewApplication=require('./routes/applicationApproveRoute.js');
const filterJobRoute=require('./routes/job-filter-route.js');
const assetsRoute=require('./routes/getAssets.js')

app.use(express.static('public'))
app.use(limit);
app.use(logger);
app.use(express.json());
app.use('/api/auth',auth);
app.use('/api/user',profileRoute)
app.use('/api/users',getUsers)
app.use('/api/job-create',createjobRoute)
app.use('/api/all-jobs',jobfindRoute)
app.use('/api/job-application',apply)
app.use('/api/application-review', reviewApplication);
app.use('/api/filtered-jobs',filterJobRoute);
app.use('/api/assets',assetsRoute);
  
app.listen(5000,()=>{
    connectDB();
    console.log('app listening on port 5000')
})
