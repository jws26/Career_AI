const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: '이름과 이메일을 입력해주세요.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: 'jiwonsung_21@yonsei.ac.kr',
      subject: '[커리어설계소] 새로운 사전 신청이 접수되었습니다',
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; border: 1px solid #e5e7eb; border-radius: 12px;">
          <h2 style="color: #0f2144; margin-bottom: 8px;">📋 사전 신청 접수</h2>
          <p style="color: #6b7280; margin-bottom: 24px;">새로운 사전 신청자가 등록되었습니다.</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; width: 80px;">이름</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #0f2144; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">이메일</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #0f2144; font-weight: 600;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #6b7280;">신청 일시</td>
              <td style="padding: 12px 0; color: #0f2144; font-weight: 600;">${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</td>
            </tr>
          </table>
        </div>
      `,
    });

    res.json({ success: true });
  } catch (error) {
    console.error('메일 전송 실패:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};
