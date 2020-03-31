import React from 'react'
import Sidebar from 'components/layout/Sidebar';
import Header from 'components/layout/Header';
import Footer from 'components/layout/Footer';
import { createUseStyles } from 'react-jss'
import { headerHeight, sidebarWidth, footerHeight } from './theme'

const useStyles = createUseStyles({
    root : {
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
        }
    }
})

export default function Layout ({children}){
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Sidebar />
            <Header />
            <main>
                { children }
            </main>
            <Footer />
        </div>
    );
}