import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Code2, Database, Blocks, Cpu, Brain, TrendingUp } from 'lucide-react';
import * as THREE from 'three';
import './Skills.css';

// Orbiting Skill Sphere Component
function SkillSphere({ radius, speed, color, size, orbitRadius }) {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const angle = time * speed;
    meshRef.current.position.x = Math.cos(angle) * orbitRadius;
    meshRef.current.position.z = Math.sin(angle) * orbitRadius;
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.7}
        wireframe
      />
    </mesh>
  );
}

// Rotating Code Symbols
function CodeSymbol({ position, symbol, speed }) {
  const meshRef = useRef();
  const textureCanvas = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#3b82f6';
    ctx.font = 'bold 80px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(symbol, 64, 64);
    return canvas;
  }, [symbol]);

  const texture = useMemo(() => {
    return new THREE.CanvasTexture(textureCanvas);
  }, [textureCanvas]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = time * speed;
    meshRef.current.rotation.x = Math.sin(time * speed * 0.5) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent opacity={0.5} side={THREE.DoubleSide} />
    </mesh>
  );
}

// 3D Scene
function SkillsScene() {
  const spheres = [
    { radius: 0.3, speed: 0.5, color: '#3b82f6', size: 0.3, orbitRadius: 3 },
    { radius: 0.4, speed: 0.7, color: '#8b5cf6', size: 0.35, orbitRadius: 4 },
    { radius: 0.35, speed: 0.6, color: '#ec4899', size: 0.32, orbitRadius: 5 },
    { radius: 0.45, speed: 0.4, color: '#10b981', size: 0.4, orbitRadius: 3.5 },
    { radius: 0.3, speed: 0.8, color: '#f59e0b', size: 0.28, orbitRadius: 4.5 },
  ];

  const codeSymbols = [
    { position: [-3, 2, -3], symbol: '<>', speed: 0.3 },
    { position: [3, -2, -4], symbol: '{}', speed: 0.4 },
    { position: [0, 3, -2], symbol: '[]', speed: 0.35 },
    { position: [-4, -1, -5], symbol: '()', speed: 0.45 },
  ];

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      
      {spheres.map((sphere, index) => (
        <SkillSphere key={index} {...sphere} />
      ))}
      
      {codeSymbols.map((symbol, index) => (
        <CodeSymbol key={index} {...symbol} />
      ))}
    </>
  );
}

const Skills = () => {
  const skillCategories = [
    {
      icon: <Code2 size={32} />,
      title: 'Programming Languages',
      color: '#3b82f6',
      skills: [
        { name: 'Python', level: 85 },
        { name: 'JavaScript', level: 80 },
        { name: 'Java', level: 75 },
        { name: 'Solidity', level: 70 },
      ],
    },
    {
      icon: <Blocks size={32} />,
      title: 'Blockchain & Web3',
      color: '#10b981',
      skills: [
        { name: 'Smart Contracts', level: 75 },
        { name: 'Web3.js', level: 70 },
        { name: 'Ethereum', level: 70 },
        { name: 'DApp Development', level: 65 },
      ],
    },
    {
      icon: <Database size={32} />,
      title: 'Backend & Databases',
      color: '#8b5cf6',
      skills: [
        { name: 'Node.js', level: 80 },
        { name: 'Express.js', level: 78 },
        { name: 'MongoDB', level: 75 },
        { name: 'RESTful APIs', level: 82 },
      ],
    },
    {
      icon: <Cpu size={32} />,
      title: 'Frontend Development',
      color: '#06b6d4',
      skills: [
        { name: 'React', level: 85 },
        { name: 'HTML/CSS', level: 88 },
        { name: 'Tailwind CSS', level: 80 },
        { name: 'Three.js', level: 65 },
      ],
    },
    {
      icon: <Brain size={32} />,
      title: 'Machine Learning & AI',
      color: '#ec4899',
      skills: [
        { name: 'TensorFlow', level: 60 },
        { name: 'Scikit-learn', level: 65 },
        { name: 'NLP', level: 55 },
        { name: 'Data Analysis', level: 70 },
      ],
    },
    {
      icon: <TrendingUp size={32} />,
      title: 'Quantitative Finance',
      color: '#f59e0b',
      skills: [
        { name: 'Statistical Analysis', level: 50 },
        { name: 'Financial Modeling', level: 45 },
        { name: 'Algorithmic Trading', level: 40 },
        { name: 'Risk Management', level: 42 },
      ],
      learning: true,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="skills-container">
      {/* 3D Background */}
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <SkillsScene />
        </Canvas>
      </div>

      {/* Content */}
      <motion.div
        className="skills-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="skills-header" variants={itemVariants}>
          <h1 className="skills-title">Skills & Expertise</h1>
          <p className="skills-subtitle">
            A collection of tools and technologies I've learned to build with
          </p>
        </motion.div>

        <div className="skills-grid">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              className="skill-category-card"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              {category.learning && (
                <div className="learning-badge">Currently Learning</div>
              )}
              
              <div className="category-header">
                <div className="category-icon" style={{ color: category.color }}>
                  {category.icon}
                </div>
                <h2 className="category-title">{category.title}</h2>
              </div>

              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-bar-container">
                      <motion.div
                        className="skill-bar"
                        style={{ 
                          background: `linear-gradient(90deg, ${category.color}, ${category.color}dd)`,
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Tools & Technologies */}
        <motion.div className="tools-section" variants={itemVariants}>
          <h2 className="section-title">Tools & Technologies</h2>
          <div className="tools-grid">
            <div className="tool-badge">Git & GitHub</div>
            <div className="tool-badge">VS Code</div>
            <div className="tool-badge">Vercel</div>
            <div className="tool-badge">AWS</div>
            <div className="tool-badge">Docker</div>
            <div className="tool-badge">Postman</div>
            <div className="tool-badge">Figma</div>
            <div className="tool-badge">Linux</div>
            <div className="tool-badge">Jupyter</div>
            <div className="tool-badge">MetaMask</div>
            <div className="tool-badge">Hardhat</div>
            <div className="tool-badge">Remix IDE</div>
          </div>
        </motion.div>

        {/* Learning Philosophy */}
        <motion.div className="philosophy-section" variants={itemVariants}>
          <div className="philosophy-card">
            <h3 className="philosophy-title">My Learning Philosophy</h3>
            <p className="philosophy-text">
              I believe in learning by building. Every project is an opportunity to push boundaries, 
              every bug is a lesson in disguise, and every technology mastered is a stepping stone to the next challenge. 
              The percentages above aren't just numbers—they represent hours of debugging, countless "aha!" moments, 
              and the continuous journey of becoming a better developer.
            </p>
            <p className="philosophy-text">
              Currently expanding into quantitative finance because why limit yourself to just one complex field 
              when you can juggle multiple? 😄
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Skills;