export default {
  dataset: {
    source: [
      { name: '1月', value: '820', max: 2000 },
      { name: '2月', value: '932', max: 2000 },
      { name: '3月', value: '901', max: 2000 },
      { name: '4月', value: '934', max: 2000 },
      { name: '5月', value: '1290', max: 2000 }
    ]
  },
  color: ['#46B2FF', '#E7A768', '#0889F4', '#6FF797'],
  legend: {
    show: false
  },
  series: [{
    silent: true,
    type: 'pie',
    encode: {
      value: 'num'
    },
    center: ['50%', '50%'],
    radius: ['42%', '30%'],
    label: {
      show: false
    },
    itemStyle: {
      normal: {
        label: {
          show: true,
          position: 'outside',
          formatter: (params) => {
            console.log(params)
            return [
              `{hr${ params.dataIndex }|}{label|${ params.data.time }}{unit|${ params.data.percent }%}`,
              `{hr${ params.dataIndex }|}{value|${ params.data.num }}{unit|万吨}`
            ].join('\n')
          },
          padding: [0, 10, 0, 0],
          backgroundColor: '#26476e',
          borderColor: '#B4ECFF',
          borderWidth: 1,
          borderRadius: 4,
          rich: {
            unit: {
              color: '#94BFFF',
              padding: [-6, 0, -4, 0],
              align: 'right'
            },
            label: {
              color: '#fff',
              fontSize: 16,
              padding: [-12, 10, -6, 10],
              align: 'left'
            },
            value: {
              color: '#fff',
              fontSize: 16,
              fontWeight: 600,
              padding: [0, 10, 0],
              align: 'left'
            },
            hr0: {
              borderColor: '#46B2FF',
              width: 0,
              borderWidth: 4,
              height: 26,
              align: 'left'
            },
            hr1: {
              borderColor: '#E7A768',
              width: 0,
              borderWidth: 4,
              height: 26,
              align: 'left'
            },
            hr2: {
              borderColor: '#0889F4',
              width: 0,
              borderWidth: 4,
              height: 26,
              align: 'left'
            }

          }
        },
        labelLine: {
          length: 30,
          length2: 50,
          show: true,
          color: '#00ffff'
        }
      }
    }
  }]
}
