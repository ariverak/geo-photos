import React from 'react'
import Sidebar from 'components/layout/Sidebar';
import Header from 'components/layout/Header';
import Footer from 'components/layout/Footer';
import { createUseStyles } from 'react-jss'
import { headerHeight, sidebarWidth, footerHeight } from './theme'
import Particles from 'react-particles-js';
import particlesConfig from 'particlesjs-config.json'

const useStyles = createUseStyles({
    root : {
        position : 'relative',
        display: 'grid',
        height : '100vh',
        backgroundColor : '#0F1724',
        gridTemplateRows : `${headerHeight}px 1fr ${footerHeight}px`,
        gridTemplateColumns : `${sidebarWidth}px 1fr`,
        gridTemplateAreas : `"header header"
                                "nav main"
                                ${true ? "" : '"nav footer"'}`,
        '& main' : {
            gridArea: 'main',
            padding : '2em'
        },
        zIndex : 1
    },
    particles : {
        position : 'absolute',
        left : 0,
        right : 0,
        top : 0,
        bottom : 0,
        zIndex : 1000,
        pointerEvents: 'none'
    }
})

export default function Layout ({children}){
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Particles  params={particlesConfig} className={classes.particles} />
            <Sidebar />
            <Header />
            <main>
                { children }
            </main>
            <Footer />
        </div>
    );
}