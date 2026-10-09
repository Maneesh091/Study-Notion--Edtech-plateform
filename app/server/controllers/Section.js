const Section = require("../models/Section");
const Course = require("../models/Course");
const Subsection = require("../models/Subsection");
// CREATE a new section
exports.createSection = async (req, res) => {
    try {
        // Extract the required properties from the request body
        const { sectionName, courseId } = req.body;
        console.log(req.body); 
   console.log(sectionName);
      console.log(courseId);
        // Validate the input
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Missing required properties",
            });
        }

        // Create a new section with the given name
        const newSection = await Section.create({ sectionName });
        console.log("Course ID:", courseId);
        console.log(typeof courseId);

        

        


console.log("New Section:", newSection);

console.log("Section ID:", newSection._id);
console.log(Course);

        // Add the new section to the course's content array
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: newSection._id,
                },
            },
            { new: true }
        )
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();

            console.log(updatedCourse);

        // Return the updated course object in the response
        res.status(200).json({
            success: true,
            message: "Section created successfully",
            updatedCourse,
        });
    } catch (error) {
        // Handle errors
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

// UPDATE a section
exports.updateSection = async (req, res) => {
    try {
        const { sectionName, sectionId } = req.body;
        const section = await Section.findByIdAndUpdate(
            sectionId,
            { sectionName },
            { new: true }
        );
        res.status(200).json({
            success: true,
            message: section,
        });
    } catch (error) {
        console.error("Error updating section:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// DELETE a section
// Example fix for your Express controller (e.g., courseController.js)
exports.deleteSection = async (req, res) => {
    try {
        const { sectionId, courseId } = req.body; // or req.params depending on your setup
        
        if (!sectionId) {
            return res.status(400).json({ success: false, message: "Section ID is required" });
        }

        // Perform deletion logic (e.g., using Mongoose)
        const deletedSection = await Section.findByIdAndDelete(sectionId);
        
        if (!deletedSection) {
            return res.status(404).json({ success: false, message: "Section not found" });
        }

        // Update Course to remove the section reference
        await Course.findByIdAndUpdate(courseId, { $pull: { courseContent: sectionId } });

        return res.status(200).json({ success: true, message: "Section deleted successfully" });
    } catch (error) {
        console.error("Error deleting section:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};