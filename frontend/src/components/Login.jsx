// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Login = () => {
//   const [aadhar, setAadhar] = useState('');
//   const [dob, setDob] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const validateAadhar = (num) => /^\d{12}$/.test(num);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     if (!validateAadhar(aadhar)) {
//       setError('Please enter a valid 12-digit Aadhar number.');
//       return;
//     }

//     if (!dob) {
//       setError('Please enter your Date of Birth.');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await axios.post(`${import.meta.env.VITE_BACKEND_LINK}/login`, { aadhar, dob });

//       setTimeout(() => {
//         if (response.data.voted) {
//           setError('You have already voted.');
//         } else if (response.data.exists) {
//           localStorage.setItem('aadhar', aadhar);
//           setSuccess('Login successful!');
//           setTimeout(() => navigate('/election'), 2000);
//         } else {
//           setError('Voter not found. Please check your details.');
//         }
//         setLoading(false);
//       }, 2500);
//     } catch (err) {
//       setTimeout(() => {
//         setError('Server error. Please try again later.');
//         console.error(err);
//         setLoading(false);
//       }, 3000);
//     }
//   };

//   const handleAadharChange = (e) => {
//     const val = e.target.value.replace(/\D/g, '');
//     if (val.length <= 12) setAadhar(val);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">Login</h2>

//         <label htmlFor="aadhar" className="block text-gray-700 font-semibold mb-2">
//           Aadhar Card Number
//         </label>
//         <input
//           id="aadhar"
//           type="text"
//           value={aadhar}
//           onChange={handleAadharChange}
//           placeholder="Enter 12-digit Aadhar number"
//           className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           inputMode="numeric"
//           disabled={loading}
//         />

//         <label htmlFor="dob" className="block text-gray-700 font-semibold mb-2">
//           Date of Birth
//         </label>
//         <input
//           id="dob"
//           type="date"
//           value={dob}
//           onChange={(e) => setDob(e.target.value)}
//           className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           style={{
//             cursor: loading ? 'not-allowed' : 'pointer',
//           }}
//           max={new Date().toISOString().split('T')[0]}
//           disabled={loading}
//         />

//         {/* Cursor pointer on calendar icon (for WebKit browsers like Chrome) */}
//         <style>
//           {`
//             input[type='date']::-webkit-calendar-picker-indicator {
//               cursor: pointer;
//             }
//           `}
//         </style>

//         {error && <p className="text-red-600 mb-4 text-center font-medium">{error}</p>}
//         {success && <p className="text-green-600 mb-4 text-center font-medium">{success}</p>}

//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full ${
//             loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
//           } text-white font-semibold py-2 rounded-md transition flex justify-center items-center cursor-pointer`}
//         >
//           {loading ? (
//             <>
//               <svg
//                 className="animate-spin h-5 w-5 mr-3 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
//                 ></path>
//               </svg>
//               Logging in...
//             </>
//           ) : (
//             'Login'
//           )}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [aadhar, setAadhar] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateAadhar = (num) => /^\d{12}$/.test(num);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateAadhar(aadhar)) {
      setError('Please enter a valid 12-digit Aadhar number.');
      return;
    }

    if (!dob) {
      setError('Please enter your Date of Birth.');
      return;
    }

    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18) {
      setError('❌ You are not eligible to vote.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_LINK}/login`, { aadhar, dob });

      setTimeout(() => {
        if (response.data.voted) {
          setError('🗳️ You have already voted.');
        } else if (response.data.exists) {
          localStorage.setItem('aadhar', aadhar);
          setSuccess('✅ Login successful!');
          setTimeout(() => navigate('/election'), 2000);
        } else {
          setError('⚠️ Voter not found. Please check your details.');
        }
        setLoading(false);
      }, 2500);
    } catch (err) {
      setTimeout(() => {
        setError('❌ Server error. Please try again later.');
        console.error(err);
        setLoading(false);
      }, 3000);
    }
  };

  const handleAadharChange = (e) => {
    const val = e.target.value.replace(/\D/g, '');
    if (val.length <= 12) setAadhar(val);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-4xl grid grid-cols-1 md:grid-cols-2">
        
        {/* Left side image for desktop/tablet */}
        <div className="hidden md:flex items-center justify-center bg-blue-100 p-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5957/5957436.png"
            alt="Voting Illustration"
            className="w-3/4 max-w-sm"
          />
        </div>

        {/* Right side login form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 md:p-10">
          <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Voter Login</h2>

          <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Number</label>
          <input
            type="text"
            value={aadhar}
            onChange={handleAadharChange}
            placeholder="Enter 12-digit Aadhar number"
            className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />

          <style>
            {`input[type='date']::-webkit-calendar-picker-indicator { cursor: pointer; }`}
          </style>

          {error && <p className="text-red-600 mb-4 text-sm text-center">{error}</p>}
          {success && <p className="text-green-600 mb-4 text-sm text-center">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md text-white font-semibold transition ${
              loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            } flex items-center justify-center cursor-pointer`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                  ></path>
                </svg>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;


