import React, { useEffect, useState } from 'react'
import  { useNavigate } from 'react-router-dom'
import {
 CContainer,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CLink,
} from '@coreui/react'
import { Table, Tag } from "antd";
import { EditOutlined } from "@ant-design/icons";
import "../../../index.css"
import { CButton } from '@coreui/react'
import { getAllOrganizations, getAllProjects } from '../../assets/globalAPI/GlobalApi';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const ProjectsList = () => {
    const navigate= useNavigate();
    const [projects, setProjects] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

const fetchProjects = async () => {
  try {
    const body = {
      page: page,
     
    }
    setLoading(true);
    const response = await getAllProjects(body);
    const res = response.data;

    console.log("projects response", res);

    if (res.status) {
      // map backend data to table format
      const formatted = res.data?.map((item, index) => ({
        key: item._id, // use unique ID from backend
        projectName: item.projectName,
        duration: item.duration,
        status: item.status,
        techUsed: item.techUsed,
        about: item.about,
        organizationId: item.organizationId, 
        timeline: item.timeline || [], // pass timeline for details page
      }));

      console.log("here is the formatted projects data", formatted);

      setTotalPages(res.totalPages);
      setProjects(formatted);
    }
      else {
      setTotalPages(1);
      setProjects([]);
      toast.error(res.message || "Failed to fetch projects");
    }
  } catch (error) {
    setTotalPages(1);
    setProjects([]);
    console.log("Error fetching projects:", error.message);
    toast.error(error.response?.data?.message || "Failed to fetch projects");
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  fetchProjects();
}, [page]);


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


 const getStatusTag = (status) => {
    let color = "default";

    if (status === "Completed") color = "green";
    else if (status === "In Progress") color = "blue";
    else if (status === "Not Started") color = "orange";
    else color = "default";

    return <Tag color={color}>{status}</Tag>;
  };

    const columns = [
     {
  title: "Action",
  key: "action",
  width: 100,
  render: (_, record) => (
          <motion.div whileHover={{ scale: 1.2 }} style={{ display: "inline-block" }}>
            <EditOutlined
              style={{ cursor: "pointer", fontSize: "16px" }}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/projects/edit/${record.key}`, { state: record });
              }}
            />
          </motion.div>
        ),
},
  {
    title: 'Project Name',
    dataIndex: 'projectName',
      width: 200,
    // ellipsis: true,
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
     width: 200,
  },
   {
      title: "Status",
      dataIndex: "status",
       width: 200,
      render: (status) => getStatusTag(status),
    },
    {
      title: "Associated Organization",
      dataIndex: "organizationId",
       width: 200,
      render: (orgId) => {
        const org = organizations?.find((o) => o.id == orgId);
        return org ? org.organizationName : "N/A";
      },
    },
    {
      title: "Tech Used",
      dataIndex: "techUsed",
       width: 200,
      render: (tech) => (
        <>
          {tech.split(",").map((t, i) => (
            <Tag key={i}>{t.trim()}</Tag>
          ))}
        </>
      ),
    },
  {
    title: 'About',
    dataIndex: 'about',
     width: 300,
       render: (text) => {
    const limit = 200; // adjust this
    return text.length > limit
      ? text.slice(0, limit) + "..."
      : text;
  },
  },
];





const handleAddProject = () => {
    // Logic to add a new project (e.g., open a modal with a form)
    navigate("/projects/createproject");
    };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>

    <CContainer fluid className="px-3 px-md-4 py-3">
      <CRow>
        <CCol xs={12}>
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-3">
            <h4 style={{ margin: 0 }}>My Projects</h4>
            <CButton className="mt-2 mt-sm-0" color="primary" onClick={handleAddProject}>
              + Add Project
            </CButton>
          </div>
        {/* <DocsComponents href="components/breadcrumb/" /> */}
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Projects</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Here is a list of all the projects that i have worked on in my journey of being a developer.
            </p>

             <>
   
    <div className="dark-table">
  <Table
  columns={columns}
  dataSource={projects}
  loading={loading}
  style={{cursor: "grab"}}
   pagination={{
    current: page,
    pageSize: 5,
    total: totalPages, // 🔥 replace with backend total later
  }}
  onChange={(pagination) => {
    setPage(pagination.current);
  }}
   onRow={(record) => ({
    onClick: () => {
      navigate(`/projects/${record.key}`, {
        state: record, // pass full data
      });
    },
  })}
  size="middle"
  scroll={{ x: true }}
/>
</div>
   
  </>
            
          </CCardBody>
        </CCard>
      </CCol>
      </CRow>
    </CContainer>
    </motion.div>
  )
}

export default ProjectsList
