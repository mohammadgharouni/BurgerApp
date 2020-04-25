import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {withRouter} from "react-router-dom"
import * as actions from "./store/actions/index"
import Logout from "./containers/Auth/Logout/Logout"
import {connect} from 'react-redux';
import asyncComponent from "./hoc/asyncComponent/asyncComponent"

const asyncCheckout= asyncComponent(()=>{
    return import ("./containers/Checkout/Checkout")
});

const asyncOrder= asyncComponent(()=>{
    return import ("./containers/Orders/Orders")
});
const asyncAuth= asyncComponent(()=>{
    return import ("./containers/Auth/Auth")
})

class App extends Component {

    componentDidMount() {
        this
            .props
            .OnTryAutoSignUp()
    }

    render() {
        let routes = (
            <Switch>

                <Route path="/" exact component={BurgerBuilder}/>
                <Route path="/auth" component={asyncAuth}/>
                <Redirect to="/"/>
            </Switch>
        )

        if (this.props.isAuthenticated) {
            routes = <Switch>
                <Route path="/checkout" component={asyncCheckout}/>
                <Route path="/" exact component={BurgerBuilder}/>
                <Route path="/orders" component={asyncOrder}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/auth" component={asyncAuth}/>

                <Redirect to="/"/>


            </Switch>
        }
        return (
            <div>
                <Layout>

                  {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.token !== null

})

const mapDispatchToProps = dispatch => {
    return {
        OnTryAutoSignUp: () => dispatch(actions.authCheckState())
    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
