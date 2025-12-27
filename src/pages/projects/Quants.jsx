import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { TrendingUp, Brain, BarChart3, Calculator } from 'lucide-react';
import * as THREE from 'three';
import './ProjectDetail.css';

// Floating Mathematical Symbols Component
function MathSymbol({ position, symbol, speed }) {
  const meshRef = useRef();
  const textureCanvas = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#3b82f6';
    ctx.font = 'bold 120px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(symbol, 128, 128);
    return canvas;
  }, [symbol]);

  const texture = useMemo(() => {
    return new THREE.CanvasTexture(textureCanvas);
  }, [textureCanvas]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = time * speed * 0.5;
    meshRef.current.position.y = position[1] + Math.sin(time * speed) * 0.5;
    meshRef.current.position.x = position[0] + Math.cos(time * speed * 0.3) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[1.5, 1.5]} />
      <meshBasicMaterial map={texture} transparent opacity={0.6} side={THREE.DoubleSide} />
    </mesh>
  );
}

// Financial Chart Bars Component
function ChartBars() {
  const groupRef = useRef();
  const barCount = 12;

  const bars = useMemo(() => {
    return Array.from({ length: barCount }, (_, i) => ({
      height: Math.random() * 2 + 0.5,
      position: [(i - barCount / 2) * 0.8, 0, -5],
      color: i % 2 === 0 ? '#3b82f6' : '#8b5cf6',
    }));
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.3;
  });

  return (
    <group ref={groupRef}>
      {bars.map((bar, index) => (
        <mesh key={index} position={bar.position}>
          <boxGeometry args={[0.5, bar.height, 0.5]} />
          <meshStandardMaterial color={bar.color} transparent opacity={0.7} wireframe />
        </mesh>
      ))}
    </group>
  );
}

// 3D Scene
function QuantsScene() {
  const symbols = [
    { position: [-4, 2, -2], symbol: 'Σ', speed: 0.4 },
    { position: [4, -1, -3], symbol: 'π', speed: 0.5 },
    { position: [-3, -2, -1], symbol: '∫', speed: 0.6 },
    { position: [3, 3, -4], symbol: 'μ', speed: 0.45 },
    { position: [0, 2, -2], symbol: 'σ', speed: 0.55 },
    { position: [-5, 0, -5], symbol: 'λ', speed: 0.5 },
    { position: [5, 1, -3], symbol: 'Δ', speed: 0.4 },
  ];

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <ChartBars />
      {symbols.map((symbol, index) => (
        <MathSymbol key={index} {...symbol} />
      ))}
    </>
  );
}

