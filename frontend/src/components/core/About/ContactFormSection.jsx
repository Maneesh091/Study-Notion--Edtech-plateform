import React from "react";
import ContactUsForm from "../../Contact/ContactUsForm"

const ContactFormSection = () => {
  return (
    <div className="mx-auto border border-richblack-700 rounded-md p-2">
      <h1 className=" text-amber-50 text-center text-4xl font-semibold">Get in Touch</h1>
      <p className="text-center text-richblack-300 mt-3">
        We&apos;d love to here for you, Please fill out this form.
      </p>
      <div className="mt-12 mx-auto">
        <ContactUsForm/>
      </div>
    </div>
  );
};

export default ContactFormSection;