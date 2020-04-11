import React,{ useMemo,useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import PhotoGallery from "react-photo-gallery";
import _ from 'lodash'
import ImageComponent from './ImageComponent';
// import { getThumbnailSize } from 'utils';
// import classNames from 'classnames'

const useStyles = createUseStyles({
    root : {
        '& #lightboxBackdrop':{
            color : 'red'
        }
    }
});


const Gallery = ({photos,selected,setSelected}) => {
    const classes = useStyles();
    const imageRenderer = useCallback(
        ({ index, left, top, key, photo }) => (
            <ImageComponent
            selected={selected[photo.id]}
            key={key}
            margin={3}
            index={index}
            photo={photo}
            left={left}
            top={top}
            handleOnClick={photo=>{
                setSelected({...selected,[photo.id] : !selected[photo.id]})
            }}
            />
        ),
        [selected,setSelected]
    );
    return (
        <div className={classes.root}>
            <PhotoGallery 
            photos={photos}
            renderImage={imageRenderer}
            margin={10}
            />
        </div>
    )
}
export default Gallery;