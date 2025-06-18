const express = require("express");
const multer = require("multer");
const connectDB = require("./db");
const Voter = require("./models/voter");
const Vote = require('./models/Vote');
const Candidate = require("./models/Candidate");
const ElectionDetail = require("./models/ElectionDetail");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const cors = require("cors");
const allowedOrigins = [
  'http://localhost:5173',
  'https://voting-frontend-mu.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());

// Multer config
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// ========== ROUTES ==========

// Voter login
app.post('/login', async (req, res) => {
  const { aadhar, dob } = req.body;

  if (!aadhar || !dob || aadhar.length !== 12) {
    return res.status(400).json({ error: 'Invalid Aadhar or DOB' });
  }

  try {
    const existingVoter = await Voter.findOne({ aadhar, dob });

    if (existingVoter) {
      return res.json({
        exists: true,
        voted: existingVoter.voted,
        message: existingVoter.voted
          ? 'You have already voted'
          : 'Login successful',
      });
    }

    const newVoter = new Voter({ aadhar, dob });
    await newVoter.save();

    return res.json({ exists: true, voted: false, message: 'Login successful' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Send election notification
app.post("/api/election/send-details", async (req, res) => {
  const { electionPost, location, linkName, message } = req.body;

  try {
    const detail = new ElectionDetail({
      electionPost,
      location,
      linkName: linkName || "https://yourdomain.com/registration",
      message,
    });
    await detail.save();

    res.status(201).json({ message: "Election details saved and notification sent" });
  } catch (err) {
    console.error("Error saving election details:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all notifications
app.get("/api/election/details", async (req, res) => {
  try {
    const electionDetails = await ElectionDetail.find().sort({ createdAt: -1 }).exec();
    if (!electionDetails || electionDetails.length === 0) {
      return res.status(404).json({ message: "No election details found" });
    }
    res.status(200).json(electionDetails);
  } catch (error) {
    console.error("Error fetching election details:", error);
    res.status(500).json({ message: "Server error while fetching details" });
  }
});

// Get notification summary
app.get('/api/election/fetchdetails', async (req, res) => {
  try {
    const notifications = await ElectionDetail.find().select('electionPost location');
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete election and related candidates
app.delete("/api/election/delete-details/:id", async (req, res) => {
  try {
    const election = await ElectionDetail.findById(req.params.id);
    if (!election) {
      return res.status(404).json({ message: "Election not found" });
    }

    const roleToDelete = election.electionPost;
    await Candidate.deleteMany({ role: roleToDelete });
    await ElectionDetail.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: `Election and candidates for ${roleToDelete} deleted.` });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Candidate registration
app.post(
  '/register',
  upload.fields([
    { name: 'profilepic', maxCount: 1 },
    { name: 'partysign', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { fullName, aadharCard, partySlogan, electionPost } = req.body;
      const profilepicFile = req.files['profilepic']?.[0];
      const partysignFile = req.files['partysign']?.[0];

      if (!fullName || !aadharCard || !partySlogan || !profilepicFile || !electionPost || !partysignFile) {
        return res.status(400).json({ error: 'All fields are required.' });
      }

      const aadharNumber = Number(aadharCard);
      if (isNaN(aadharNumber)) {
        return res.status(400).json({ error: 'Aadhar Card must be a number.' });
      }

      const existingCandidate = await Candidate.findOne({
        $or: [{ aadhar: aadharNumber }, { partyslogan: partySlogan }],
      });

      if (existingCandidate) {
        return res.status(409).json({ error: 'Aadhar or Party Slogan already exists.' });
      }

      const newCandidate = new Candidate({
        name: fullName,
        aadhar: aadharNumber,
        role: electionPost,
        profilepic: profilepicFile.buffer,
        partysign: partysignFile.buffer,
        partyslogan: partySlogan,
      });

      await newCandidate.save();
      res.status(201).json({ message: 'Candidate registered successfully' });
    } catch (error) {
      console.error('Error registering candidate:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Get all candidates
app.get('/candidates', async (req, res) => {
  try {
    const candidates = await Candidate.find({});
    const formatted = candidates.map((c) => ({
      name: c.name || 'Unnamed',
      profilepic: c.profilepic?.toString('base64') || '',
      partysign: c.partysign?.toString('base64') || '',
      partyslogan: c.partyslogan || '',
      votes: c.votes || 0,
      electionPost: c.role?.trim() || 'Unknown',
    }));

    res.json({ candidates: formatted });
  } catch (err) {
    console.error('Error fetching candidates:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// End election and declare winner
app.post("/end-election/:id", async (req, res) => {
  try {
    const election = await ElectionDetail.findById(req.params.id);
    if (!election) return res.status(404).json({ message: "Election not found" });



     
    election.isEnded = true;
    await election.save();

    const candidates = await Candidate.find({ role: election.electionPost });
    if (candidates.length === 0) return res.status(404).json({ message: "No candidates found" });

    const maxVotes = Math.max(...candidates.map(c => c.votes || 0));
    const topCandidates = candidates.filter(c => (c.votes || 0) === maxVotes);

    if (maxVotes === 0 || topCandidates.length > 1) {
      return res.status(200).json({
        message: "Election ended in a draw.",
        isEnded: true,
        winner: { name: "Draw", votes: 0 }
      });
    }

    const winner = topCandidates[0];
    res.status(200).json({
      message: "Election ended successfully",
      isEnded: true,
      winner: {
        name: winner.name,
        partyslogan: winner.partyslogan,
        votes: winner.votes || 0,
      }
    });

  } catch (err) {
    console.error("Error ending election:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all elections
app.get('/elections', async (req, res) => {
  const elections = await ElectionDetail.find();
  res.json(elections);
});

// Get candidates for one post
app.get('/candidates/:electionPost', async (req, res) => {
  try {
    const candidates = await Candidate.find({ role: req.params.electionPost });
    const formatted = candidates.map((cand) => ({
      _id: cand._id,
      name: cand.name,
      partyslogan: cand.partyslogan,
      role: cand.role,
      profilepic: cand.profilepic?.toString('base64'),
      partysign: cand.partysign?.toString('base64'),
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching candidates' });
  }
});

// Vote endpoint
app.post('/vote', async (req, res) => {
  const { aadhar, candidateId, electionPost } = req.body;

  try {
    const alreadyVoted = await Candidate.findOne({
      role: electionPost,
      votedAadhars: aadhar,
    });

    if (alreadyVoted) {
      return res.status(400).json({ message: 'You have already voted in this election.' });
    }

    await Candidate.findByIdAndUpdate(candidateId, {
      $inc: { votes: 1 },
      $push: { votedAadhars: aadhar },
    });

    res.json({ message: 'Vote successfully submitted!' });
  } catch (err) {
    console.error('Voting error:', err);
    res.status(500).json({ message: 'Failed to submit vote.' });
  }
});

// Check vote status
app.post('/vote/status', async (req, res) => {
  const { aadhar, electionPost } = req.body;

  try {
    const alreadyVoted = await Candidate.findOne({
      role: electionPost,
      votedAadhars: aadhar,
    });

    res.json({ hasVoted: !!alreadyVoted });
  } catch (err) {
    console.error('Vote status check failed:', err);
    res.status(500).json({ hasVoted: false, error: 'Server error' });
  }
});

// ========== START SERVER ==========

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("❌ Server startup failed due to MongoDB error.");
});
