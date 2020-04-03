import React,{ useState,useMemo} from 'react';
import { createUseStyles } from 'react-jss';
// import { Pane, Tablist, Tab, Icon } from 'evergreen-ui'
import L from 'leaflet'
import { Map as LeafletMap,TileLayer, Marker, Popup } from 'react-leaflet'
// import classNames from 'classnames'

// var layer = new L.StamenTileLayer("toner");

const useStyles = createUseStyles({
    root : { 
        width : '100%',
        height : '100%',
        filter : 'invert(1)'
    },
    map : { 
        width : '100%',
        height : '100%',
        borderRadius : '1em'
    }
});


const Map = ({photos}) => {
    const classes = useStyles();
    const [lat, setLat] = useState(-40.5770259);
    const [lng, setLng] = useState(-73.1317625);
    const [zoom, setZoom] = useState(15);
    const position = useMemo(()=>[lat,lng],[lat,lng])
    return (
        <div className={classes.root}>
            <LeafletMap lay className={classes.map} center={position} zoom={zoom}>
                <TileLayer
                
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </LeafletMap>
        </div>
    )
}
export default Map;