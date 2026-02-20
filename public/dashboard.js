import { initChart } from "./chart.js";

let matchingJobsThisWeekCount;

const pendingInterviewsCount=document.querySelector('.pending-interviews-count');
const unreadMessagesCount=document.querySelector('.unread-messages-count');


export const updateApplicationsCount=async()=>{
    const sessionToken=localStorage.getItem('token');
    try{
       const response = await fetch('http://localhost:5000/api/applications/get-my-applications',{
        headers:{Authorization:`Bearer ${sessionToken}`}
       });
       
       return response.json();
    }catch(err){
        console.log(err.message)
    }
}

const fetchUserPrefCategory=async()=>{
    try{
       const sessionToken=localStorage.getItem('token');
        const response=await fetch('http://localhost:5000/api/user/me',{
            headers:{'Authorization':`Bearer ${sessionToken}`}
        })
        const profile= await response.json();
        return profile.userDetails.preferedCategory;
    }catch(err){
        console.log(err.message);
    }
 
}


const fetchMarketStats = async (userCategory) => {

       const sessionToken=localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/api/market-demand/stats/market?category=${userCategory}`,{
       headers:{'Authorization':`Bearer ${sessionToken}`}
    });
    return await response.json(); 
};

export const buildDashBoard = async () => {
    matchingJobsThisWeekCount = document.querySelector('.market-demand-count');
     const category = await fetchUserPrefCategory();
    try {
        
        const rawMarketData = await fetchMarketStats(category); 
    
        const finalJobCounts = [];
        const weekDayLabels = [];
        const dayNames = ['sun', 'mon', 'tue', 'wed', 'thur', 'fri', 'sat'];

        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            
            const dateString = date.toISOString().split('T')[0];
            
       
            weekDayLabels.push(dayNames[date.getDay()]);

            const dayMatch = rawMarketData.find(entry => entry._id === dateString);
            
            finalJobCounts.push(dayMatch ? dayMatch.count : 0);
        }
     


const peakJobs = Math.max(...finalJobCounts);

let bestDayDisplay = "No Data";
if (peakJobs > 0) {
    const peakIndex = finalJobCounts.indexOf(peakJobs);
    const bestDayKey = weekDayLabels[peakIndex];
    const fullDayNames = {
        'sun': 'Sunday', 'mon': 'Monday', 'tue': 'Tuesday', 
        'wed': 'Wednesday', 'thur': 'Thursday', 'fri': 'Friday', 'sat': 'Saturday'
    };
    bestDayDisplay = fullDayNames[bestDayKey] || bestDayKey;
}

const firstDay = finalJobCounts[0];
const lastDay = finalJobCounts[6];
let changePercent = 0;

if (firstDay > 0) {
    // Standard calculation if we have a baseline
    changePercent = ((lastDay - firstDay) / firstDay * 100).toFixed(0);
} else if (lastDay > 0) {
    // If we started at 0 and now have jobs, 100% growth
    changePercent = 100;
}


document.getElementById('peak-count').textContent = peakJobs;
document.getElementById('best-day').textContent = bestDayDisplay;

const changeElem = document.getElementById('weekly-change');
if (peakJobs === 0) {
    changeElem.textContent = "0%";
    changeElem.style.color = "gray";
} else {
    changeElem.textContent = `${changePercent > 0 ? '+' : ''}${changePercent}%`;
    changeElem.style.color = changePercent >= 0 ? '#10b981' : '#ef4444';
}

        const dashboardChart = initChart(); 
      
        
        dashboardChart.updateSeries([{
            name: 'Market Demand',
            data: finalJobCounts
        }]);

        dashboardChart.updateOptions({
            xaxis: { categories: weekDayLabels }
        });


        const totalThisWeek = finalJobCounts.reduce((acc, current) => acc + current, 0);
        if (matchingJobsThisWeekCount) {
            matchingJobsThisWeekCount.textContent = totalThisWeek;
        }

    } catch (err) {
       console.log(err.message)
    }
}