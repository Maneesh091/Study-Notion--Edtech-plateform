const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// Method for updating a profile
exports.updateProfile = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            dateOfBirth = "",
            gender = "",
            about = "",
            contactNumber = "",
        } = req.body;

        const id = req.user.id;

        // Find user
        const userDetails = await User.findById(id);

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Update User fields
        userDetails.firstName = firstName;
        userDetails.lastName = lastName;

        await userDetails.save();

        // Find Profile
        const profile = await Profile.findById(
            userDetails.additionalDetails
        );

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }

        // Update Profile fields
        profile.dateOfBirth = dateOfBirth;
        profile.gender = gender;
        profile.about = about;
        profile.contactNumber = contactNumber;

        await profile.save();

        // Get updated user with profile
        const updatedUserDetails = await User.findById(id)
            .populate("additionalDetails")
            .exec();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            updatedUserDetails,
        });

    } catch (error) {
        console.log("UPDATE PROFILE ERROR =", error);

        return res.status(500).json({
            success: false,
            message: "Could not update profile",
            error: error.message,
        });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        // TODO: Find More on Job Schedule
        // const job = schedule.scheduleJob("10 * * * * *", function () {
        // 	console.log("The answer to life, the universe, and everything!");
        // });
        // console.log(job);
        console.log("Printing ID: ", req.user.id);
        const id = req.user.id;
        
        const user = await User.findById({ _id: id });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        // Delete Assosiated Profile with the User
        await Profile.findByIdAndDelete({ _id: user.additionalDetails });
        // TODO: Unenroll User From All the Enrolled Courses
        // Now Delete User
        await User.findByIdAndDelete({ _id: id });
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ success: false, message: "User Cannot be deleted successfully" });
    }
};

exports.getAllUserDetails = async (req, res) => {
    try {
        console.log("🔥 PROFILE CONTROLLER HIT");
        console.log("REQ.USER =", req.user);

        const id = req.user.id;

        const userDetails = await User.findById(id)
            .populate("additionalDetails")
            .exec();

        console.log("USER DETAILS =", userDetails);

        return res.status(200).json({
            success: true,
            message: "User Data fetched successfully",
            data: userDetails,
        });

    } catch (error) {
        console.log("PROFILE ERROR =", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  
exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id

    const userDetails = await User.findOne({
      _id: userId,
    })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec()

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userId}`,
      })
    }

    console.log(
      "🔥 ENROLLED COURSES = ",
      JSON.stringify(userDetails.courses, null, 2)
    )

    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    })
  } catch (error) {
    console.log("🔥 GET ENROLLED COURSES ERROR =", error)

    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}