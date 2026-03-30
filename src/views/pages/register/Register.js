import React, { useState } from "react";
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
} from "@coreui/react";
import toast from "react-hot-toast";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser, cilBuilding } from "@coreui/icons";
import { createUser } from "../../../assets/globalAPI/GlobalApi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    accountType: "INDIVIDUAL",
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
    organizationName: "",
  });
  const navigate = useNavigate();

  const handleChange = (e, field) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.repeatPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const payload = { ...formData };
      const res = (await createUser(payload)).data;

      if (res.status) {
        toast.success("Account created 🚀");
        setTimeout(() => {
          navigate("/login");
        }
        , 1500);
        
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CContainer
      fluid
      className="min-vh-100 d-flex justify-content-center align-items-center px-3"
      style={{ background: "#f4f6f9" }}
    >
      <CCol xs={12} sm={11} md={10} lg={8} xl={6}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <CCard className="shadow-lg border-0 rounded-4">
            <CCardBody className="p-4 p-md-5">

              {/* HEADER */}
              <div className="mb-4">
                <h3 className="fw-bold text-primary mb-1">
                  Create your account
                </h3>
                <p className="text-muted">
                  Start tracking your growth like a pro 🚀
                </p>
              </div>

              {/* ACCOUNT TYPE */}
              <div className="mb-4">
                <label className="mb-2 fw-semibold">I am a:</label>

                <div className="d-flex gap-3 flex-wrap">
                  <CButton
                    color={
                      formData.accountType === "INDIVIDUAL"
                        ? "primary"
                        : "light"
                    }
                    onClick={() =>
                      setFormData((p) => ({
                        ...p,
                        accountType: "INDIVIDUAL",
                      }))
                    }
                  >
                    👤 Individual
                  </CButton>

                  <CButton
                    color={
                      formData.accountType === "ORGANIZATION"
                        ? "primary"
                        : "light"
                    }
                    onClick={() =>
                      setFormData((p) => ({
                        ...p,
                        accountType: "ORGANIZATION",
                      }))
                    }
                  >
                    🏢 Organization
                  </CButton>
                </div>
              </div>

              {/* FORM */}
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
                        onChange={(e) => handleChange(e, "firstName")}
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
                        onChange={(e) => handleChange(e, "lastName")}
                      />
                    </CInputGroup>
                  </CCol>
                </CRow>

                <CInputGroup className="mb-3">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => handleChange(e, "email")}
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilUser} />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => handleChange(e, "username")}
                  />
                </CInputGroup>

                {/* ORG FIELD (conditional) */}
                {formData.accountType === "ORGANIZATION" && (
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilBuilding} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Organization Name"
                      value={formData.organizationName}
                      onChange={(e) =>
                        handleChange(e, "organizationName")
                      }
                    />
                  </CInputGroup>
                )}

                <CRow>
                  <CCol md={6}>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => handleChange(e, "password")}
                      />
                    </CInputGroup>
                  </CCol>

                  <CCol md={6}>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Repeat Password"
                        value={formData.repeatPassword}
                        onChange={(e) =>
                          handleChange(e, "repeatPassword")
                        }
                      />
                    </CInputGroup>
                  </CCol>
                </CRow>

                <div className="d-grid mt-3">
                  <CButton type="submit" color="primary" size="lg">
                    {loading ? "Creating..." : "Create Account"}
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </motion.div>
      </CCol>
    </CContainer>
  );
};

export default Register;