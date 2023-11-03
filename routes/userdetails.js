const express = require("express");
const router = express.Router();
const Userdetails = require("../models/userdetails");
const verifyToken = require("../middleware/verifyToken");

// Create a new userdetails
router.post("/userdetails", async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      dob,
      gender,
      guardianNumber,
      houseNoAndStreet,
      city,
      state,
      pincode,
      school,
      board,
    } = req.body;

    // Check for mandatory fields
    if (
      !firstname ||
      !lastname ||
      !dob ||
      !gender ||
      !guardianNumber ||
      !houseNoAndStreet ||
      !city ||
      !state ||
      !pincode ||
      !school ||
      !board
    ) {
      return res.status(400).json({ message: "Mandatory fields are empty" });
    }

    const userdetails = new Userdetails(req.body);
    const savedUserdetails = await userdetails.save();
    res.status(201).json({
      message: "User profile successfully created",
      userdetails: savedUserdetails,
    });
  } catch (error) {
    res.status(400).json({ message: "Userdetails creation failed", error });
  }
});

router.get("/userdetails/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the userdetails by ID in your database
    const userdetails = await Userdetails.findById(userId);

    if (!userdetails) {
      return res.status(404).json({ message: "User details not found" });
    }

    res.status(200).json({ userdetails });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch userdetails", error });
  }
});

router.put("/userdetails/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    // Find and update the userdetails by ID in your database
    const updatedUserdetails = await Userdetails.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    );

    if (!updatedUserdetails) {
      return res.status(404).json({ message: "User details not found" });
    }

    res.status(200).json({
      message: "User details updated successfully",
      userdetails: updatedUserdetails,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update userdetails", error });
  }
});

router.delete("/userdetails/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // Find and remove the userdetails by ID in your database
    const deletedUserdetails = await Userdetails.findByIdAndDelete(userId);

    if (!deletedUserdetails) {
      return res.status(404).json({ message: "User details not found" });
    }

    res.status(200).json({
      message: "User details deleted successfully",
      userdetails: deletedUserdetails,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete userdetails", error });
  }
});
module.exports = router;
