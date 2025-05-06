import React, { useState } from "react";
import "./styles.css";
import Input from "../Input";
import Button from "../Button";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../../firebase"; 
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth/web-extension";

const SignUpSign = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [loading, setloading] = useState(false);
  const [loginForm, setloginForm] = useState(false);
  const navigate = useNavigate();

  const signUphandlewithemail = () => {
    setloading(true);
    // console.log("SignUp with email and password");
    // console.log("Name: ", name);
    // console.log("Email: ", email);
    // console.log("Password: ", password);
    // console.log("Confirm Password: ", confirmPassword);

    // authenticate user or create user in firebase
    if(name != "" && email != "" && password != "" && confirmPassword != "") {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          // console.log("User created: ", user);
          toast.success("User created successfully");
          setloading(false);
          setname("");
          setemail("");
          setpassword("");
          setconfirmPassword("");
          createUserdoc(user);
          navigate("/Dashboard"); 
          // create a doc with user id as following id
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          console.log("Error: ", errorCode, errorMessage);
          setloading(false);
        });

      }else{
        toast.error("Password and Confirm Password do not match");
        setloading(false);
      }
    }
    else {
      toast.error("Please fill all the fields");
      setloading(false);
    }

  };

  const Loginwithemail = () => {
    setloading(true);
    // console.log("Login with email and password");
    // console.log("Email: ", email);
    // console.log("Password: ", password);
    if(email != "" && password != "") {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // console.log("User logged in: ", user);
        toast.success("User logged in successfully");
        setloading(false);
        // createUserdoc(user);
        navigate("/Dashboard"); 

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        console.log("Error: ", errorCode, errorMessage);
        setloading(false);
      });
    }else{
      toast.error("Please fill all the fields");
      setloading(false);
    }
  }

  const googleAuthpopUp = () => {
    setloading(true);
    try {
      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        createUserdoc(user);
        navigate("/Dashboard");
        toast.success("User logged in successfully");
        setloading(false);

      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        console.log("Error: ", errorCode, errorMessage);
        setloading(false);

      });
    } catch (error) {
      toast.error("Error signing in with Google: ", error.message);
      setloading(false);
    }

  }

  async function createUserdoc(user) {
    // make sure the uid does not exist in the database
    // create a doc.
    setloading(true);
    if(!user) return;
    const useRef = doc(db, "users", user.uid);
    const userData = await getDoc(useRef);
    if(!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name : user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "https://www.w3schools.com/howto/img_avatar.png",
          createdAt: new Date(),
        });
        toast.success("User doc created successfully");
        console.log("User doc created successfully");
        setloading(false);
      } catch (error) {
        toast.error("Error creating user doc: ", error.message);
        setloading(false);
      }
    }else{
      // toast.error("User doc already exists");
      setloading(false);
    }
  }

  return (
    <>
      {loginForm ? (
        <div className="signup-wrapper">
        <h2 className="title">
          Login on <span style={{ color: "var(--theme)" }}>MoneyMapr</span>
        </h2>
        <h2 className="title" style={{fontSize: "1.5rem", fontWeight: "400", marginTop: "0"}}>
          Welcome Back Guys!
        </h2>
        <form>
          <Input
            type={"email"}
            label={"Email"}
            state={email}
            setState={setemail}
            placeholder={"Johndoe@gmail.com"}
          />

          <Input
            type={"password"}
            label={"Password"}
            state={password}
            setState={setpassword}
            placeholder={"example@123"}
          />

          <Button
            disabled={loading}
            text={ loading ? "Loading..." : "Login Using Email and Password"}
            onClick={Loginwithemail}
          />
          <p className="p-login">or</p>
          <Button 
            blue={true}
            onClick={googleAuthpopUp} 
            text={ loading ? "Loading..." : "Login Using Google"} 
            google={true} />
          {/* <Button text={ loading ? "Loading..." : "Login Using Apple"} google={true} /> */}
          <p className="p-login" style={{cursor: "pointer"}} onClick={() => setloginForm(!loginForm)}>or Don't Have account with us ? Click here</p>
        </form>
      </div>
      ) : (
        <div className="signup-wrapper">
        <h2 className="title">
          SignUp on <span style={{ color: "var(--theme)" }}>MoneyMapr</span>
        </h2>
        <form>
          <Input
            type={"text"}
            label={"Full Name"}
            state={name}
            setState={setname}
            placeholder={"John Doe"}
          />

          <Input
            type={"email"}
            label={"Email"}
            state={email}
            setState={setemail}
            placeholder={"Johndoe@gmail.com"}
          />

          <Input
            type={"password"}
            label={"Password"}
            state={password}
            setState={setpassword}
            placeholder={"example@123"}
          />

          <Input
            type={"password"}
            label={"Confirm Password"}
            state={confirmPassword}
            setState={setconfirmPassword}
            placeholder={"example@123"}
          />

          <Button
            disabled={loading}
            text={ loading ? "Loading..." : "SignUp Using Email and Password"}
            onClick={signUphandlewithemail}
          />
          <p className="p-login">or</p>
          <Button blue={true} onClick={googleAuthpopUp} text={ loading ? "Loading..." : "SignUp Using Google"} google={true} />
          {/* <Button text={ loading ? "Loading..." : "SignUp Using Apple"} google={true} /> */}
          <p className="p-login" style={{cursor: "pointer"}} onClick={() => setloginForm(!loginForm)}>or Have an account Already ? Click here</p>
        </form>
      </div>
      )
      
      }
    </>
  );
};

export default SignUpSign;
