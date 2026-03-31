const PeriodTracker = require('../models/PeriodTracker');
const User = require('../models/User');

// Add period log
exports.addPeriodLog = async (req, res) => {
  try {
    const { startDate, endDate, symptoms, notes, mood, flowType } = req.body;

    if (!startDate) {
      return res.status(400).json({ error: 'Start date is required' });
    }

    const periodLog = new PeriodTracker({
      userId: req.userId,
      startDate,
      endDate: endDate || null,
      symptoms: symptoms || [],
      notes: notes || '',
      mood: mood || null,
      flowType: flowType || 'normal'
    });

    await periodLog.save();

    res.status(201).json({
      message: 'Period logged successfully',
      data: periodLog
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get period logs
exports.getPeriodLogs = async (req, res) => {
  try {
    const logs = await PeriodTracker.find({ userId: req.userId }).sort({ startDate: -1 });

    res.status(200).json({
      message: 'Period logs retrieved',
      count: logs.length,
      data: logs
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get period predictions (next period, ovulation)
exports.getPeriodPredictions = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const logs = await PeriodTracker.find({ userId: req.userId }).sort({ startDate: -1 }).limit(3);

    if (logs.length === 0 || !user.lastPeriodDate) {
      return res.status(200).json({
        message: 'Not enough data for predictions',
        data: {
          nextPeriodDate: null,
          ovulationDate: null,
          fertilityWindow: null
        }
      });
    }

    // Use last period date from user profile
    const lastPeriodDate = new Date(user.lastPeriodDate);
    const cycleLength = user.cycleLength || 28;

    // Calculate next period (assuming regular cycle)
    const nextPeriodDate = new Date(lastPeriodDate);
    nextPeriodDate.setDate(nextPeriodDate.getDate() + cycleLength);

    // Ovulation typically occurs 14 days before next period
    const ovulationDate = new Date(nextPeriodDate);
    ovulationDate.setDate(ovulationDate.getDate() - 14);

    // Fertility window: 5 days before ovulation to 1 day after
    const fertilityWindowStart = new Date(ovulationDate);
    fertilityWindowStart.setDate(fertilityWindowStart.getDate() - 5);

    const fertilityWindowEnd = new Date(ovulationDate);
    fertilityWindowEnd.setDate(fertilityWindowEnd.getDate() + 1);

    res.status(200).json({
      message: 'Period predictions calculated',
      data: {
        lastPeriodDate: lastPeriodDate.toISOString().split('T')[0],
        cycleLength,
        nextPeriodDate: nextPeriodDate.toISOString().split('T')[0],
        daysUntilNextPeriod: Math.ceil((nextPeriodDate - new Date()) / (1000 * 60 * 60 * 24)),
        ovulationDate: ovulationDate.toISOString().split('T')[0],
        fertilityWindow: {
          start: fertilityWindowStart.toISOString().split('T')[0],
          end: fertilityWindowEnd.toISOString().split('T')[0]
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update period log
exports.updatePeriodLog = async (req, res) => {
  try {
    const { logId } = req.params;
    const { endDate, symptoms, notes, mood, flowType } = req.body;

    const updates = {};
    if (endDate !== undefined) updates.endDate = endDate;
    if (symptoms) updates.symptoms = symptoms;
    if (notes) updates.notes = notes;
    if (mood) updates.mood = mood;
    if (flowType) updates.flowType = flowType;

    const log = await PeriodTracker.findByIdAndUpdate(logId, updates, { new: true });

    res.status(200).json({
      message: 'Period log updated',
      data: log
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete period log
exports.deletePeriodLog = async (req, res) => {
  try {
    const { logId } = req.params;

    await PeriodTracker.findByIdAndDelete(logId);

    res.status(200).json({
      message: 'Period log deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
