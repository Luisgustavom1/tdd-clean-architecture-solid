import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Signup from '@/presentation/pages/signup/signup'

import '@/presentation/styles/global.scss'

type Props = {
    makeLogin: React.ComponentType<any>
}

const Router = ({ makeLogin }: Props) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/login' exact component={makeLogin} />
                <Route path='/signup' exact component={Signup} />
            </Switch>
        </BrowserRouter>
    )
}

export default Router;