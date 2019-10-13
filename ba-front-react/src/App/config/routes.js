import React from 'react';
import App   from '../App';
import Login from '../components/login/Login';
import { Route, IndexRoute} from 'react-router';
import ResetPasswordForm    from '../components/login/ResetPasswordForm';
import ResetPasswordConfirm from '../components/login/ResetPasswordConfirm';
import Home          from '../containers/home/Home';
import Conditions    from '../containers/termos-condicoes/Conditions';
import PaymentsForms from '../containers/formas-pagamento/PaymentForms';
import RefundRules   from '../containers/reembolso/RefundRules';
import AboutUs       from '../containers/quem-somos/AboutUs';
import HowWork       from '../containers/como-funciona/HowWork';
import BePartner     from '../containers/seja-parceiro/BePartner';
import {isLoggedIn}  from '../actions/login_actions';
import YourAccount   from '../components/account/YourAccount';
import SearchWrap    from '../components/search/SearchWrap'
import HomeOut       from '../containers/home/homeOut/HomeOut';
import Emission      from '../components/emission/Emission';
import Billet        from '../components/billet/Billet';
import Refund        from '../components/refund/Refund';
import Faq           from '../containers/faq/Faq';
import ReactGA       from 'react-ga';
import withTracker   from './trackerView'
import SignIn        from '../components/register/SignIn';
import Thanks        from '../components/register/Thanks';
import OrderWrap     from '../components/order/OrderWrap';
import PosteriorMethodPay from "../components/payment/PosteriorMethodPay";

ReactGA.initialize('UA-64936431-2');

const protectedRoute = (props, Component, ...rest) => {

    return isLoggedIn()? <Component {...props} {...rest}/> : <HomeOut {...props} {...rest}/>;
};

export default  (
    <Route path='/' component={App}>

        <IndexRoute component={ withTracker((props, ...rest) => {
            return isLoggedIn()?  <Home/> : <HomeOut {...props} {...rest}/>
        }) }/>
        
        <Route path='/emissoes(/:page)(/:id)' component={ props => protectedRoute(props, withTracker(Emission)) }/>
        <Route path='/boletos'          component={ props => protectedRoute(props, withTracker(Billet)) }/>
        <Route path='/busca'            component={ props => protectedRoute(props, withTracker(SearchWrap)) }/>
        <Route path='/home'             component={ props => protectedRoute(props, withTracker(Home)) }/>
        <Route path='/termos/condicoes' component={ props => protectedRoute(props, withTracker(Conditions)) }/>
        <Route path='/formas/pagamento' component={ props => protectedRoute(props, withTracker(PaymentsForms)) }/>
        <Route path='/reembolso'        component={ props => protectedRoute(props, withTracker(RefundRules)) }/>
        <Route path='/bilhete'          component={ props => protectedRoute(props, withTracker(Refund)) }/>
        <Route path="/review"           component={ props => protectedRoute(props, withTracker(OrderWrap)) }/>
        <Route path='/sua-conta'        component={ props => protectedRoute(props, withTracker(YourAccount)) }/>
        <Route path='/pay'              component={ props => protectedRoute(props, withTracker(PosteriorMethodPay)) }/>
        <Route path='/home'             component={ withTracker(HomeOut) }/>
        <Route path='/cadastro'         component={ withTracker(SignIn) }/>tr
        <Route path='/login'            component={ withTracker(Login) } />
        <Route path='/password/reset'   component={ withTracker(ResetPasswordForm) }/>
        <Route path='/password/:token'  component={ withTracker(ResetPasswordConfirm) }/>
        <Route path='/quem-somos'       component={ withTracker(AboutUs) }/>
        <Route path='/como-funciona'    component={ withTracker(HowWork) }/>
        <Route path='/seja-parceiro'    component={ withTracker(BePartner) }/>
        <Route path='/faq'              component={ withTracker(Faq) }/>
        <Route path='/obrigado'         component={ Thanks }/>
        <Route path='*' exact={ true }  component={ HomeOut } />

    </Route>
)
