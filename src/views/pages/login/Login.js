import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import toast from 'react-hot-toast'
import { loginUser } from '../../../assets/globalAPI/GlobalApi'
import { motion } from 'framer-motion'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
}

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
}

const Login = () => {
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate()
  const [formData, setFormData] = React.useState({ email: '', password: '' })

  useEffect(() => {
    const token = localStorage.getItem('userToken')
    if (token) navigate('/dashboard')
  }, [navigate])

  const handleChange = (e, field) => {
    const { value } = e.target
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields')
      setLoading(false)
      return
    }

    try {
      const response = await loginUser({ ...formData })
      const res = response.data

      if (res.status) {
        localStorage.setItem('userToken', res.token)
        localStorage.setItem('userdetails', JSON.stringify(res.user))
        toast.success('Login Successful 🚀')
        navigate('/dashboard')
      } else {
        toast.error(res.message || 'Something went wrong')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Server error')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <CContainer fluid className="min-vh-100 d-flex justify-content-center align-items-center px-3" style={{ background: '#f8f9fa' }}>
      <CCol xs={12} md={10} lg={9} className="px-0">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          <CCardGroup className="shadow-lg rounded-4 overflow-hidden flex-column flex-md-row">

            {/* LEFT: LOGIN FORM */}
            <CCard className="p-4 p-md-5 border-0 flex-fill">
              <CCardBody>
                <motion.div variants={fadeInUp} initial="hidden" animate="visible">
                  <h2 className="fw-bold text-primary mb-1">Welcome Back</h2>
                  <p className="text-muted mb-4">Sign in to continue building your work</p>
                </motion.div>

                <motion.div variants={slideInLeft} initial="hidden" animate="visible">
                  <CForm onSubmit={handleLogin}>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email or Username"
                        value={formData.email}
                        onChange={(e) => handleChange(e, 'email')}
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => handleChange(e, 'password')}
                      />
                    </CInputGroup>

                    <CRow className="align-items-center">
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4 w-100 fw-bold">
                          {loading ? 'Logging in...' : 'Login'}
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-end">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </motion.div>
              </CCardBody>
            </CCard>

            {/* RIGHT: SIGNUP CTA */}
            <CCard
              className="text-white d-flex align-items-center justify-content-center border-0 w-100"
              style={{ background: 'linear-gradient(135deg, #4f46e5, #6366f1)' }}
            >
              <CCardBody className="text-center px-4 py-5">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                  <h2 className="fw-bold mb-3">Create Account</h2>
                  <p style={{ opacity: 0.85 }}>
                    Join Workfolio and start building your own portfolio with a clean workflow.
                  </p>
                  <Link to="/register">
                    <CButton color="light" className="mt-3 fw-bold px-4">
                      Get Started
                    </CButton>
                  </Link>
                </motion.div>
              </CCardBody>
            </CCard>

          </CCardGroup>
        </motion.div>
      </CCol>
    </CContainer>
  )
}

export default Login