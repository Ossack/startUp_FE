// 카카오 지도 가져오기

import React, { useEffect } from 'react';

const { kakao } = window;

const Location = () => {

    useEffect(() => {
        const container = document.getElementById('myMap');
		const options = {
			center: new kakao.maps.LatLng(33.450701, 126.570667),
			level: 3
		};
        const map = new kakao.maps.Map(container, options);
    }, []);

    return (
        <div id='myMap' style={{
            width: '100%', 
            height: '100vh'
        }}></div>
    );
} 

export default Location;