import React,{ useState,useMemo} from 'react';
import { createUseStyles } from 'react-jss';
import _ from 'lodash'
// import { Pane, Tablist, Tab, Icon } from 'evergreen-ui'
import { Map as LeafletMap,TileLayer, Marker, Popup } from 'react-leaflet'
import { Pane, Card } from 'evergreen-ui';
import classNames from 'classnames'
import useSound from 'use-sound';
import { useEffect } from 'react';

// var layer = new L.StamenTileLayer("toner");

const useStyles = createUseStyles({
    root : { 
        width : '100%',
        height : '100%'
    },
    map : { 
        filter : 'invert(1)',
        width : 'calc(100% - 240px)',
        height : '100%',
        borderRadius : '1em'
    },
    photosPicker : {
        width: 240,
        display:'flex',
        flexDirection:'column',
        overflow:'auto',
        height : '100%',
        marginLeft: 10,
        borderRadius: 10,
        // backgroundColor: '#25364D',
        '& img': {
            objectFit: 'contain',
            margin: 5,
            backgroundColor: '#25364D',
            // backgroundColor: '#f8f8f8',
            borderRadius: 40,
            '&:hover':{
                cursor: 'pointer',
                boxShadow: '0px 0px 0px 2px #1070ca',
                boxSizing: 'border-box' /* Include padding and border in element's width and height */
            }
        }
    },
    active : {
        boxShadow: '0px 0px 0px 2px #1070ca',
        boxSizing: 'border-box',
        transform : 'scale(0.95)'
    }
});


const GeoMapPhotos = ({photos}) => {
    const classes = useStyles();
    const [lat, setLat] = useState(-40.5770259);
    const [lng, setLng] = useState(-73.1317625);
    const [zoom, setZoom] = useState(15);
    const [currentPhoto, setCurrentPhoto] = useState({})
    const position = useMemo(()=>[lat,lng],[lat,lng]);

    const [playOn] = useSound(
      '/sounds/pop-up-on.mp3',
      { volume: 0.25 }
    );

    function handleClickPhoto(photo){
        setCurrentPhoto(photo)
    }

    useEffect(()=>{
        playOn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentPhoto])

    return (
        <Pane display="flex" className={classes.root}>
            <LeafletMap className={classes.map} center={position} zoom={zoom}>
                <TileLayer
                
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
                />
                {!_.isEmpty(currentPhoto) && (
                    <Marker position={position}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                )}
            </LeafletMap>
            <Card className={classes.photosPicker}>
                {photos.map(photo=>(
                    <img 
                    className={classNames({[classes.active]: currentPhoto.id === photo.id})}
                    onClick={()=>handleClickPhoto(photo)} 
                    alt={photo.name}
                    src={photo.thumbnail}
                    />
                ))}
            </Card>
        </Pane>
    )
}
export default GeoMapPhotos;