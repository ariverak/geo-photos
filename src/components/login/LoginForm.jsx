import React,{ useEffect,useContext } from 'react'
import {createUseStyles} from 'react-jss'
import { Card,TextInputField,Button,Pane } from 'evergreen-ui'
import { useForm } from 'react-hook-form';
import useAxios from 'axios-hooks'
import { AuthContext } from 'App'
import { useToasts } from 'react-toast-notifications'

const useStyles = createUseStyles({
    card : {
        width : 300
    },
    form : {
        padding : 10
    }
})

export default () => {
    const classes = useStyles();
    const { addToast } = useToasts();

    const [ { data, loading, error }, executePost ] = useAxios({
        url : 'auth/login',
        method : 'post'
    },{ manual : true });

    const authContext = useContext(AuthContext);
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = async ({email,password}) => {
        await executePost({ data : { email, password } });
    };
    useEffect(()=>{
        const { setToken, setRefreshToken  } = authContext;
        if(data){
            setToken(data.token);
            setRefreshToken(data.refreshToken);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data]);

    useEffect(()=>{
        if(error){
            addToast(error.response.data.message, {
                appearance: 'warning',
                autoDismiss: true,
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[error]);

    return (
        <Card className={classes.card} elevation={1}>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <TextInputField
                name="email"
                isInvalid={!!errors.email}
                label="Ingrese correo electronico"
                placeholder="Email"
                validationMessage={errors.email?.message}
                innerRef={register({ 
                    validate: value => {
                        if(value === 'admin') return "Buen intento crack!";
                        if(!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)))
                            return "Direccion de correo electrico invalida.";
                    },
                    required: 'Debe ingresar un correo electrónico'
                })}
                />
                <TextInputField
                name="password"
                isInvalid={!!errors.password}
                label="Ingrese su contraseña"
                type="password"
                placeholder="Contraseña"
                validationMessage={errors.password?.message}
                innerRef={register({ 
                    required: 'Debe ingresar una contraseña',
                    minLength : {
                        value : 6,
                        message : 'Contraseña invalida'
                    }
                })}
                />
                <Pane display="flex" justifyContent="center">
                    <Button isLoading={loading} height={40} iconAfter="arrow-right">
                        ENTRAR
                    </Button>
                </Pane>
            </form>
        </Card>
    )
}