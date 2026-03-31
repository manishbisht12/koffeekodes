import User from '../models/User.js';
import Session from '../models/Session.js';

// @desc    Get active sessions for a user
// @route   GET /api/sessions/active
// @access  Private
export const getActiveSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user._id, isActive: true })
      .sort({ createdAt: -1 });

    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Logout a single session
// @route   DELETE /api/sessions/:id
// @access  Private
export const logoutSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (session) {
      if (session.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to logout this session' });
      }

      session.isActive = false;
      await session.save();

      res.json({ message: 'Session logged out' });
    } else {
      res.status(404).json({ message: 'Session not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
