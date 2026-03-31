require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.post('/api/login', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: '이름과 이메일을 입력해주세요.' });
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: 'jiwonsung_21@yonsei.ac.kr',
      subject: '[Career AI] 새로운 사용자 로그인',
      html: `
        <h2>새로운 사용자가 로그인했습니다</h2>
        <p><strong>이름:</strong> ${name}</p>
        <p><strong>이메일:</strong> ${email}</p>
        <p><strong>시간:</strong> ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</p>
      `,
    });

    res.json({ success: true, message: '로그인 성공' });
  } catch (error) {
    console.error('메일 전송 실패:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

app.listen(PORT, () => {
  console.log(`백엔드 서버 실행 중: http://localhost:${PORT}`);
});
