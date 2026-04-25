import json
import os
import smtplib
import urllib.request
import urllib.parse
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def send_email(name: str, email: str, message: str):
    email_from = os.environ.get('EMAIL_FROM', '')
    email_password = os.environ.get('EMAIL_PASSWORD', '')
    email_to = os.environ.get('EMAIL_TO', '')

    if not (email_from and email_password and email_to):
        return

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка на ремонт от {name}'
    msg['From'] = f'НАШ МАСТЕР <{email_from}>'
    msg['To'] = email_to

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 24px; border-radius: 12px;">
      <div style="background: #1a3a6b; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 22px;">🔧 НАШ МАСТЕР</h1>
        <p style="color: #ffffff99; margin: 4px 0 0 0; font-size: 13px;">Техника в надёжных руках</p>
      </div>
      <div style="background: white; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0; border-top: none;">
        <h2 style="color: #1a3a6b; margin-top: 0;">Новая заявка на ремонт</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #666; width: 120px;">Имя</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #1a3a6b; font-weight: bold;">{name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #666;">Email</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #1a3a6b;"><a href="mailto:{email}" style="color: #e87722;">{email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #666; vertical-align: top;">Сообщение</td>
            <td style="padding: 10px 0; color: #333;">{message}</td>
          </tr>
        </table>
        <div style="margin-top: 24px; background: #fff8f0; border-left: 4px solid #e87722; padding: 12px 16px; border-radius: 4px;">
          <p style="margin: 0; color: #666; font-size: 13px;">Ответьте клиенту по email или позвоните как можно скорее.</p>
        </div>
      </div>
    </div>
    """

    msg.attach(MIMEText(html, 'html', 'utf-8'))

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login(email_from, email_password)
        server.sendmail(email_from, email_to, msg.as_string())


def send_telegram(name: str, email: str, message: str):
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID', '')

    if not (bot_token and chat_id):
        return

    text = (
        f"🔧 *Новая заявка на ремонт*\n\n"
        f"👤 Имя: {name}\n"
        f"📧 Email: {email}\n"
        f"📝 Сообщение: {message}"
    )
    tg_url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    payload = urllib.parse.urlencode({
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'Markdown'
    }).encode()
    req = urllib.request.Request(tg_url, data=payload, method='POST')
    urllib.request.urlopen(req, timeout=10)


def handler(event: dict, context) -> dict:
    """Отправка заявки на ремонт — email + Telegram"""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body', '{}'))
    name = body.get('name', '').strip()
    email = body.get('email', '').strip()
    message = body.get('message', '').strip()

    if not name or not email or not message:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Заполните все поля'})
        }

    send_email(name, email, message)
    send_telegram(name, email, message)

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True, 'message': 'Заявка отправлена!'})
    }