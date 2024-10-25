import Vue, { reactive, watch } from 'vue'
import MapUtils from '@/pages/hmap/MapUtils'
import { useMapCamera } from '@/pages/hmap/useMapCamera'
import { useMapPopup } from '@/pages/hmap/useMapPopup'
import PopupTemplate from '@/pages/hmap/template/popup.vue'

/*
* useMap 主要负责对vue相关的hooks进行处理，比如 ref reactive watch 等
* MapUtils 主要负责对hmap相关基础操作进行处理，比如统一处理坐标系转换、颜色等
* */
export function useMap (settings) {
  // settings
  const {
    id
  } = settings

  const mapUtils = new MapUtils(id)
  /********** 初始化 start **********/
  const initMap = (options) => {
    return new Promise((resolve, reject) => {
      mapUtils.buildMap(options, instance => {
        mapUtils.initListener()
        resolve(instance)
      })
    })
  }
  /********** 初始化 end **********/

  /********** 地图视图 start **********/
  const mapViewer = reactive({
    order: 0,
    count: 0,
    viewers: new Map()
  })
  const addMapViewer = (type, options) => {
    mapViewer.count++
    let layer = null
    switch (type) {
      case 'hvt' :
        layer = mapUtils.initHvt(options)
        break
      case 'tms':
        layer = mapUtils.initTms(options)
        break
    }
    mapViewer.viewers.set(mapViewer.count, layer)
  }
  watch(() => mapViewer.order, (v) => {
    const layer = mapViewer.viewers.get(v)
    console.log('当前对应编号的viewer layer', layer)
  })
  /********** 地图视图 end **********/


  /********** 监控点 start **********/
  const addCamera = (data) => {
    const { addCameraToLayer } = useMapCamera(mapUtils)
    addCameraToLayer(data)
  }
  const removeCamera = () => {
    const { removeCameraToLayer } = useMapCamera(mapUtils)
    removeCameraToLayer()
  }
  const cameraUtils = {
    addCamera,
    removeCamera
  }
  /********** 监控点 end **********/


  /********** popup start **********/

  /**
   *
   * @param options
   * @param events
   */
  const addPopup = (options, events = {}) => {
    const PopupVue = Vue.extend(PopupTemplate)

    const { addPopupToLayer } = useMapPopup(mapUtils)
    addPopupToLayer(PopupVue, options, events)
  }
  const removePopup = (id) => {
    const { removePopupToLayer } = useMapPopup(mapUtils)
    removePopupToLayer(id)
  }
  const popupUtils = {
    addPopup,
    removePopup
  }
  /********** popup end **********/


  /********** 轨迹 start **********/

  /********** 轨迹 end **********/


  /********** 绘图 start **********/

  /********** 绘图 end **********/

  return {
    initMap,
    mapViewerUtils: {
      addMapViewer,
      mapViewer
    },
    popupUtils,
    cameraUtils
  }
}


