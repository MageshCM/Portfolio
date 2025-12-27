import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Github, Linkedin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import * as THREE from 'three';
import './Contact.css';

// Interactive Particle Field
function ParticleField() {
  const pointsRef = useRef();
  const mousePosition = useRef({ x: 0, y: 0 });
  const particleCount = 3000;

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 25;
      pos[i3 + 1] = (Math.random() - 0.5) * 25;
      pos[i3 + 2] = (Math.random() - 0.5) * 25;
    }
    return pos;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const positions = pointsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];

      // Mouse interaction
      const dx = mousePosition.current.x * 10 - x;
      const dy = mousePosition.current.y * 10 - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const force = Math.max(0, 1 - distance / 5);

      positions[i3] += dx * force * 0.01;
      positions[i3 + 1] += dy * force * 0.01;

      // Gentle drift
      positions[i3 + 1] += Math.sin(time + i) * 0.002;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#3b82f6"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      // EmailJS implementation
      const result = await emailjs.send(
        'service_sy5pu2n',      // Replace with your Service ID
        'template_ygoa3xe',     // Replace with your Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        'v5x6oxzGe8agpTANr'       // Replace with your Public Key
      );

      if (result.text === 'OK') {
        setStatus({
          type: 'success',
          message: 'Message sent successfully! I\'ll get back to you soon.',
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try emailing directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      label: 'Email',
      value: 'mageshsangeethavg@gmail.com',
      link: 'mailto:mageshsangeethavg@gmail.com',
      color: '#3b82f6',
    },
    {
      icon: <Phone size={24} />,
      label: 'Phone',
      value: '+91 9360582569',
      link: 'tel:+919360582569',
      color: '#10b981',
    },
    {
      icon: <MapPin size={24} />,
      label: 'Location',
      value: 'Chennai, Tamil Nadu, India',
      link: null,
      color: '#ec4899',
    },
    {
      icon: <Github size={24} />,
      label: 'GitHub',
      value: '@MageshCM',
      link: 'https://github.com/MageshCM',
      color: '#8b5cf6',
    },
    {
      icon: <Linkedin size={24} />,
      label: 'LinkedIn',
      value: 'Magesh C M',
      link: 'https://www.linkedin.com/in/magesh-c-m-9635ab379',
      color: '#0077b5',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="contact-container">
      {/* 3D Background */}
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
          <ParticleField />
        </Canvas>
      </div>

      {/* Content */}
      <motion.div
        className="contact-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="contact-header" variants={itemVariants}>
          <h1 className="contact-title">Get In Touch</h1>
          <p className="contact-subtitle">
            Have a project in mind or just want to chat? Feel free to reach out!
          </p>
        </motion.div>

        <div className="contact-grid">
          {/* Contact Form */}
          <motion.div className="form-section" variants={itemVariants}>
            <h2 className="section-heading">Send a Message</h2>
            <div className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  rows="6"
                ></textarea>
              </div>

              {status.message && (
                <div className={`status-message ${status.type}`}>
                  {status.type === 'success' ? (
                    <CheckCircle size={20} />
                  ) : (
                    <AlertCircle size={20} />
                  )}
                  <span>{status.message}</span>
                </div>
              )}

              <button
                onClick={handleSubmit}
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={20} />
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div className="info-section" variants={itemVariants}>
            <h2 className="section-heading">Contact Information</h2>
            <div className="contact-info-list">
              {contactInfo.map((info, index) => (
                <div key={index} className="info-card">
                  <div className="info-icon" style={{ color: info.color }}>
                    {info.icon}
                  </div>
                  <div className="info-details">
                    <h3 className="info-label">{info.label}</h3>
                    {info.link ? (
                      <a
                        href={info.link}
                        target={info.link.startsWith('http') ? '_blank' : '_self'}
                        rel="noopener noreferrer"
                        className="info-value link"
                        style={{ color: info.color }}
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="info-value">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="quick-note">
              <h3>Quick Note</h3>
              <p>
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. 
                Whether it's blockchain development, AI/ML projects, or just a chat about tech—don't hesitate to reach out!
              </p>
              <p>
                Response time: Usually within 24-48 hours ⚡
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;