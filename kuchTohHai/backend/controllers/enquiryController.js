import Enquiry from '../models/Enquiry.js';

// @desc    Get all enquiries
// @route   GET /api/enquiries
export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching enquiries" });
  }
};

// @desc    Get single enquiry by ID
// @route   GET /api/enquiries/:id
export const getEnquiryById = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }
    res.json(enquiry);
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching enquiry" });
  }
};

// @desc    Delete enquiry by ID
// @route   DELETE /api/enquiries/:id
export const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }
    res.json({ message: "Enquiry deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error while deleting enquiry" });
  }
};

export const postEnquiry = async (req, res) => {
  try {
    const {
      fullName,
      phoneNumber,
      from,
      to,
      date,
      time,
      serviceType,
    } = req.body;

    // Manual field validation
    if (!fullName?.trim()) return res.status(400).json({ message: "Full name is required" });
    if (!phoneNumber?.trim()) return res.status(400).json({ message: "Phone number is required" });
    if (!from?.trim()) return res.status(400).json({ message: "Pickup location (from) is required" });
    if (!to?.trim()) return res.status(400).json({ message: "Drop location (to) is required" });
    if (!date) return res.status(400).json({ message: "Date is required" });
    if (!time?.trim()) return res.status(400).json({ message: "Time is required" });
    if (!serviceType?.trim()) return res.status(400).json({ message: "Service type is required" });

    

    // Create and save enquiry
    const enquiry = new Enquiry({
      fullName: fullName.trim(),
      phoneNumber: phoneNumber.trim(),
      from: from.trim(),
      to: to.trim(),
      date,
      time: time.trim(),
      serviceType: serviceType.trim(),
    });

    const saved = await enquiry.save();
    res.status(201).json({ message: "Enquiry submitted successfully", enquiry: saved });

  } catch (error) {
    console.error("Enquiry creation error:", error);
    res.status(500).json({ message: "Server error while creating enquiry" });
  }
};