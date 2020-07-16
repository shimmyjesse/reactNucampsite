// We import the action from ActionTypes.js file using a "wild card" (*).
// This '*' here lets you import all the named exports from the calling file, at once.
import * as ActionTypes from './ActionTypes'; 
import { baseUrl } from '../shared/baseUrl';


// we'll need to pass in all the values that are needed to add a comment, such as:
// the 'campsiteId', the 'rating', the 'author', and the 'commentText'.
// Set up this ActionCreator to return an object, which has as its properties:
// a 'type' and a 'payload', which we'll use the ActionType namespace as defined above in 'import's 'as ActionTypes'.
// Then, '.ADD_COMMENT'. This lets us access the ADD.COMMENT export that we made from 'ActionTypes.js' file.

//NOTE: ES6 has invented a short-handed version of when the identifier of a property is the same as its value,
// they'll pass in said values without declaring them, like such:
//     payload: {
//     campsiteId: campsiteId,
//     rating: rating,
//     author: author,
//     text: text
// }                    // ...a new feature in ES6 known as "Short-hand Property Names".

// NOW, this ActionType must be further supported in order to function by updating the Reducer...(Refer to ActionTypes.js file.)




// We will be using 'redux-thunk' to perform a ASYNCHRONOUS REQUEST TO THE SERVER.
//
// Since we haven't set up a server to react with in this way, as of yet, we'll simulate a " brief delay" using a setTimeout() function.
//
// After delay, we'll add the campsite's data to the 'state'.


// Next, we're adding an ActionCreator, and calling it: < fetchCampsites >
                              //dispatch = 'redux-thunk' syntax.
                              // We will wrap this function in another function (=> func inside another =>. We're able after enabling 'redux-thunk'),
                              // and 'redux-thunk' lets us pass the 'store's dispatch method into the inner function, like so.
export const fetchCampsites = () => dispatch => {

    dispatch(campsitesLoading());

    return fetch(baseUrl + 'campsites')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(campsites => dispatch(addCampsites(campsites)))
        .catch(error => dispatch(campsitesFailed(error.message)));
};
    //return - call to fetch which will return the result: what is within the mandatory URL parameter space,
    // 'baseUrl' from the 'json-server', PLUS the location for the resource we want: the 'campsites' data.
        // and NOW, we'll chain a '.then()' method to this, since a call to 'fetch' will return a 'promise'.
        // When said 'promise is resolved, the 'then()' method will use the 'json' to convert the 'response' from 'json' to JavaScript.
        // That JS will be the array of campsites.
        // The 'json()' method returns a new promise for which the converted js array is the new response value when it resolves.


// Standard ActionCreator (with one '=>' function, no payload, and it only returns one action object).
// Since we're not using thunk, it won't be intercepted but, instead, go straight to the Reducer
// NOTE: 'campsitesLoading' was dispatched from the above, 'fetchCampsites'. Meaning,
// when 'fetchCampsites's action is dispatched, that fetchCampsites's 'action' will dispatch campsitesLoading's 'action'.
export const campsitesLoading = () => ({
    type: ActionTypes.CAMPSITES_LOADING
});


export const campsitesFailed = errMess => ({
    type: ActionTypes.CAMPSITES_FAILED,
    payload: errMess
});

export const addCampsites = campsites => ({
    type: ActionTypes.ADD_CAMPSITES,
    payload: campsites
});
    // 'payload: campsites' = has the campsites' array as the payload. // Now, to update the Campsites Reducer... (refer to Reducer?)  //

export const fetchComments =() => dispatch => {
    return fetch(baseUrl + 'comments')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});

export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

//next, we'll define an ActionCreator function that we'll name:
export const addComment = comment => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (campsiteId, rating, author, text) => dispatch => {
    const newComment = {
        campsiteId,
        rating,
        author,
        text
    };
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
            "Content-Type": "application/json"
        }
        })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => { throw error; }
        )
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => {
            console.log('post comment', error.message);
            alert('Your comment could not be posted\nError: ' + error.message);
        })
};

export const fetchPromotions = () => dispatch => {

    dispatch(promotionsLoading());

    return fetch(baseUrl + 'promotions')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(promotions => dispatch(addPromotions(promotions)))
        .catch(error => dispatch(promotionsFailed(error.message)));
}; 

export const promotionsLoading = () => ({
    type: ActionTypes.PROMOTIONS_LOADING
});


export const promotionsFailed = errMess => ({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: errMess
});

export const addPromotions = promotions => ({
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promotions
});


// Workshop Assignment Below

// Action Creators for Partner / Task 1

export const fetchPartners = () => dispatch => {

    dispatch(partnersLoading());

    return fetch(baseUrl + 'partners')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(partners => dispatch(addPartners(partners)))
        .catch(error => dispatch(partnersFailed(error.message)));
}; 

export const partnersLoading = () => ({
    type: ActionTypes.PARTNERS_LOADING
});


export const partnersFailed = errMess => ({
    type: ActionTypes.PARTNERS_FAILED,
    payload: errMess
});

export const addPartners = promotions => ({
    type: ActionTypes.ADD_PARTNERS,
    payload: promotions
});



//Week 5 workshop; Task 2: feedback 'Thunked' action creator for postFeedback

/////////////////////////////// possibly delete 'dispatch' here, replace with empty () /////////////////////////////////////

export const postFeedback = (feedback) => dispatch => {

    const newFeedback = { feedback };

    newFeedback.date = new Date().toISOString();

    return fetch(baseUrl + 'feedback', {
        method: "POST",
        body: JSON.stringify(newFeedback),
        headers: {
            "Content-Type": "application/json"
        }
        })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => { throw error; }
        )
        .then(response => response.json())
        .then(response => {
            alert("Thank you for your feedback!\n" + JSON.stringify(response))
        })
        .catch(error => {
            console.log('post feedback', error.message);
            alert('Your feedback could not be posted\nError: ' + error.message);
        })
};

