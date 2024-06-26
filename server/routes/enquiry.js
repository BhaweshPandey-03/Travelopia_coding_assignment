const express = require("express");
const { access } = require("../middlewares/access");
const { auth } = require("../middlewares/auth");
const enquiryRouter = express.Router();
const enquiryModel = require("../models/enquiry.model");
const userModel = require("../models/user.model");

enquiryRouter.post("/enquiry", auth, access("user"), async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const username = user.username;
        console.log(username);
        const enquiryData = { ...req.body, username: username, userId: req.user._id, status: pending };
        const newEnquiry = new enquiryModel(enquiryData);
        await newEnquiry.save();
        res.status(201).json({ message: "Enquiry submitted successfully." });
    } catch (error) {
        console.error("Error submitting enquiry:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
// Update enquiry status
enquiryRouter.put("/enquiry/:id/status", auth, access("user"), async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        // Find the enquiry by id
        const enquiry = await enquiryModel.findById(id);

        // Check if enquiry exists
        if (!enquiry) {
            return res.status(404).json({ message: "Enquiry not found" });
        }

        // Update the status of the enquiry
        enquiry.status = status;
        await enquiry.save();

        res.status(200).json({ message: "Enquiry status updated successfully" });
    } catch (error) {
        console.error("Error updating enquiry status:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


enquiryRouter.get("/enquiry", auth, access("admin"), async (req, res) => {
    try {
        const enquiries = await enquiryModel.find();
        if (!enquiries.length) {
            return res.status(404).json({ message: 'No enquiries found' });
        }
        res.status(200).json(enquiries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = enquiryRouter;