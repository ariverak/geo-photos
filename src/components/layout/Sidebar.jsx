import React from 'react';
import sidebarItems from './sidebarItems';
import { Pane, Paragraph } from 'evergreen-ui';
import classNames from 'classnames'
import { createUseStyles } from 'react-jss';
import { NavLink } from 'react-router-dom';

const useStyles = createUseStyles({
    root : {
        gridArea: 'nav',
        background : 'transparent',
        position : 'relative',
        marginTop : 45
    },
    sidebarItem : {
        cursor : 'pointer',
        height : 45,
        paddingLeft : 16,
        paddingRight : 16,
        borderRadius: '0 25px 25px 0',
        '&:hover' : {
            backgroundColor : '#1D2636',
            '& p': {
                color : '#C6D3E7'
            }
        }
    },
    activeItem : {
        '& div': {
            backgroundColor : '#25364E',
        },
        '& p': {
            color : '#C6D3E7'
        }
    }
});

export default function Sidebar(){
    const classes = useStyles();
    return (
        <nav className={classes.root}>
            {sidebarItems.map((item,i)=>(
                <NavLink key={i} to={item.path} exact activeClassName={classes.activeItem}>
                    <Pane 
                    display="flex"
                    alignItems="center"
                    className={classNames(classes.sidebarItem)}>
                        <Paragraph size={500}>{item.displayName}</Paragraph>
                    </Pane>
                </NavLink>
            ))}
        </nav>
    )
}