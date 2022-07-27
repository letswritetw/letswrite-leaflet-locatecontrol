document.addEventListener('DOMContentLoaded', () => {  

  const zoo = [24.9983469, 121.5810358]; // 預設中心點為台北市動物園

  // 建立地圖
  let zoom = 17; // 0-18
  let map = L.map('map').setView(zoo, zoom);
  L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png?api_key=1a7acae1-4755-465b-b420-88d44a11c473', {
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    zoomControl: true , // 是否秀出 - + 按鈕
  }).addTo(map);

  let lc = L.control.locate({
    position: 'bottomleft',
    locateOptions: {
      enableHighAccuracy: true
    },
    strings: {
      title: '定位我的位置',
      metersUnit: '公尺',
      feetUnit: '英尺',
      popup: '您距離此點 {distance} {unit} 以內'
    },
    clickBehavior: {
      inView: 'setView',
      outOfView: 'setView',
      inViewNotFollowing: 'inView'
    }
  }).addTo(map);
  lc.start();

})