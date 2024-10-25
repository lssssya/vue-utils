export function useMapCamera (mapUtils) {

  const addCameraToLayer = (data) => {
    const cameraLayer = mapUtils._layerGenerator('cameraLayer', 'VectorLayer')

    for (let i = 0; i < data.length; i++) {
      const { longitude, latitude } = data[i]

      const coordinate = mapUtils._toDisplaySRID(new hmap.basetype.Coordinate(Number(longitude), Number(latitude), 0))
      const point = new hmap.geom.Point(coordinate)
      const feature = new hmap.feature.Vector(point)
      feature.setStyle(new hmap.style.Style({
        markerSymbols: [new hmap.style.Icon({
          imgSrc: require('@/assets/images/map/img.png'),
          opacity: 1.0,
          size: new hmap.basetype.Size(32, 32) // 可选参数，设置marker的大小,单位为像素
          // anchor: [0, 0], // 可选参数，设置图标在marker处的偏移量，为大于0的任意值，具体偏移多少可与下方的参考点作比较
          // offset: new hmap.basetype.Offset(0, -15, 0) // 可选参数，图标的偏移量
        })]
      }))
      cameraLayer.addFeature(feature)
    }
  }
  const removeCameraToLayer = () => {
    const cameraLayer = mapUtils._layerGenerator('cameraLayer', 'VectorLayer')
    cameraLayer.removeAllFeatures()
  }

  return {
    addCameraToLayer,
    removeCameraToLayer
  }
}
