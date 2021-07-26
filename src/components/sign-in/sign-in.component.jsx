import React, { Component } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-buttom/custom-buttom.component';
import { signInWithGoogle } from '../../firebase/firebase.utils';
import './sign-in.styles.scss';


class SignIn extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            email:'',
            password:''
        }
    }

    handleSubmit = event =>{
        event.preventDefault();
        this.state({email:'', password:''});
    }

    handleChange = event =>{
        const {value, name} = event.target;
        this.state({[name]: value});
    }
    render(){
        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                    name="email" 
                    type="email" 
                    value ={this.state.email} 
                    handleChange={this.handleChange} 
                    label='Email'
                    required
                    />
                    <FormInput 
                    name="password" 
                    type="password" 
                    value ={this.state.password} 
                    handleChange={this.handleChange} 
                    label='Password'
                    required
                    />
                    <div className='buttons'>
                        <CustomButton 
                        type='submit'>
                            Sign in
                        </CustomButton>
                        <CustomButton 
                        onClick={signInWithGoogle} isGoogleSignIn>
                            Google Sign in
                        </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;