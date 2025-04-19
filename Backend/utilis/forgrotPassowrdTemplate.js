const forgotPasswordTemplate = ({ name, otp }) => {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="color: #2d3748;">Hello, ${name}</h2>
        <p style="font-size: 16px; color: #4a5568;">You've requested to reset your password. Please use the following OTP to proceed:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <span style="display: inline-block; padding: 15px 25px; background-color: #3182ce; color: white; font-size: 24px; font-weight: bold; border-radius: 8px; letter-spacing: 4px;">
            ${otp}
          </span>
        </div>
        
        <p style="font-size: 16px; color: #4a5568;">
          This OTP is valid for <strong>1 hour</strong>. Enter the code on the <strong>Grocerly Website</strong> to complete the password reset process.
        </p>
  
        <br />
  
        <p style="font-size: 16px; color: #4a5568;">Thanks,</p>
        <p style="font-weight: bold; color: #2d3748;">The Grocerly Team</p>
      </div>
    `;
  };

  export default forgotPasswordTemplate