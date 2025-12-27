import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, FileText, Lock, CheckCircle, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import './ProjectDetail.css';

// Rotating Document Rings Animation
function DocumentRings() {
  const groupRef = useRef();
  const ringsCount = 5;
  
  const rings = useRef([]);
  if (rings.current.length === 0) {
    for (let i = 0; i < ringsCount; i++) {
      rings.current.push({
        radius: 2 + i * 0.8,
        speed: 0.2 + i * 0.1,
        axis: i % 2 === 0 ? 'x' : 'z'
      });
    }
  }

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    rings.current.forEach((ring, i) => {
      const mesh = groupRef.current.children[i];
      if (mesh) {
        if (ring.axis === 'x') {
          mesh.rotation.x = time * ring.speed;
        } else {
          mesh.rotation.z = time * ring.speed;
        }
      }
    });
  });

  return (
    <group ref={groupRef}>
      {rings.current.map((ring, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[ring.radius, 0.05, 16, 100]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#8b5cf6' : '#ec4899'}
            transparent
            opacity={0.6}
            wireframe
          />
        </mesh>
      ))}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
    </group>
  );
}

const TaxChain = () => {
  const features = [
    {
      icon: FileText,
      title: 'Tax Record Management',
      description: 'Immutable storage of tax filing records and compliance status'
    },
    {
      icon: Lock,
      title: 'Secure Verification',
      description: 'Hash-based document verification without exposing sensitive data'
    },
    {
      icon: CheckCircle,
      title: 'Compliance Tracking',
      description: 'Automated compliance status logging and verification'
    },
    {
      icon: Eye,
      title: 'Transparent Audit Trail',
      description: 'Clear, immutable audit trail for all tax transactions'
    }
  ];

  const techStack = [
    'React', 'Solidity', 'Web3.js', 'Ethereum',
    'Smart Contracts', 'MetaMask', 'IPFS',
    'Node.js', 'Express', 'Cryptography'
  ];

  const smartContracts = [
    {
      name: 'Tax Record Registration Contract',
      description: 'Stores hash references of tax records on-chain for verification'
    },
    {
      name: 'Payment Proof Logging Contract',
      description: 'Records payment confirmations with timestamp and transaction hash'
    },
    {
      name: 'Compliance Status Verification Contract',
      description: 'Manages and verifies compliance status across different tax periods'
    }
  ];

  const taxProcesses = [
    'Tax filing reference records',
    'Payment tracking and verification',
    'Document verification using cryptographic hashes',
    'Compliance status logging across periods',
    'Audit trail generation and access control'
  ];

  const userTypes = [
    {
      type: 'Businesses',
      description: 'Primary users managing corporate tax records and compliance',
      color: '#8b5cf6'
    },
    {
      type: 'Individuals',
      description: 'Personal tax filing and payment tracking',
      color: '#ec4899'
    },
    {
      type: 'Tax Authorities',
      description: 'Verification and audit capabilities without data exposure',
      color: '#06b6d4'
    }
  ];

  return (
    <div className="project-detail-container">
      {/* 3D Background */}
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <DocumentRings />
        </Canvas>
      </div>

      {/* Content */}
      <div className="project-detail-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/projects" className="back-link">
            <ArrowLeft size={20} />
            <span>Back to Projects</span>
          </Link>

          <div className="project-header">
            <div className="project-badge" style={{background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', borderColor: 'rgba(139, 92, 246, 0.2)'}}>
              Blockchain Governance
            </div>
            <h1 className="project-main-title">Tax Chain</h1>
            <p className="project-tagline">
              Blockchain-Enabled Tax Management & Verification System
            </p>
            
            <div className="project-action-links">
              <a 
                href="https://github.com/MageshCM/Tax-chain-" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-github"
              >
                <Github size={20} />
                <span>View Code</span>
              </a>
              <a 
                href="https://tax-chain-opal.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-live"
              >
                <ExternalLink size={20} />
                <span>Live Demo</span>
              </a>
            </div>
          </div>

          {/* Overview */}
          <section className="project-section">
            <h2 className="section-title">Overview</h2>
            <div className="section-card">
              <p>
                Tax Chain is a <strong>blockchain-enabled tax management system</strong> that revolutionizes how 
                tax records are stored, verified, and audited. By leveraging blockchain's immutability and 
                transparency, it creates a trustless environment where taxpayers can prove compliance without 
                exposing sensitive financial data.
              </p>
              <p>
                The platform focuses on <strong>traceability and verification</strong> rather than replacing 
                government tax portals. It serves as a complementary layer that provides cryptographic proof 
                of tax activities, enabling seamless audits and reducing disputes between taxpayers and authorities.
              </p>
            </div>
          </section>

          {/* Key Features */}
          <section className="project-section">
            <h2 className="section-title">Key Features</h2>
            <div className="features-grid">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="feature-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="feature-icon" style={{background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6'}}>
                    <feature.icon size={24} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Tax Processes Handled */}
          <section className="project-section">
            <h2 className="section-title">Tax Processes Handled</h2>
            <div className="section-card">
              <ul className="feature-list">
                {taxProcesses.map((process, index) => (
                  <li key={index}>{process}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* Why Blockchain for Tax? */}
          <section className="project-section">
            <h2 className="section-title">Why Blockchain for Tax Management?</h2>
            <div className="features-grid">
              <motion.div
                className="feature-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h3 style={{color: '#8b5cf6', marginBottom: '1rem'}}>🔒 Immutability</h3>
                <p style={{color: '#d1d5db', lineHeight: 1.7}}>
                  Prevents alteration or deletion of tax records, ensuring a permanent audit trail 
                  that cannot be tampered with by any party.
                </p>
              </motion.div>

              <motion.div
                className="feature-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h3 style={{color: '#ec4899', marginBottom: '1rem'}}>👁️ Transparency</h3>
                <p style={{color: '#d1d5db', lineHeight: 1.7}}>
                  Creates a clear audit trail visible to authorized parties while maintaining 
                  privacy through cryptographic hashing.
                </p>
              </motion.div>

              <motion.div
                className="feature-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 style={{color: '#06b6d4', marginBottom: '1rem'}}>🤝 Trust Minimization</h3>
                <p style={{color: '#d1d5db', lineHeight: 1.7}}>
                  Removes the need for intermediaries between taxpayers and authorities, 
                  reducing disputes and verification time.
                </p>
              </motion.div>

              <motion.div
                className="feature-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 style={{color: '#10b981', marginBottom: '1rem'}}>✅ Proof of Compliance</h3>
                <p style={{color: '#d1d5db', lineHeight: 1.7}}>
                  Enables instant verification of compliance status without exposing 
                  sensitive financial information.
                </p>
              </motion.div>
            </div>
          </section>

          {/* User Types */}
          <section className="project-section">
            <h2 className="section-title">User Types & Roles</h2>
            <div className="challenges-grid">
              {userTypes.map((user, index) => (
                <motion.div
                  key={index}
                  className="challenge-card"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="challenge-number" style={{background: user.color}}>
                    {index + 1}
                  </div>
                  <div>
                    <h4 style={{color: '#ffffff', marginBottom: '0.5rem', fontSize: '1.1rem'}}>{user.type}</h4>
                    <p style={{color: '#d1d5db', margin: 0}}>{user.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Smart Contracts */}
          <section className="project-section">
            <h2 className="section-title">Smart Contracts Architecture</h2>
            <div className="challenges-grid">
              {smartContracts.map((contract, index) => (
                <motion.div
                  key={index}
                  className="challenge-card"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="challenge-number" style={{background: 'linear-gradient(135deg, #8b5cf6, #ec4899)'}}>
                    {index + 1}
                  </div>
                  <div>
                    <h4 style={{color: '#ffffff', marginBottom: '0.5rem', fontSize: '1.1rem'}}>{contract.name}</h4>
                    <p style={{color: '#d1d5db', margin: 0}}>{contract.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Technical Implementation */}
          <section className="project-section">
            <h2 className="section-title">Technical Implementation</h2>
            <div className="section-card">
              <h3 style={{color: '#8b5cf6', marginBottom: '1rem'}}>Blockchain Architecture</h3>
              <p style={{color: '#d1d5db', lineHeight: 1.8, marginBottom: '1.5rem'}}>
                Tax Chain uses <strong>Ethereum-compatible smart contracts</strong> to store cryptographic 
                hashes of tax documents rather than the documents themselves. This approach ensures:
              </p>
              <ul className="feature-list">
                <li>Privacy: Actual tax data remains off-chain and encrypted</li>
                <li>Verification: Documents can be verified by comparing hashes</li>
                <li>Efficiency: Minimal on-chain storage reduces gas costs</li>
                <li>Compliance: Meets data protection regulations</li>
              </ul>

              <h3 style={{color: '#ec4899', marginTop: '2rem', marginBottom: '1rem'}}>Special Features</h3>
              <ul className="feature-list">
                <li><strong>Automated Record Storage:</strong> Hash-based document verification system</li>
                <li><strong>Secure Uploads:</strong> Off-chain storage with on-chain hash reference</li>
                <li><strong>Compliance Dashboard:</strong> Real-time compliance status visualization</li>
                <li><strong>Audit Trail Access:</strong> Controlled access for authorized auditors</li>
              </ul>
            </div>
          </section>

          {/* Technical Challenges */}
          <section className="project-section">
            <h2 className="section-title">Technical Challenges Overcome</h2>
            <div className="section-card highlight-card" style={{background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(236, 72, 153, 0.05))', borderColor: 'rgba(139, 92, 246, 0.2)'}}>
              <ul className="feature-list">
                <li>Designing blockchain logic aligned with real-world tax workflows and regulations</li>
                <li>Managing user identity mapping without exposing private financial data</li>
                <li>Integrating blockchain records seamlessly with modern web frontend</li>
                <li>Balancing transparency requirements with privacy protection</li>
                <li>Creating intuitive UX for users with varying blockchain knowledge</li>
              </ul>
            </div>
          </section>

          {/* Tech Stack */}
          <section className="project-section">
            <h2 className="section-title">Technology Stack</h2>
            <div className="tech-stack-grid">
              {techStack.map((tech, index) => (
                <motion.div
                  key={index}
                  className="tech-item"
                  style={{background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', borderColor: 'rgba(139, 92, 246, 0.2)'}}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </section>

          {/* Impact */}
          <section className="project-section">
            <h2 className="section-title">Impact & Vision</h2>
            <div className="section-card highlight-card" style={{background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(236, 72, 153, 0.05))', borderColor: 'rgba(139, 92, 246, 0.2)'}}>
              <p>
                Tax Chain demonstrates how <strong>blockchain can bridge the trust gap</strong> between 
                taxpayers and authorities. By providing immutable proof of compliance while respecting 
                privacy, it reduces audit times, prevents disputes, and creates a more efficient tax ecosystem.
              </p>
              <p>
                The platform's architecture serves as a blueprint for other governance applications where 
                transparency and privacy must coexist. Future developments include integration with 
                automated tax calculation systems, multi-jurisdiction support, and AI-powered compliance checking.
              </p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default TaxChain;