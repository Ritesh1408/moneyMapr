import React from 'react'
import Header from '../components/Header/Header';
import SignUpSign from '../components/signupSign/SignUpSign';

const SignUp = () => {
  return (
    <div>
      <Header/>
      <div className='dash-head' style={{ marginTop: "20px", marginBottom: "-30px" }}>
        <h1>Welcome to the <span style={{color: "var(--theme)"}}>MoneyMapr</span></h1>
        <p>
          <span> Download reports to stay audit-ready or share with family and advisors.</span>
        </p>
      </div>
      <div className="wrapper">
        <SignUpSign/>
      </div>
    </div>
  )
}

export default SignUp;
