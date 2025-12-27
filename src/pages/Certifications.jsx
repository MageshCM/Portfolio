import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, CheckCircle } from 'lucide-react';
import * as THREE from 'three';
import './Certifications.css';

// Floating Certificate Card in 3D
function FloatingCertificate({ position, index }) {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(time + index) * 0.3;
    meshRef.current.rotation.y = Math.sin(time * 0.3 + index) * 0.2;
    meshRef.current.rotation.x = Math.cos(time * 0.2 + index) * 0.1;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1.5, 1, 0.1]} />
      <meshStandardMaterial
        color="#3b82f6"
        transparent
        opacity={0.3}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

// Orbiting Award Symbols
function AwardSymbol({ radius, speed, color }) {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const angle = time * speed;
    meshRef.current.position.x = Math.cos(angle) * radius;
    meshRef.current.position.z = Math.sin(angle) * radius;
    meshRef.current.rotation.y = time * 0.5;
  });

  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[0.4]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.6}
        wireframe
      />
    </mesh>
  );
}

// 3D Scene
function CertificationsScene() {
  const certificates = [
    { position: [-4, 1, -3], index: 0 },
    { position: [4, -1, -4], index: 1 },
    { position: [-3, -2, -2], index: 2 },
    { position: [3, 2, -5], index: 3 },
    { position: [0, 0, -3], index: 4 },
  ];

  const awards = [
    { radius: 5, speed: 0.3, color: '#3b82f6' },
    { radius: 6, speed: 0.4, color: '#8b5cf6' },
    { radius: 4.5, speed: 0.35, color: '#10b981' },
  ];

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      
      {certificates.map((cert, idx) => (
        <FloatingCertificate key={idx} {...cert} />
      ))}
      
      {awards.map((award, idx) => (
        <AwardSymbol key={idx} {...award} />
      ))}
    </>
  );
}

