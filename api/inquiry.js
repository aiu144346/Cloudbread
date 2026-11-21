const axios = require('axios');

let kvClient = null;
try {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    const { kv } = require('@vercel/kv');
    kvClient = kv;
  }
} catch (e) {
  // @vercel/kv optional in local environment
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    if (req.body && typeof req.body === 'object') {
      return resolve(req.body);
    }
    if (typeof req.body === 'string' && req.body.trim()) {
      try {
        return resolve(JSON.parse(req.body));
      } catch (err) {
        return reject(err);
      }
    }
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk.toString();
    });
    req.on('end', () => {
      if (!raw.trim()) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const payload = await readJsonBody(req);
    const {
      track = '미지정',
      topics = [],
      orgName = '',
      managerName = '',
      contactInfo = '',
      scheduleInfo = '',
      detailNote = ''
    } = payload;

    if (!orgName.trim() || !managerName.trim() || !contactInfo.trim()) {
      return res.status(400).json({
        success: false,
        message: '기관/기업명, 담당자 성함, 연락처(또는 이메일)는 필수 입력 항목입니다.'
      });
    }

    const notifyEmail = process.env.INQUIRY_NOTIFY_EMAIL || 'bluerain1026@gmail.com';
    const record = {
      id: `inq_${Date.now()}`,
      createdAt: new Date().toISOString(),
      track,
      topics: Array.isArray(topics) ? topics : [topics].filter(Boolean),
      orgName: orgName.trim(),
      managerName: managerName.trim(),
      contactInfo: contactInfo.trim(),
      scheduleInfo: scheduleInfo.trim(),
      detailNote: detailNote.trim()
    };

    // 1. Persist to Vercel KV when configured
    let storedInKv = false;
    if (kvClient) {
      try {
        await kvClient.lpush('cloudbread:inquiries', JSON.stringify(record));
        storedInKv = true;
      } catch (kvErr) {
        console.error('[inquiry] KV save error:', kvErr.message);
      }
    }

    // 2. Send real-time Email via Resend API (zero extra npm dependency)
    let emailSent = false;
    const topicsText = record.topics.length ? record.topics.join(', ') : '미선택';
    const subject = `[cloudbread.me 섭외·컨설팅 문의] ${record.orgName} (${record.managerName})`;
    const htmlBody = `
      <div style="font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background: #0f172a; color: #ffffff; padding: 20px 24px;">
          <div style="font-size: 12px; color: #38bdf8; font-weight: 700;">CLOUD BREAD · 천지인에이아이</div>
          <h2 style="margin: 6px 0 0; font-size: 18px;">신규 강연 · AX 컨설팅 문의가 접수되었습니다</h2>
        </div>
        <div style="padding: 24px; background: #ffffff; color: #0f172a; line-height: 1.65;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 8px 0; color: #64748b; width: 130px;">의뢰 유형</td><td style="padding: 8px 0; font-weight: 700;">${escapeHtml(record.track)}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b;">희망 주제</td><td style="padding: 8px 0; font-weight: 700;">${escapeHtml(topicsText)}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b;">기관 / 기업명</td><td style="padding: 8px 0; font-weight: 700;">${escapeHtml(record.orgName)}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b;">담당자 성함</td><td style="padding: 8px 0;">${escapeHtml(record.managerName)}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b;">연락처 / 이메일</td><td style="padding: 8px 0; color: #0284c7; font-weight: 700;">${escapeHtml(record.contactInfo)}</td></tr>
            <tr><td style="padding: 8px 0; color: #64748b;">희망 일정 / 인원</td><td style="padding: 8px 0;">${escapeHtml(record.scheduleInfo || '미기재')}</td></tr>
          </table>
          <div style="margin-top: 16px; padding: 14px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; white-space: pre-wrap; font-size: 14px;">
            <div style="font-size: 12px; color: #64748b; margin-bottom: 6px; font-weight: 700;">추가 요청사항</div>
            ${escapeHtml(record.detailNote || '없음')}
          </div>
          <p style="margin-top: 18px; font-size: 12px; color: #94a3b8;">접수 시각: ${record.createdAt} · ID: ${record.id}</p>
        </div>
      </div>
    `;

    if (process.env.RESEND_API_KEY) {
      try {
        await axios.post(
          'https://api.resend.com/emails',
          {
            from: process.env.RESEND_FROM_EMAIL || 'CloudBread Inquiry <onboarding@resend.dev>',
            to: [notifyEmail],
            subject,
            html: htmlBody
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
              'Content-Type': 'application/json'
            },
            timeout: 8000
          }
        );
        emailSent = true;
      } catch (mailErr) {
        console.error('[inquiry] Resend API error:', mailErr.response?.data || mailErr.message);
      }
    } else if (process.env.EMAIL_WEBHOOK_URL) {
      try {
        await axios.post(process.env.EMAIL_WEBHOOK_URL, { to: notifyEmail, subject, record }, { timeout: 8000 });
        emailSent = true;
      } catch (hookErr) {
        console.error('[inquiry] Webhook error:', hookErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      id: record.id,
      storedInKv,
      emailSent,
      notifyEmail,
      message: emailSent
        ? `${record.orgName} ${record.managerName}님의 문의가 정상 접수되어 ${notifyEmail}로 실시간 발송되었습니다.`
        : `${record.orgName} ${record.managerName}님의 문의가 접수되었습니다. 빠른 확인을 위해 이메일 앱으로도 바로 전송하실 수 있습니다.`
    });
  } catch (err) {
    console.error('[inquiry] Error:', err);
    return res.status(500).json({
      success: false,
      message: '문의 처리 중 오류가 발생했습니다. bluerain1026@gmail.com 또는 010-3616-2140으로 직접 연락 부탁드립니다.'
    });
  }
};
