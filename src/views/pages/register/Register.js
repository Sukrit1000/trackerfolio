import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import toast from 'react-hot-toast'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { createUser } from '../../../assets/globalAPI/GlobalApi'
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

const Register = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    repeatPassword: '',
  })

  const handleChange = (e, field) => {
    const { value } = e.target
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCreateUser = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (formData.password !== formData.repeatPassword) {
      toast.error('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const payload = { ...formData }
      const response = await createUser(payload)
      const res = response.data

      if (res.status) {
        toast.success('Account created successfully 🚀')
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
      <CCol xs={12} sm={11} md={10} lg={8} xl={6} className="px-0">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          <CCard className="shadow-lg border-0 rounded-4 w-100">
            <CCardBody className="p-4 p-md-5">
              
              {/* Welcome / Branding */}
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h2 className="fw-bold text-primary mb-2">Welcome to Workfolio</h2>
                <p className="text-muted mb-4">
                  Create your portfolio, track projects, and monitor your growth efficiently.
                </p>
              </motion.div>

              {/* Form */}
              <motion.div variants={fadeInUp} initial="hidden" animate="visible">
                <CForm onSubmit={handleCreateUser}>
                  <CRow>
                    <CCol md={6}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={(e) => handleChange(e, 'firstName')}
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol md={6}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Last Name"
                          value={formData.lastName}
                          onChange={(e) => handleChange(e, 'lastName')}
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol md={6}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>@</CInputGroupText>
                        <CFormInput
                          placeholder="Email"
                          value={formData.email}
                          onChange={(e) => handleChange(e, 'email')}
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol md={6}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Username"
                          value={formData.username}
                          onChange={(e) => handleChange(e, 'username')}
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol md={6}>
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
                    </CCol>
                    <CCol md={6}>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Repeat Password"
                          value={formData.repeatPassword}
                          onChange={(e) => handleChange(e, 'repeatPassword')}
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>

                  <div className="d-grid mb-4">
                    <CButton type="submit" color="primary" size="lg" className="fw-bold">
                      {loading ? 'Creating Account...' : 'Create Account'}
                    </CButton>
                  </div>
                </CForm>
              </motion.div>

              {/* Add Projects Section */}
            

            </CCardBody>
          </CCard>
        </motion.div>
      </CCol>
    </CContainer>
  )
}

export default Register