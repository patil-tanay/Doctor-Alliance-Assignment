import express from 'express';
import multer from 'multer';
import path from 'path';
import { pool } from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'server/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

router.post('/', authenticateToken, upload.single('resume'), async (req, res) => {
  try {
    const { name, submissionDate } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    await pool.query(
      'INSERT INTO resumes (user_id, name, submission_date, file_path, file_name) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, name, submissionDate, file.path, file.originalname]
    );

    res.status(201).json({ message: 'Resume uploaded successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading resume' });
  }
});

router.get('/', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM resumes WHERE user_id = ? ORDER BY upload_date DESC',
      [req.user.id]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching resumes' });
  }
});

export default router;