import './App.css';
import { useEffect } from 'react';

function App() {

  useEffect(()=>{
    if ('OTPCredential' in window) {
      window.addEventListener('DOMContentLoaded', e => {
        const input = document.querySelector('input[autocomplete="one-time-code"]');
        if (!input) return;
        const ac = new AbortController();
        const form = input.closest('form');
        if (form) {
          form.addEventListener('submit', e => {
            ac.abort();
          });
        }
        navigator.credentials.get({
          otp: { transport:['sms'] },
          signal: ac.signal
        }).then(otp => {
          input.value = otp.code;
          // if (form) form.submit();
        }).catch(err => {
          console.log(err);
        });
      });
    }
  },[])
  console.log(window.location.pathname,'pathname')
  return (
    
    <div className="App">
      <h1>
        The simplest Web OTP API demo
    </h1>
      <div style={{border:"1px solid", padding: "5px 10px", margin: "10px 0"}}>
        <form action="/">
          Enter OTP here:
        <input type="text" autocomplete="one-time-code" inputmode="numeric" />
        </form>
      </div>
    </div>
  );
}

export default App;
