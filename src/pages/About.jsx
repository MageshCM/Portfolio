import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import './About.css';

// Floating Geometric Shape Component
function FloatingShape({ position, geometry, color, speed }) {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * speed * 0.5;
    meshRef.current.rotation.y = time * speed * 0.3;
    meshRef.current.position.y = position[1] + Math.sin(time * speed) * 0.5;
  });

  return (
    <mesh ref={meshRef} position={position}>
      {geometry === 'box' && <boxGeometry args={[1, 1, 1]} />}
      {geometry === 'sphere' && <sphereGeometry args={[0.5, 32, 32]} />}
      {geometry === 'torus' && <torusGeometry args={[0.5, 0.2, 16, 100]} />}
      {geometry === 'octahedron' && <octahedronGeometry args={[0.6]} />}
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.6}
        wireframe
      />
    </mesh>
  );
}

// 3D Scene with multiple floating shapes
function FloatingShapes() {
  const shapes = [
    { position: [-4, 2, -2], geometry: 'box', color: '#3b82f6', speed: 0.5 },
    { position: [4, -1, -3], geometry: 'sphere', color: '#8b5cf6', speed: 0.7 },
    { position: [-3, -2, -1], geometry: 'torus', color: '#ec4899', speed: 0.6 },
    { position: [3, 2, -4], geometry: 'octahedron', color: '#06b6d4', speed: 0.8 },
    { position: [0, 3, -2], geometry: 'box', color: '#10b981', speed: 0.4 },
    { position: [-5, 0, -5], geometry: 'sphere', color: '#f59e0b', speed: 0.5 },
  ];

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      {shapes.map((shape, index) => (
        <FloatingShape key={index} {...shape} />
      ))}
    </>
  );
}

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="about-container">
      {/* 3D Background */}
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
          <FloatingShapes />
        </Canvas>
      </div>

      {/* Content */}
      <motion.div
        className="about-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="about-title" variants={itemVariants}>
          About Me
        </motion.h1>

        <motion.div className="about-grid" variants={itemVariants}>
          {/* Bio Section */}
          <div className="about-card">
            <h2>The Human Behind the Code</h2>
            <p>
              Hey there! I'm Magesh C M, a third-year IT student at Saveetha Engineering College, 
              navigating the beautiful chaos of ones and zeros. By day, I'm deciphering algorithms 
              and database schemas. By night, I'm either debugging code that worked yesterday or 
              contemplating why I chose curly braces over sleep.
            </p>
            <p>
              I believe in writing code that's cleaner than my room (which isn't saying much), 
              learning from every stackoverflow thread, and occasionally pretending I understand 
              blockchain on the first try. Spoiler: I don't. But that's the fun part.
            </p>
            <p>
              When I'm not arguing with my IDE, you'll find me exploring the fascinating world of 
              quantitative finance, building blockchain solutions that make sense (sometimes), and 
              contributing to the universal developer pastime of turning coffee into features.
            </p>
          </div>

          {/* Experience & Education */}
          <div className="about-card">
            <h2>Journey So Far</h2>
            <div className="timeline-item">
              <h3>🎓 Education</h3>
              <p className="timeline-title">B.Tech in Information Technology</p>
              <p className="timeline-org">Saveetha Engineering College</p>
              <p className="timeline-date">2023 - Present (3rd Year)</p>
            </div>

            <div className="timeline-item">
              <h3>💼 Professional Experience</h3>
              <p className="timeline-desc">
                Building practical solutions through academic and personal projects. 
                Focused on blockchain technology, AI/ML applications, and full-stack development. 
                Currently expanding into quantitative finance and algorithmic trading.
              </p>
            </div>

            <div className="timeline-item">
              <h3>🚀 Key Achievements</h3>
              <ul className="achievements-list">
                <li>Completed 30+ professional certifications in AI, Cloud, and Data Analytics</li>
                <li>Built 4 production-ready blockchain and web applications</li>
                <li>AWS Cloud Solutions Architect Professional Certificate</li>
                <li>Natural Language Processing Specialization (DeepLearning.AI)</li>
                <li>Google Data Analytics Professional Certificate</li>
              </ul>
            </div>
          </div>

          {/* Philosophy */}
          <div className="about-card philosophy-card">
            <h2>My Philosophy</h2>
            <blockquote>
              "Life is a Git repository. Sometimes you commit mistakes, sometimes you push boundaries, 
              but you always keep merging forward. And yes, there's always that one conflict you 
              didn't see coming."
            </blockquote>
            <p>
              I approach problems with curiosity, tackle challenges with resilience, and celebrate 
              small victories (like code that runs on the first try). I'm a firm believer that the 
              best way to learn is to build, break, fix, and repeat—preferably with good documentation 
              this time.
            </p>
          </div>

          {/* Fun Facts */}
          <div className="about-card fun-facts">
            <h2>Random Bits About Me</h2>
            <ul>
              <li>🐛 I've written more bugs than features, but we don't talk about that</li>
              <li>☕ Coffee isn't a beverage; it's a lifestyle choice</li>
              <li>📚 Currently learning quants because why not add math to the mix</li>
              <li>🎯 Firm believer in "it works on my machine" syndrome</li>
              <li>🌙 Night owl who thinks best when the world is debugging their sleep</li>
              <li>💭 Philosophical about semicolons but practical about deadlines</li>
            </ul>
          </div>
        </motion.div>

        {/* Contact Info Quick */}
        <motion.div className="contact-quick" variants={itemVariants}>
          
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
