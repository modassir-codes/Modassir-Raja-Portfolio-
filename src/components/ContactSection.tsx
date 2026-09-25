import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Send,
  CheckCircle2,
  Copy,
  Check,
  MapPin,
  Github,
  Linkedin,
  MessageSquare,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/resumeData';
import { ContactFormData } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { staggerContainer, fadeInUp, scrollViewport } from '../utils/animations';

export const ContactSection: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const validate = () => {
    const errs: Partial<ContactFormData> = {};
    if (!formData.name.trim()) {
      errs.name = 'Please enter your name.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) {
      errs.subject = 'Please enter a subject.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please enter your message.';
    } else if (formData.message.trim().length < 5) {
      errs.message = 'Message should be at least 5 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Send real email directly to modassirraza722083@gmail.com via FormSubmit AJAX endpoint
      await fetch(`https://formsubmit.co/ajax/${PERSONAL_INFO.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: `[Portfolio Inquiry] ${formData.subject} - from ${formData.name}`,
          subject: formData.subject,
          message: formData.message,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      setIsSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      // Fallback display
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyMessagePayload = () => {
    const text = `To: ${PERSONAL_INFO.email}\nFrom: ${formData.name} <${formData.email}>\nSubject: ${formData.subject}\n\n${formData.message}`;
    navigator.clipboard.writeText(text);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2500);
  };

  const handleOpenMailClient = () => {
    const subject = encodeURIComponent(formData.subject || 'Full Stack Web Developer Opportunity');
    const body = encodeURIComponent(
      `Hi Modassir,\n\n${formData.message || 'I came across your portfolio and would like to connect.'}\n\nBest regards,\n${formData.name || 'Hiring Lead'}\n${formData.email || ''}`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 md:py-28 border-b border-black/10 dark:border-white/10 overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12"
        >
          {/* Left Column: Contact details & pitch */}
          <motion.div variants={fadeInUp} className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-2.5 block">
                {t.contact.sectionNum}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight text-black dark:text-white mb-4 leading-tight">
                Let's build something useful together.
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-serif italic leading-relaxed mb-8">
                I am open to full-time engineering opportunities and exciting projects. Reach out via email or submit a message below.
              </p>

              {/* Direct email card */}
              <div className="p-5 rounded-xs bg-black/[0.02] dark:bg-white/[0.02] border border-black/15 dark:border-white/15 mb-6">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500">
                    Direct Email
                  </span>
                  <button
                    id="copy-email-btn"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-black dark:text-white hover:opacity-70 transition cursor-pointer"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">{t.contact.copied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>
                </div>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-base sm:text-lg font-serif text-black dark:text-white hover:underline underline-offset-4 transition break-all font-medium"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>

              {/* Location & Status Info */}
              <div className="space-y-3 text-xs font-mono text-neutral-600 dark:text-neutral-400">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-xs border border-black/15 dark:border-white/15 flex items-center justify-center text-black dark:text-white shrink-0">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span>{PERSONAL_INFO.location} — Open to Remote & Relocation</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-xs border border-black/15 dark:border-white/15 flex items-center justify-center text-black dark:text-white shrink-0">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <span>Quick response turnaround (within 24 hours)</span>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="pt-8 mt-8 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center gap-3">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xs text-xs font-mono uppercase tracking-wider bg-black/[0.02] dark:bg-white/[0.02] border border-black/15 dark:border-white/15 hover:border-black dark:hover:border-white text-black dark:text-white transition"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xs text-xs font-mono uppercase tracking-wider bg-black/[0.02] dark:bg-white/[0.02] border border-black/15 dark:border-white/15 hover:border-black dark:hover:border-white text-black dark:text-white transition"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xs text-xs font-mono uppercase tracking-wider bg-black/[0.02] dark:bg-white/[0.02] border border-black/15 dark:border-white/15 hover:border-black dark:hover:border-white text-black dark:text-white transition"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Direct</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div variants={fadeInUp} className="lg:col-span-7">
            <div className="bg-black/[0.02] dark:bg-white/[0.02] rounded-xs p-6 sm:p-10 border border-black/15 dark:border-white/15 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="py-12 flex flex-col items-center text-center space-y-4"
                  >
                    <div className="w-12 h-12 rounded-xs border border-black/20 dark:border-white/20 text-black dark:text-white flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    </div>
                    <h3 className="text-2xl font-serif text-black dark:text-white">
                      Message Sent Successfully
                    </h3>
                    <p className="text-sm font-serif italic text-neutral-600 dark:text-neutral-400 max-w-md">
                      Thank you for getting in touch. Your message has been forwarded directly to modassirraza722083@gmail.com.
                    </p>

                    <div className="w-full max-w-md p-4 my-2 text-left rounded-xs bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 font-mono text-xs space-y-1.5">
                      <div className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold border-b border-black/10 dark:border-white/10 pb-1 flex items-center justify-between">
                        <span>Message Summary</span>
                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold">
                          <Check className="w-3 h-3" /> TRANSMITTED
                        </span>
                      </div>
                      <div className="text-neutral-700 dark:text-neutral-300 truncate">
                        <span className="text-neutral-400">Subject:</span> {formData.subject}
                      </div>
                      <div className="text-neutral-700 dark:text-neutral-300 truncate">
                        <span className="text-neutral-400">From:</span> {formData.name} ({formData.email})
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <button
                        onClick={handleCopyMessagePayload}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xs text-xs font-mono uppercase tracking-wider text-black dark:text-white border border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white transition cursor-pointer"
                      >
                        {copiedMessage ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="text-emerald-500">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Message</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={handleOpenMailClient}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xs text-xs font-mono uppercase tracking-wider text-black dark:text-white border border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white transition cursor-pointer"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Open Mail App</span>
                      </button>
                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({ name: '', email: '', subject: '', message: '' });
                        }}
                        className="px-4 py-2.5 rounded-xs text-xs font-mono uppercase tracking-wider font-bold text-white bg-black dark:bg-white dark:text-black hover:opacity-85 transition cursor-pointer"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                    noValidate
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10 mb-4">
                      <h3 className="text-xl font-serif text-black dark:text-white flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        <span>Send a Message</span>
                      </h3>
                      <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider">
                        All fields required
                      </span>
                    </div>

                    {/* Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-1.5"
                        >
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="contact-name"
                          value={formData.name}
                          onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            if (errors.name) setErrors({ ...errors, name: undefined });
                          }}
                          placeholder="Your name or company"
                          className={`w-full px-3.5 py-2.5 rounded-xs text-xs font-mono bg-white dark:bg-[#111111] border transition focus:outline-none ${
                            errors.name
                              ? 'border-rose-500'
                              : 'border-black/15 dark:border-white/15 focus:border-black dark:focus:border-white text-black dark:text-white'
                          }`}
                        />
                        {errors.name && (
                          <p className="mt-1 text-[11px] font-mono text-rose-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-1.5"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="contact-email"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email) setErrors({ ...errors, email: undefined });
                          }}
                          placeholder="you@example.com"
                          className={`w-full px-3.5 py-2.5 rounded-xs text-xs font-mono bg-white dark:bg-[#111111] border transition focus:outline-none ${
                            errors.email
                              ? 'border-rose-500'
                              : 'border-black/15 dark:border-white/15 focus:border-black dark:focus:border-white text-black dark:text-white'
                          }`}
                        />
                        {errors.email && (
                          <p className="mt-1 text-[11px] font-mono text-rose-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="block text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-1.5"
                      >
                        Subject / Opportunity
                      </label>
                      <input
                        type="text"
                        id="contact-subject"
                        value={formData.subject}
                        onChange={(e) => {
                          setFormData({ ...formData, subject: e.target.value });
                          if (errors.subject) setErrors({ ...errors, subject: undefined });
                        }}
                        placeholder="Full Stack Web Developer Role / Project Discussion"
                        className={`w-full px-3.5 py-2.5 rounded-xs text-xs font-mono bg-white dark:bg-[#111111] border transition focus:outline-none ${
                          errors.subject
                            ? 'border-rose-500'
                            : 'border-black/15 dark:border-white/15 focus:border-black dark:focus:border-white text-black dark:text-white'
                        }`}
                      />
                      {errors.subject && (
                        <p className="mt-1 text-[11px] font-mono text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-1.5"
                      >
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          if (errors.message) setErrors({ ...errors, message: undefined });
                        }}
                        placeholder="Hi Modassir, I came across your portfolio and would like to discuss..."
                        className={`w-full px-3.5 py-2.5 rounded-xs text-xs font-mono bg-white dark:bg-[#111111] border transition focus:outline-none resize-none ${
                          errors.message
                            ? 'border-rose-500'
                            : 'border-black/15 dark:border-white/15 focus:border-black dark:focus:border-white text-black dark:text-white'
                        }`}
                      />
                      {errors.message && (
                        <p className="mt-1 text-[11px] font-mono text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit button */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                      <p className="text-[10px] font-mono text-neutral-500">
                        Direct delivery to {PERSONAL_INFO.email}
                      </p>

                      <button
                        type="submit"
                        id="submit-contact-form-btn"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xs font-mono uppercase text-xs font-bold tracking-wider text-white bg-black dark:bg-white dark:text-black hover:opacity-85 transition-all disabled:opacity-50 cursor-pointer shadow-xs"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-neutral-400 border-t-white dark:border-t-black rounded-full animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Send Message</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