const Certifications = () => {
  const certifications = [
    {
      id: 1,
      title: 'AWS Cloud Solutions Architect Professional Certificate',
      issuer: 'Amazon Web Services (Coursera)',
      date: 'May 2, 2025',
      description: 'Comprehensive specialization covering cloud architecture, infrastructure deployment, data lakes, and AWS solutions design.',
      verify: 'https://coursera.org/verify/professional-cert/9AHZAA46SQ8T',
      color: '#ff9900',
      courses: 4,
    },
    {
      id: 2,
      title: 'Natural Language Processing Specialization',
      issuer: 'DeepLearning.AI (Coursera)',
      date: 'Nov 9, 2025',
      description: 'Advanced NLP specialization covering classification, probabilistic models, sequence models, and attention mechanisms.',
      verify: 'https://coursera.org/verify/specialization/55UQSV837DVI',
      color: '#00a67e',
      courses: 4,
    },
    {
      id: 3,
      title: 'Google Data Analytics Professional Certificate',
      issuer: 'Google (Coursera)',
      date: 'Dec 2, 2025',
      description: 'Comprehensive data analytics program covering data preparation, analysis, visualization, and R programming.',
      verify: 'https://coursera.org/verify/professional-cert/JRF1UUAYQ25C',
      color: '#4285f4',
      courses: 9,
    },
    {
      id: 4,
      title: 'Oracle Cloud Infrastructure 2025 Certified Generative AI Professional',
      issuer: 'Oracle',
      date: 'Oct 13, 2025',
      description: 'Professional certification demonstrating expertise in Oracle Cloud generative AI solutions and implementations.',
      verify: '#',
      color: '#c74634',
      validity: 'Valid until Oct 13, 2027',
      certId: '102904199OCI25GAIOCP',
    },
    {
      id: 5,
      title: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
      issuer: 'Oracle',
      date: 'Oct 14, 2025',
      description: 'Foundational AI certification covering Oracle Cloud AI services and fundamental concepts.',
      verify: '#',
      color: '#c74634',
      validity: 'Valid until Oct 14, 2027',
      certId: '102904199OCI25AICFA',
    },
    {
      id: 6,
      title: 'Microsoft AI Learning Challenge - AI Innovation 2025',
      issuer: 'Microsoft Learn',
      date: 'Sep 23, 2025',
      description: 'Successfully completed Microsoft\'s AI Innovation challenge focusing on cutting-edge AI technologies.',
      verify: '#',
      color: '#00a4ef',
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="certifications-container">
      {/* 3D Background */}
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <CertificationsScene />
        </Canvas>
      </div>

      {/* Content */}
      <motion.div
        className="certifications-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="certifications-header" variants={itemVariants}>
          <h1 className="certifications-title">Certifications & Achievements</h1>
          <p className="certifications-subtitle">
            Professional certifications earned through continuous learning
          </p>
          <div className="stats-row">
            <div className="stat-badge">
              <Award size={24} />
              <span>30+ Certifications</span>
            </div>
            <div className="stat-badge">
              <CheckCircle size={24} />
              <span>6 Professional Certificates</span>
            </div>
          </div>
        </motion.div>

        <div className="certifications-grid">
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              className="certification-card"
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="cert-header" style={{ borderColor: cert.color }}>
                <div className="cert-icon" style={{ background: `${cert.color}15`, color: cert.color }}>
                  <Award size={32} />
                </div>
                <div className="cert-title-section">
                  <h3 className="cert-title">{cert.title}</h3>
                  <p className="cert-issuer">{cert.issuer}</p>
                </div>
              </div>

              <div className="cert-body">
                <p className="cert-description">{cert.description}</p>

                <div className="cert-meta">
                  <div className="meta-item">
                    <Calendar size={16} />
                    <span>{cert.date}</span>
                  </div>
                  {cert.courses && (
                    <div className="meta-item">
                      <CheckCircle size={16} />
                      <span>{cert.courses} Courses Completed</span>
                    </div>
                  )}
                </div>

                {cert.validity && (
                  <div className="validity-badge">
                    Valid until: {cert.validity.split('until ')[1]}
                  </div>
                )}

                {cert.certId && (
                  <div className="cert-id">
                    <strong>Certificate ID:</strong> {cert.certId}
                  </div>
                )}
              </div>

              <div className="cert-footer">
                {cert.verify !== '#' ? (
                  <a
                    href={cert.verify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="verify-btn"
                    style={{ 
                      background: `linear-gradient(135deg, ${cert.color}, ${cert.color}dd)` 
                    }}
                  >
                    <span>Verify Certificate</span>
                    <ExternalLink size={18} />
                  </a>
                ) : (
                  <div className="no-link-badge" style={{ color: cert.color }}>
                    <CheckCircle size={18} />
                    <span>Verified Certificate</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Achievements */}
        <motion.div className="achievements-section" variants={itemVariants}>
          <h2 className="section-title">Additional Achievements</h2>
          <div className="achievements-grid">
            <div className="achievement-card">
              <div className="achievement-number">30+</div>
              <p className="achievement-label">Individual Course Certifications</p>
              <p className="achievement-desc">
                Completed specialized courses in AWS, AI/ML, NLP, Data Analytics, Databases, and Cloud Computing
              </p>
            </div>
            <div className="achievement-card">
              <div className="achievement-number">3</div>
              <p className="achievement-label">Professional Specializations</p>
              <p className="achievement-desc">
                AWS Cloud Solutions Architect, Natural Language Processing, Google Data Analytics
              </p>
            </div>
            <div className="achievement-card">
              <div className="achievement-number">2025</div>
              <p className="achievement-label">Active Learning Year</p>
              <p className="achievement-desc">
                Continuously expanding knowledge in emerging technologies and quantitative finance
              </p>
            </div>
          </div>
        </motion.div>

        {/* Learning Journey */}
        <motion.div className="journey-section" variants={itemVariants}>
          <div className="journey-card">
            <h3 className="journey-title">My Learning Journey</h3>
            <p className="journey-text">
              Each certification represents countless hours of learning, hands-on projects, and pushing beyond 
              comfort zones. From cloud architecture to natural language processing, from data analytics to 
              generative AI—every credential is a stepping stone in my continuous quest to master the intersection 
              of technology and innovation.
            </p>
            <p className="journey-text">
              Currently diving deep into quantitative finance while maintaining expertise across cloud computing, 
              AI/ML, and blockchain technologies. Because why limit yourself to one domain when you can be a 
              polymath? 🚀
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Certifications;