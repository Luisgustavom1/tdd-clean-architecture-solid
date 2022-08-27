import React from 'react'
import ReactDOM from 'react-dom'
import Router from '@/presentation/components/router'
import { makeLogin } from './factories/pages/login/login-factory'
import { makeSignup } from './factories/pages/signup/singup-factory'

ReactDOM.render(
    <Router 
        makeLogin={makeLogin}
        makeSignup={makeSignup}
    />,
    document.getElementById('main')
)