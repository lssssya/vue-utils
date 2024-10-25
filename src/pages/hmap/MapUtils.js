import Events from 'events'
import { rewriteHmapMethod } from '@/pages/hmap/extra'

export default class MapUtils extends Events {
  constructor (id) {
    super()
    this.id = id
    this.mapInstance = null
    // 业务图层
    this.mapLayers = new Map()
    // 底图图层
    this.mapViewerLayers = new Map()
  }

  get _needTransform () {
    return this.mapBaseConfig.displaySRID !== this.mapBaseConfig.dataSRID
  }

  buildMap (options, callback) {
    if (this.mapInstance) callback(this.mapInstance)

    /* 控制传入以及默认值 */
    const {
      center = [112.985977, 28.127656, 0],
      // center = [115.7929582, 28.6111896, 0],
      zoom = 16,
      minLevel = 1,
      maxLevel = 18,
      projCrs = 3857
    } = options

    /* 基本数据 */
    this.mapBaseConfig = {
      dataSRID: 4326,
      displaySRID: projCrs,
      initialPosition: center
    }

    const centerCoordinate = new hmap.basetype.Coordinate(+center[0], +center[1], 0)
    const mapOptions = {
      zoom,
      minLevel,
      maxLevel,
      center: this._toDisplaySRID(centerCoordinate),
      crs: new hmap.proj.Crs(projCrs)
    }
    this.mapInstance = new hmap.Map(this.id, mapOptions, () => {
      rewriteHmapMethod()
      callback(this.mapInstance)
    })
  }

  /* map viewer */
  initHvt (options) {
    const {
      layerUrl = '/hmap-server/hvt',
      dataFormat = 'hvt',
      styleUrl = '/hmap-server/style/callanalysis-tel-withe/mapStyle.json',
      matrixOrigin = [-180, 90],
      isRTE = true,
      labelOn = true
    } = options

    const layerOptions = {
      matrixOrigin: new hmap.basetype.Coordinate(matrixOrigin[0], matrixOrigin[1]),
      dataFormat,
      styleUrl: `${ location.origin }${ styleUrl }`,
      labelOn,
      isRTE
    }
    const vectorTileLayer = new hmap.layer.VectorTileLayer('vectorTileLayer', layerUrl, layerOptions)
    this.mapInstance.addLayer(vectorTileLayer)
    this.mapViewerLayers.set('vectorTileLayer', vectorTileLayer)
    return vectorTileLayer
  }

  initTms (options) {
    const {
      layerUrl = 'https://webst01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
      matrixOrigin = [-20037508.342789, 20037508.342789],
      // layerUrl = 'https://hmap.hikvision.com.cn/hmappublish/service/rs/v1/raster_tile/tms/hmap_jx_jx',
      // matrixOrigin = [-180, 90],
      dataFormat = 'png',
      visibility = true
    } = options

    const layerOptions = {
      matrixOrigin: new hmap.basetype.Coordinate(matrixOrigin[0], matrixOrigin[1]),
      dataFormat,
      visibility
    }

    const tmsLayer = new hmap.layer.TMSLayer('tmsLayer', layerUrl, layerOptions)
    this.mapInstance.addLayer(tmsLayer)
    this.mapViewerLayers.set('tmsLayer', tmsLayer)
    return tmsLayer
  }

  /* listener */
  initListener () {

  }

  destroyListener () {

  }


  /* wkt */
  setGeometryToWkt (geometry) {
    const wkt = new hmap.format.WKT()
    return wkt.writeGeometry(this._toDataSRID(geometry))
  }

  setWktToGeometry (wktStr) {
    const wkt = new hmap.format.WKT()
    return this._toDisplaySRID(wkt.readGeometry(wktStr))
  }

  /* center */
  setMapCenter (center, zoom = 16) {
    if (!(center instanceof hmap.basetype.Coordinate)) {
      center = this._toDisplaySRID(new hmap.basetype.Coordinate(+center[0], +center[1], +center[2] || 0))
    }
    this.mapInstance.setCenter(center, zoom)
  }

  flyMapCenter (center) {
    if (!(center instanceof hmap.basetype.Coordinate)) {
      center = this._toDisplaySRID(new hmap.basetype.Coordinate(+center[0], +center[1], +center[2] || 0))
    }
    this.mapInstance.flyTo({
      desCoord: center,
      duration: 1000
    })
  }

