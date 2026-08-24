import React, { useState } from 'react';
import { ExternalLink, Copy, Check, Mail, Globe, Send } from 'lucide-react';
import { sound } from '../../utils/audio';

export const ContactWindow: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const email = 'verma.anushka2007@gmail.com';

  // Form states
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    sound.playFolderClick();
    setTimeout(() => setCopied(false), 2200);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    let isValid = true;
    const errors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Invalid email address';
      isValid = false;
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      sound.playWindowClose(); // Error sound cue
      return;
    }

    setIsSubmitting(true);
    sound.playFolderClick();

    // Construct mailto link to open client
    const subject = encodeURIComponent(`Portfolio Message from ${formData.name}`);
    const body = encodeURIComponent(`Hi Anushka,\n\n${formData.message}\n\n---\nSender Name: ${formData.name}\nSender Email: ${formData.email}`);
    const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`;

    // Open mail client
    window.location.href = mailtoUrl;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      sound.playWindowOpen(); // Success sound cue
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <div className="contact-dialog-box" style={{ maxWidth: '600px', margin: '0 auto' }}>
      {/* System Status Banner */}
      <div className="contact-system-status">
        <span className="status-badge-live" />
        <span>DIRECT CHANNELS // AVAILABLE FOR RESEARCH, COLLABORATION & INQUIRIES</span>
      </div>

      <p style={{ fontSize: '13px', lineHeight: '1.5', color: 'var(--text-secondary)', marginBottom: '18px' }}>
        Reach out directly via the channels below or fill out the secure terminal contact form:
      </p>

      {/* Grid for Contact Details */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
        {/* Email Box */}
        <div className="contact-link-row" style={{ margin: 0, padding: '10px 14px' }}>
          <div className="contact-channel-info">
            <span className="contact-channel-name">EMAIL</span>
            <span className="contact-channel-val" style={{ fontSize: '11px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{email}</span>
          </div>
          <button
            onClick={copyEmail}
            className="contact-action-btn"
            style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px', fontSize: '10px' }}
          >
            {copied ? <Check size={11} color="#22c55e" /> : <Copy size={11} />}
            <span>{copied ? 'COPIED' : 'COPY'}</span>
          </button>
        </div>

        {/* LinkedIn Box */}
        <div className="contact-link-row" style={{ margin: 0, padding: '10px 14px' }}>
          <div className="contact-channel-info">
            <span className="contact-channel-name">LINKEDIN</span>
            <span className="contact-channel-val" style={{ fontSize: '11px' }}>anushka-verma</span>
          </div>
          <a
            href="https://linkedin.com/in/anushka-verma-2a234037a"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-action-btn"
            style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px', fontSize: '10px', background: 'var(--accent-blue)', color: '#ffffff' }}
          >
            <span>OPEN</span>
            <ExternalLink size={11} />
          </a>
        </div>
      </div>

      {/* Contact Form UI */}
      <div style={{ borderTop: '2px solid var(--border-strong)', paddingTop: '20px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--accent-blue)', marginBottom: '14px', letterSpacing: '0.08em' }}>
          SECURE MESSAGING TERMINAL:
        </div>

        {isSubmitted ? (
          <div style={{ background: '#ecfdf5', border: '1.5px solid #059669', padding: '16px', textAlign: 'center', marginBottom: '10px' }}>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#065f46', marginBottom: '6px' }}>✓ TRANSMISSION SUCCESSFUL</div>
            <p style={{ fontSize: '12px', color: '#047857', marginBottom: '12px' }}>Your message has been serialized and queued for delivery. Anushka will review it shortly.</p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="contact-action-btn"
              style={{ background: '#059669', borderColor: '#047857' }}
            >
              SEND ANOTHER MESSAGE
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Name Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: 'var(--text-secondary)' }}>
                SENDER NAME:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                style={{
                  padding: '8px 10px',
                  border: '1.5px solid var(--border-strong)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  background: '#fbfbfa',
                  outline: 'none'
                }}
                placeholder="Enter your name"
              />
              {formErrors.name && <span style={{ fontSize: '11px', color: '#dc2626', fontFamily: 'var(--font-mono)' }}>{formErrors.name}</span>}
            </div>

            {/* Email Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: 'var(--text-secondary)' }}>
                RETURN EMAIL:
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={{
                  padding: '8px 10px',
                  border: '1.5px solid var(--border-strong)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  background: '#fbfbfa',
                  outline: 'none'
                }}
                placeholder="your.email@domain.com"
              />
              {formErrors.email && <span style={{ fontSize: '11px', color: '#dc2626', fontFamily: 'var(--font-mono)' }}>{formErrors.email}</span>}
            </div>

            {/* Message Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: 'var(--text-secondary)' }}>
                MESSAGE CONTENT:
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                style={{
                  padding: '8px 10px',
                  border: '1.5px solid var(--border-strong)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  background: '#fbfbfa',
                  outline: 'none',
                  resize: 'none'
                }}
                placeholder="Type your message details here..."
              />
              {formErrors.message && <span style={{ fontSize: '11px', color: '#dc2626', fontFamily: 'var(--font-mono)' }}>{formErrors.message}</span>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="github-cta-btn"
              style={{
                marginTop: '6px',
                justifyContent: 'center',
                padding: '10px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.7 : 1,
                boxShadow: '3px 3px 0px var(--accent-blue)'
              }}
            >
              {isSubmitting ? 'TRANSMITTING...' : 'TRANSMIT MESSAGE'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
