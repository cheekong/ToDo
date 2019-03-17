import React, { Component }  from 'react';

import './login.css';

class Login extends Component {
    render(){
        return(
            <div id='login'> 
                <form>
                    <h1>Welcome back :)</h1>
                    <ul>
                        <li>
                            <input className='user' type='text' placeholder='Username'/>
                        </li>
                        <li>
                            <input className='pass' type='password' placeholder='Password'/>
                        </li>
                        <li>
                            <input className='cta--forward'type='button' value="Let's Go!"/>
                        </li>
                    </ul>
                    
                </form>
            </div>
        )
    }
}

export default Login;