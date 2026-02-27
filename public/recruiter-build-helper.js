 const initChart = (
  data = [],
  categories = [],
  seriesName = "Skill Demand"
) => {

  const options = {
    chart: {
      type: 'area',
      height: '100%',
      width: '100%',
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: ['#0f4fc5'],
    dataLabels: { enabled: false },

    series: [{
      name: seriesName,
      data: data
    }],

    xaxis: {
      categories: categories,
      axisBorder: { show: false },
      axisTicks: { show: false }
    },

    yaxis: {
      show: true,
      labels: { show: true }
    },

    grid: { show: false },

    stroke: {
      curve: 'smooth',
      width: 4
    },

    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.1,
        opacityTo: 0.7,
        stops: [0, 90, 100]
      }
    },

    tooltip: {
      enabled: true,
      theme: 'dark',
      y: {
        formatter: val => val + " Applicants"
      }
    }
  };

  const chart = new ApexCharts(
    document.querySelector("#recruiter-chart"),
    options
  );

  chart.render();
  return chart;
};

 const fetchRecruiterAnalytics = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch("/api/analytics/recruiter-analytics", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (data.success) {
      return data;
    }

  } catch (error) {
    console.error("Analytics error:", error);
  }
};

const fetchRecruiterDash= async()=>{
    const token=localStorage.getItem('token');
    try{
        const response=await fetch("api/assets/recruiter-dash");
        const data=await response.text();

        return data;
    }catch(err){
        console.log(err.message)
    }
}

const buildDashboard=(dash)=>{
    const container=document.querySelector('.content-bar');
    /*const applicantCount=document.querySelector('.applicants-count');
    const postedJobCount=document.querySelector('.my-jobs-count');
    const interViewcount=document.querySelector('.pending-interviews-count');
    const messagescount=document.querySelector('unread-messages-count');
    const weeklyChange=document.querySelector('#weekly-change');
    const peakCount=document.querySelector('#peak-count');*/

    container.innerHTML=dash
}

const fillStats = (data) => {

  document.querySelector(".applicants-count").textContent =
    data.totalApplicants;

  // Unique skills in demand
  document.querySelector(".my-jobs-count").textContent =
    data.skillDemand.length;

  // Most demanded skill
  if (data.skillDemand.length > 0) {
    document.getElementById("best-day").textContent =
      data.skillDemand[0]._id;

    document.getElementById("peak-count").textContent =
      data.skillDemand[0].count;
  }

  // Top candidate
  if (data.topCandidates.length > 0) {
    const top = data.topCandidates[0];
    document.getElementById("weekly-change").textContent =
      `${top.name} (${top.totalMatchScore})`;
  }
};

const fetchApplicantManagerTab=async()=>{
    try{
    const response=await fetch('/api/assets/applicants-manager');
    const data= await response.text();
    return data;
    }
  catch(err){
    console.log(err.message)
  }

}

async function loadApplicants() {
    try {
        const response = await fetch('/api/applicants/all-recruiter-applicants', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });

        const applicants = await response.json();

        if (response.ok) {
            return applicants;
        } else {
            console.error("Failed to load applicants:", applicants.message);
        }
    } catch (err) {
        console.error("Network error:", err);
    }
}

function updateJobFilterOptions(applicants) {
    const filter = document.getElementById('categoryFilter');
    const uniqueJobs = [...new Set(applicants.map(app => app.jobTitle))];
    
    filter.innerHTML = '<option value="all">All Jobs</option>';
    uniqueJobs.forEach(job => {
        const option = document.createElement('option');
        option.value = job;
        option.textContent = job;
        filter.appendChild(option);
    });
}

const populateApplicantTable = (applicants) => {
    console.log(applicants)
    const tableBody = document.querySelector('.job-table');
    
    let tbody = tableBody.querySelector('tbody');
    if (!tbody) {
        tbody = document.createElement('tbody');
        tableBody.appendChild(tbody);
    }
    
    tbody.innerHTML = ''; 

    applicants.forEach(app => {
        const row = document.createElement('tr');
        row.className = 'applicant-row';
    
        row.setAttribute('data-category', app.jobTitle); 

      row.innerHTML = `
    <td data-label="Applicant" class="primary-cell">
        <div class="user-profile-info">
            <img src="${app.applicantPhoto || 'default-avatar.png'}" class="table-avatar">
            <div class="name-status-stack">
                <span class="applicant-name">${app.applicantName}</span>
                <span class="status-tag ${app.status.toLowerCase()}">${app.status}</span>
            </div>
        </div>
    </td>
    <td data-label="Job Title" class="job-title-cell">${app.jobTitle}</td>
    <td data-label="Location" class="location-cell">
        <div class="icon-text">
            <span>${app.applicantLocation || 'Not Specified'}</span>
        </div>
    </td>
    <td data-label="Applied On" class="date-cell">
        <div class="icon-text">
            <span>${new Date(app.appliedOn).toLocaleDateString()}</span>
        </div>
    </td>
    <td data-label="Actions" class="action-cell">
        <button class="options-btn" onclick="openApplicantMenu('${app._id}')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
        </button>
    </td>
`;
        tbody.appendChild(row);
    });
};


const filterJobs = () => {
    const searchInput = document.getElementById('jobSearch');
    const categorySelect = document.getElementById('categoryFilter');
    
    // This targets rows in BOTH managers by using a broad selector
    const rows = document.querySelectorAll('.job-table tbody tr, .applicant-row');

    const searchVal = searchInput.value.toLowerCase();
    const categoryVal = categorySelect.value;

    rows.forEach(row => {
        // Find the name/title (it's either .pos-name or .applicant-name)
        const textElement = row.querySelector('.pos-name, .applicant-name');
        const textValue = textElement ? textElement.textContent.toLowerCase() : "";

        // Check category/job title (stored in data-category attribute)
        const rowCategory = row.getAttribute('data-category') || 
                            row.querySelector('.category-text')?.textContent || "";

        const matchesSearch = textValue.includes(searchVal);
        const matchesCategory = (categoryVal === 'all') || (rowCategory === categoryVal);

        row.style.display = (matchesSearch && matchesCategory) ? "" : "none";
    });
};

export {
    initChart, 
    fetchRecruiterAnalytics,
    fetchRecruiterDash,
    buildDashboard,
    fillStats,
    fetchApplicantManagerTab,
    loadApplicants,
    updateJobFilterOptions,
    populateApplicantTable,
    filterJobs
};