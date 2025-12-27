import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Brain, Zap, Shield, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import './ProjectDetail.css';

// Pulsing Neural Network Animation
function NeuralNetwork() {
  const groupRef = useRef();
  const nodesCount = 50;
  
  const nodes = useRef([]);
  if (nodes.current.length === 0) {
    for (let i = 0; i < nodesCount; i++) {
      nodes.current.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 10
        ],
        speed: 0.5 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.current.map((node, i) => (
        <mesh key={i} position={node.position}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.6} />
        </mesh>
      ))}
      
      {nodes.current.map((node, i) => {
        if (i < nodesCount - 1) {
          const start = new THREE.Vector3(...node.position);
          const end = new THREE.Vector3(...nodes.current[i + 1].position);
          const mid = start.clone().lerp(end, 0.5);
          
          return (
            <line key={`line-${i}`}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([...node.position, ...nodes.current[i + 1].position])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#3b82f6" transparent opacity={0.2} />
            </line>
          );
        }
        return null;
      })}
    </group>
  );
}

const InnoFeed = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Summaries',
      description: 'Leverages Hugging Face Transformers for intelligent content summarization'
    },
    {
      icon: Zap,
      title: 'Real-Time Feed',
      description: 'Chronologically updated feed with latest research papers and patents'
    },
    {
      icon: Shield,
      title: 'Domain Classification',
      description: 'Advanced NLP-based automatic categorization across technology domains'
    },
    {
      icon: TrendingUp,
      title: 'Unified Discovery',
      description: 'Single platform combining arXiv papers and Google Patents'
    }
  ];

  const techStack = [
    'React', 'FastAPI', 'Python', 'PostgreSQL',
    'Hugging Face', 'Transformers', 'HTTPX', 
    'Supabase', 'arXiv API', 'NLP'
  ];

  const challenges = [
    'Accurate NLP-based domain classification across heterogeneous documents',
    'Generating meaningful summaries while preserving technical context',
    'Handling different APIs, formats, and update cycles reliably',
    'Building a scalable architecture for future features'
  ];

  return (
    <div className="project-detail-container">
      {/* 3D Background */}
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
          <NeuralNetwork />
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
            <div className="project-badge">AI Research Platform</div>
            <h1 className="project-main-title">InnoFeed</h1>
            <p className="project-tagline">
              AI-Powered Research & Patent Feed Platform
            </p>
            
            <div className="project-action-links">
              <a 
                href="https://github.com/MageshCM/Inno-Feed" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-github"
              >
                <Github size={20} />
                <span>View Code</span>
              </a>
              <a 
                href="https://inno-feed.vercel.app/" 
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
                InnoFeed is not just another social platform—it's a <strong>domain-centric knowledge feed platform</strong>, 
                conceptually closer to a personalized research intelligence dashboard. Unlike conventional social media, 
                users consume curated content rather than generate social posts.
              </p>
              <p>
                The platform eliminates the need to search multiple platforms (arXiv, Google Patents, etc.) by automatically 
                classifying content into domains and reducing cognitive load using concise AI summaries. It converts 
                "search-driven research" into a <strong>passive feed-driven experience</strong>.
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
                  <div className="feature-icon">
                    <feature.icon size={24} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Core Functionality */}
          <section className="project-section">
            <h2 className="section-title">Core Functionality</h2>
            <div className="section-card">
              <ul className="feature-list">
                <li>Personalized feed of research papers and patents</li>
                <li>Domain-based filtering (user-selected technology areas)</li>
                <li>AI-generated summaries for each paper or patent</li>
                <li>Direct redirection links to original PDFs (arXiv / patent documents)</li>
                <li>User profile with editable domain preferences</li>
                <li>Chronologically updated feed (latest-first)</li>
                <li>Supabase authentication with email/password accounts</li>
              </ul>
            </div>
          </section>

          {/* Technical Challenges */}
          <section className="project-section">
            <h2 className="section-title">Technical Challenges</h2>
            <div className="challenges-grid">
              {challenges.map((challenge, index) => (
                <motion.div
                  key={index}
                  className="challenge-card"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="challenge-number">{index + 1}</div>
                  <p>{challenge}</p>
                </motion.div>
              ))}
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
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </section>

          {/* What Makes It Unique */}
          <section className="project-section">
            <h2 className="section-title">What Makes It Unique</h2>
            <div className="section-card highlight-card">
              <p>
                The key uniqueness lies in <strong>combining patents + research papers in a single AI-curated feed</strong>, 
                which most existing platforms do not offer together. InnoFeed transforms research discovery from an 
                active search process into a passive, intelligent feed experience—like having a personal research 
                assistant that knows exactly what you need.
              </p>
              <p>
                With its scalable architecture, the platform is designed for future features like alerts, bookmarking, 
                and collaborative research tools, making it a comprehensive solution for researchers, innovators, and 
                technology enthusiasts.
              </p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default InnoFeed;