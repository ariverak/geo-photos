import React,{ useState,useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import { Pane, Tablist, Tab, Icon,Text } from 'evergreen-ui'
import useAxios from 'axios-hooks'
import Gallery from 'components/photos/Gallery';
import GeoMapPhotos from 'components/photos/GeoMapPhotos';
import Loading from 'components/shared/Loading';
import { sidebarWidth } from 'layout/theme';
import _ from 'lodash'
import cloudinary from 'services/cloudinary'
import { getThumbnailSize } from 'utils';
// import classNames from 'classnames'

const useStyles = createUseStyles({
    root : {
        position: 'relative',
        height : '100%'
    },
    tabsContainer : {
        zIndex : 500,
        width : `calc(100% - ${sidebarWidth}px)`,
        height : 60,
        backgroundColor : '#0F1724',
        position : 'fixed',
        top: 0,
        right:0,
        display:'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 65
    },
    tabs : {
        flex: 1,
        margin: '2em',
        display:'inline-flex',
        justifyContent:'space-between',
        alignItems: 'center'
    },
    content: {
        height : '100%',
        paddingTop: 30
    },
    actions : {
        width: 'auto'
    }
});

const tabs = [{label: 'Mapa', icon : 'geosearch'},{ label :'Todas las Fotos', icon : 'media'}]

const PhotosPage = () => {
    const classes = useStyles();
    const [ tabIndex, setTabIndex ] = useState(0)
    const [ selected, setSelected ] = useState({})
    const [{ data : photos, loading, error }] = useAxios('photos');
    const countSelected = useMemo(()=>Object.keys(selected).filter(key=>!!selected[key]).length,[selected]);
    
    const images = useMemo(()=>_.map(photos,p=>{
        return {
            id: p.id,
            width: p.width,
            height: p.height,
            src: cloudinary.url(
                p.publicId,
                {transformation: [{height: 300,crop: "scale"}]}
            ),
            thumbnail: cloudinary.url(
                p.publicId,
                {transformation: [{height: 120,crop: "scale"}]}
            )
        }
        }),[photos]);

    if(loading || error) return <Loading />
    return (
        <div className={classes.root}>
            <Pane className={classes.tabsContainer}>
                <Pane className={classes.tabs}>
                    <Tablist flexBasis={240}>
                        {tabs.map((tab, index) => (
                            <Tab
                                key={index}
                                id={tab.label+index}
                                onSelect={() => setTabIndex(index)}
                                isSelected={index === tabIndex}
                                aria-controls={`panel-${tab.label}`}
                            >
                                <Icon 
                                icon={tab.icon}
                                color={index === tabIndex ? "white" : 'default'}
                                marginRight={16} />
                                {tab.label}
                            </Tab>
                        ))}
                    </Tablist>
                    <Pane className={classes.actions}>
                        <Text>
                            {(countSelected > 0) && (
                                <div>{countSelected} Seleccionados</div>
                            )}
                        </Text>
                    </Pane>
                </Pane>
            </Pane>
            <Pane className={classes.content}>
                {(tabIndex === 0) && (
                    <GeoMapPhotos photos={images} />
                )}
                {(tabIndex === 1) && (
                    <Gallery photos={images} selected={selected} setSelected={setSelected} />
                )}
            </Pane>
        </div>
    )
}
export default PhotosPage;