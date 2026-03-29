import React from "react";
import { useLocation } from "react-router-dom";
import { Tag, Timeline } from "antd";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import "../../../../index.css"
import { motion } from "framer-motion";

const ProjectDetails = () => {
  const { state } = useLocation();
  const timeline = state?.timeline || [];

  const getActionColor = (action) => {
  switch (action) {
    case "CREATED":
      return "green";
    case "UPDATED":
      return "blue";
    case "ORG_ASSIGNED":
      return "purple";
    default:
      return "default";
  }
};

console.log("project details state", state);

  if (!state) return <div>No Data Found</div>;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>
    <div style={{ padding: "20px" }}>
      <h2>{state.projectName}</h2>

      <p><strong>Duration:</strong> {state.duration}</p>

      <p>
        <strong>Status:</strong>{" "}
        <Tag color="blue">{state.status}</Tag>
      </p>

      <p>
        <strong>Tech Used:</strong>{" "}
       <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "6px" }}>
  {state.techUsed.split(",").map((t, i) => (
    <Tag key={i}>{t.trim()}</Tag>
  ))}
</div>
      </p>

      <p><strong>About:</strong></p>
      <p>{state.about}</p>

      
    </div>

     <CCard className="mb-4">
      <CCardHeader>
        <strong>Activity Log</strong>
      </CCardHeader>

      <CCardBody>
        <Timeline mode="left">
          {timeline
            ?.slice()
            .reverse() // latest first
            .map((item, index) => (
              <Timeline.Item key={index}>
                <div style={{ marginBottom: "4px" }}>
                  <Tag color={getActionColor(item.action)}>
                    {item.action}
                  </Tag>
                </div>

                <div style={{ fontWeight: 500 , color: "ivory"}}>
                  {item.description}
                </div>

                <div
                  style={{
                    fontSize: "12px",
                    color: "#8c8c8c",
                    marginTop: "2px",
                  }}
                >
                  {new Date(item.timestamp).toLocaleString()}
                </div>
              </Timeline.Item>
            ))}
        </Timeline>
      </CCardBody>
    </CCard>
    </motion.div>
  );
};

export default ProjectDetails;