const verifyEmailTemplate = ({ name, url }) => {
    return `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
  
            .email-container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: white;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
  
            .email-header {
              text-align: center;
              padding-bottom: 20px;
            }
  
            .email-header h1 {
              color: #333;
            }
  
            .email-body {
              font-size: 16px;
              line-height: 1.5;
              color: #333;
              margin-bottom: 20px;
            }
  
            .email-button {
              display: block;
              width: 200px;
              padding: 12px 0;
              text-align: center;
              background-color: #071263;
              color: white;
              font-size: 16px;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px auto;
              font-weight: bold;
            }
  
            .email-footer {
              text-align: center;
              font-size: 14px;
              color: #999;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              <h1>Welcome to Grocerly, ${name}!</h1>
            </div>
            <div class="email-body">
              <p>Thank you for registering with Grocerly. We're excited to have you on board!</p>
              <p>Please click the button below to verify your email address and get started:</p>
              <a href="${url}" class="email-button">Verify Email</a>
            </div>
            <div class="email-footer">
              <p>If you did not create an account, please ignore this email.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }
  
  export default verifyEmailTemplate;
  