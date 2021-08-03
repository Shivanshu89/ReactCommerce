import './App.css';
import { Switch, Route,  Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { Component } from 'react';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions'

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
         <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/'/>): (<SignInAndSignUpPage/>)}/>
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser:user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
