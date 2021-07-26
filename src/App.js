import './App.css';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { Component } from 'react';

class App extends Component {
    constructor(){
      super();

      this.state = {
        currentUser:null
      }
    }
    unsubscribeFromAuth = null;

    componentDidMount(){
      this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => { //onAuthStateChanged : will gives us back a function to unsubscribeFromAuth which will be used to close the subscription
       // this.setState({ currentUser: user });
        if(userAuth){
          const userRef  = await createUserProfileDocument(userAuth);
          userRef.onSnapshot(snapShot => {
            this.setState({
              currentUser:{
                id:snapShot.id,
                ...snapShot.data()
              }
            });
            console.log(this.state);
          });
        }else{
          this.setState({currentUser:userAuth});
        }
      })
    }

    componentWillUnmount() {
      this.unsubscribeFromAuth(); // Close the subscription
    }


  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
         <Route exact path='/' component={HomePage} />
         <Route exact path='/shop' component={ShopPage} />
         <Route exact path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
