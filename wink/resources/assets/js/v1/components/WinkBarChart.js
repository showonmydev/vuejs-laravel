import WinkChart from './WinkChart';

export default WinkChart.extend({

    ready(){

        let labels = [];
        let datapoints = [];

        for(var i in this.data){
            labels.push(i);
            datapoints.push(this.data[i]);
        }
        
        let data = {
            labels: labels,
            datasets: [{
                data: datapoints,
                backgroundColor: "rgba(149,209,196,0.5)",
                borderColor: "rgba(149,209,196,1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(149,209,196,0.8)",
                hoverBorderColor: "rgba(149,209,196,1)"
            }]
        };
        let options = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            legend: {
                display: false
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.yLabel;
                    }
                }
            },
            responsive: true
        };

        this.render(data, options, 'bar');
    }
    
});