import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserManager, WebStorageStateStore } from 'oidc-client-ts';
import Protected from './protected';
import { Button } from '@mui/material';
import SignInCallBack from './signInCallback';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const mgr = new UserManager({
    authority: 'https://localhost:44313',
    scope: 'openid api',
    client_id: 'spa',
    redirect_uri: window.location.origin + '/signin-callback',
    response_type: 'code',
    userStore: new WebStorageStateStore({ store: window.localStorage }),
});

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Button onClick={() => mgr.signinRedirect({
        extraQueryParams: {
            identity_provider: 'Local',
            hardcoded_identity_id: '1',
        },
    })}>log in</Button>} />
      <Route path="/protected" element={<Protected userManager={mgr}/>} />
      <Route path="/signin-callback" element={<SignInCallBack userManager={mgr}/>} />
      <Route path="*" element={<>Not Found</>} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
