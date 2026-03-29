import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CSpinner,
} from "@coreui/react";
import { motion } from "framer-motion"; // ✅ framer motion
import MainChart from "./MainChart";
import {
  fetchCareerData,
  fetchDashboardData,
  fetchTechStackData,
  fetchTimelineData,
} from "../../assets/globalAPI/GlobalApi";

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [growth, setGrowth] = useState([]);
  const [techStats, setTechStats] = useState({});
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const [summaryRes, growthRes, techRes, timelineRes] = await Promise.all([
        fetchDashboardData(),
        fetchCareerData(),
        fetchTechStackData(),
        fetchTimelineData(),
      ]);

      setSummary(summaryRes?.data.data);
      setGrowth(growthRes?.data.data);
      setTechStats(techRes?.data.data || {});
      setTimeline(timelineRes?.data.data);
    } catch (err) {
      console.log("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <CSpinner />
      </div>
    );
  }

  // ✅ Motion variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, type: "spring", stiffness: 50 },
    }),
  };

  const timelineVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, type: "spring", stiffness: 70 },
    }),
  };

  return (
    <>
      {/* 🔥 SUMMARY CARDS */}
      <CRow className="mb-4 g-4">
        {[
          { title: "Total Projects", value: summary?.totalProjects, color: "linear-gradient(135deg, #4facfe, #00f2fe)" },
          { title: "Active Projects", value: summary?.activeProjects, color: "linear-gradient(135deg, #fee140, #00f2fe)" },
          { title: "Completed Projects", value: summary?.completedProjects, color: "linear-gradient(135deg, #667eea, #764ba2)" },
          { title: "Total Organizations", value: summary?.totalOrgs, color: "linear-gradient(135deg, #43e97b, #38f9d7)" },
          { title: "Active Organizations", value: summary?.activeOrgs, color: "linear-gradient(135deg, #fa709a, #fee140)" },
        ].map((item, index) => (
          <CCol md={3} key={index}>
            <motion.div
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <CCard
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
                }}
              >
                <CCardBody
                  style={{
                    background: item.color,
                    color: "white",
                    minHeight: "120px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <h6 style={{ opacity: 0.9, marginBottom: "6px" }}>{item.title}</h6>
                  <h2 style={{ fontWeight: "bold", margin: 0 }}>{item.value ?? 0}</h2>
                </CCardBody>
              </CCard>
            </motion.div>
          </CCol>
        ))}
      </CRow>

      {/* 📈 CAREER GROWTH */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <CCard className="mb-4">
          <CCardHeader>Career Growth</CCardHeader>
          <CCardBody>
            <MainChart data={growth} />
          </CCardBody>
        </CCard>
      </motion.div>

      {/* 🧑‍💻 TECH STATS */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <CCard className="mb-4">
          <CCardHeader>Tech Usage</CCardHeader>
          <CCardBody>
            {Object.keys(techStats).length === 0 ? (
              <p className="text-muted">No data</p>
            ) : (
              Object.entries(techStats)
                .sort((a, b) => b[1] - a[1])
                .map(([tech, count]) => {
                  const max = Math.max(...Object.values(techStats));
                  const percent = Math.round((count / max) * 100);
                  return (
                    <div key={tech} className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span style={{ textTransform: "capitalize", fontWeight: 500 }}>{tech}</span>
                        <span className="text-muted">{count}</span>
                      </div>
                      <div style={{ height: "8px", borderRadius: "6px", background: "rgba(255,255,255,0.1)", overflow: "hidden" }}>
                        <div
                          style={{
                            width: `${percent}%`,
                            height: "100%",
                            background: "linear-gradient(90deg, #4facfe, #00f2fe)",
                            transition: "width 0.4s ease",
                          }}
                        />
                      </div>
                    </div>
                  );
                })
            )}
          </CCardBody>
        </CCard>
      </motion.div>

      {/* 📅 TIMELINE */}
      <CCard>
        <CCardHeader>Recent Activity</CCardHeader>
        <CCardBody>
          {timeline?.length === 0 ? (
            <p className="text-muted">No activity</p>
          ) : (
            <div style={{ position: "relative", paddingLeft: "20px" }}>
              <div style={{ position: "absolute", left: "8px", top: 0, bottom: 0, width: "2px", background: "rgba(255,255,255,0.1)" }} />

              {timeline?.slice(0, 10).map((item, index) => {
                const getColor = () => {
                  switch (item.action) {
                    case "CREATED": return "#4facfe";
                    case "UPDATED": return "#43e97b";
                    case "PROMOTION_UPDATED": return "#f093fb";
                    case "ORG_ASSIGNED": return "#f5576c";
                    default: return "#999";
                  }
                };
                return (
                  <motion.div
                    key={index}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={timelineVariants}
                  >
                    <div style={{ position: "relative", marginBottom: "20px", paddingLeft: "15px" }}>
                      <span
                        style={{
                          position: "absolute",
                          left: "-2px",
                          top: "5px",
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          background: getColor(),
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: 600 }}>
                          {item.name}
                          <span
                            style={{
                              marginLeft: "8px",
                              fontSize: "12px",
                              padding: "2px 6px",
                              borderRadius: "6px",
                              background: getColor(),
                              color: "#fff",
                            }}
                          >
                            {item.action}
                          </span>
                        </div>
                        <div className="small text-muted mb-1">{new Date(item.timestamp).toLocaleString()}</div>
                        <div style={{ opacity: 0.85 }}>{item.description}</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </CCardBody>
      </CCard>
    </>
  );
};

export default Dashboard;