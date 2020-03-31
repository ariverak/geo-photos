import React,{ useContext } from 'react';
import { createUseStyles } from 'react-jss';
import { AuthContext } from 'App'
import { Avatar, Heading, Popover, Pane, Button,SearchInput } from 'evergreen-ui';

const useStyles = createUseStyles({
    root : {
        gridArea: 'header',
        background : '#25364D',
        display : 'flex',
        justifyContent : 'space-between',
        alignItems : 'center',
        paddingLeft : 15,
        paddingRight : 15
    },
    title : {
        marginLeft : 15
    },
    search : {
        marginRight : 30
    }
});

export default function Footer(){
    const classes = useStyles();
    const authContext = useContext(AuthContext);
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
                content={
                    <Pane
                    width={240}
                    height={240}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                    >
                        <Button onClick={()=>{
                            authContext.removeRefreshToken()
                            authContext.removeToken()
                        }}>
                            Salir
                        </Button>
                    </Pane>
                }
                >
                    <Avatar isSolid src={"https://avatars3.githubusercontent.com/u/29168528?s=460&u=5513d95e49917ca3c6b070bcdf2a40ecd53ab485&v=4"} size={40} />
                </Popover>
            </Pane>
        </header>
    )
}