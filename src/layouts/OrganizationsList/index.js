import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CContainer
} from "@coreui/react";
import { Collapse, Tag, Steps } from "antd";
import "../../../index.css";
import toast from "react-hot-toast";
// import { getAllProjects } from "../../assets/globalAPI/GlobalApi";
import { getAllOrganizations } from "../../assets/globalAPI/GlobalApi";
import { start } from "@popperjs/core";
import { motion } from "framer-motion";

const { Panel } = Collapse;

const OrganizationsList = () => {
 const navigate = useNavigate();
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(false);

   const fetchOrganizations = async () => {
    try {
      setLoading(true);

  

      const response = await getAllOrganizations();
      const res = response.data;
      console.log("organizations response", res);

      if (res.status) {
        const formatted = res.data.map((item) => ({
          key: item._id,
          organizationName: item.organizationName,
          status: item.status,
          role: item.role,
          techUsed: item.techUsed,
          about: item.about,
          projects: item.projects, // extract project names
          timeline: item.timeline || [], // pass timeline for details page
          startDate: item.startDate,
          endDate: item.endDate,
          location: item.location,

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
            rawDate: p.date, // keep raw date for details page
          })) || [],
        }));

        setOrganizations(formatted);
      } else {
        setOrganizations([]);
      }
    } catch (err) {
      console.error("Error fetching organizations:", err);
      setOrganizations([]);
      toast.error(err.response?.data?.message || "Failed to fetch organizations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const getStatusTag = (status) => {
    let color = "default";
    if (status === "Completed") color = "green";
    else if (status === "In Progress") color = "blue";
    else if (status === "Not Started") color = "orange";

    return <Tag color={color}>{status}</Tag>;
  };

  const handleAddProject = () => {
    navigate("/organizations/createOrganization");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>

    <CContainer fluid className="px-3 px-md-4 py-3">
      <CRow>
        <CCol xs={12}>
          {/* Header */}
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-3">
          <h4 style={{ margin: 0 }}>My Organizations</h4>

          <CButton className="mt-3 mt-sm-0" color="primary" onClick={handleAddProject}>
            + Add Organization
          </CButton>
        </div>

        <CCard className="mb-4">
          <CCardHeader>

            <strong>Experience</strong>
          </CCardHeader>

          <CCardBody>
            <p className="text-body-secondary small">
              All organizations you’ve worked with and your growth journey.
            </p>

            {/* 🔥 ACCORDION */}
            <Collapse accordion>
              {organizations?.map((item) => (
                <Panel
                  header={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <span style={{ fontWeight: "bold", color:"ivory" }}>{item.organizationName}</span>
                      {getStatusTag(item.status)}
                    </div>
                  }
                  key={item.key}
                >
                  {/* DETAILS */}
                  <div style={{ marginBottom: "12px" }}>
                    <strong>Duration:</strong> {item.duration}
                  </div>

                  <div style={{ marginBottom: "12px" }}>
                    <strong>Tech Used:</strong>
                    <div style={{ marginTop: "6px" }}>
                      {item.techUsed
                          ?.split(",")
                          .map((tech, i) => (
                            <Tag key={i}>{tech.trim()}</Tag>
                          ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <strong>About:</strong>
                    <p style={{ marginTop: "6px" }}>{item.about}</p>
                  </div>

                  <div style={{ marginBottom: "16px" }}>
  <strong>Projects:</strong>
  <p style={{ marginTop: "6px" }}>
    {item.projects?.join(", ")}
  </p>
</div>

                  {/* 🔥 PROMOTION TIMELINE */}
                  <div>
                    <strong>Growth Timeline:</strong>

                    <Steps
                      current={item.promotions.length - 1}
                      size="small"
                      style={{ marginTop: "12px" }}
                      items={item.promotions.map((p) => ({
                        title: p.title,
                        description: p.date,
                      }))}
                    />
                  </div>

                  {/* CLICK NAVIGATION */}
                  <div style={{ marginTop: "16px", display: "flex", gap: "8px"   }}>
                        <motion.div whileHover={{ scale: 1.1 }} style={{ display: "inline-block" }}>
                         
                    <CButton
                      size="sm"
                      color="info"
                      onClick={() =>
                        navigate(`/organizations/${item.key}`, {
                          state: item,
                        })
                      }
                    >
                      View Details
                    </CButton>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} style={{ display: "inline-block" }}>

                     <CButton
                      size="sm"
                      color="info"
                      onClick={() =>
                        navigate(`/organizations/edit/${item.key}`, {
                          state: item,
                        })
                      }
                    >
                      Edit Organization
                    </CButton>
                        </motion.div>
                  </div>
                </Panel>
              ))}
            </Collapse>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    </CContainer>    </motion.div> 
    
  );
};

export default OrganizationsList;