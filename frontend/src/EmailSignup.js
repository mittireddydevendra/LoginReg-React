import React, { useState } from 'react';
import axios from 'axios';

function EmailSignup() {
  const [email, setEmail] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);

  const checkDuplicateEmail = async () => {
    try {
      const response = await axios.post('http://localhost:8081/checkDuplicateEmail', {
        email: email
      });
      if (response.data === 'Duplicate') {
        setIsDuplicate(true);
      } else {
        setIsDuplicate(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={checkDuplicateEmail}>Check Duplicate Email</button>
      {isDuplicate ? <p>Email is already in use.</p> : null}
    </div>
  );
}

export default EmailSignup;



app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  // Check if the email already exists in the database
  const checkEmailQuery = 'SELECT * FROM login WHERE email = ?';
  db.query(checkEmailQuery, [email], (err, result) => {
      if (err) {
          return res.status(500).json({ message: 'Database error' });
      }
      if (result.length > 0) {
          // Email already exists
          return res.status(400).json({ message: 'Email already exists' });
      }

      // Email does not exist, proceed with user insertion
      const insertUserQuery = 'INSERT INTO login (name, email, password) VALUES (?, ?, ?)';
      db.query(insertUserQuery, [name, email, password], (err, data) => {
          if (err) {
              return res.status(500).json({ message: 'Database error' });
          }
          return res.status(201).json({ message: 'User created successfully' });
      });
  });
});







const handleSubmit = async (e) => {
  e.preventDefault();
  if (getName !== '' && getEmail !== '') {
      try {
          const response = await axios.post('http://localhost:8081/signup', {
              name: getName,
              email: getEmail,
              password: getPassword
          });

          if (response.status === 201) {
              // User created successfully
              // Clear the input fields
              setName('');
              setEmail('');
              setPassword('');
          }
      } catch (error) {
          if (error.response.status === 400) {
              // Email already exists, display an error message
              setError('Email already exists');
          } else {
              setError('An error occurred');
          }
      }
  }
};
