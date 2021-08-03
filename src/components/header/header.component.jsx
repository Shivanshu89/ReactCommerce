import React from 'react';
import './header.styles.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {ReactComponent as Logo} from '../../assests/crown.svg'
import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropDown from '../cart-dropdown/cart-dropdown.component';

const Header = ({currentUser, hidden}) =>(
    <div className='header'>
        <Link className='link-contaioner' to="/">
            <Logo className='logo'/>
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>SHOP</Link>
            <Link className='option' to='/contact'>CONTACT</Link>
            {currentUser ? 
            <div className='option' onClick={()=> auth.signOut()}>SIGN OUT</div>
            :
            <Link className='option' to='/signin'>SIGN IN</Link>
            }
            <CartIcon/>
        </div>
        {
            hidden ? null : <CartDropDown/>
        }
        
    </div>
);

//syntax when you want to destructure nested vales of globalstate(root-reducer) 
//previous: const mapStateToProps = state =>
const mapStateToProps = ({user: { currentUser }, cart: { hidden }}) => ({
    currentUser,
    hidden
});
export default connect(mapStateToProps)(Header);