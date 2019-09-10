import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import {Provider} from 'react-redux';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createStore} from 'redux';
import reducers from './reducers';



const client = new ApolloClient({
    link: createHttpLink({ uri: 'http://localhost:3001/graphql' }),
    cache: new InMemoryCache()
});

const Root = () => {
    return(
        <ApolloProvider client={client}>
            <Provider store={createStore(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
                <App />
            </Provider>
        </ApolloProvider>
    )
}

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
