import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import { Switch, Route, Redirect, withRouter, } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { postComment, postFeedback, fetchCampsites, fetchComments, fetchPromotions, fetchPartners } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
// IMPORTS BELOW are deleted since they now belong to REDUX //

//import { CAMPSITES } from '../shared/campsites';
//import { COMMENTS } from '../shared/comments';
//import { PARTNERS } from '../shared/partners';
//import { PROMOTIONS } from '../shared/promotions';

// :: NOTES BELOW :: are referenced before implementing REDUX :: NOTES BELOW ::

// We've imported this CAMPSITES array 'from' this file path: './shared/campsites';
// NOW we'll use this { CAMPSITES } array to set up the local state in this App.js ..

            // after import Directory, inside this class 'App' component,
            // we'll render under the </Navbar> component with this syntax:
            //  <Directory />
      // here, 'class App extends Component had existed since App.js had the contents.
      // It is now changed to 'Main'; Within the render() method below,
            //<div className="App"> is also deleted, leaving just the <div> tag; Also, down below,
//'export default App' = 'Main' replaces 'App'. This is part of a re-organizing exercise- Presentational & Container Components.


const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        partners: state.partners,
        promotions: state.promotions
    }
} 

// inside this object is a constant with one property, 'postComment'. 
// Value: arrow function w/ parameter list. 
// and in the '=>' body, calls the ActionCreator: 'postComment', passing in its data.
const mapDispatchToProps = {
    postComment: (campsiteId, rating, author, text) => (postComment(campsiteId, rating, author, text)),
    postFeedback: (feedback) => (postFeedback(feedback)),
    fetchCampsites: () => (fetchCampsites()),
    resetFeedbackForm: () => (actions.reset('feedbackForm')),
    fetchComments: () => (fetchComments()),
    fetchPromotions: () => (fetchPromotions()),
    fetchPartners: () => (fetchPartners())
};

class Main extends Component {

    //built-in react method, part of a set of what's called Lifecycle Methods
    componentDidMount() {
        this.props.fetchCampsites();
        this.props.fetchComments();
        this.props.fetchPromotions();
        this.props.fetchPartners();
    }

    // CODE BELOW removed since they now belong to REDUX, grabbing the 'state' from that library by setting up the mapStateToProps(). //

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         campsites: CAMPSITES,
    //         comments: COMMENTS,
    //         partners: PARTNERS,
    //         promotions: PROMOTIONS
    //     };
    // }


// .. and now we have the data from 'campsites.js' inside of 'App > this.state'
//    Next, we'll pass it down as (props) to the <Directory /> component
//    by setting up a custom attribute: 'campsites={this.state.campsites}'
//    After, refer back to DirectoryComponent.js file to update the render() method
//    by adding this new (props) property from 'class App'.
    render() {

        const HomePage = () => {
            return (
                <Home
                    campsite={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
                    campsitesLoading={this.props.campsites.isLoading}
                    campsitesErrMess={this.props.campsites.errMess}
                    promotion={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
                    promotionLoading={this.props.promotions.isLoading}
                    promotionErrMess={this.props.promotions.errMess}
                    partner={this.props.partners.partners.filter(partner => partner.featured)[0]}
                    partnerLoading={this.props.partners.isLoading}
                    partnerErrMess={this.props.partners.errMess}
                />
            );
        }

                    // within ...promotions.promotions.filter..., the 1st promotions points to the promotions object,
                    // and the 2nd points to the promotions' array inside that object 

        const CampsiteWithId = ({match}) => {
            return (
                <CampsiteInfo 
                    campsite={this.props.campsites.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
                    isLoading={this.props.campsites.isLoading}
                    errMess={this.props.campsites.errMess}
                    comments={this.props.comments.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}
                />
            );
        }

                // Switch Component //
        return (
            <div>
                <Header />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch>
                            <Route path='/home' component={HomePage} />
                            <Route exact path='/directory' render={() => <Directory campsites={this.props.campsites} />} />
                            <Route path='/directory/:campsiteId' component={CampsiteWithId} />
                            <Route exact path='/contactus' render={() => <Contact postFeedback={this.props.postFeedback} resetFeedbackForm={this.props.resetFeedbackForm} />} />
                            <Route exact path='/aboutus' render={() => <About partners={this.props.partners} />} />
                            <Redirect to='/home' />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }