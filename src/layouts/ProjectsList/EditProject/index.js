import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CForm,
  CFormInput,
  CFormTextarea,
} from "@coreui/react";
import { Form,Select } from "antd";
import axios from "axios";

// import { set } from "core-js/core/dict";
import toast from "react-hot-toast";
import { motion } from "framer-motion"; 
import { createMyProject, getAllOrganizations, updateMyProject } from "../../../assets/globalAPI/GlobalApi";

const EditProject = () => {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(false);

  const { state } = useLocation();
  const [form] = Form.useForm();
  const { Option } = Select;

   const fetchOrganizations = async () => {
      try {
        setLoading(true);
  
    
  
        const response = await getAllOrganizations();
        const res = response.data;
        console.log("organizations response", res);
  
        if (res.status) {
          const formatted = res.data.map((item) => ({
            key: item._id,
            id:item._id,
            organizationName: item.organizationName,
            status: item.status,
            techUsed: item.techUsed,
            about: item.about,
  
            // 🔥 format duration from dates
            duration: `${new Date(item.startDate).toLocaleDateString(
              "en-US",
              { month: "short", year: "numeric" }
            )} - ${
              item.endDate
                ? new Date(item.endDate).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })
                : "Present"
            }`,
  
            // 🔥 format promotions properly
            promotions: item.promotions?.map((p) => ({
              title: p.title,
              date: new Date(p.date).getFullYear(),
            })) || [],
          }));
  
          setOrganizations(formatted);
        } else {
          setOrganizations([]);
        }
      } catch (err) {
        console.error("Error fetching organizations:", err);
        setOrganizations([]);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchOrganizations();
    }, []);

     useEffect(() => {
        if(state && organizations.length > 0){

            console.log("Setting form values with state:", state);

             const orgExists = organizations.find(
      (o) => o.id === String(state.organizationId)
    );

            form.setFieldsValue({
                _id: state.key,
                projectName: state.projectName,
                duration: state.duration,
                status: state.status,
                techUsed: state.techUsed,
                about: state.about,
                organizationId: orgExists ? orgExists.id : null, // set to null if org not found
            });

        }
    }, [state,form,organizations]);


   const onFinish = async (values) => {
    // console.log("Form values:", values);
    setLoading(true);
      const payload = {
    ...values,
    _id: state.key, // 👈 inject here
  };
  console.log("Payload for update:", payload); // debug log
  try {
    const response = await updateMyProject(payload);
    const res = response.data;

    console.log("update project response", res);

    if (res.status) {
      setLoading(false);
      toast.success("Project updated successfully 🚀");

      // redirect after success
      setTimeout(() => {
        navigate("/projects/projectslist");
      }, 1000);

    } else {
      setLoading(false);
      toast.error(res.message || "Something went wrong");
    }

  } catch (error) {
    setLoading(false);
    toast.error(error.response?.data?.message || "Server error");
    console.error("Error creating project:", error);
  }
};

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>

          <CRow>
      <CCol xs={12}>
        
        {/* TOP BAR */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <h4 style={{ margin: 0 }}>Update Project</h4>

          <CButton color="secondary" onClick={() => navigate("/projects")}>
            ← Back
          </CButton>
        </div>

        <CCard className="mb-4">
          <CCardHeader>
            <strong>Update Your Project</strong>
          </CCardHeader>

          <CCardBody >
            <Form form={form} layout="vertical" onFinish={onFinish}>
              
              <CRow>
                <CCol md={6}>
                  <Form.Item
                    name="projectName"
                    label="Project Name"
                    rules={[{ required: true }]}
                  >
                    <CFormInput placeholder="Enter project name" />
                  </Form.Item>
                </CCol>

                <CCol md={6}>
                  <Form.Item
                    name="duration"
                    label="Duration"
                    rules={[{ required: true }]}
                  >
                    <CFormInput placeholder="e.g. 3 months" />
                  </Form.Item>
                </CCol>
              </CRow>

              <CRow>
                <CCol md={6}>
                  <Form.Item
                    name="status"
                    label="Status"
                    rules={[{ required: true }]}
                  >
                    <CFormInput placeholder="Completed / In Progress / Not Started" />
                  </Form.Item>
                </CCol>

                <CCol md={6}>
                  <Form.Item
                    name="techUsed"
                    label="Tech Used"
                    rules={[{ required: true }]}
                  >
                    <CFormInput placeholder="React, Node, MongoDB" />
                  </Form.Item>
                </CCol>
              </CRow>

              <CRow>
  <CCol md={6}>
    <Form.Item
      name="organizationId"
      label="Associated Organization"
      rules={[{ message: "Select organization" }]}
    >
      <Select placeholder="Select organization">
        {organizations?.map((org) => (
          <Option key={org.id} value={org.id}>
            {org.organizationName}
          </Option>
        ))}
      </Select>
    </Form.Item>
  </CCol>
</CRow>

              <Form.Item
                name="about"
                label="About Project"
                rules={[{ required: true }]}
              >
                <CFormTextarea rows={4} placeholder="Describe your project..." />
              </Form.Item>

              {/* ACTION BUTTONS */}
              <div style={{ display: "flex", gap: "10px" }}>
                <CButton color="primary" type="submit">
                 {loading ? "Updating..." : "Update Project"}
                </CButton>

                <CButton
                  color="light"
                  onClick={() => navigate("/projects")}
                >
                  Cancel
                </CButton>
              </div>

            </Form>
          </CCardBody>
        </CCard>

      </CCol>
    </CRow>
      </motion.div>
    );
}

export default EditProject;