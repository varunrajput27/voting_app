const express = require("express");
const multer = require("multer");
const cors = require("cors");
const db=require("./db")
const Voter = require("./models/voter");
const Vote = require('./models/Vote');  
const Candidate = require("./models/Candidate");
const ElectionDetail = require("./models/ElectionDetail");
require('dotenv').config(); // ✅ Correct loading of .env file
const PORT = process.env.PORT || 3000;


const app = express();
app.use(cors());


const cors = require("cors");

const allowedOrigins = [
  'https://voting-frontend-six.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));



// Parse JSON bodies
app.use(express.json());

// Multer setup for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



//Login  fro voters
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


// Notification
app.get("/api/election/details", async (req, res) => {
  try {
    // Fetch all election notifications, sorted by most recent
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


//send notification by admin 
app.post("/api/election/send-details", async (req, res) => {
  const { electionPost, location, linkName, message } = req.body;

  try {
    const detail = new ElectionDetail({
      electionPost,
      location,
      linkName: linkName || "https://yourdomain.com/registration", // default link
      message,
    });
    await detail.save();

    res.status(201).json({ message: "Election details saved and notification sent" });
  } catch (err) {
    console.error("Error saving election details:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// get notification by  admin
app.get('/api/election/fetchdetails', async (req, res) => {
  try {
    // Fetch only 'postName' and 'cityName' fields
    const notifications = await ElectionDetail.find().select('electionPost location');
    res.status(200).json(notifications);  // Send the selected fields as a response
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// // delete notification by admin
app.delete("/api/election/delete-details/:id", async (req, res) => {
  try {
    // Step 1: Find the election detail first
    const election = await ElectionDetail.findById(req.params.id);
    if (!election) {
      return res.status(404).json({ message: "Election not found" });
    }

    const roleToDelete = election.electionPost;

    // Step 2: Delete all candidates matching that election post (role)
    await Candidate.deleteMany({ role: roleToDelete });


    // Step 3: Delete the election notification/detail
    await ElectionDetail.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: `Election and candidates for ${roleToDelete} deleted.` });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


//  candiate registration only 
app.post(
  '/register',
  upload.fields([
    { name: 'profilepic', maxCount: 1 },
    { name: 'partysign', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { fullName, aadharCard, partySlogan,electionPost } = req.body;
      const profilepicFile = req.files['profilepic'] ? req.files['profilepic'][0] : null;
      const partysignFile = req.files['partysign'] ? req.files['partysign'][0] : null;

      if (!fullName || !aadharCard || !partySlogan || !profilepicFile || !electionPost || !partysignFile) {
        return res.status(400).json({ error: 'All fields are required.' });
      }

      // Check if Aadhar is a number
      const aadharNumber = Number(aadharCard);
      if (isNaN(aadharNumber)) {
        return res.status(400).json({ error: 'Aadhar Card must be a number.' });
      }

      // Check if aadhar or partySlogan already exists (unique fields)
      const existingCandidate = await Candidate.findOne({
        $or: [{ aadhar: aadharNumber }, { partyslogan: partySlogan }],
      });

      if (existingCandidate) {
        return res.status(409).json({ error: 'Aadhar or Party Slogan already exists.' });
      }

      // Create new candidate
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



// get candidate
app.get('/candidates', async (req, res) => {
  try {
    const candidates = await Candidate.find({});

    const formatted = candidates.map((c) => ({
      name: c.name || 'Unnamed Candidate',  // <--- Add this
      profilepic: c.profilepic ? c.profilepic.toString('base64') : '',
      partysign: c.partysign ? c.partysign.toString('base64') : '',
      partyslogan: c.partyslogan || 'No slogan provided',
      votes: c.votes || 0,
      electionPost: c.role?.trim() || 'Unknown',
    }));

    res.json({ candidates: formatted });
  } catch (err) {
    console.error('❌ Error fetching candidates:', err);
    res.status(500).json({ error: 'Server error' });
  }
});





// End election and determine winner
app.post("/end-election/:id", async (req, res) => {
  try {
    const electionId = req.params.id;

    // 1. Find the election detail
    const election = await ElectionDetail.findById(electionId);
    if (!election) {
      return res.status(404).json({ message: "Election not found" });
    }

    // 2. Mark election as ended
    election.isEnded = true;
    await election.save(); // save the change

    // 3. Get the post name (e.g., "CM", "MP")
    const electionPost = election.electionPost;

    // 4. Get candidates for this election post
    const candidates = await Candidate.find({ role: electionPost });

    if (candidates.length === 0) {
      return res.status(404).json({ message: "No candidates found for this post" });
    }

    // 5. Find max votes
    const maxVotes = Math.max(...candidates.map(c => c.votes || 0));

    // 6. Check how many candidates have max votes
    const topCandidates = candidates.filter(c => (c.votes || 0) === maxVotes);

    // 7. Respond based on result
    if (maxVotes === 0 || topCandidates.length > 1) {
      return res.status(200).json({
        message: "Election ended in a draw. No clear winner.",
        isEnded: true,
        winner: {
          name: "Draw",
          votes: 0
        }
      });
    }

    const winner = topCandidates[0];
    return res.status(200).json({
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


// elections post name fro election page
app.get('/elections', async (req, res) => {
  const elections = await ElectionDetail.find();
  res.json(elections);
});


// GET all candidates for a specific election post
app.get('/candidates/:electionPost', async (req, res) => {
  try {
    const candidates = await Candidate.find({ role: req.params.electionPost });

    const formattedCandidates = candidates.map((cand) => ({
      _id: cand._id,
      name: cand.name,
      partyslogan: cand.partyslogan,
      message: cand.message,
      role: cand.role,
      // 👇 Convert Buffer to base64 string if available
      profilepic: cand.profilepic ? cand.profilepic.toString('base64') : null,
      partysign: cand.partysign ? cand.partysign.toString('base64') : null,
    }));

    res.json(formattedCandidates);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching candidates' });
  }
});



/// vote endpoint 

app.post('/vote', async (req, res) => {
  const { aadhar, candidateId, electionPost } = req.body;

  try {
    // Check if this aadhar already voted for this election
    const alreadyVoted = await Candidate.findOne({
      role: electionPost,
      votedAadhars: aadhar,
    });

    if (alreadyVoted) {
      return res.status(400).json({ message: 'You have already voted in this election.' });
    }

    // Increment votes and push aadhar to votedAadhars array
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


// POST /vote/status
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








//////////////////////////////////////////////////////////////////////////////////


app.listen(PORT, () => {
  console.log("Server running on port 3000");
});

