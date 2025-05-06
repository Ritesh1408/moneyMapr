import React from 'react';
import { toast } from 'react-toastify';
import Logo from '../../assets/logo.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
  
    const data = {
      email: formData.get('email'),
      message: formData.get('message'),
    };
  
    toast.success('Message sent successfully!');
    console.log('Form submitted:', data);
  
    e.target.reset();
  };
  

  return (
    <footer style={{
      backgroundColor: '#fff',
      color: '#333',
      padding: '2rem 1rem',
      boxShadow: 'var(--shadow)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: '2rem',
      }}>
        
        {/* Logo + Tagline */}
        <div style={{ flex: '1 1 250px' }}>
          <h2 style={{ color: 'var(--theme)', fontSize: '1.8rem', marginBottom: '0.5rem' }}><img src={Logo} style={{width: "25px"}}/> MoneyMapr</h2>
          <p style={{ fontStyle: 'italic', color: '#555' }}>
            Your smart way to track expenses.
            <br />
            Set personalized budgets for each category and receive timely alerts when you're nearing your limit.
            
            </p>
        </div>

        {/* About Section */}
        <div style={{ flex: '1 1 150px' }}>
          <h3 style={{ color: 'var(--theme)', marginBottom: '0.5rem' }}>About</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li><a href="/about" style={linkStyle}>About Us</a></li>
            <li><a href="/features" style={linkStyle}>Features</a></li>
            <li><a href="/privacy" style={linkStyle}>Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Form */}
        <div style={{ flex: '1 1 300px' }}>
          <h3 style={{ color: 'var(--theme)', marginBottom: '0.5rem' }}>Contact Us</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    style={inputStyle}
                />
                <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="3"
                    required
                    style={{ ...inputStyle, resize: 'vertical' }}
                />
                <button
                    type="submit"
                    style={{
                    backgroundColor: 'var(--theme)',
                    color: '#fff',
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow)',
                    }}
                >
                    Send
                </button>
            </form>
        </div>
      </div>

      {/* Footer Bottom Line */}
      <div style={{
        textAlign: 'center',
        borderTop: '1px solid #ddd',
        marginTop: '2rem',
        paddingTop: '1rem',
        fontSize: '0.9rem',
        color: '#777',
      }}>
        &copy; {currentYear} <strong>MoneyMapr</strong>. All rights reserved.
      </div>
    </footer>
  );
};

// Shared styles
const inputStyle = {
  padding: '0.5rem',
  marginBottom: '0.5rem',
  width: '100%',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '1rem',
  boxShadow: 'var(--shadow)',
};

const linkStyle = {
  color: '#555',
  textDecoration: 'none',
  display: 'block',
  marginBottom: '0.25rem',
};

export default Footer;
