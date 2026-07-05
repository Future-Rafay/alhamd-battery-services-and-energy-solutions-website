# EmailJS Templates

Paste these into the EmailJS template HTML editor.

## Contact Form

Expected variables:

- `{{from_name}}`
- `{{from_phone}}`
- `{{message}}`
- `{{submitted_at}}`
- `{{site_url}}`
- `{{logo_url}}`

Suggested subject:

```text
New Contact Message - {{from_name}}
```

HTML:

```html
<div style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f1f5f9;padding:28px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
          <tr>
            <td style="background:#123172;padding:22px 26px;">
              <img src="{{logo_url}}" alt="Alhamd Battery Services and Energy Solutions" width="210" style="display:block;max-width:210px;height:auto;background:#ffffff;border-radius:10px;padding:8px;">
            </td>
          </tr>
          <tr>
            <td style="padding:28px 26px 10px;">
              <p style="margin:0 0 8px;color:#f59e0b;font-size:12px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;">New website inquiry</p>
              <h1 style="margin:0;color:#123172;font-size:26px;line-height:1.25;">Contact Form Message</h1>
              <p style="margin:10px 0 0;color:#475569;font-size:14px;line-height:1.7;">A customer submitted a message from the Alhamd website.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 26px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
                <tr>
                  <td style="padding:14px 16px;background:#f8fafc;color:#64748b;font-size:12px;font-weight:700;text-transform:uppercase;width:34%;">Name</td>
                  <td style="padding:14px 16px;font-size:15px;font-weight:700;color:#123172;">{{from_name}}</td>
                </tr>
                <tr>
                  <td style="padding:14px 16px;background:#f8fafc;color:#64748b;font-size:12px;font-weight:700;text-transform:uppercase;">Phone</td>
                  <td style="padding:14px 16px;font-size:15px;font-weight:700;color:#123172;">{{from_phone}}</td>
                </tr>
                <tr>
                  <td style="padding:14px 16px;background:#f8fafc;color:#64748b;font-size:12px;font-weight:700;text-transform:uppercase;">Submitted</td>
                  <td style="padding:14px 16px;font-size:14px;color:#334155;">{{submitted_at}}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 26px 26px;">
              <div style="border-left:4px solid #f59e0b;background:#fff7ed;border-radius:10px;padding:16px 18px;">
                <p style="margin:0 0 8px;color:#123172;font-size:13px;font-weight:700;text-transform:uppercase;">Customer Message</p>
                <p style="margin:0;color:#334155;font-size:15px;line-height:1.75;white-space:pre-line;">{{message}}</p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background:#0f2557;padding:18px 26px;color:#cbd5e1;font-size:12px;line-height:1.6;">
              Alhamd Battery Services and Energy Solutions<br>
              Karachi-based battery, solar, and inverter support across Pakistan.
              <br><a href="{{site_url}}" style="color:#facc15;text-decoration:none;">{{site_url}}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</div>
```

## Service Request

Expected variables:

- `{{request_type}}`
- `{{service_name}}`
- `{{from_name}}`
- `{{from_phone}}`
- `{{address}}`
- `{{message}}`
- `{{submitted_at}}`
- `{{site_url}}`
- `{{logo_url}}`

Suggested subject:

```text
New Service Request - {{service_name}} - {{from_name}}
```

HTML:

```html
<div style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f1f5f9;padding:28px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
          <tr>
            <td style="background:#123172;padding:22px 26px;">
              <img src="{{logo_url}}" alt="Alhamd Battery Services and Energy Solutions" width="210" style="display:block;max-width:210px;height:auto;background:#ffffff;border-radius:10px;padding:8px;">
            </td>
          </tr>
          <tr>
            <td style="padding:28px 26px 10px;">
              <p style="margin:0 0 8px;color:#f59e0b;font-size:12px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;">{{request_type}}</p>
              <h1 style="margin:0;color:#123172;font-size:26px;line-height:1.25;">{{service_name}}</h1>
              <p style="margin:10px 0 0;color:#475569;font-size:14px;line-height:1.7;">A customer requested service from the Alhamd website. Contact them within 2 hours to confirm availability and next steps.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 26px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
                <tr>
                  <td style="padding:14px 16px;background:#f8fafc;color:#64748b;font-size:12px;font-weight:700;text-transform:uppercase;width:34%;">Customer</td>
                  <td style="padding:14px 16px;font-size:15px;font-weight:700;color:#123172;">{{from_name}}</td>
                </tr>
                <tr>
                  <td style="padding:14px 16px;background:#f8fafc;color:#64748b;font-size:12px;font-weight:700;text-transform:uppercase;">Phone</td>
                  <td style="padding:14px 16px;font-size:15px;font-weight:700;color:#123172;">{{from_phone}}</td>
                </tr>
                <tr>
                  <td style="padding:14px 16px;background:#f8fafc;color:#64748b;font-size:12px;font-weight:700;text-transform:uppercase;">Address</td>
                  <td style="padding:14px 16px;font-size:14px;color:#334155;line-height:1.6;">{{address}}</td>
                </tr>
                <tr>
                  <td style="padding:14px 16px;background:#f8fafc;color:#64748b;font-size:12px;font-weight:700;text-transform:uppercase;">Submitted</td>
                  <td style="padding:14px 16px;font-size:14px;color:#334155;">{{submitted_at}}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 26px 26px;">
              <div style="border-left:4px solid #f59e0b;background:#fff7ed;border-radius:10px;padding:16px 18px;">
                <p style="margin:0 0 8px;color:#123172;font-size:13px;font-weight:700;text-transform:uppercase;">Instructions</p>
                <p style="margin:0;color:#334155;font-size:15px;line-height:1.75;white-space:pre-line;">{{message}}</p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:0 26px 26px;">
              <div style="background:#ecfeff;border:1px solid #bae6fd;border-radius:12px;padding:14px 16px;color:#0f172a;font-size:13px;line-height:1.6;">
                <strong style="color:#123172;">Coverage note:</strong> Alhamd is based in Karachi and can coordinate Pakistan-wide support through sub-distributors.
              </div>
            </td>
          </tr>
          <tr>
            <td style="background:#0f2557;padding:18px 26px;color:#cbd5e1;font-size:12px;line-height:1.6;">
              Alhamd Battery Services and Energy Solutions<br>
              Batteries, solar panels, inverters, warranties, and quote-based support.
              <br><a href="{{site_url}}" style="color:#facc15;text-decoration:none;">{{site_url}}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</div>
```
