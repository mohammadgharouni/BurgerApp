import React, {Component} from 'react';
import {Route, Redirect} from "react-router-dom"
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Contactdata from './ContactData/ContactData';
import {connect} from "react-redux"

class Checkout extends Component {

    checkoutCancelled = () => {
        this
            .props
            .history
            .goBack();

    }
    checkoutContinued = () => {

        this
            .props
            .history
            .replace("/checkout/contact-data")
    }
    render() {

        let summary = <Redirect to="/"/>
        if (this.props.ings) {
            const purchaseRedirect = this.props.purchased
                ? <Redirect to="/"/>
                : null;
            summary = (
                <div >
                    {purchaseRedirect}
                    <CheckoutSummary
                        checkoutContinued={this.checkoutContinued}
                        checkoutCancelled={this.checkoutCancelled}
                        ingredients={this.props.ings}/>
                    <Route path={this.props.match.path + "/contact-data"} component={Contactdata}/>

                </div>
            )
        }
        return summary
    }
}

const mapStateToProps = (state) => {
    return{

        
        ings: state.burgerBuilder.ingredients, price: state.burgerBuilder.totalPrice, purchased: state.order.purchased
        
    }


}

export default connect(mapStateToProps)(Checkout);