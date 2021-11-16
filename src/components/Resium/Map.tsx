import GeographicTilingScheme from 'cesium/Source/Core/GeographicTilingScheme';
import React from 'react';
import WebMapServiceImageryProvider from 'cesium/Source/Scene/WebMapServiceImageryProvider';
import { Viewer } from 'resium';
import './Map.css';

const Map = ()=> {
	const imageryProvider = new WebMapServiceImageryProvider({
		url: 'http://localhost:8080/geoserver/wms',
		// url: 'http://localhost:80/cgi-bin/mapserv.exe?MAP=/data/config/map/nasaww.map&SERVICE=WMS&request=GetMap',
		// layers: 'BlueMarble-200405',
		 layers: 'FireLight:BlackMarble_2016_01deg_geo',
		tilingScheme: new GeographicTilingScheme(),
	});

	return (
		<Viewer full baseLayerPicker={false} imageryProvider={imageryProvider}>
			{/* <CameraFlyTo destination={Cartesian3.fromDegrees(139.767052, 35.681167, 100)} /> */}
			{/* <Entity
				name="Osaka"
				description="Test"
				point={{ pixelSize: 10, color: Color.LIGHTBLUE }}
				position={Cartesian3.fromDegrees(139.767052, 35.681167)}
			>
				<ModelGraphics uri='Cesium_Air.glb' minimumPixelSize={128} />
			</Entity> */}
		</Viewer>
	);
}

export default Map;
