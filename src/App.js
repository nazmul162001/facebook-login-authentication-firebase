import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import app from './Firebase/Firebase.init';

// react toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const auth = getAuth(app);

function App() {
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const facebookProvider = new FacebookAuthProvider();
  const [validated, setValidated] = useState(false);

  //handle checkbox
  const handleCheckBox = (event) => {
    setRegister(event.target.checked);
  };

  //handle form submit
  const handleFormSubmit = (event) => {
    // Validation
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    // regex
    setValidated(true);

    // stop form reload
    event.preventDefault();
    // console.log(name, email, password);
    if (!register) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          const user = res.user;
          console.log(user);
          setUserName();
          // empty input field
          setEmail('');
          setPassword('');
          setName('');
          toast('Sign up successful');
        })
        .catch((error) => {
          // toast.error('already signUp, please login!');
          console.log(error);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          const user = res.user;
          console.log(user);
          // empty input field
          setEmail('');
          setPassword('');
          setName('');
          toast('login successful');
        })
        .catch((error) => {
          // toast.error('You are already login');
          console.log(error);
        });
    }
    <ToastContainer />;
  };

  // get user name (update profice)
  const setUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: name,
    }).then(() => {
      console.log('Update your name');
    });
  };

  //handle facebook sign in
  const handleFacebookSignIn = () => {
    signInWithPopup(auth, facebookProvider)
      .then((res) => {
        const user = res.user;
        console.log(user);
      })
      .catch((error) => {
        console.error('error', error);
      });
  };

  //handle email
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  //handle password
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  //handle name
  const handleName = (event) => {
    setName(event.target.value);
  };

  return (
    <div className="mx-auto w-50 mt-5">
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {!register && (
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={handleName}
              value = {name}
              type="text"
              placeholder="Enter your name"
              required
            />
          </Form.Group>
        )}

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={handleEmail}
            type="email"
            placeholder="Enter email"
            value = {email}
            required
          />
          {/* Validation  */}
          <Form.Control.Feedback type="invalid">
            Please provide a valid email
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={handlePassword}
            type="password"
            placeholder="Password"
            value = {password}
            required
          />
          {/* Validation  */}
          <Form.Control.Feedback type="invalid">
            Please provide a valid password
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            onChange={handleCheckBox}
            type="checkbox"
            label="Already have an account?"
          />
        </Form.Group>
        <Button className="bg-danger m-3" variant="primary" type="submit">
          {!register ? 'Sign Up' : 'Log In'}
        </Button>
        {/* Facebook  */}
        <Button onClick={handleFacebookSignIn} variant="primary">
          Login with Facebook
        </Button>
      </Form>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
