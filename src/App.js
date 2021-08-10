import './App.css';
import { Switch, Route,  Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Component } from 'react';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import checkOutPage from './pages/checkout/checkout.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';

class App extends Component {
    
    unsubscribeFromAuth = null;

    componentDidMount(){
      const { setCurrentUser } = this.props;
      this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => { //onAuthStateChanged : will gives us back a function to unsubscribeFromAuth which will be used to close the subscription
       // this.setState({ currentUser: user });
        if(userAuth){
          const userRef  = await createUserProfileDocument(userAuth);
          userRef.onSnapshot(snapShot => {
            setCurrentUser({
                id:snapShot.id,
                ...snapShot.data()
              });
          });
        }else{
          setCurrentUser(userAuth);
        }
      })
    }

    componentWillUnmount() {
      this.unsubscribeFromAuth(); // Close the subscription
    }


  render(){
    return (
      <div>
        <Header/>
        <Switch>
         <Route exact path='/' component={HomePage} />
         <Route exact path='/shop' component={ShopPage} />
         <Route exact path='/checkout' component ={checkOutPage} />
         <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/'/>): (<SignInAndSignUpPage />)}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser:user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
