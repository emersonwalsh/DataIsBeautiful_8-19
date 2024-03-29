angular.module('myApp', [])
  .controller('myController', function ($scope, $http) {

    // Scoped Variables
    
    // Functions
    $scope.updateState = function() {
      getGeoJson();
    };

    // Global Variables
    var myChart,
      data;


     /**
     * @name initialize
     * @desc creates the visualization on the chart div
     * @returns {void}
     */
     function initialize() {
       window.addEventListener('resize', function() {
         if (myChart) {
          myChart.resize();
         }
       })
       getData();
     }

    /**
    * @name getData
    * @desc fetch data to paint
    * @returns {void}
    */
    function getData() {
      data = {
        'Small Dog': {
          "Creature": "Small dog",
          "Mass (grams)": 2000,
          "Resting Heart Rate (BPM)": 100,
          "Longevity (Years)": 10,
          "Total Heart Beats": 525600000,
          currentHeartBeats: 0
        },
        "Large Dog": {
          "Mass (grams)": 8000,
          "Resting Heart Rate (BPM)": 75,
          "Longevity (Years)": 17,
          "Total Heart Beats": 670140000,
          currentHeartBeats: 0
        },
        "Giraffe": {
          "Mass (grams)": 900000,
          "Resting Heart Rate (BPM)": 65,
          "Longevity (Years)": 20,
          "Total Heart Beats": 683280000,
          currentHeartBeats: 0
        },
        "Hamster": {
          "Mass (grams)": 60,
          "Resting Heart Rate (BPM)": 450,
          "Longevity (Years)": 3,
          "Total Heart Beats": 709560000,
          currentHeartBeats: 0
        },
        "Medium Dog": {
          "Mass (grams)": 5000,
          "Resting Heart Rate (BPM)": 90,
          "Longevity (Years)": 15,
          "Total Heart Beats": 709560000,
          currentHeartBeats: 0
        },
        "Cow": {
          "Mass (grams)": 800000,
          "Resting Heart Rate (BPM)": 65,
          "Longevity (Years)": 22,
          "Total Heart Beats": 751608000,
          currentHeartBeats: 0
        },
        "Large Whale": {
          "Mass (grams)": 120000000,
          "Resting Heart Rate (BPM)": 20,
          "Longevity (Years)": 80,
          "Total Heart Beats": 840960000,
          currentHeartBeats: 0
        },
        
        "Pig": {
          "Mass (grams)": 150000,
          "Resting Heart Rate (BPM)": 70,
          "Longevity (Years)": 25,
          "Total Heart Beats": 919800000,
          currentHeartBeats: 0
        },
        "Horse": {
          "Mass (grams)": 1200000,
          "Resting Heart Rate (BPM)": 44,
          "Longevity (Years)": 40,
          "Total Heart Beats": 925056000,
          currentHeartBeats: 0
        },
        "Rabbit": {
          "Mass (grams)": 1000,
          "Resting Heart Rate (BPM)": 205,
          "Longevity (Years)": 9,
          "Total Heart Beats": 969732000,
          currentHeartBeats: 0
        },
        "Elephant": {
          "Mass (grams)": 5000000,
          "Resting Heart Rate (BPM)": 30,
          "Longevity (Years)": 70,
          "Total Heart Beats": 1103760000,
          currentHeartBeats: 0
        },
        "Cat": {
          "Creature": "Cat",
          "Mass (grams)": 2000,
          "Resting Heart Rate (BPM)": 150,
          "Longevity (Years)": 15,
          "Total Heart Beats": 1182600000,
          currentHeartBeats: 0
        },
        "Monkey": {
          "Mass (grams)": 5000,
          "Resting Heart Rate (BPM)": 190,
          "Longevity (Years)": 15,
          "Total Heart Beats": 1497960000,
          currentHeartBeats: 0
        },
        "Chicken": {
          "Mass (grams)": 1500,
          "Resting Heart Rate (BPM)": 275,
          "Longevity (Years)": 15,
          "Total Heart Beats": 2168100000,
          currentHeartBeats: 0
        },
        "Human": {
          "Mass (grams)": 90000,
          "Resting Heart Rate (BPM)": 60,
          "Longevity (Years)": 70,
          "Total Heart Beats": 2207520000,
          currentHeartBeats: 0
        }
      };

      paint();
    }

    /**
     * @name paint
     * @desc paint visualization
     * @return {void}
     */
    function paint() {
      myChart = echarts.init(document.getElementById('main'));
      
      var option, 
        year = 0,
        currentData,
        timer;

      timer = setInterval(function () {
        if (year > 79) {
          clearInterval(timer);
        }

        currentData = getYearData(year);

        option = {
          title: [{
            text: year + ' years',
            textAlign: 'center',
            right: 'right',
            bottom: 'center',
            textStyle: {
                fontSize: 60,
                color: 'rgba(0, 0, 0, 0.3)'
            }
          }, {
              text: 'Who\'s Heart Works the Hardest?',
              left: 'center',
              top: '10px',
              textStyle: {
                  color: 'rgba(0, 0, 0)',
                  fontWeight: 'normal',
                  fontSize: 20
              }
          }, {
            text: 'Data is Beautiful, August 2019',
            target: 'blank',
            link: 'https://www.reddit.com/r/dataisbeautiful/comments/cmrz6j/battle_dataviz_battle_for_the_month_of_august/',
            left: 'center',
            top: '50px',
            textStyle: {
              color: 'rgba(0, 0, 0, 0.8)',
              fontWeight: 'normal',
                fontSize: 14
            }
        }],
          tooltip: {
              backgroundColor: 'rgba(50,50,50,0.9)',
              trigger: 'axis',
              axisPointer: {
                  type: 'none'
              },
              formatter: function (info) {
                var returnArray = [],
                  dim,
                  j;

                returnArray.push(info[0].marker + '<b>' + info[0].name + '</b>' + '<br>');

                for (dim in info[0].data.tooltipInfo) {
                  if (info[0].data.tooltipInfo.hasOwnProperty(dim)) {
                    returnArray.push('' + dim + ': ' + info[0].data.tooltipInfo[dim] + '<br>');

                  }
                }

                return returnArray.join('');
              }
          },
          grid: {
            top: '140px',
            right: '140px',
            bottom: '140px',
            left: '140px'

          },
          yAxis: {
            name: 'Creature',
            nameLocation: 'center',
            nameTextStyle: {
              fontSize: 20
            },
            nameGap: 30,
            data: Object.keys(data),
            axisTick: {show: false},
            axisLine: {show: false},
            axisLabel: {
              show: false
            }
          },
          xAxis: {
            name: 'Total Number of Heartbeats',
            nameLocation: 'center',
            nameTextStyle: {
              fontSize: 20
            },
            nameGap: 40,
            axisTick: {show: false},
            axisLine: {show: false},
            splitLine: {
              show: false
            },
            axisLabel: {
              formatter: function(info) {
                if (info === 0) {
                  return 0
                }
                return info / 1000000000 + ' B';
              }
            },
            max: 2500000000
          },
          series: {
            type: 'bar',
            label: {
                show: true,
                fontSize: 12,
                formatter: '{b}'
            },
            itemStyle: {
                normal: {
                    barBorderRadius: 50,
                    opacity: 0.75
                },
                emphasis: {
                    opacity: 1
                }
            },
            data: currentData
          }
        };
        myChart.setOption(option);
        year++;
      }, 500);
    }

    function getYearData(year) {
      data;
      var newData = [],
        color,
        creature;

      for (creature in data) {
        if (data.hasOwnProperty(creature)) {
          if (year < data[creature]['Longevity (Years)']) {
            color = 'green';
            data[creature].currentHeartBeats = data[creature].currentHeartBeats + (data[creature]['Resting Heart Rate (BPM)'] * 60 * 24 * 365)
          } else {
            color = 'red';
            data[creature].currentHeartBeats = data[creature].currentHeartBeats
          }

          newData.push({
            value: data[creature].currentHeartBeats,
            tooltipInfo: {
              'Number of Heartbeats': cleanValue(data[creature]['currentHeartBeats']),
              'Longevity': data[creature]['Longevity (Years)'] + ' years',
              'Resting Heart Rate': data[creature]['Resting Heart Rate (BPM)'] + ' bpm',
              'Mass': cleanValue(data[creature]['Mass (grams)']) + ' grams'
            },
            itemStyle: {
              normal: {
                  opacity: 0.8,
                  color: color
              },
              emphasis: {
                  opacity: 1
              }
            }
          });
        }
      }
      return newData;
    }

     /**
         * @name cleanValue
         * @desc Removes underscores and truncates decimals in item
         * @param {any} item - element to be cleaned
         * @returns {any} cleaned element
         */
        function cleanValue(item) {
          if (typeof item === 'string') {
              return item.replace(/_/g, ' ');
          } else if (typeof item === 'number') {
              return item.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 3
              });
          }
          return item;
      }
     
     initialize();
    });