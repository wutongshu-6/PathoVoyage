(function($) {
  'use strict';
  $(function() {

    if ($('#cash-deposits-chart').length) {
      var cashDepositsCanvas = $("#cash-deposits-chart").get(0).getContext("2d");
      var data = {
        labels: ["1月", "2月", "3月"],
        datasets: [
          {
            label: '恶性病例（红色）',
            data: [12, 19, 26],
            borderColor: [
              '#ff4747'
            ],
            borderWidth: 2,
            fill: false,
            pointBackgroundColor: "#fff"
          },
          {
            label: '良性病例（蓝色）',
            data: [24, 36, 48],
            borderColor: [
              '#4d83ff'
            ],
            borderWidth: 2,
            fill: false,
            pointBackgroundColor: "#fff"
          },
          {
            label: '待复核（黄色）',
            data: [6, 8, 10],
            borderColor: [
              '#ffc100'
            ],
            borderWidth: 2,
            fill: false,
            pointBackgroundColor: "#fff"
          }
        ]
      };
      var options = {
        scales: {
          yAxes: [{
            display: true,
            gridLines: {
              drawBorder: false,
              lineWidth: 1,
              color: "#e9e9e9",
              zeroLineColor: "#e9e9e9",
            },
            ticks: {
              min: 0,
              max: 100,
              stepSize: 20,
              fontColor: "#6c7383",
              fontSize: 16,
              fontStyle: 300,
              padding: 15
            }
          }],
          xAxes: [{
            display: true,
            gridLines: {
              drawBorder: false,
              lineWidth: 1,
              color: "#e9e9e9",
            },
            ticks : {
              fontColor: "#6c7383",
              fontSize: 16,
              fontStyle: 300,
              padding: 15
            }
          }]
        },
        legend: {
          display: false
        },
        legendCallback: function(chart) {
          var text = [];
          text.push('<ul class="dashboard-chart-legend">');
          for(var i=0; i < chart.data.datasets.length; i++) {
            text.push('<li><span style="background-color: ' + chart.data.datasets[i].borderColor[0] + ' "></span>');
            if (chart.data.datasets[i].label) {
              text.push(chart.data.datasets[i].label);
            }
          }
          text.push('</ul>');
          return text.join("");
        },
        elements: {
          point: {
            radius: 3
          },
          line :{
            tension: 0
          }
        },
        stepsize: 1,
        layout : {
          padding : {
            top: 0,
            bottom : -10,
            left : -10,
            right: 0
          }
        }
      };
      var cashDeposits = new Chart(cashDepositsCanvas, {
        type: 'line',
        data: data,
        options: options
      });
      document.getElementById('cash-deposits-chart-legend').innerHTML = cashDeposits.generateLegend();
    }

    if ($('#total-sales-chart').length) {
      var totalSalesChartCanvas = $("#total-sales-chart").get(0).getContext("2d");

      var data = {
        labels: ["1月", "2月", "3月"],
        datasets: [
          {
            label: '2026年Q1验证准确率',
            data: [85.2, 89.7, 92.3],
            borderColor: 'rgba(47,91,191,1)',
            borderWidth: 2,
            fill: true,
            backgroundColor: "rgba(47,91,191,0.35)",
            pointBackgroundColor: "#fff",
            pointBorderColor: "rgba(47,91,191,1)",
            pointRadius: 3
          }
        ]
      };
      var options = {
        scales: {
          yAxes: [{
            display: false,
            gridLines: {
              drawBorder: false,
              lineWidth: 1,
              color: "#e9e9e9",
              zeroLineColor: "#e9e9e9",
            },
            ticks: {
              display : true,
              min: 0,
              max: 100,
              stepSize: 10,
              fontColor: "#6c7383",
              fontSize: 16,
              fontStyle: 300,
              padding: 15
            }
          }],
          xAxes: [{
            display: false,
            gridLines: {
              drawBorder: false,
              lineWidth: 1,
              color: "#e9e9e9",
            },
            ticks : {
              display: true,
              fontColor: "#6c7383",
              fontSize: 16,
              fontStyle: 300,
              padding: 15
            }
          }]
        },
        legend: {
          display: false
        },
        legendCallback: function() {
          var text = [];
          text.push('<ul class="dashboard-chart-legend mb-0 mt-4">');
          text.push('<li><span style="background-color: rgba(47,91,191,0.85)"></span>3月（深蓝，92.3%）</li>');
          text.push('<li><span style="background-color: rgba(77,131,255,0.77)"></span>2月（浅蓝，89.7%）</li>');
          text.push('<li><span style="background-color: rgba(77,131,255,0.43)"></span>1月（淡蓝，85.2%）</li>');
          text.push('</ul>');
          return text.join("");
        },
        elements: {
          point: {
            radius: 3
          },
          line :{
            tension: 0
          }
        },
        stepsize: 1,
        layout : {
          padding : {
            top: 0,
            bottom : 0,
            left : 0,
            right: 0
          }
        }
      };
      var totalSalesChart = new Chart(totalSalesChartCanvas, {
        type: 'line',
        data: data,
        options: options
      });
      document.getElementById('total-sales-chart-legend').innerHTML = totalSalesChart.generateLegend();
    }

    $('#recent-purchases-listing').DataTable({
      "aLengthMenu": [
        [5, 10, 15, -1],
        [5, 10, 15, "All"]
      ],
      "iDisplayLength": 10,
      "language": {
        search: ""
      },
      searching: false, paging: false, info: false
    });

  });
})(jQuery);