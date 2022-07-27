document.addEventListener('DOMContentLoaded', () => {  

  const zoo = [24.9983469, 121.5810358]; // 預設中心點為台北市動物園

  // 建立地圖
  let zoom = 17; // 0-18
  let map = L.map('map').setView(zoo, zoom);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap',
    zoomControl: true , // 是否秀出 - + 按鈕
  }).addTo(map);

  let lc = L.control.locate({
    position: 'topright',
    locateOptions: {
      enableHighAccuracy: true
    },
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
  lc.start();

})