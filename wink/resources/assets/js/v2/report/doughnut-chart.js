import { Doughnut } from 'vue-chartjs'

export default Doughnut.extend({
   props: {
        data: {type: Object}
    },
    mounted () {
        this.renderChart(this.data, {
            events: false,
            showTooltips: false,
            fontColor: "#000",
            responsive: true,
            maintainAspectRatio: true,
            cutoutPercentage: 65,
            showAllTooltips: true,
            borderWidth: 0,
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    fontSize: 11,
                    boxWidth: 10,
                    fontFamily: "'Varela Round', sans-serif",
                    fontStyle: "normal",
                    padding: 30,
                    strokeStyle: "#fff"
                }
            },
            animation: {
                duration: 0,
                onComplete: function () {
                    var self = this,
                        chartInstance = this.chart,
                        ctx = chartInstance.ctx;
                        ctx.font = '11px Varela Round';
                        ctx.textAlign = "center";
                        ctx.fillStyle = "#000";

                        Chart.helpers.each(self.data.datasets.forEach((dataset, datasetIndex) => {
                            
                            var meta = self.getDatasetMeta(datasetIndex),
                                total = 0, //total values to compute fraction
                                labelxy = [],
                                offset = Math.PI / 2, //start sector from top
                                radius,
                                centerx,
                                centery, 
                                lastend = 0; //prev arc's end line: starting with 0

                            for (var val of dataset.data) { total += val; } 

                            Chart.helpers.each(meta.data.forEach((element, index) => {
                                radius = 2.3 * element._model.outerRadius - element._model.innerRadius;
                                centerx = element._model.x;
                                centery = element._model.y;
                                var thispart = dataset.data[index],
                                    arcsector = Math.PI * (2 * thispart / total);
                                if (element.hasValue() && dataset.data[index] > 0) {
                                    labelxy.push(lastend + arcsector / 2 + Math.PI + offset);
                                }
                                else {
                                    labelxy.push(-1);
                                }
                                    lastend += arcsector;
                            }), self)

                            var lradius = radius * 3 / 4;
                            for (var idx in labelxy) {
                            if (labelxy[idx] === -1) continue;
                            var langle = labelxy[idx],
                                dx = centerx + lradius * Math.cos(langle),
                                dy = centery + lradius * Math.sin(langle),
                                val = Math.round(dataset.data[idx] / total * 100);
                                ctx.fillText(val + '%', dx , dy-5);
                            }

                        }), self);
                    }
                }
            });
            
    }
})