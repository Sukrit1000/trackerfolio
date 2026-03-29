import React, { useEffect } from 'react'
import { CButton, CContainer, CRow, CCol } from '@coreui/react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
}

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
}

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
}

const LandingPage = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('userToken')
        if (token) navigate('/dashboard')
    }, [navigate])

  return (
    <CContainer className="py-5">
      {/* Hero Section */}
      <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center mb-5">
        <h1 className="display-4 fw-bold">
          Welcome to <span style={{ color: '#4facfe' }}>Workfolio</span>
        </h1>
        <p className="lead text-muted">
          Track your projects, organizations, and team growth — all in one sleek interface.
        </p>
        <CButton color="primary" size="lg" onClick={()=>navigate("/register")}>
          Get Started
        </CButton>
      </motion.div>

      {/* Feature Cards */}
      <CRow className="mb-5">
        {[
          { title: 'Projects', desc: 'Monitor and manage all your projects easily.', color: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
          { title: 'Organizations', desc: 'Track company growth and team performance.', color: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
          { title: 'Tech Usage', desc: 'Analyze which technologies are used most.', color: 'linear-gradient(135deg, #667eea, #764ba2)' },
          { title: 'Activity Timeline', desc: 'See all recent activity at a glance.', color: 'linear-gradient(135deg, #fa709a, #fee140)' },
        ].map((item, index) => (
          <CCol md={6} lg={3} key={index} className="mb-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 6px 18px rgba(0,0,0,0.2)',
                  background: item.color,
                  color: 'white',
                  minHeight: '180px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  padding: '20px',
                  textAlign: 'center',
                }}
              >
                <h5>{item.title}</h5>
                <p style={{ opacity: 0.9, fontSize: '0.9rem' }}>{item.desc}</p>
              </div>
            </motion.div>
          </CCol>
        ))}
      </CRow>

      {/* Add Projects Section */}
      <CRow className="align-items-center mb-5">
        <CCol md={6}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInLeft}>
            <h2>Add Projects</h2>
            <p className="text-muted">
              Create projects and associate them with organizations to track your work efficiently. Stay organized, stay ahead.
            </p>
            <CButton color="primary" onClick={()=>navigate("/login")}>
              Create Project
            </CButton>
          </motion.div>
        </CCol>
        <CCol md={6}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInRight}>
            {/* Replace with actual illustration */}
            <motion.img
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with your chosen SVG/PNG
    alt="Add Projects Illustration"
    style={{ width: '100%', borderRadius: '16px', maxHeight: '300px', objectFit: 'cover' }}
  />
          </motion.div>
        </CCol>
      </CRow>

      {/* Track Growth Section */}
      <CRow className="align-items-center mb-5 flex-md-row-reverse">
        <CCol md={6}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInRight}>
            <h2>Track Your Growth</h2>
            <p className="text-muted">
              Monitor your progress within your organization with timeline and tech usage insights. See how you improve over time and level up your skills.
            </p>
            <CButton color="primary" onClick={()=>navigate("/login")}>View Insights</CButton>
          </motion.div>
        </CCol>
        <CCol md={6}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInLeft}>
            {/* Replace with actual illustration */}
            <motion.img
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    src="https://plus.unsplash.com/premium_photo-1661266819853-ac00dcaf21d2?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with your chosen SVG/PNG
    alt="Add Projects Illustration"
    style={{ width: '100%', borderRadius: '16px', maxHeight: '300px', objectFit: 'cover' }}
  />
          </motion.div>
        </CCol>
      </CRow>

      {/* Login CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mt-5"
      >
        <h2>Already a member?</h2>
        <p className="text-muted">Log in to access your dashboard and start managing your projects.</p>
        <CButton color="primary" size="lg" onClick={()=>navigate("/login")}>
          Log In
        </CButton>
      </motion.div>
    </CContainer>
  )
}

export default LandingPage