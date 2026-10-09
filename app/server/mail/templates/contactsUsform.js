exports.contactUsEmail = (

    firstname,
    lastname,
    email,
    message,
    phoneNo,
    countrycode
) => {
    return `<!DOCTYPE html>
    <html>

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact Us Confirmation</title>

        <style>
            body {
                background-color: #f5f5f5;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.5;
                color: #333333;
                margin: 0;
                padding: 0;
            }

            .container {
                max-width: 600px;
                margin: 30px auto;
                padding: 30px;
                background-color: #ffffff;
                border-radius: 8px;
            }

            .logo {
                max-width: 180px;
                margin-bottom: 20px;
            }

            .message {
                font-size: 22px;
                font-weight: bold;
                margin-bottom: 20px;
                color: #222222;
            }

            .body {
                font-size: 16px;
                margin-bottom: 25px;
            }

            .details {
                background-color: #f8f8f8;
                padding: 20px;
                border-radius: 6px;
                text-align: left;
            }

            .detail {
                margin-bottom: 12px;
            }

            .label {
                font-weight: bold;
                color: #555555;
            }

            .user-message {
                background-color: #ffffff;
                border-left: 4px solid #FFD60A;
                padding: 15px;
                margin-top: 8px;
                white-space: pre-line;
            }

            .footer {
                font-size: 14px;
                color: #888888;
                margin-top: 25px;
                text-align: center;
            }

            a {
                color: #333333;
            }
        </style>
    </head>

    <body>

        <div class="container">

          

            <div class="message">
                Thank You for Contacting StudyNotion!
            </div>

            <div class="body">
                <p>
                    Dear <strong>${firstname} ${lastname}</strong>,
                </p>

                <p>
                    Thank you for reaching out to StudyNotion.
                    We have successfully received your message.
                    Our team will review your request and get back to you
                    as soon as possible.
                </p>
            </div>

            <div class="details">

                <div class="detail">
                    <span class="label">Name:</span>
                    ${firstname} ${lastname}
                </div>

                <div class="detail">
                    <span class="label">Email:</span>
                    <a href="mailto:${email}">
                        ${email}
                    </a>
                </div>

                <div class="detail">
                    <span class="label">Phone:</span>
                    ${countrycode} ${phoneNo}
                </div>

                <div class="detail">
                    <span class="label">Your Message:</span>

                    <div class="user-message">
                        ${message}
                    </div>
                </div>

            </div>

            <div class="footer">
                <p>
                    If you have any additional questions, feel free to contact us again.
                </p>

                <p>
                    © StudyNotion. All rights reserved.
                </p>
            </div>

        </div>

    </body>

    </html>`;
};