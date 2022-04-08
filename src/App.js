import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import app from './Firebase/Firebase.init';


const auth = getAuth(app)

function App() {
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const facebookProvider = new FacebookAuthProvider();


  //handle checkbox
  const handleCheckBox = event => {
    setRegister(event.target.checked)
  }

  //handle form submit
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // console.log(name, email, password);
    if(!register){
      createUserWithEmailAndPassword(auth, email, password)
      .then(res => {
        const user = res.user
        console.log(user);
        setUserName()
        // empty input field 
        setEmail('')
        setPassword('')
        setName('')
      })
      .catch(error => {
        console.error('error', error);
      })
    }
    else{
      signInWithEmailAndPassword(auth, email, password)
      .then(res => {
        const user = res.user
        console.log(user);
        // empty input field 
        setEmail('')
        setPassword('')
        setName('')
      })
      .catch(error => {
        console.error('error', error)
      })
    }
  }

  // get user name (update profice)
  const setUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: name
    })
    .then(() => {
      console.log('Update your name');
    })
  }

  //handle facebook sign in
  const handleFacebookSignIn = () => {
    signInWithPopup(auth, facebookProvider)
    .then(res => {
      const user = res.user;
      console.log(user);
    })
    .catch(error => {
      console.error('error', error);
    })
  }

  //handle email
  const handleEmail = (event) => {
    setEmail(event.target.value);
  }

  //handle password
  const handlePassword = (event) => {
    setPassword(event.target.value);
  }

  //handle name
  const handleName = (event) => {
    setName(event.target.value);
  }

  return (
    <div className="mx-auto w-50 mt-5">
      <Form onSubmit={handleFormSubmit}>
        {!register && <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control onBlur={handleName} type="text" placeholder="Enter your name" />
        </Form.Group>}

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onBlur={handleEmail} type="email" placeholder="Enter email" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onBlur={handlePassword} type="password" placeholder="Password" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check onChange={handleCheckBox} type="checkbox" label="Already have an account?" />
        </Form.Group>
        <Button className='bg-danger m-3' variant="primary" type="submit">
          {!register ? 'Sign Up' : 'Log In'}
        </Button>
        {/* Facebook  */}
        <Button onClick={handleFacebookSignIn} variant="primary">
          Login with Facebook
        </Button>
      </Form>
    </div>
  );
}

export default App;
