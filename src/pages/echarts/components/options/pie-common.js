const color = {
  colors: props.colors,
  text: 'rgba(0, 0, 0, 0.7)',
  axis: 'rgba(0, 0, 0, 0.5)'
}

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
  color: color.colors,
  series: [{
    silent: true,
    type: 'pie',
    encode: {
      value: 'value'
    },
    center: ['50%', '50%'],
    radius: [72, 72 + 12],
    label: {
      position: 'center',
      formatter: () => `{num|${ total.value.toLocaleString() }}\n{text|总数}`,
      rich: {
        num: {
          fontSize: 32,
          color: color.text,
          lineHeight: 36,
          align: 'center'
        },
        text: {
          fontSize: 14,
          color: color.axis,
          lineHeight: 20,
          align: 'center'
        }
      }
    }
  }]
}