const Quants = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const learningTopics = [
    {
      icon: <TrendingUp size={32} />,
      title: 'Quantitative Analysis',
      description: 'Statistical methods, probability theory, and mathematical modeling for financial markets.',
    },
    {
      icon: <Brain size={32} />,
      title: 'Machine Learning',
      description: 'Applying ML algorithms for pattern recognition, prediction models, and automated trading strategies.',
    },
    {
      icon: <BarChart3 size={32} />,
      title: 'Financial Engineering',
      description: 'Derivatives pricing, risk management, and portfolio optimization techniques.',
    },
    {
      icon: <Calculator size={32} />,
      title: 'Algorithmic Trading',
      description: 'Developing and backtesting trading algorithms, market microstructure, and execution strategies.',
    },
  ];

  return (
    <div className="project-detail-container">
      {/* 3D Background */}
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <QuantsScene />
        </Canvas>
      </div>

      {/* Content */}
      <motion.div
        className="project-detail-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Coming Soon Badge */}
        <motion.div 
          className="coming-soon-hero"
          variants={itemVariants}
        >
          <div className="coming-soon-badge-large">Coming Soon</div>
        </motion.div>

        {/* Header */}
        <motion.div className="project-header" variants={itemVariants}>
          <h1 className="project-detail-title" style={{ background: 'linear-gradient(135deg, #f97316, #ef4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Quantitative Finance Project
          </h1>
          <p className="project-tagline">
            Exploring the intersection of mathematics, statistics, and financial markets
          </p>
        </motion.div>

        {/* Overview */}
        <motion.div className="section" variants={itemVariants}>
          <h2 className="section-title">Project Vision</h2>
          <p className="section-text">
            This project is currently under development as I dive deep into the fascinating world of quantitative finance. 
            The goal is to build a comprehensive platform that combines mathematical modeling, machine learning, and 
            algorithmic trading strategies to analyze and predict market behaviors.
          </p>
          <p className="section-text">
            As someone transitioning from software development and blockchain to the quants domain, I'm taking a 
            methodical approach to learning the foundations—from probability theory and statistical analysis to 
            advanced derivatives pricing and risk management techniques.
          </p>
        </motion.div>

        {/* Current Learning Path */}
        <motion.div className="section" variants={itemVariants}>
          <h2 className="section-title">Current Learning Focus</h2>
          <div className="features-grid">
            {learningTopics.map((topic, index) => (
              <div key={index} className="feature-card" style={{ borderColor: 'rgba(249, 115, 22, 0.3)' }}>
                <div className="feature-icon" style={{ color: '#f97316' }}>
                  {topic.icon}
                </div>
                <h3 className="feature-title">{topic.title}</h3>
                <p className="feature-description">{topic.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Planned Features */}
        <motion.div className="section" variants={itemVariants}>
          <h2 className="section-title">Planned Features</h2>
          <div className="challenges-list">
            <div className="challenge-item" style={{ borderLeftColor: '#f97316' }}>
              <h3>Real-time Market Data Analysis</h3>
              <p>Integration with financial APIs to fetch and analyze live market data, historical trends, and volatility patterns.</p>
            </div>
            <div className="challenge-item" style={{ borderLeftColor: '#f97316' }}>
              <h3>Backtesting Framework</h3>
              <p>Build a robust backtesting engine to test trading strategies against historical data with performance metrics.</p>
            </div>
            <div className="challenge-item" style={{ borderLeftColor: '#f97316' }}>
              <h3>Portfolio Optimization</h3>
              <p>Implement modern portfolio theory, mean-variance optimization, and risk-adjusted return calculations.</p>
            </div>
            <div className="challenge-item" style={{ borderLeftColor: '#f97316' }}>
              <h3>ML-Powered Predictions</h3>
              <p>Apply machine learning models (LSTM, Random Forest, XGBoost) for price prediction and sentiment analysis.</p>
            </div>
            <div className="challenge-item" style={{ borderLeftColor: '#f97316' }}>
              <h3>Risk Management System</h3>
              <p>Calculate VaR (Value at Risk), expected shortfall, and implement position sizing strategies.</p>
            </div>
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div className="section" variants={itemVariants}>
          <h2 className="section-title">Planned Technology Stack</h2>
          <div className="tech-stack">
            <span className="tech-badge" style={{ background: 'rgba(249, 115, 22, 0.1)', color: '#f97316', borderColor: 'rgba(249, 115, 22, 0.3)' }}>Python</span>
            <span className="tech-badge" style={{ background: 'rgba(249, 115, 22, 0.1)', color: '#f97316', borderColor: 'rgba(249, 115, 22, 0.3)' }}>Pandas</span>
            <span className="tech-badge" style={{ background: 'rgba(249, 115, 22, 0.1)', color: '#f97316', borderColor: 'rgba(249, 115, 22, 0.3)' }}>NumPy</span>
            <span className="tech-badge" style={{ background: 'rgba(249, 115, 22, 0.1)', color: '#f97316', borderColor: 'rgba(249, 115, 22, 0.3)' }}>Scikit-learn</span>
            <span className="tech-badge" style={{ background: 'rgba(249, 115, 22, 0.1)', color: '#f97316', borderColor: 'rgba(249, 115, 22, 0.3)' }}>TensorFlow</span>
            <span className="tech-badge" style={{ background: 'rgba(249, 115, 22, 0.1)', color: '#f97316', borderColor: 'rgba(249, 115, 22, 0.3)' }}>PyTorch</span>
            <span className="tech-badge" style={{ background: 'rgba(249, 115, 22, 0.1)', color: '#f97316', borderColor: 'rgba(249, 115, 22, 0.3)' }}>QuantLib</span>
            <span className="tech-badge" style={{ background: 'rgba(249, 115, 22, 0.1)', color: '#f97316', borderColor: 'rgba(249, 115, 22, 0.3)' }}>Zipline</span>
            <span className="tech-badge" style={{ background: 'rgba(249, 115, 22, 0.1)', color: '#f97316', borderColor: 'rgba(249, 115, 22, 0.3)' }}>Alpha Vantage API</span>
            <span className="tech-badge" style={{ background: 'rgba(249, 115, 22, 0.1)', color: '#f97316', borderColor: 'rgba(249, 115, 22, 0.3)' }}>React</span>
            <span className="tech-badge" style={{ background: 'rgba(249, 115, 22, 0.1)', color: '#f97316', borderColor: 'rgba(249, 115, 22, 0.3)' }}>D3.js</span>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div className="section" variants={itemVariants}>
          <h2 className="section-title">Development Timeline</h2>
          <div className="info-card" style={{ background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(239, 68, 68, 0.1))' }}>
            <p className="section-text">
              <strong>Current Phase:</strong> Foundation Learning (Q1 2025)<br />
              Building strong mathematical and statistical foundations, understanding market mechanics, 
              and exploring existing quantitative frameworks.
            </p>
            <p className="section-text">
              <strong>Next Phase:</strong> Prototype Development (Q2 2025)<br />
              Start building core modules, implement basic backtesting, and create visualization dashboards.
            </p>
            <p className="section-text">
              <strong>Future Phase:</strong> Advanced Features (Q3-Q4 2025)<br />
              Integrate ML models, refine strategies, add real-time capabilities, and comprehensive testing.
            </p>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div className="section text-center" variants={itemVariants}>
          <div className="coming-soon-cta">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#f97316' }}>
              Stay Tuned!
            </h3>
            <p style={{ color: '#d1d5db', marginBottom: '1.5rem' }}>
              This project is being built with patience, curiosity, and lots of coffee. ☕<br />
              Follow my progress on GitHub or check back here for updates!
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Quants;