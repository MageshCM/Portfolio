import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Package, Users, Shield, History } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import './ProjectDetail.css';

// Blockchain Cubes Animation
function BlockchainCubes() {
  const groupRef = useRef();
  const cubesCount = 12;
  
  const cubes = useRef([]);
  if (cubes.current.length === 0) {
    for (let i = 0; i < cubesCount; i++) {
      cubes.current.push({
        position: [
          (i % 4 - 1.5) * 3,
          Math.floor(i / 4) * 3 - 3,
          -5
        ],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ],
        speed: 0.3 + Math.random() * 0.3
      });
    }
  }

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    cubes.current.forEach((cube, i) => {
      const mesh = groupRef.current.children[i];
      if (mesh) {
        mesh.rotation.x = cube.rotation[0] + time * cube.speed * 0.5;
        mesh.rotation.y = cube.rotation[1] + time * cube.speed * 0.3;
        mesh.position.y = cube.position[1] + Math.sin(time * cube.speed + i) * 0.3;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {cubes.current.map((cube, i) => (
        <mesh key={i} position={cube.position}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial
            color="#10b981"
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

const AgricultureTraceability = () => {
  const features = [
    {
      icon: Package,
      title: 'Product Journey Tracking',
      description: 'Complete farm-to-consumer traceability with immutable records'
    },
    {
      icon: Users,
      title: 'Multi-Stakeholder Platform',
      description: 'Seamless experience for farmers, distributors, and consumers'
    },
    {
      icon: Shield,
      title: 'Tamper-Proof Verification',
      description: 'Blockchain-backed authenticity without centralized authority'
    },
    {
      icon: History,
      title: 'Transparent History',
      description: 'QR code scanning for instant product lifecycle timeline'
    }
  ];

  const techStack = [
    'React', 'Solidity', 'Web3.js', 'Ethereum',
    'Smart Contracts', 'MetaMask', 'Polygon',
    'IPFS', 'Node.js', 'Express'
  ];

  const smartContracts = [
    {
      name: 'Product Registration Contract',
      description: 'Handles initial product registration by farmers with origin details'
    },
    {
      name: 'Ownership Transfer Contract',
      description: 'Manages secure transfer of ownership across supply chain'
    },
    {
      name: 'Product Verification Contract',
      description: 'Enables consumers to verify product authenticity and history'
    },
    {
      name: 'History Retrieval Logic',
      description: 'Read-only functions for transparent product lifecycle access'
    }
  ];

  const userRoles = [
    {
      role: 'Farmers',
      actions: ['Register products', 'Add origin details', 'Initialize supply chain']
    },
    {
      role: 'Distributors/Suppliers',
      actions: ['Update ownership', 'Track logistics', 'Add quality checks']
    },
    {
      role: 'Consumers',
      actions: ['Verify authenticity', 'View complete history', 'Scan QR codes']
    },
    {
      role: 'Regulators/Auditors',
      actions: ['Monitor compliance', 'Access audit trails', 'Verify certifications']
    }
  ];

  return (
    <div className="project-detail-container">
      {/* 3D Background */}
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 12], fov: 75 }}>
          <BlockchainCubes />
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
            <div className="project-badge" style={{background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.2)'}}>
              Blockchain Solution
            </div>
            <h1 className="project-main-title">Agriculture Traceability</h1>
            <p className="project-tagline">
              Blockchain-Based Supply Chain Tracking for Agricultural Products
            </p>
            
            <div className="project-action-links">
              <a 
                href="https://github.com/MageshCM/Agriculture-Traceability" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-github"
              >
                <Github size={20} />
                <span>View Code</span>
              </a>
              <a 
                href="https://agriculture-traceability-alpha.vercel.app/" 
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
                Agriculture Traceability is a <strong>blockchain-based platform</strong> that brings transparency 
                and trust to the agricultural supply chain. By leveraging Ethereum-compatible smart contracts, 
                it creates an immutable record of every product's journey from farm to consumer.
              </p>
              <p>
                The platform eliminates information asymmetry in the supply chain, allowing consumers to verify 
                the authenticity of products, farmers to prove their product quality, and distributors to maintain 
                transparent logistics records—all without relying on a centralized authority.
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
                  <div className="feature-icon" style={{background: 'rgba(16, 185, 129, 0.1)', color: '#10b981'}}>
                    <feature.icon size={24} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* What It Tracks */}
          <section className="project-section">
            <h2 className="section-title">What It Tracks</h2>
            <div className="section-card">
              <ul className="feature-list">
                <li>Complete farm-to-consumer product journey</li>
                <li>Product origin details and certifications</li>
                <li>Ownership transfers across supply chain</li>
                <li>Quality checks and compliance records</li>
                <li>Immutable transaction history on blockchain</li>
                <li>Timestamp verification for all transactions</li>
              </ul>
            </div>
          </section>

          {/* User Roles */}
          <section className="project-section">
            <h2 className="section-title">User Roles & Actions</h2>
            <div className="features-grid">
              {userRoles.map((user, index) => (
                <motion.div
                  key={index}
                  className="feature-card"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 style={{color: '#10b981', marginBottom: '1rem'}}>{user.role}</h3>
                  <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
                    {user.actions.map((action, i) => (
                      <li key={i} style={{color: '#d1d5db', padding: '0.5rem 0', paddingLeft: '1.5rem', position: 'relative'}}>
                        <span style={{position: 'absolute', left: 0, color: '#10b981'}}>→</span>
                        {action}
                      </li>
                    ))}
                  </ul>
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
                  <div className="challenge-number" style={{background: 'linear-gradient(135deg, #10b981, #059669)'}}>
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

          {/* Blockchain Implementation */}
          <section className="project-section">
            <h2 className="section-title">Blockchain Implementation</h2>
            <div className="section-card">
              <h3 style={{color: '#10b981', marginBottom: '1rem'}}>Why Blockchain?</h3>
              <ul className="feature-list">
                <li><strong>Immutability:</strong> Prevents alteration of supply chain records</li>
                <li><strong>Transparency:</strong> All stakeholders have access to verified data</li>
                <li><strong>Trust Minimization:</strong> No need for centralized intermediary</li>
                <li><strong>Proof of Provenance:</strong> Cryptographic verification of product origin</li>
              </ul>
              
              <h3 style={{color: '#10b981', marginTop: '2rem', marginBottom: '1rem'}}>Technical Details</h3>
              <p style={{color: '#d1d5db', lineHeight: 1.8}}>
                Deployed on <strong>Ethereum-compatible blockchain</strong>, typically using local testnets or 
                Polygon-style networks for cost efficiency and faster transactions. The platform balances on-chain 
                immutability with off-chain data storage, ensuring both security and scalability.
              </p>
            </div>
          </section>

          {/* Technical Challenges */}
          <section className="project-section">
            <h2 className="section-title">Technical Challenges Overcome</h2>
            <div className="section-card highlight-card" style={{background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(5, 150, 105, 0.05))', borderColor: 'rgba(16, 185, 129, 0.2)'}}>
              <ul className="feature-list">
                <li>Balancing on-chain immutability with off-chain data storage requirements</li>
                <li>Designing smart contracts that are both secure and cost-efficient</li>
                <li>Integrating blockchain transactions smoothly with the web UI</li>
                <li>Managing gas optimization for frequent supply chain updates</li>
                <li>Creating intuitive UX for users unfamiliar with blockchain technology</li>
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
                  style={{background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.2)'}}
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
            <h2 className="section-title">Impact & Future Scope</h2>
            <div className="section-card highlight-card" style={{background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(5, 150, 105, 0.05))', borderColor: 'rgba(16, 185, 129, 0.2)'}}>
              <p>
                This platform demonstrates how <strong>blockchain technology can solve real-world trust issues</strong> 
                in agriculture and supply chain management. By providing tamper-proof verification and transparent 
                history, it empowers consumers to make informed decisions while protecting farmers and distributors 
                from fraud.
              </p>
              <p>
                Future enhancements include integration with IoT sensors for automated quality tracking, 
                multi-chain support for broader adoption, and AI-powered analytics for supply chain optimization.
              </p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default AgricultureTraceability;