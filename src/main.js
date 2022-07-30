document.addEventListener('DOMContentLoaded', () => {

  // 建立地圖
  const center = [23.7577054,120.8964954];
  const zoom = 8;
  const map = L.map('map').setView(center, zoom);
  const osmUri = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png';
  const attribution = '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>';
  L.tileLayer(osmUri, {
    attribution: attribution
  }).addTo(map);

  // 取資料
  // 國家公園、國家森林遊樂區及國家風景區範圍內之觀光景點(本島)：https://data.gov.tw/dataset/73234
  // SHP 轉 GEO json：https://mapshaper.org/
  // mapshaper 轉座標：https://help.flourish.studio/article/67-how-to-make-your-coordinates-wgs84-with-mapshaper-org
  fetch('dist/national-park.json?v=2')
    .then(res => res.json())
    .then(res => {
      const data = res.features;
      console.log(data);

      // 建 marker 並放上地圖
      const customIcon = L.icon({
        iconUrl: 'https://letswritetw.github.io/letswrite-leaflet-osm-locate/dist/dot.svg',
        iconSize: [16, 16],
      });

      Array.prototype.forEach.call(data, d => {
        let lat = d.geometry.coordinates[1];
        let lon =  d.geometry.coordinates[0];
        let name = d.properties.MARKNAME2;
        let address = d.properties.ADDRESS;
        let marker = L.marker([lat, lon], {
          icon: customIcon,
          title: name
        }).bindPopup(`<b>${name}</b><br/>${address}`)
          .addTo(map);
      });
    })
  
  // 抓定位：Leaflet.Locate
  // https://github.com/domoritz/leaflet-locatecontrol
  L.control.locate({
    position: 'topleft',
    strings: {
      title: '定位我的位置',
      metersUnit: '公尺',
      feetUnit: '英尺',
      popup: '距離誤差：{distance}{unit}以內'
    },
    clickBehavior: {
      inView: 'setView',
      outOfView: 'setView',
      inViewNotFollowing: 'inView'
    }
  }).addTo(map);

  // 全螢幕：Leaflet.Control.FullScreen
  L.control.fullscreen({
    position: 'topleft',
    title: '進入全螢幕',
    titleCancel: '離開全螢幕',
    content: '<img class="p-1" src="dist/size-fullscreen.svg">',
    forceSeparateButton: true,
    forcePseudoFullscreen: true,
    fullscreenElement: false
  }).addTo(map);
  const fullscreenBtn = document.querySelector('.leaflet-control-zoom-fullscreen')
  map.on('enterFullscreen', () => {
    fullscreenBtn.innerHTML = '<img class="p-1" src="dist/fullscreen-exit.svg">';
  });
  map.on('exitFullscreen', () => {
    fullscreenBtn.innerHTML = '<img class="p-1" src="dist/size-fullscreen.svg">';
  });

  // 小地圖：Leaflet.MiniMap
  const miniOSM = new L.TileLayer(osmUri, {
    minZoom: 0, maxZoom: 13, attribution: attribution
  });
  const miniMap = new L.Control.MiniMap(miniOSM).addTo(map);

  // 客製選單：sidebar-v2
  // sidebar-v2：https://github.com/turbo87/sidebar-v2/
  // Leaflet.TileLegend：https://github.com/yohanboniface/Leaflet.TileLegend
  // Leaflet.Control.Custom：https://github.com/yigityuce/Leaflet.Control.Custom
  // Leaflet.Legend：https://github.com/ptma/Leaflet.Legend
  // Leaflet.SidePanel：https://github.com/maxwell-ilai/Leaflet.SidePanel
  var sidebar = L.control.sidebar('sidebar').addTo(map);

})