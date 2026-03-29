import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CFormInput,
  CFormTextarea,
} from "@coreui/react";
import { Form, Select, DatePicker, Space } from "antd";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { createMyOrganization, updateMyOrganization } from "../../../assets/globalAPI/GlobalApi";
import { motion } from "framer-motion";

const { Option } = Select;

const EditOrganization = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
   const { state } = useLocation();
   const [form] = Form.useForm();

   useEffect(() => {
           if(state ){
   
               console.log("Setting form values with state:", state);
   
                
   
               form.setFieldsValue({
                   _id: state.key,
                   organizationName: state.organizationName,
                   role: state.role,
                   startDate: state.startDate ? dayjs(state.startDate) : null,
                   endDate: state.endDate ? dayjs(state.endDate) : null, 
                   status: state.status,
                   location: state.location,   
                   techUsed: state.techUsed,
                   about: state.about,
                   promotions: state.promotions?.map((p) => ({
                     title: p.title,
                     date: dayjs(p.rawDate, "YYYY"),   
                     })) || [],
                   
               });
   
           }
       }, [state,form]);

  const onFinish = async (values) => {
    console.log("Form values:", values);
      const payload = {
    ...values,
    _id: state.key, // 👈 inject here
  };
    try {
      setLoading(true);

      // 🔥 format dates + promotions
      const formatted = {
        ...payload,
        duration: `${payload.startDate?.format("MMM YYYY")} - ${
          payload.endDate ? payload.endDate.format("MMM YYYY") : "Present"
        }`,
        promotions: payload.promotions?.map((p) => ({
          title: p.title,
          date: p.date.format("YYYY"),
        })),
      };

      const response = await updateMyOrganization(formatted);
      const res = response.data;
      console.log("update organization response", res);

      if (res.status) {
        toast.success("Organization updated 🚀");
        setTimeout(() => navigate("/organizations/organizationslist"), 1000);
      } else {
        toast.error(res.message || "Something went wrong");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>

    <CRow>
      <CCol xs={12}>
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <h4>Add Organization</h4>

          <CButton color="secondary" onClick={() => navigate(-1)}>
            ← Back
          </CButton>
        </div>

        <CCard>
          <CCardHeader>
            <strong>Organization Details</strong>
          </CCardHeader>

          <CCardBody>
            <Form form={form} layout="vertical" onFinish={onFinish}>
              
              {/* BASIC INFO */}
              <CRow>
                <CCol md={6}>
                  <Form.Item
                    name="organizationName"
                    label="Organization Name"
                    rules={[{ required: true }]}
                  >
                    <CFormInput placeholder="Google, Amazon..." />
                  </Form.Item>
                </CCol>

                <CCol md={6}>
                  <Form.Item
                    name="role"
                    label="Your Role"
                    rules={[{ required: true }]}
                  >
                    <CFormInput placeholder="Frontend Developer" />
                  </Form.Item>
                </CCol>
              </CRow>

              {/* DATE */}
              <CRow>
                <CCol md={6}>
                  <Form.Item
                    name="startDate"
                    label="Start Date"
                    rules={[{ required: true }]}
                  >
                    <DatePicker style={{ width: "100%" }} picker="month" />
                  </Form.Item>
                </CCol>

                <CCol md={6}>
                  <Form.Item name="endDate" label="End Date">
                    <DatePicker style={{ width: "100%" }} picker="month" />
                  </Form.Item>
                </CCol>
              </CRow>

              {/* STATUS + LOCATION */}
              <CRow>
                <CCol md={6}>
                  <Form.Item
                    name="status"
                    label="Status"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="Select status">
                      <Option value="Completed">Completed</Option>
                      <Option value="In Progress">In Progress</Option>
                    </Select>
                  </Form.Item>
                </CCol>

                <CCol md={6}>
                  <Form.Item name="location" label="Location">
                    <CFormInput placeholder="Remote / Bangalore" />
                  </Form.Item>
                </CCol>
              </CRow>

              {/* TECH */}
              <Form.Item
                name="techUsed"
                label="Tech Used"
                rules={[{ required: true }]}
              >
                <CFormInput placeholder="React, Node, MongoDB" />
              </Form.Item>

              {/* ABOUT */}
              <Form.Item
                name="about"
                label="About Work"
                rules={[{ required: true }]}
              >
                <CFormTextarea rows={4} placeholder="What did you do?" />
              </Form.Item>

              {/* 🔥 PROMOTIONS (DYNAMIC FIELD) */}
             <Form.List name="promotions">
  {(fields, { add, remove }) => (
    <>
      

      {fields.map(({ key, name, ...restField }) => (
        <div
          key={key}
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "12px",
            alignItems: "center",
          }}
        >
          <Form.Item
            {...restField}
            name={[name, "title"]}
            rules={[{ required: true }]}
            style={{ flex: 2, marginBottom: 0 }}
          >
            <CFormInput placeholder="Role (e.g. Junior Dev)" />
          </Form.Item>

          <Form.Item
            {...restField}
            name={[name, "date"]}
            rules={[{ required: true }]}
            style={{ flex: 1, marginBottom: 0 }}
          >
            <DatePicker
              picker="year"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <CButton
            color="danger"
            style={{ height: "38px" , color: "ivory"}}
            onClick={() => remove(name)}
          >
            Remove
          </CButton>
        </div>
      ))}

      <CButton
        type="button"
        color="success"
        style={{color: "ivory"}}
        onClick={() => add()}
      >
        + Add Promotion
      </CButton>
    </>
  )}
</Form.List>

              {/* ACTIONS */}
              <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
                <CButton color="primary" type="submit">
                  {loading ? "Updating..." : "Update Organization"}
                </CButton>

                <CButton color="light" onClick={() => navigate(-1)}>
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
};

export default EditOrganization;