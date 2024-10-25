<template>
  <div class="container">
    <div
      ref="mapRef"
      id="map"
      class="map"
    ></div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import 'ol/ol.css'
import Map from 'ol/Map'
import OSM from 'ol/source/OSM'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'

/* map */
import KML from 'ol/format/KML'
import VectorSource from 'ol/source/Vector.js'
import VectorLayer from 'ol/layer/Vector'
import Style from 'ol/style/Style'

const mapRef = ref('mapRef')
/* map */
let mapInstance = null
let kmlSource = null
const getKmlVectorLayer = () => {
  const kml = new KML({
    extractStyles: false,
    showPointNames: true
  })
  const assetsUrl = import.meta.env.BASE_URL + import.meta.env.VITE_APP_ASSETS
  kmlSource = new VectorSource({
    url: `${ assetsUrl }/source/kml/demo.kml`,
    format: kml
  })
  console.log(kmlSource)

  return new VectorLayer({
    source: kmlSource
  })
}
const getTileLayer = () => {
  return new TileLayer({
    source: new OSM()
  })
}

const features = ref([])
const init = async () => {
  const kmlLayer = getKmlVectorLayer()
  const tileLayer = getTileLayer()
  mapInstance = new Map({
    layers: [
      kmlLayer,
      tileLayer
    ],
    target: 'map',
    view: new View({
      center: [0, 0],
      zoom: 2
    })
  })

  kmlSource.on('change', (event) => {
    const source = event.target
    if (source.getState() === 'ready') {
      features.value = source.getFeatures()
      console.log(features.value)
    }
  })
}


onMounted(() => {
  init()
})


</script>
<style
  lang="scss"
  scoped
>
.map {
  width: 1200px;
  height: 800px;
}
</style>
