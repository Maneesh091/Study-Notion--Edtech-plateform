const {contactUsEmail} = require("../mail/templates/contactsUsform")
const mailSender = require("../utils/mailSender")

exports.contactUsController = async (req, res) => {

  const { firstName, lastName, email, message, phonenumber, countryCode } = req.body;
  console.log(req.body);

  // console.log("firstname:", firstName)
  // console.log("lastname:", lastName)

  try {
    const emailRes = await mailSender(
      email,
      "Your Data send successfully",
      contactUsEmail(firstName, lastName, email, message, phonenumber, countryCode)
    )
    console.log("Email Res ", emailRes)
    return res.json({
      success: true,
      message: "Email send successfully",
    })
  } catch (error) {
    console.log("Error", error)
    console.log("Error message :", error.message)
    return res.json({
      success: false,
      message: "Something went wrong...",
    })
  }
}