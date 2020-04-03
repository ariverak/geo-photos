import React,{ useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Pane, Tablist, Tab, Icon } from 'evergreen-ui'
import useAxios from 'axios-hooks'
import Gallery from 'components/photos/Gallery';
import Map from 'components/photos/Map';
import Loading from 'components/shared/Loading';
// import classNames from 'classnames'

const useStyles = createUseStyles({
    root : {
        height : '100%'
    }
});

const tabs = [{ label :'Fotos', icon : 'media'}, {label: 'Mapa', icon : 'geosearch'}]

const HomePage = () => {
    const classes = useStyles();
    const [ tabIndex, setTabIndex ] = useState(0)
    const [{ data : photos, loading, error }] = useAxios('photos');
    if(loading || error) return <Loading />
    console.log(photos)
    return (
        <div className={classes.root}>
            <Pane>
                <Tablist marginBottom={30} flexBasis={240} marginRight={24}>
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
            </Pane>
            {(tabIndex === 0) && (
                <Gallery photos={photos} />
            )}
            {(tabIndex === 1) && (
                <Map />
            )}
        </div>
    )
}
export default HomePage;