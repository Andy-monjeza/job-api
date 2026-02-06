
export const initChart=()=>{
const options={
        chart:{type:'area',
        height:'100%',
        width:'100%',
        toolbar:{show:false},
        zoom:{enabled:false},        
    },
        dataLabels:{enabled:false},
        series:[{name:'Profile Weekly Views', data:[8,10,15,20] }],
        xaxis:{
            categories:['sun','mon','tue','wed','thur','fri','sat'],
            axisBorder: { show: false },
            axisTicks: { show: true }
        },
        yaxis:{
            axisBorder: { show: false },
            axisTicks: { show: false }
        },
        grid:{show:false},
        stroke:{
            curve:'smooth',
            width:5
        },
        tooltip: {
        enabled: true,
        theme: 'dark',       
        style: {
        fontSize: '12px',
        color:'black',
    },
        shared: true,          
        followCursor: true,          
        x: { show: true },       
        y: { formatter: val => val + " visitors" } 
        }

        
      }

      const chart=new ApexCharts(document.querySelector("#chart"),options);
       chart.render();
}

