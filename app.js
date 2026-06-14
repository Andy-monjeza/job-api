const express= require('express');
const {connectDB}=require('./controllers/connectDb.js')
const app=express();
app.use(express.json())
const port = process.env.port;
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
const fileUploadRoute=require('./routes/image-upload-route.js')
const savedJobsRoute=require('./routes/savedJobs.js')
const myAPplicationsRoute=require('./routes/myApplicationsRoute.js')
const getMarketDemandStatsRoute=require('./routes/marketDemandStatsRoute.js');
const recruiterAnalytics=require('./routes/recruiterAnalytics.js')
const getRecruiterApplicants=require('./routes/getRecruiterApplicantsRoute.js')
const welcomeUser=require('./routes/welcome-page-route.js');

app.use(express.static('public'))
app.use('/api',limit);
app.set('trust proxy', 1);
app.use(logger);
app.use(express.json());
 connectDB();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.use('/api/auth',auth);
app.use('/api/user',profileRoute)
app.use('/api/users',getUsers)
app.use('/api/job-create',createjobRoute)
app.use('/api/all-jobs',jobfindRoute)
app.use('/api/job-application',apply)
app.use('/api/application-review', reviewApplication);
app.use('/api/filtered-jobs',filterJobRoute);
app.use('/api/assets',assetsRoute);
app.use('/api/uploads',fileUploadRoute);
app.use('/api/saved-jobs',savedJobsRoute);
app.use('/api/applications',myAPplicationsRoute);
app.use('/api/market-demand',getMarketDemandStatsRoute);
app.use('/api/analytics',recruiterAnalytics);
app.use('/api/applicants',getRecruiterApplicants);
app.use('/api/welcome-user',welcomeUser);


app.listen(port || 5000,()=>{
   
    console.log(`app listening on port ${port || 5000}`)
})

module.exports=app;