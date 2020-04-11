import React,{ useContext } from 'react';
import { createUseStyles } from 'react-jss';
import { AuthContext } from 'App'
import { Avatar, Heading, Popover, Pane,SearchInput, Position, Menu } from 'evergreen-ui';

const useStyles = createUseStyles({
    root : {
        position : 'relative',
        gridArea: 'header',
        background : '#25364D',
        display : 'flex',
        justifyContent : 'space-between',
        alignItems : 'center',
        paddingLeft : 15,
        paddingRight : 15,
        zIndex: 1000
    },
    title : {
        marginLeft : 15
    },
    search : {
        marginRight : 30
    },
    avatar : {
        cursor : 'pointer'
    }
});

export default function Footer(){
    const classes = useStyles();
    const authContext = useContext(AuthContext);

    function logOut(){
        authContext.removeToken();
        authContext.removeRefreshToken();
    }
    return (
        <header className={classes.root}>
            <Pane display="flex" alignItems="center">
                <Avatar isSolid name="Jeroen Ransijn" size={40} />
                <Heading className={classes.title}>
                    Ariverak - Dashboard Concept
                </Heading>
            </Pane>
            <Pane display="flex" alignItems="center">
                <SearchInput className={classes.search} placeholder="Buscar..." />
                <Popover
                position={Position.BOTTOM_LEFT}
                content={
                    <Menu>
                        <Menu.Group title="JUAN RIVERA VARGAS">
                            <Menu.Item icon="user">Mi cuenta</Menu.Item>
                            <Menu.Item icon="cog">Configuración</Menu.Item>
                        </Menu.Group>
                        <Menu.Divider />
                        <Menu.Item onClick={logOut} icon="log-out" intent="danger">
                            Salir
                        </Menu.Item>
                    </Menu>
                }
                >
                    <Avatar 
                    className={classes.avatar}
                    isSolid
                    src={"https://avatars3.githubusercontent.com/u/29168528?s=460&u=5513d95e49917ca3c6b070bcdf2a40ecd53ab485&v=4"}
                    size={40} />
                </Popover>
            </Pane>
        </header>
    )
}