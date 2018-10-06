import {
    HorizontalBar
} from 'vue-chartjs'


export default HorizontalBar.extend({
    props: {
        data: {
            type: Object
        }
    },
    mounted() {

        this.renderChart(this.data, {
            events: false,
            responsive: true,
            showTooltips: false,
            tooltips: false,
            legend: false,
            fontSize: 18,
            scales: {
                xAxes: [{
                    display: false,
                    ticks: {
                        beginAtZero: true,
                        min: 0,
                        max: 100,
                        suggestedMin: 0
                    },
                    gridLines: {
                        display: false
                    }
                }],
                yAxes: [{
                    display: false,
                    ticks: {
                        beginAtZero: true,
                        min: 0,
                        max: 100,
                        suggestedMin: 0
                    },
                    gridLines: {
                        display: false
                    }
                }]
            },
            animation: {
                onComplete: function () {
                    const chartInstance = this.chart;
                    const ctx = chartInstance.ctx;
                    const meta = chartInstance.controller.getDatasetMeta(0);

                    Chart.helpers.each(meta.data.forEach((bar, index) => {
                        const label = this.data.datasets[0].data[index] + "%" + "  " + this.data.labels[index];
                        const labelPositionX = 20;
                        const labelWidth = ctx.measureText(label).width + labelPositionX;
                        const dataSet = this.data.datasets[0].data[index];

                        ctx.textBaseline = 'middle';
                        ctx.textAlign = 'left';
                        ctx.fillStyle = '#3c4858';
                        ctx.font = '14px Varela Round';
                        ctx.fillText(label, labelPositionX, bar._model.y + 1);

                        if (dataSet === '0') {
                            const view = bar._view
                            const context = chartInstance.chart.ctx
                            const viewWidth = 10
                            const lineWidth = bar._model.height

                            const startX = view.x - viewWidth / 2
                            context.beginPath();
                            context.strokeStyle = '#d4dce5';
                            context.lineWidth = lineWidth - 4;
                            context.moveTo(startX, view.y);

                            context.lineTo(startX + viewWidth, view.y);
                            context.stroke();
                        }
                    }));
                }
            }
        });

    }
})