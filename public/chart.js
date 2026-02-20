 export const initChart = (initialData = [0,0, 0, 0, 0, 0, 0]) => {
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
            name: 'Market Demand', 
            data: initialData 
        }],
        xaxis: {
            categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
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
            
            y: { formatter: val => val + " New Jobs" } 
        }
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
    
    return chart; 
};