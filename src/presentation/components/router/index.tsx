import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import '@/presentation/styles/global.scss'

type Props = {
    makeLogin: React.ComponentType<any>
}

const Router = ({ makeLogin }: Props) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/login' exact component={makeLogin} />
            </Switch>
        </BrowserRouter>
    )
}

export default Router;