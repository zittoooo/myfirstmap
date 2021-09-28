// const mapContainer = document.getElementById("box-right");
// const mapOption = {
//     center: new daum.maps.LatLng(37.554477, 126.970419),
//     level: 3,
// };

// let map = new daum.maps.Map(mapContainer, mapOption);

// let infowindow = new daum.maps.InfoWindow({
//     zIndex: 1,
// });

// let markerList = [];
// let ps = new daum.maps.services.Places();

// searchPlaces();

// function searchPlaces() {
//     let keyword = $("#keyword").val();

//     ps.keywordSearch(keyword, placesSearchCB);
// }

// function placesSearchCB(data, status) {
//     if (status === daum.maps.services.Status.OK) {
//         displayPlaces(data);
//     }
//     else if(status === daum.maps.services.Status.ZERO_RESULT) {
//         alert("검색 결과가 존재하지 않습니다.");
//         return ;
//     }
//     else if (status === daum.maps.services.Status.ERROR) {
//         alert("검색 결과중 오류가 발생했습니다.");
//         return ;
//     }
// }

// function displayPlaces(data) {
//     // 우리가 가진 db에 있는 값인지 확인해서 있으면 출력한다.
//     let listEl = document.getElementById('placesList');
//     let bounds = new daum.maps.LatLngBounds();

//     removeAllChildNodes(listEl);
//     removeMarker();

//     for (let i = 0; i < data.length; i++) {
//         let lat = data[i].y;
//         let lng = data[i].x;
//         let address_name = data[i].address_name;
//         let place_name = data[i]["place_name"];

//         const placePosition = new daum.maps.LatLng(lat, lng);
//         bounds.extend(placePosition);

//         let marker = new daum.maps.Marker({
//             position: placePosition,
//         });
//         marker.setMap(map);
//         markerList.push(marker);

//         const el = document.createElement("div");
//         const itemStr = `
//             <div class=info>
//                 <div class="info_title">
//                  ${place_name}
//                  </div>
//                  <span>${address_name}</span>
//             </div>
//         `;

//         el.innerHTML = itemStr;
//         el.className = "item";

//         daum.maps.event.addListener(marker, "click", function() {
//             displayInfowindow(marker, place_name, address_name, lat, lng);
//         });

//         daum.maps.event.addListener(map, "click", function () {
//             infowindow.close();
//         });

//         el.onclick = function() {
//             displayInfowindow(marker, place_name, address_name, lat ,lng)
//         };

//         listEl.appendChild(el);
//     }
//     map.setBounds(bounds);
// }

// function displayInfowindow(marker, place_name, address, lat, lng) {
//     let content = `
//         <div style="padding:25px;">
//             ${place_name}<br>
//             ${address}<br>
//             <button onClick="onSubmit('${place_name}', '${address}', ${lat}, ${lng});">등록</button>
//         </div>
//     `;

//     map.panTo(marker.getPosition());
//     infowindow.setContent(content);
//     infowindow.open(map, marker);
// }

// function onSubmit(title, address, lat, lng) {
//     $.ajax({
//         url : "/location",
//         data: {title, address, lat, lng},
//         type: "POST",
//     }).done((response) => {
//         console.log("데이터 요청 성공");
//         alert("성공");
//     }).fail((error) => {
//         console.log("데이터 요청 실패");
//         alert("실패");
//     });
// }

// function removeAllChildNodes(el) {
//     while (el.hasChildNodes()) {
//         el.removeChild(el.lastChild);
//     }
// }

// function removeMarker() {
//     for(let i = 0; i < markerList.length; i++) {
//         markerList[i].setMap(null);
//     }
//     markerList = [];
// }



var mapOptions = {
    center: new naver.maps.LatLng(37.3595704, 127.105399),
    zoom: 9
};

var map = new naver.maps.Map('map', mapOptions);

var markerList = [];
var infowindowList = [];
let listEl = document.getElementById('placesList');


for (var i in data){
    var target = data[i];
    var latlng = new naver.maps.LatLng(target.lat, target.lng);
    marker = new naver.maps.Marker({
        map: map, 
        position: latlng, 
        icon : {
            content: "<div class='marker'></div>", 
            anchor : "new naver.maps.Point(12,12)"
        }
    });

    var content = `<div class='infowindow_wrap'>
    <div class='infowindow_title'>${target.company}</div>
    <div class='infowindow_content'>${target.address}</div>
    <div class='infowindow_date'>${target.date}</div>
    </div>`;

    var infoWindow = new naver.maps.InfoWindow({
        content: content, 
        backgroundColor: '#00ff0000', 
        borderColor : '#00ff0000', 
        anchorSize: new naver.maps.Size(0,0)
    });

    markerList.push(marker);
    infowindowList.push(infoWindow);

    const el = document.createElement("div");
        const itemStr = `
            <div class=info>
                <div class="info_title">
                 ${target.company}
                 </div>
                 <span>${target.address}</span>
            </div>
        `;

        el.innerHTML = itemStr;
        el.className = "item";
        listEl.appendChild(el);
}

for (var i = 0, ii=markerList.length; i < ii; i++){
    naver.maps.Event.addListener(map, "click", ClickMap(i)); /* 순서가 뒤면 아예 적용 안됨;; */
    naver.maps.Event.addListener(markerList[i], "click", getClickHandler(i));
}

function ClickMap(i) {
    return function() {
        var infowindow = infowindowList[i];
        infowindow.close();
    }
}

function getClickHandler(i) {
    return function () {
        var marker = markerList[i]; 
        var infowindow = infowindowList[i];
        if (infowindow.getMap()) {
            infowindow.close();
        } else {
            infowindow.open(map, marker);
        }
    }
}



