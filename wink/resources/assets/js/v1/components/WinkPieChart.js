import WinkChart from './WinkChart';

export default WinkChart.extend({

    ready(){

        let datapoints = [];
        let labels = [];

        const unordered = this.data;
        const ordered = {};

        Object.keys(unordered).sort().reverse().forEach(function(key) {
          ordered[key] = unordered[key];
        });

        for(var i in ordered){
            labels.push(i);
            datapoints.push(ordered[i]);
        }

        let data = {
            labels: labels,
            datasets: [{
                data: datapoints,
                backgroundColor: [
                    "#95d1c4",
                    "#f9f9f9",
                    "#FFCE56"
                ],
                hoverBackgroundColor: [
                    "#95d1c4",
                    "#f9f9f9",
                    "#FFCE56"
                ]
            }]
        };

        this.render(data, {}, 'doughnut');
    }
    
});