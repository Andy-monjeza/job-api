import { initChart } from "./chart.js";

const contentSection = document.querySelector('.content-bar');
const sideBar = document.querySelector('.sidebar')
const dashBtn=document.querySelector('.dashBtn');
const profileBtn=document.querySelector('.profile');
 

const fetchData = async (url, method, contType) => {
    try {
        const response = await fetch(url, {
            method: method, 
            headers: {
                'content-type': contType
            }
        });

        if (response.ok) {
            
            const data = await response.text(); 
            return data;
        }
    } catch (err) {
        console.log("Fetch error:", err);
    }
}


dashBtn.addEventListener('click', async () => {

        console.log('Fetching dashboard...');

        const data = await fetchData('http://localhost:5000/api/assets/dashboard', 'GET', 'text/html');
        
        if (data) {
            contentSection.innerHTML = data;
            if (data) {
    contentSection.innerHTML = data;
    
    setTimeout(() => {
        const chartElement = document.querySelector("#chart");
        if (chartElement) {
            initChart();
        } else {
            console.error("Chart container not found in the fetched HTML!");
        }
    }, 10); 
}
        }
    
});

const getProfile=async()=>{
     console.log('Fetching dashboard...');

        const data = await fetchData('http://localhost:5000/api/assets/profile', 'GET', 'text/html');
        
        if (data) {
            contentSection.innerHTML = data;
            if (data) {
          contentSection.innerHTML = data;
      }
  }
}
profileBtn.addEventListener('click',getProfile);