import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Github } from 'lucide-react';
import * as THREE from 'three';
import './Projects.css';

// Grid Network Animation
function GridNetwork() {
  const pointsRef = useRef();
  const linesRef = useRef();
  
  const gridSize = 15;
  const spacing = 2;
  const pointCount = gridSize * gridSize;

  const { positions, connections } = useMemo(() => {
    const pos = [];
    const conn = [];
    
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = (i - gridSize / 2) * spacing;
        const z = (j - gridSize / 2) * spacing;
        pos.push(x, 0, z);
        
        // Connect to neighbors
        if (i < gridSize - 1) {
          const current = i * gridSize + j;
          const next = (i + 1) * gridSize + j;
          conn.push(pos[current * 3], pos[current * 3 + 1], pos[current * 3 + 2]);
          conn.push(pos[next * 3], pos[next * 3 + 1], pos[next * 3 + 2]);
        }
        if (j < gridSize - 1) {
          const current = i * gridSize + j;
          const next = i * gridSize + (j + 1);
          conn.push(pos[current * 3], pos[current * 3 + 1], pos[current * 3 + 2]);
          conn.push(pos[next * 3], pos[next * 3 + 1], pos[next * 3 + 2]);
        }
      }
    }
    
    return { 
      positions: new Float32Array(pos), 
      connections: new Float32Array(conn) 
    };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const posArray = pointsRef.current.geometry.attributes.position.array;
    const lineArray = linesRef.current.geometry.attributes.position.array;
    
    let lineIndex = 0;
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const index = (i * gridSize + j) * 3;
        const x = positions[index];
        const z = positions[index + 2];
        const wave = Math.sin(x * 0.3 + time) * Math.cos(z * 0.3 + time * 0.5) * 1.5;
        posArray[index + 1] = wave;
        
        // Update line positions
        if (i < gridSize - 1) {
          lineArray[lineIndex + 1] = wave;
          const nextIndex = ((i + 1) * gridSize + j) * 3;
          const nextX = positions[nextIndex];
          const nextZ = positions[nextIndex + 2];
          const nextWave = Math.sin(nextX * 0.3 + time) * Math.cos(nextZ * 0.3 + time * 0.5) * 1.5;
          lineArray[lineIndex + 4] = nextWave;
          lineIndex += 6;
        }
        if (j < gridSize - 1) {
          lineArray[lineIndex + 1] = wave;
          const nextIndex = (i * gridSize + (j + 1)) * 3;
          const nextX = positions[nextIndex];
          const nextZ = positions[nextIndex + 2];
          const nextWave = Math.sin(nextX * 0.3 + time) * Math.cos(nextZ * 0.3 + time * 0.5) * 1.5;
          lineArray[lineIndex + 4] = nextWave;
          lineIndex += 6;
        }
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group rotation={[Math.PI / 6, 0, 0]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={pointCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.1} color="#3b82f6" transparent opacity={0.8} />
      </points>
      
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={connections.length / 3}
            array={connections}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#3b82f6" transparent opacity={0.3} />
      </lineSegments>
    </group>
  );
}

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'InnoFeed',
      description: 'A modern social media platform for innovation and creativity sharing with real-time updates.',
      tech: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      github: 'https://github.com/MageshCM/Inno-Feed',
      live: 'https://inno-feed.vercel.app/',
      link: '/projects/innofeed',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      id: 2,
      title: 'Agriculture Traceability',
      description: 'Blockchain-based supply chain tracking system for agricultural products ensuring transparency.',
      tech: ['Solidity', 'Web3.js', 'React', 'Ethereum'],
      github: 'https://github.com/MageshCM/Agriculture-Traceability',
      live: 'https://agriculture-traceability-alpha.vercel.app/',
      link: '/projects/agriculture-traceability',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      id: 3,
      title: 'Tax Chain',
      description: 'Decentralized tax management system leveraging blockchain for secure and transparent transactions.',
      tech: ['Solidity', 'React', 'Web3.js', 'Smart Contracts'],
      github: 'https://github.com/MageshCM/Tax-chain-',
      live: 'https://tax-chain-opal.vercel.app/',
      link: '/projects/tax-chain',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      id: 4,
      title: 'Quants Project',
      description: 'Quantitative finance and algorithmic trading system (Currently in development).',
      tech: ['Python', 'Machine Learning', 'Data Analysis'],
      github: '#',
      live: '#',
      link: '/projects/quants',
      gradient: 'from-orange-500 to-red-500',
      comingSoon: true,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="projects-container">
      {/* 3D Background */}
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 5, 12], fov: 75 }}>
          <GridNetwork />
        </Canvas>
      </div>

      {/* Content */}
      <motion.div
        className="projects-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="projects-header" variants={itemVariants}>
          <h1 className="projects-title">My Projects</h1>
          <p className="projects-subtitle">
            Building solutions that matter, one commit at a time
          </p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="project-card"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className={`project-gradient bg-gradient-to-br ${project.gradient}`} />
              
              {project.comingSoon && (
                <div className="coming-soon-badge">Coming Soon</div>
              )}
              
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-tech">
                  {project.tech.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="project-links">
                  <Link to={project.link} className="btn-project btn-details">
                    View Details
                  </Link>
                  
                  <div className="external-links">
                    {!project.comingSoon && (
                      <>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="icon-link"
                          title="GitHub"
                        >
                          <Github size={20} />
                        </a>
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="icon-link"
                          title="Live Demo"
                        >
                          <ExternalLink size={20} />
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Projects;