  /* 内部的一些工具方法 */
  _parseColorToHmap (color) {
    const { red, green, blue, alpha } = this._parseColor(color)
    return new hmap.style.Color(red, green, blue, alpha)
  }

  _layerGenerator (layerName, layerType, options = {}) {
    if (this.mapLayers.has(layerName)) {
      return this.mapLayers.get(layerName)
    } else {
      const layer = new hmap.layer[layerType](layerName, { ...options })
      this.mapInstance.addLayer(layer)
      this.mapLayers.set(layerName, layer)
      return layer
    }
  }

  /* 兼容坐标系 方法 */
  _toDataSRID (source) {
    if (!this._needTransform) return source
    return this._transformSRID(source.clone(), this.mapBaseConfig.displaySRID, this.mapBaseConfig.dataSRID)
  }

  _toDisplaySRID (source) {
    if (!this._needTransform) return source
    return this._transformSRID(source.clone(), this.mapBaseConfig.dataSRID, this.mapBaseConfig.displaySRID)
  }

  _transformSRID (source, src, dest) {
    if (src === dest) return source

    if (source instanceof hmap.basetype.Coordinate) {
      // source 为 Coordinate
      const [x, y] = dest === 3857
        ? hmap.proj.Transformer.WGS84ToGCJ02([source.getOrdinate('X'), source.getOrdinate('Y')])
        : hmap.proj.Transformer.GCJ02ToWGS84([source.getOrdinate('X'), source.getOrdinate('Y')])
      return hmap.proj.Transformer.transform(new hmap.basetype.Coordinate(x, y), src, dest)
    }

    if (source instanceof hmap.geom.Geometry) {
      return source.transform(src, dest)
      // source.applyTransform(({ _x, _y }) => {
      //   let [x, y] = hmap.proj.Transformer.WGS84ToGCJ02([_x, _y])
      //   return new hmap.basetype.Coordinate(x, y)
      // })
    }
  }


  /**
   * 解析颜色字符串
   * @param {String} color 颜色字符串
   * @return {Object} data
   * @return {Number} data.red 红色值
   * @return {Number} data.green 绿色值
   * @return {Number} data.blue 蓝色值
   * @return {Number} data.alpha 不透明度
   */
  _parseColor (color) {
    const rgbRegExp = /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i
    const rgbaRegExp = /^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)$/i
    const hexColorRegExp = /^#([0-9A-F]{3,8})$/i
    // 处理 "rgb(255, 255, 255)"
    const rgb = color.match(rgbRegExp)
    if (rgb) {
      const [, r, g, b] = rgb
      return {
        red: parseFloat(r),
        green: parseFloat(g),
        blue: parseFloat(b),
        alpha: 1
      }
    }
    // 处理 "rgba(255, 255, 255, 1)"
    const rgba = color.match(rgbaRegExp)

    if (rgba) {
      const [, r, g, b, a] = rgba
      return {
        red: parseFloat(r),
        green: parseFloat(g),
        blue: parseFloat(b),
        alpha: parseFloat(a)
      }
    }
    // 处理 "#FFFFFF"
    const hex = color.match(hexColorRegExp)
    if (hex) {
      const [, value] = hex
      let r
      let g
      let b
      let a

      switch (value.length) {
        case 3:
          [r, g, b] = value
          return {
            red: parseInt(`${ r }${ r }`, 16),
            green: parseInt(`${ g }${ g }`, 16),
            blue: parseInt(`${ b }${ b }`, 16),
            alpha: 1
          }

        case 4:
          [r, g, b, a] = value
          return {
            red: parseInt(`${ r }${ r }`, 16),
            green: parseInt(`${ g }${ g }`, 16),
            blue: parseInt(`${ b }${ b }`, 16),
            alpha: parseInt(`${ a }${ a }`, 16) / 255
          }

        case 6:
          r = value.slice(0, 2)
          g = value.slice(2, 4)
          b = value.slice(4, 6)
          return {
            red: parseInt(r, 16),
            green: parseInt(g, 16),
            blue: parseInt(b, 16),
            alpha: 1
          }

        case 8:
          r = value.slice(0, 2)
          g = value.slice(2, 4)
          b = value.slice(4, 6)
          a = value.slice(6, 8)
          return {
            red: parseInt(r, 16),
            green: parseInt(g, 16),
            blue: parseInt(b, 16),
            alpha: parseInt(a, 16) / 255
          }

        default:
          break
      }
    }
    throw new Error(`非法的颜色值: ${ color }`)
  }
}

