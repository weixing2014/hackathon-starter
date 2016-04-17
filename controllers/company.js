var requestify = require('requestify');

// var nodemailer = require("nodemailer");
// var transporter = nodemailer.createTransport({
//   service: 'SendGrid',
//   auth: {
//     user: process.env.SENDGRID_USER,
//     pass: process.env.SENDGRID_PASSWORD
//   }
// });
//
// /**
//  * GET /contact
//  * Contact form page.
//  */
exports.getCompany = function(req, res) {

  requestify.post('http://52.37.33.7/single_jobs.json',
    {
      "company_website": req.query.website,
      "user_id": "AprilZhang",
    }
  )
  .then(function(response) {
      // Get the response body (JSON parsed or jQuery object for XMLs)
      var data = response.getBody();
      console.log(data)
      res.render('company', {
        name: data.demograph_results.company_matching_email,
        summary: data.demograph_results.business_description,
        summaryDetails: data.demograph_results.business_summary_excerpt,
        addresses: data.demograph_results.company_addresses.split(';'),
        contacts: data.demograph_results.company_phone_numbers.split(';'),
      });
  });

};
//
// /**
//  * POST /contact
//  * Send a contact form via Nodemailer.
//  */
// exports.postContact = function(req, res) {
//   req.assert('name', 'Name cannot be blank').notEmpty();
//   req.assert('email', 'Email is not valid').isEmail();
//   req.assert('message', 'Message cannot be blank').notEmpty();
//
//   var errors = req.validationErrors();
//
//   if (errors) {
//     req.flash('errors', errors);
//     return res.redirect('/contact');
//   }
//
//   var from = req.body.email;
//   var name = req.body.name;
//   var body = req.body.message;
//   var to = 'your@email.com';
//   var subject = 'Contact Form | Hackathon Starter';
//
//   var mailOptions = {
//     to: to,
//     from: from,
//     subject: subject,
//     text: body
//   };
//
//   transporter.sendMail(mailOptions, function(err) {
//     if (err) {
//       req.flash('errors', { msg: err.message });
//       return res.redirect('/contact');
//     }
//     req.flash('success', { msg: 'Email has been sent successfully!' });
//     res.redirect('/contact');
//   });
// };
