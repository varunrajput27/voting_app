import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const CandidateRegistration = () => {
  const [fullName, setFullName] = useState('');
  const [aadharCard, setAadharCard] = useState('');
  const [candidatePhotoFile, setCandidatePhotoFile] = useState(null);
  const [partyLogoFile, setPartyLogoFile] = useState(null);
  const [partySlogan, setPartySlogan] = useState('');
  const [electionPost, setElectionPost] = useState('');
  const [candidatePhotoPreview, setCandidatePhotoPreview] = useState(null);
  const [partyLogoPreview, setPartyLogoPreview] = useState(null);

  // To force reset file inputs
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const post = queryParams.get('electionPost');

    if (post) {
      setElectionPost(post);
    } else {
      alert(
        'Election Post is missing. Please go back and click registration from a notification.'
      );
    }
  }, [location]);

  const handleCandidatePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCandidatePhotoFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setCandidatePhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePartyLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPartyLogoFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPartyLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setMessageType('');

    if (!candidatePhotoFile || !partyLogoFile) {
      setLoading(false);
      setMessage('Please upload both candidate photo and party logo.');
      setMessageType('error');
      return;
    }

    // Check Aadhar length exactly 12
    if (aadharCard.length !== 12) {
      setLoading(false);
      setMessage('Aadhar Card number must be exactly 12 digits.');
      setMessageType('error');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('aadharCard', aadharCard);
      formData.append('electionPost', electionPost);
      formData.append('partySlogan', partySlogan);
      formData.append('profilepic', candidatePhotoFile);
      formData.append('partysign', partyLogoFile);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_LINK}/register`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      // Simulate loading delay
      await new Promise((res) => setTimeout(res, 3000));

      setLoading(false);

      if (response.status === 201) {
        setMessage('Candidate registration successful!');
        setMessageType('success');

        // Clear form fields
        setFullName('');
        setAadharCard('');
        setPartySlogan('');
        setCandidatePhotoFile(null);
        setPartyLogoFile(null);
        setCandidatePhotoPreview(null);
        setPartyLogoPreview(null);

        // Reset file inputs by changing key
        setFileInputKey(Date.now());
      } else {
        setMessage('Something went wrong. Please try again.');
        setMessageType('error');
      }
    } catch (error) {
      setLoading(false);

      if (
        error.response &&
        error.response.status === 409 &&
        error.response.data.error.includes('Aadhar')
      ) {
        setMessage('Aadhar Card number is already registered.');
      } else {
        setMessage('Server error. Please try again later.');
      }
      setMessageType('error');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
        Candidate Registration
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            placeholder="e.g. John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Aadhar Card Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Aadhar Card Number</label>
          <input
            type="text"
            placeholder="e.g. 123456789012"
            value={aadharCard}
            onChange={(e) => {
              const val = e.target.value;
              // Only allow digits and max 12 length
              if (/^\d{0,12}$/.test(val)) {
                setAadharCard(val);
              }
            }}
            required
            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Election Post (auto-filled) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Election Post</label>
          <input
            type="text"
            value={electionPost}
            disabled
            className="w-full mt-2 px-3 py-2 border border-gray-300 bg-gray-100 text-gray-700 rounded-md text-sm cursor-not-allowed"
          />
        </div>


        {/* Candidate Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Candidate Photo</label>
          <input
            key={fileInputKey}
            type="file"
            accept="image/*"
            onChange={handleCandidatePhotoUpload}
            required
            className="w-full mt-2 p-2 border border-blue-500 rounded-md cursor-pointer"
          />
          {candidatePhotoPreview && (
            <img
              src={candidatePhotoPreview}
              alt="Candidate Photo Preview"
              className="mt-2 w-24 h-24 object-cover border-2 border-blue-500 rounded-md"
            />
          )}
        </div>

        {/* Party Logo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Party Logo</label>
          <input
            key={fileInputKey + 1}
            type="file"
            accept="image/*"
            onChange={handlePartyLogoUpload}
            required
            className="w-full mt-2 p-2 border border-blue-500 rounded-md cursor-pointer"
          />
          {partyLogoPreview && (
            <img
              src={partyLogoPreview}
              alt="Party Logo Preview"
              className="mt-2 w-24 h-24 object-contain border-2 border-blue-500 rounded-md"
            />
          )}
        </div>

        

        {/* Party Slogan */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Party Name</label>
          <input
            type="text"
            value={partySlogan}
            onChange={(e) => setPartySlogan(e.target.value)}
            required
            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white px-6 py-2 rounded-full text-sm hover:bg-blue-700 transition duration-300 cursor-pointer ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mx-auto text-white"
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
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : (
              'Register Candidate'
            )}
          </button>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mt-4 text-center text-sm font-semibold ${
              messageType === 'success' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default CandidateRegistration;



