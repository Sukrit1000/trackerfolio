import axios from 'axios';

axios.defaults.baseURL = 'https://workfoliobackend-j5a9.onrender.com/api/app'; 


export function createUser(data) {
    // let token = localStorage.getItem("userToken");
    // axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.defaults.headers.post["Content-Type"] = "application/json";
    return axios.post(`/auth/register`, data)
}

export function loginUser(data) {
    // let token = localStorage.getItem("userToken");
    // axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.defaults.headers.post["Content-Type"] = "application/json";
    return axios.post(`/auth/login`, data)
}

export function getAllProjects(data) {
    let token = localStorage.getItem("userToken");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.defaults.headers.post["Content-Type"] = "application/json";
    return axios.post(`/projects/getProjects`, data)
}

export function getAllOrganizations() {
    let token = localStorage.getItem("userToken");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.defaults.headers.post["Content-Type"] = "application/json";
    return axios.get(`/organizations/getOrganizations`)
}

export function fetchDashboardData() {
    let token = localStorage.getItem("userToken");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.defaults.headers.post["Content-Type"] = "application/json";
    return axios.get(`/dashboard/summary`)
}
export function fetchCareerData() {
    let token = localStorage.getItem("userToken");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.defaults.headers.post["Content-Type"] = "application/json";
    return axios.get(`/dashboard/career`)
}
export function fetchTechStackData() {
    let token = localStorage.getItem("userToken");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.defaults.headers.post["Content-Type"] = "application/json";
    return axios.get(`/dashboard/tech`)
}
export function fetchTimelineData() {
    let token = localStorage.getItem("userToken");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.defaults.headers.post["Content-Type"] = "application/json";
    return axios.get(`/dashboard/timeline`)
}
export function createMyProject(data) {
    let token = localStorage.getItem("userToken");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.defaults.headers.post["Content-Type"] = "application/json";
    return axios.post(`/projects/createProject`, data)
}



export function updateMyProject(data) {
    let token = localStorage.getItem("userToken");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.defaults.headers.post["Content-Type"] = "application/json";
    return axios.post(`/projects/updateProject`,data)
}

export function createMyOrganization(data) {
    let token = localStorage.getItem("userToken");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.defaults.headers.post["Content-Type"] = "application/json";
    return axios.post(`/organizations/createOrganization`, data)
}

export function updateMyOrganization(data) {
    let token = localStorage.getItem("userToken");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.defaults.headers.post["Content-Type"] = "application/json";
    return axios.post(`/organizations/updateOrganization`, data)
}