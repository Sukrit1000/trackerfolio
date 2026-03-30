import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CFormInput,
} from "@coreui/react";
import { motion } from "framer-motion";
import { getAllGrowthCounts } from "../../assets/globalAPI/GlobalApi";

const GrowthInsights = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [simulateProjects, setSimulateProjects] = useState(0);
  const [simulateTech, setSimulateTech] = useState(0);

  const fetchGrowth = async () => {
    try {
      setLoading(true);
      const res = await getAllGrowthCounts(simulateProjects, simulateTech);
      if (res.data.status) {
        setData(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrowth();
  }, [simulateProjects, simulateTech]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <CRow>
        <CCol xs={12}>
          <h4 className="mb-3">Growth Calculator</h4>
        </CCol>

        {/* LEFT - INPUT PANEL */}
        <CCol xs={12} md={5}>
          <CCard className="p-4 mb-3">
            <h6 className="mb-3">Simulate Your Future</h6>

            <div className="mb-3">
              <label>Additional Projects</label>
              <CFormInput
                type="number"
                value={simulateProjects}
                onChange={(e) =>
                  setSimulateProjects(Number(e.target.value))
                }
              />
            </div>

            <div>
              <label>New Technologies</label>
              <CFormInput
                type="number"
                value={simulateTech}
                onChange={(e) =>
                  setSimulateTech(Number(e.target.value))
                }
              />
            </div>
          </CCard>
        </CCol>

        {/* RIGHT - RESULT PANEL */}
        <CCol xs={12} md={7}>
          <CCard className="p-4 mb-3 text-center">
            {loading ? (
              <p>Calculating...</p>
            ) : (
              <>
                <h6>Current Growth Score</h6>
                <h1 style={{ fontSize: "42px", fontWeight: "bold" }}>
                  {data?.current?.score}
                </h1>

                <p style={{ color: "gray" }}>
                  +{data?.future?.improvementPercent || 0}% potential growth
                </p>

                <hr />

                <h6>Future Projection</h6>
                <h2 style={{ color: "#2eb85c" }}>
                  {data?.future?.combined}
                </h2>
              </>
            )}
          </CCard>
        </CCol>

        {/* BREAKDOWN */}
        <CCol xs={12}>
          <CRow>
            <CCol xs={12} md={4}>
              <CCard className="p-3 text-center">
                <h6>Projects Impact</h6>
                <h5>{data?.future?.projectsOnly}</h5>
              </CCard>
            </CCol>

            <CCol xs={12} md={4}>
              <CCard className="p-3 text-center">
                <h6>Tech Impact</h6>
                <h5>{data?.future?.techOnly}</h5>
              </CCard>
            </CCol>

            <CCol xs={12} md={4}>
              <CCard className="p-3 text-center">
                <h6>Combined 🚀</h6>
                <h5>{data?.future?.combined}</h5>
              </CCard>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
    </motion.div>
  );
};

export default GrowthInsights;