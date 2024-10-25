export function useMapPopup (mapUtils) {
  /* mount */
  const addPopupToLayer = (VueTemplate, options, events = {}) => {
    const popupLayer = mapUtils._layerGenerator('popupLayer', 'OverlayLayer')

    const {
      id,
      center,
      props
    } = options

    const VueTemplateDom = new VueTemplate({
      propsData: props
    })
    VueTemplateDom.$mount()

    /* 消息转发 */
    for (const event in events) {
      VueTemplateDom.$on(event, data => {
        events[event](data)
      })
    }

    /* 上图 */
    const coordinate = mapUtils._toDisplaySRID(new hmap.basetype.Coordinate(+center[0], +center[1], 0))
    const simplePopup = new hmap.overlay.SimplePopup({
      location: coordinate,
      domId: id,
      element: VueTemplateDom.$el
    })
    popupLayer.addOverlay(simplePopup)
  }

  const removePopupToLayer = (id) => {
    const popupLayer = mapUtils._layerGenerator('popupLayer', 'VectorLayer')
    if (id) {

    } else {
      popupLayer.removeAllOverlays()
    }
  }

  return {

    addPopupToLayer,
    removePopupToLayer
  }
}
