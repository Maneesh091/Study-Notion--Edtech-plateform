const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");


// Function to create a new course
exports.createCourse = async (req, res) => {
    try {
        // Get user ID from request object
        const userId = req.user.id;

        // Get all required fields from request body
        let {
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            tag,
            category,
            status,
            instructions,
        } = req.body;

        // Get thumbnail image from request files
        const thumbnail = req.files.thumbnailImage;

        // Check if any of the required fields are missing
        if (
            !courseName ||
            !courseDescription ||
            !whatYouWillLearn ||
            !price ||
            !tag ||
            !thumbnail ||
            !category
        ) {
            return res.status(400).json({
                success: false,
                message: "All Fields are Mandatory",
            });
        }
        if (!status || status === undefined) {
            status = "Draft";
        }
        // Check if the user is an instructor
        const instructorDetails = await User.findById(userId, {
            accountType: "Instructor",
        });

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instructor Details Not Found",
            });
        }

        // Check if the tag given is valid
        const categoryDetails = await Category.findById(category);
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category Details Not Found",
            });
        }
        // Upload the Thumbnail to Cloudinary
        const thumbnailImage = await uploadImageToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
        );
        console.log("thumbnail = ", thumbnailImage);
        // Create a new course with the given details
        console.log("before creating course");
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag: tag,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            status: status,
            instructions: instructions,
        });
        console.log("after creating course");


        // Add the new course to the User Schema of the Instructor
        await User.findByIdAndUpdate(
            {
                _id: instructorDetails._id,
            },
            {
                $push: {
                    courses: newCourse._id,
                },
            },
            { new: true }
        );
        // Add the new course to the Categories
      const categoryDetails2 = await Category.findByIdAndUpdate(
         { _id: category },
         {
           $push: {
             courses: newCourse._id,
           },
         },
         { new: true }
       )
        // Return the new course and a success message
        res.status(200).json({
            success: true,
            data: newCourse,
            message: "Course Created Successfully",
        });
    } catch (error) {
        // Handle any errors that occur during the creation of the course
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to create course",
            error: error.message,
        });
    }
};

exports.getAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find(
            {status: "Published"},
            {
                courseName: true,
                courseDescription: true,
                price: true,
                thumbnail: true,
                instructor: true,
                ratingAndReviews: true,
                studentsEnroled: true,
                createdAt: true,   // ✅ ADD THIS
            }
        )
            .populate("instructor")
            .exec();

        return res.status(200).json({
            success: true,
            data: allCourses,
        });

    } catch (error) {
        console.log(error);

        return res.status(404).json({
            success: false,
            message: "Can't Fetch Course Data",
            error: error.message,
        });
    }
};

//getCourseDetails
exports.getCourseDetails = async (req, res) => {
    try {
            //get id
            console.log(req.params);
            const courseId = req.params.id;
            //find course details
            const courseDetails = await Course.findOne(
                                        {_id:courseId})
                                        .populate(
                                            {
                                                path:"instructor",
                                                populate:{
                                                    path:"additionalDetails",
                                                },
                                            }
                                        )
                                        .populate("category")
                                        //.populate("ratingAndreviews")
                                        .populate({
                                            path:"courseContent",
                                            populate:{
                                                path:"subSection",
                                            },
                                        })
                                        .exec();

                //validation
                if(!courseDetails) {
                    return res.status(400).json({
                        success:false,
                        message:`Could not find the course with ${courseId}`,
                    });
                }
                //return response
                return res.status(200).json({
                    success:true,
                    message:"Course Details fetched successfully",
                    data:courseDetails,
                })

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}
 // get a particular instructor all courses
exports.getInstructorCourses = async (req, res) => {
    try {
        const instructorId = req.user.id;

        console.log("INSTRUCTOR ID =", instructorId);

        const courses = await Course.find({
            instructor: instructorId,
        })
            .populate("instructor")
            .populate("category")
            .exec();

        console.log("INSTRUCTOR COURSES =", courses);

        return res.status(200).json({
            success: true,
            data: courses,
        });

    } catch (error) {
        console.error("GET INSTRUCTOR COURSES ERROR =", error);

        return res.status(500).json({
            success: false,
            message: "Could not fetch instructor courses",
            error: error.message,
        });
    }
};

// *************** Edit Course Details ***************
exports.editCourse = async (req, res) => {
  // console.log("editCourse body:", req.body);
 console.log("🔥 EDIT COURSE CONTROLLER HIT");
  try { 

     console.log("EDIT COURSE BODY =", req.body);
    const { courseId } = req.body;
    const updates = { ...req.body };

    delete updates.courseId;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success:false,
        message: "Course not found",
      });
    }

    // thumbnail update
    if (req.files && req.files.thumbnailImage) {
      const thumbnail = req.files.thumbnailImage;

      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );

      course.thumbnail = thumbnailImage.secure_url;
    }

    // update fields
    for (const key in updates) {
      if (key === "tag" || key === "instructions") {
        course[key] =
          typeof updates[key] === "string"
            ? JSON.parse(updates[key])
            : updates[key];
      } else {
        course[key] = updates[key];
      }
    }

    await course.save();

    await course.populate([
    //   {
    //     path: "instructor",
    //     populate: { path: "additionalDetail" },
    //   },
      { path: "category" },
    //   { path: "ratingAndReview" },
      {
        path: "courseContent",
        populate: { path: "subSection" },
      },
    ]);

    res.json({
      success: true,
      message: "Course updated successfully",
      data: course,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}; 

// deleting a course 
exports.deleteCourse = async (req, res) => {
    try {
        const instructorId = req.user.id;
        const { courseId } = req.body;

        // 1. Validate courseId
        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required",
            });
        }

        // 2. Find the course
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        // 3. Make sure this instructor owns the course
        if (course.instructor.toString() !== instructorId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this course",
            });
        }

        // 4. Delete course
        await Course.findByIdAndDelete(courseId);

        // 5. Remove course from instructor's courses array
        await User.findByIdAndUpdate(
            instructorId,
            {
                $pull: {
                    courses: courseId,
                },
            }
        );

        // 6. Remove course from category
        if (course.category) {
            await Category.findByIdAndUpdate(
                course.category,
                {
                    $pull: {
                        course: courseId,
                    },
                }
            );
        }

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        });

    } catch (error) {
        console.log("DELETE COURSE ERROR =", error);

        return res.status(500).json({
            success: false,
            message: "Course could not be deleted",
            error: error.message,
        });
    }
};
