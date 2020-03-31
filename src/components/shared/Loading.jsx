import React from 'react';
import { Spinner,Pane } from 'evergreen-ui'

export default function Loading(){
    return (
        <Pane display="flex" justifyContent="center">
            <Spinner />
        </Pane>
    )
}