import React from 'react';
import './cart-dropdown.styles.scss';
import CustomButton from '../custom-buttom/custom-buttom.component';

const CartDropDown = () =>(
    <div className='cart-dropdown'>
        <div className='cart-items'></div>
        <CustomButton>CHECKOUT</CustomButton>
    </div>
)
export default CartDropDown;