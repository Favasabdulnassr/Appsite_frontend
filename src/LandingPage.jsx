import React, { useEffect, useState } from 'react';
import './LandingPage.css';
import {useFormik} from 'formik'
import { RegisterValidationSchema } from './services/validation/Register';
import { handleRegister } from './services/registerApi';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAsync } from './Redux/loginReducer';

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const {isAuthenticated,role} = useSelector((state) => state.login)
  const navigate = useNavigate()

  useEffect(() => {
    if (role === 'admin'){
      navigate('/admin/Home')

    }else if (role == 'user'){
      navigate('/user/Home')
    }

  },[isAuthenticated,role,navigate])




  return (
    <div className="landing-container">
      {/* Header */}
      <header className="landing-header">
        <div className="landing-header-content">
          <h1>AppRewards</h1>
          <div className="auth-buttons">
            <button 
              className="button-login"
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
            <button 
              className="button-signup"
              onClick={() => setShowSignup(true)}
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h2 className="hero-title">Earn Points for Trying New Apps</h2>
          <p className="hero-subtitle">
          Download exciting Android apps, complete simple tasks, and earn reward points

          </p>
          <button 
            className="hero-cta"
            onClick={() => setShowSignup(true)}
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <h3>Simple Tasks</h3>
            <p>Download apps and submit screenshots to earn points instantly</p>
          </div>
          <div className="feature-card">
            <h3>Track Progress</h3>
            <p>Monitor your completed tasks and total points earned</p>
          </div>
          <div className="feature-card">
            <h3>Easy Verification</h3>
            <p>Quick screenshot upload with support</p>
          </div>
        </div>
      </section>

      {/* Login Modal */}
      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} />
      )}

      {/* Signup Modal */}
      {showSignup && (
        <SignupModal onClose={() => setShowSignup(false)} />
      )}
    </div>
  );
};




const LoginModal = ({ onClose }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData,setFormData] = useState({
    email: '',
    password: ''
  })

  const {loader,error} = useSelector(state => state.login);

  const handleChange = (e) => {
    const {name,value} = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]:value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(loginAsync(formData));

      if (loginAsync.fulfilled.match(resultAction)){
        toast.success('Login successfull !')
        onClose();
      }else{
        toast.error('Login failed. Please check your credentials  ')
        
      }
      
      
    } catch (error) {
      console.log('An error occurred during login:',error);
      toast.error('An error occurred during login.');
      onClose()
      
      
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input name='password' type="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required/>
          </div>
          <button type="submit" className="button hero-cta" disabled={loader}>
          {loader ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <button className="modal-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};



const SignupModal = ({ onClose }) => {


  
const formik = useFormik({
  initialValues:{
    first_name: '',
    email: '',
    phone_number: '',
    password: '',
    confirm_password: '',
  },
  validationSchema:RegisterValidationSchema,
  onSubmit: async (values) => {
    try {
      await handleRegister(values)
      formik.resetForm();
      toast.success("User Registered Successfully")
      onClose();
      
    } catch (error) {
      console.error('Api error',error)
      toast.error('Registration Failed')
      onClose();

    }
  }
});




  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Sign Up</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input name='first_name' type="text" placeholder="Enter your full name"{...formik.getFieldProps('first_name')}/>
            {formik.touched.first_name && formik.errors.first_name && (
              <div className="error">{formik.errors.first_name}</div>
            )}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input name='email' type="email" placeholder="Enter your email"{...formik.getFieldProps('email')} />
            {formik.touched.email && formik.errors.email && (
              <div className="error">{formik.errors.email}</div>
            )}
          </div>

          <div className="form-group">
            <label>phoneNumber</label>
            <input name='phone_number' type="tel" placeholder="Enter your Phone number" {...formik.getFieldProps('phone_number')}/>
            {formik.touched.phone_number && formik.errors.phone_number && (
              <div className="error">{formik.errors.phone_number}</div>
            )}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input name='password' type="password" placeholder="Create a password" {...formik.getFieldProps('password')}/>
            {formik.touched.password && formik.errors.password && (
              <div className="error">{formik.errors.password}</div>
            )}
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input name='confirm_password' type="password" placeholder="Confirm your password"{...formik.getFieldProps('confirm_password')} />
            {formik.touched.confirm_password && formik.errors.confirm_password && (
              <div className="error">{formik.errors.confirm_password}</div>
            )}
          </div>
          <button type="submit" className="button hero-cta">
          {loader ? 'signing up....' : 'signup'}
          </button>
        </form>
        <button className="modal-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default LandingPage;