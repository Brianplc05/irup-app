const ApiUrl = process.env.BACKEND_REST_API_URL;
// const AccessApiUrl = process.env.ACCESS_RIGHT_API_URL;
import { jwtDecode } from "./jwtDecode";
import axios from "axios";

export default {
  ///////// GOOGLE LOGIN //////////////

  async googleLogin({ commit }, payload) {
    try {
      const response = await axios.post(
        `${ApiUrl}/googlelogin/GoogleLogin`,
        payload
      );
      const decodedgoogleUser = jwtDecode(response.data.token);
      localStorage.setItem("authToken", response.data.token); // Store the authentication token in localStorage
      localStorage.setItem("user", JSON.stringify(decodedgoogleUser)); // Store user information in localStorage
      commit("SET_GOOGLEUSER", decodedgoogleUser);
      return decodedgoogleUser;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  },

  initAuth({ commit }) {
    const authToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");
    if (authToken && storedUser) {
      const decodedgoogleUser = JSON.parse(storedUser);
      commit("SET_GOOGLEUSER", decodedgoogleUser);
    }
  },

  async googlelogoutAction({ commit }) {
    try {
      // Remove the authentication token from localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      commit("SET_GOOGLEUSER", null);
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  },

  ////////////////////////////////////////////

  ///////// LOGIN //////////////

  async Login({ commit }, logs) {
    try {
      const response = await axios.post(
        `${ApiUrl}/incident-report/login`,
        logs
      );
      const decodedUser = jwtDecode(response.data);
      localStorage.setItem("authToken", response.data);
      localStorage.setItem("user", JSON.stringify(decodedUser));
      commit("SET_USER", decodedUser);
      return decodedUser;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  },

  initAuth({ commit }) {
    const authToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");
    if (authToken && storedUser) {
      const decodedUser = JSON.parse(storedUser);
      commit("SET_USER", decodedUser);
    }
  },

  async logoutAction({ commit }) {
    try {
      // Remove the authentication token and user data from localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      localStorage.removeItem("getListModule");
      localStorage.removeItem("accessModules");

      // Commit the mutations separately
      commit("SET_USER", null); // Reset the user state to null
      commit("RESET_ACCESS_MODULE"); // Reset the access module to an empty array
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  },

  ////////////////////////////////////////////

  /////////////////ACCESS RIGHT///////////////

  async getAccessRight({ commit, state }, employeeCode) {
    try {
      const listModules = state.getListModule;
      const appName = encodeURIComponent("IRMS");
      const code = encodeURIComponent(employeeCode);

      let getAccessModule = [];

      // Loop through all modules
      for (let i = 0; i < listModules.length; i++) {
        const moduleName = encodeURIComponent(listModules[i].title);
        const queryParams = `appName=${appName}&moduleName=${moduleName}&code=${code}`;
        const responseAccessRight = await axios.get(
          `${ApiUrl}/access-right/?${queryParams}`
        );
        if (responseAccessRight.data[0].isAccess) {
          getAccessModule.push(listModules[i]);
        }
      }

      // const defaultModule = state.getListDefaultModule;
      const combinedModules = [...getAccessModule];
      commit("SET_MODULES", combinedModules);

      // Save the combined modules to localStorage
      localStorage.setItem("accessModules", JSON.stringify(combinedModules));
    } catch (error) {
      console.error("Failed to Access Module:", error);
      throw error;
    }
  },

  ////////////////////////////////////////////

  /////////////////// REPORT LIST /////////////////////////
  async displayCountIncidentStatus({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayCountIncidentStatus`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_COUNTINSTATUS", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async displayCAPAIncidentStatus({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}/incident-report/DisplayIncidentCaPaStatus`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_FILTERED_DATA", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async displayCountReport({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayCountReportable`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_COUNTREP", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async displayCountClosureTAT({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayCountClosureTAT`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_COUNT_CLOSURETAT", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async displayCountAgingTAT({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayCountAgingTAT`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_COUNT_AGINGTAT", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async displayCountDepartmentInvolved({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayCountDepartmentInvolved`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_COUNT_DEPARTMENTINVOLVED", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  /* CHECKING PART */

  async displayCountParticular({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}/incident-report/DisplayCountParticular`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_COUNTPAR", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async displayCountReportTAT({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayCountReportTAT`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_COUNTREPTAT", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async displayCountRCATAT({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayCountReportRCATAT`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_COUNTRCATAT", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async displayCountACTIONTAT({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayCountReportActionTAT`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_COUNTACTIONTAT", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async displayAverageRCA({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayCountAverageRCATAT`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_AVERAGERCA", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async displayAverageAction({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayCountAverageActionTAT`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_AVERAGEACTION", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  ////////////////////////////////////////////

  ///////// IRFORM //////////////

  async disEmDept({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/employee-department`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_EmpDept", response.data);
    } catch (error) {
      console.error("Failed to Employee & Departments:", error);
      throw error;
    }
  },

  async disSubName({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/subject-name`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_SubName", response.data);
    } catch (error) {
      console.error("Failed to display Incident:", error);
      throw error;
    }
  },

  // async disSubCategory({ commit }) {
  //   try {
  //     const token = localStorage.getItem("authToken");
  //     const response = await axios.get(
  //       `${ApiUrl}/incident-report/SubCategoryForm`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     commit("GET_SubCategory", response.data);
  //   } catch (error) {
  //     console.error("Failed to display Sub Category:", error);
  //     throw error;
  //   }
  // },

  async disDivision({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${ApiUrl}/incident-report/division`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit("GET_Division", response.data);
    } catch (error) {
      console.error("Failed to display Division:", error);
      throw error;
    }
  },

  async addIReport({ commit }, formData) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}/incident-report/add-incident-report`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      commit("ADD_IRFORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  ////////////////////////////////////////////

  ///////// DASHBOARD //////////////

  async disDashboard({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayDashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_DASH", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  ////////////////////////////////////////////

  ///////// REPORT TABLE //////////////

  async disCountSubject({ commit }) {
    try {
      const response = await axios.get(`${ApiUrl}/forms/DisplayCountSubject`);
      commit("GET_CountSub", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disMatchDepartment({ commit }) {
    try {
      const response = await axios.get(
        `${ApiUrl}/forms/DisplayMatchDepartment`
      );
      commit("GET_CountSub", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disTotalAction({ commit }) {
    try {
      const response = await axios.get(
        `${ApiUrl}/forms/DisplayTotalActionItem`
      );
      commit("GET_CountSub", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  ////////////////////////////////////////////

  /////////  DIRECTOR TABLE  //////////////////

  async disDirector({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayDirectorForm`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      commit("GET_DIRECTOR", response.data);
    } catch (error) {
      console.error("ERROR:", error);
      throw error;
    }
  },

  async disDirectorIrp({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayDirectorIRP`,
        {
          params: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_DIRECTIR", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async addHRRecommendation({ commit }, HRData) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `${ApiUrl}/incident-report/AddRecommendationDirector`,
        HRData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_DIRECTIR", response.data);
    } catch (error) {
      console.error("ERROR", error.response.data);
      throw error;
    }
  },

  ////////////////////////////////////////////

  /////////  ASSISTANTQA TABLE  //////////////////

  async disAssistantQA({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayAssistantQASub`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_ASSISTANTQA", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disAQA({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${ApiUrl}/incident-report/DisplayAQA`, {
        params: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit("GET_ASSISTANTQAFORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disSubjectCode({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplaySubjectCode`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_ASSISTANTSUBCODE", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disDivisionCode({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayDivisionCode`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_ASSISTANTDIVCODE", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async putChangeDivision({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}/incident-report/PutDivisionCode`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_ASSISTANTQA", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async putChangeCode({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}/incident-report/PutSubjectCode`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_ASSISTANTQA", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  ////////////////////////////////////////////

  //////////////QATABLE/////////////////

  async disIncQA({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayQAForm`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_QAFORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disRiskGrading({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayRiskGradingForm`,
        {
          params: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_QAFORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disHead({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayHeadForm`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_HEADFORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disUniverse({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayRiskUniForm`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_UNIFORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async addRiskSubDomain({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}/incident-report/addRiskSubDomains`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_RISKFORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async AddRejectStatus({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `${ApiUrl}/incident-report/AddReject`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_QAFORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disEmployeeList({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayEmployeeName`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_EMPLOYEE", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disIrp({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${ApiUrl}/incident-report/DisplayIRP`, {
        params: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit("GET_QAIR", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disSaveDraftIrp({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayDraftIRP`,
        {
          params: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_QAIR", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disRCASaveDraftIrp({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayRCAIRPDraftItem`,
        {
          params: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_QAIR", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async departmentsEmail({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DepartmentForm`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("SET_DEPARTMENTS", response.data);
    } catch (error) {
      console.error("Failed to fetch departments:", error);
      throw error;
    }
  },

  async departmentList({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DepartmentListForm`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("SET_DEPTLIST", response.data);
    } catch (error) {
      console.error("Failed to fetch departments:", error);
      throw error;
    }
  },

  async addActionEmail({ commit }, addEmail) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}/incident-report/AddActionDeptEmail`,
        addEmail,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("ADD_QAFORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async addRCAEmail({ commit }, addEmail) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}/incident-report/AddRCADeptEmail`,
        addEmail,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("ADD_QAFORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  // async AddCon({ commit }, data) {
  //   try {
  //     const response = await axios.post(`${ApiUrl}/forms/AddConclusion`, data);
  //     commit("GET_FORM", response.data.recordset);
  //   } catch (error) {
  //     console.error("ERROR", error);
  //     throw error;
  //   }
  // },

  async AddqaTrans({ commit }, payload) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}/incident-report/AddQATransfer`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_FORM", response.data);
    } catch (error) {
      console.error("Error updating status:", error.response); // Log the full error response
      throw error;
    }
  },

  // async AddqaRef({ commit }, payload) {
  //   try {
  //     const response = await axios.put(
  //       `${ApiUrl}/forms/AddQARefferal`,
  //       payload
  //     );
  //     commit("GET_FORM", response.data);
  //   } catch (error) {
  //     console.error("Error updating status:", error.response); // Log the full error response
  //     throw error;
  //   }
  // },

  async AddRECon({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}/incident-report/AddREConclusion`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_FORM", response.data.recordset);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async putRiskGrading({ commit }, payload) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `${ApiUrl}/incident-report/PutRiskGrading`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_FORM", response.data);
    } catch (error) {
      console.error("Error updating status:", error.response); // Log the full error response
      throw error;
    }
  },

  ///////////////////////// ACTION /////////////////////////

  async disActionDet({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayQAActionDetails`,
        {
          params: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_QAACTION", response.data);
    } catch (error) {
      console.error("Error updating status:", error.response); // Log the full error response
      throw error;
    }
  },

  async addDisApprovedAction({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}/incident-report/addDisApprovedAction`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("ADD_QAACTION", response.data);
    } catch (error) {
      console.error("ERROR", error.response.data);
      throw error;
    }
  },

  async putCountAction({ commit }, payload) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `${ApiUrl}/incident-report/PutCountAction`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_QAACTION", response.data);
    } catch (error) {
      console.error("Error updating status:", error.response); // Log the full error response
      throw error;
    }
  },

  async disQARevisionActiondetails({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayQARevisionActionDetails`,
        {
          params: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_REVACTION", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async addActionDispprovedEmail({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}/incident-report/AddDisAppActionEmail`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_REVACTION", response.data);
    } catch (error) {
      console.error("ERROR", error.response.data);
      throw error;
    }
  },

  async addDisApprovedReturnAction({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}/incident-report/addDisapprovedReturnAction`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("ADD_QAACTION", response.data);
    } catch (error) {
      console.error("ERROR", error.response.data);
      throw error;
    }
  },

  async AddApprovedActionReturn({ commit }, payload) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}/incident-report/AddApprovedReturnAction`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_REVACTION", response.data);
    } catch (error) {
      console.error("ERROR", error.response.data);
      throw error;
    }
  },

  async AddApprovedAction({ commit }, payload) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}/incident-report/ApprovedAction`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_REVACTION", response.data);
    } catch (error) {
      console.error("ERROR", error.response.data);
      throw error;
    }
  },

  async putActionVLStatus({ commit }, payload) {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.put(
        `${ApiUrl}/incident-report/putActionItemVLStatus`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // commit("GET_CORRECTIVE", response.data);
    } catch (error) {
      console.error("Error updating status:", error);
      throw error;
    }
  },

  ///////////////////////// RCA /////////////////////////

  async putRCASub({ commit }, payload) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `${ApiUrl}/incident-report/PutRCASub`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_FORM", response.data);
    } catch (error) {
      console.error("Error updating status:", error.response); // Log the full error response
      throw error;
    }
  },

  async addRCAApproved({ commit }, ApprovedRca) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}/incident-report/AddApprovedRCA`,
        ApprovedRca,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("ADD_QAFORM", response.data);
    } catch (error) {
      console.error("ERROR", error.response.data);
      throw error;
    }
  },

  async addRCADispproved({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}/incident-report/AddDisApprovedRCA`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("ADD_QAFORM", response.data);
    } catch (error) {
      console.error("ERROR", error.response.data);
      throw error;
    }
  },

  async AddDisApprovedRCAReturn({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}/incident-report/AddReturnDisApprovedRCA`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_RCA", response.data);
    } catch (error) {
      console.error("ERROR", error.response.data);
      throw error;
    }
  },

  async AddApprovedRCAReturn({ commit }, payload) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}/incident-report/AddApprovedRCA`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_RCA", response.data);
    } catch (error) {
      console.error("ERROR", error.response.data);
      throw error;
    }
  },

  async disFilterQAReviewRCAdetailsreturn({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayFilterQAReviewRCADetailsReturn`,
        {
          params: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_RETURNREVIEWRCA", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disQAReviewRCAdetailsreturn({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayQAReviewRCADetailsReturn`,
        {
          params: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_RETURNREVIEWRCA", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async discorrectiveItem({ commit }, acttab) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayDisCorrectiveItems`,
        {
          params: acttab,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_CORRECTIVE", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disriskItem({ commit }, acttab) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayDisRiskItems`,
        {
          params: acttab,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_RISK", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async putActionStatusCor({ commit }, payload) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `${ApiUrl}/incident-report/putCorActionItemStatus`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_CORRECTIVE", response.data);
    } catch (error) {
      console.error("Error updating status:", error);
      throw error;
    }
  },

  async putActionRisk({ commit }, payload) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `${ApiUrl}/incident-report/putActionRiskItem`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_RISK", response.data);
    } catch (error) {
      console.error("Error updating status:", error);
      throw error;
    }
  },

  async disPendingRemarks({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayPendingRemarks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_PENREMARKS", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async AddPendingRemarks({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}/incident-report/AddPendingRemarks`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_FORM", response.data.recordset);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async putqaIR({ commit }, payload) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `${ApiUrl}/incident-report/putQADStatus`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_FORM", response.data);
    } catch (error) {
      console.error("Error updating status:", error.response); // Log the full error response
      throw error;
    }
  },

  //////////////////////////////////////

  //////////////PRIMARY TABLE/////////////////

  async disPrimaryACT({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayPrimaryACTDetails`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      commit("GET_PRIM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disPrimaryRCA({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayPrimaryRCADetails`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_PRIM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async addActionDraftVL({ commit }, payload) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}/incident-report/addActionDraftVL`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("ADD_QAFORM", response.data);
    } catch (error) {
      console.error("ERROR", error.response.data);
      throw error;
    }
  },

  async addConfirmDraftAct({ commit }, payload) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}/incident-report/addConfirmDraftAct`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("ADD_QAFORM", response.data);
    } catch (error) {
      console.error("ERROR", error.response.data);
      throw error;
    }
  },

  async addActionItemVL({ commit }, payload) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}/incident-report/AddActionItemVL`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("ADD_QAFORM", response.data);
    } catch (error) {
      console.error("ERROR", error.response.data);
      throw error;
    }
  },

  async disActionItem({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayActionDetails`,
        {
          params: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_ACTION", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disFilterActionDetails({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayReturnFilterAction`,
        {
          params: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_RETURNACTION", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disReturnActionItemdetails({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayReturnAction`,
        {
          params: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      commit("GET_RETURNACTION", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async addReturnActionitems({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}/incident-report/AddReturnAction`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_RETURNACTION", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disActionReturnDet({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayReturnActionDetails`,
        {
          params: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_ACTION", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disActionApprovedReturn({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayActionApprovedReturn`,
        {
          params: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_RETURNACTION", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disActionApproved({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayApprovedActionDetails`,
        {
          params: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_APACTION", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async AccomplishActDate({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `${ApiUrl}/incident-report/UpdateAccomplishmentActStatus`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      commit("GET_APACTION", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  //////////////////////////RCA/////////////////////////////

  async addRCAItem({ commit }, payload) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}/incident-report/addRCAItem`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_RCA", response.data);
    } catch (error) {
      console.error("ERROR", error.response.data);
      throw error;
    }
  },

  async addRCADraftItem({ commit }, payload) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}/incident-report/addRCADraftItem`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_RCA", response.data);
    } catch (error) {
      console.error("ERROR", error.response.data);
      throw error;
    }
  },

  async addConfirmDraftRCA({ commit }, payload) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}/incident-report/addRCADraftConfirm`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_RCA", response.data);
    } catch (error) {
      console.error("ERROR", error.response.data);
      throw error;
    }
  },

  async addrcaReviewItem({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}/incident-report/addRCAReviewItem`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_RCA", response.data);
    } catch (error) {
      console.error("ERROR", error.response.data);
      throw error;
    }
  },

  async disRCAdetails({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayRCADetails`,
        {
          params: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      commit("GET_RCA", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  /////////// RCA  ////////////////
  async disRCAdetailsreturn({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayRCADetailsReturn`,
        {
          params: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      commit("GET_RETURNRCA", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disRCAApproveddetails({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayRCAApprovedDetails`,
        {
          params: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      commit("GET_RCA", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async AccomplishDate({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `${ApiUrl}/incident-report/UpdateAccomplishmentStatus`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      commit("GET_RCA", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  // async disReviewRCAdetailsreturn({ commit }, data) {
  //   try {
  //     console.log(data);
  //     const token = localStorage.getItem("authToken");
  //     const response = await axios.get(
  //       `${ApiUrl}/incident-report/DisplayReviewRCADetailsReturn`,
  //       {
  //         params: data,
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //     commit("GET_RETURNREVIEWRCA", response.data);
  //   } catch (error) {
  //     console.error("ERROR", error);
  //     throw error;
  //   }
  // },

  async disFilterRCAdetailsreturn({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayFilterDisRCADetailsReturn`,
        {
          params: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      commit("GET_RETURNRCA", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  //////////////////////////////////////

  //////////////SECONDARY TABLE/////////////////

  async disSecondary({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplaySecondaryDetails`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_SEC", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },
  //////////////////////////////////////

  ///////// HRTABLE //////////////

  async disHRRep({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayHRRepDetails`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_HRFORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disHRRef({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayHRRefDetails`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_FORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disIrpHR({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayHRIRP`,
        {
          params: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_HRFORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async AddfinLia({ commit }, payload) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `${ApiUrl}/incident-report/AddFinancialLiability`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_FORM", response.data);
    } catch (error) {
      console.error("Error updating status:", error.response); // Log the full error response
      throw error;
    }
  },

  async AddNew({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}/incident-report/AddNote`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_FORM", response.data.recordset);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async AddNoteNew({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}/incident-report/AddHRNote`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_FORM", response.data.recordset);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async puthrIR({ commit }, payload) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `${ApiUrl}/incident-report/puthrStatus`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_FORM", response.data);
    } catch (error) {
      console.error("Error updating status:", error.response); // Log the full error response
      throw error;
    }
  },

  // async putDisAct({ commit }, payload) {
  //   try {
  //     const token = localStorage.getItem("authToken");
  //     const response = await axios.put(`${ApiUrl}/forms/puthrAct`, payload, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     commit("GET_FORM", response.data);
  //   } catch (error) {
  //     console.error("Error updating status:", error.response); // Log the full error response
  //     throw error;
  //   }
  // },

  // async EmplDem({ commit }, data) {
  //   try {
  //     const token = localStorage.getItem("authToken");
  //     const response = await axios.post(`${ApiUrl}/forms/AddEmplo`, data, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     commit("EMPLOYEE_FORM", response.data.recordset);
  //   } catch (error) {
  //     console.error("ERROR", error);
  //     throw error;
  //   }
  // },

  // async DeptDem({ commit }, data) {
  //   try {
  //     const response = await axios.post(`${ApiUrl}/forms/AddDept`, data);
  //     commit("DEPT_FORM", response.data.recordset);
  //   } catch (error) {
  //     console.error("ERROR", error);
  //     throw error;
  //   }
  // },

  // async codedis({ commit }) {
  //   try {
  //     const token = localStorage.getItem("authToken");
  //     const response = await axios.get(`${ApiUrl}/forms/CodeDisForm`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     commit("GET_FORM", response.data);
  //   } catch (error) {
  //     console.error("Failed to fetch departments:", error);
  //     throw error;
  //   }
  // },

  // async speOfdis({ commit }) {
  //   try {
  //     const token = localStorage.getItem("authToken");
  //     const response = await axios.get(`${ApiUrl}/forms/SpecificOfForm`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     commit("GET_FORM", response.data);
  //   } catch (error) {
  //     console.error("Failed to fetch departments:", error);
  //     throw error;
  //   }
  // },

  ////////////////////////////////////////////

  ////HRDEMERIT/////

  // async disEmployeeDem({ commit }) {
  //   try {
  //     const token = localStorage.getItem("authToken");
  //     const response = await axios.get(`${ApiUrl}/forms/DisplayEmployees`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     commit("GET_EMPLOYEES", response.data);
  //   } catch (error) {
  //     console.error("ERROR", error);
  //     throw error;
  //   }
  // },

  // async disDemerit({ commit }, data) {
  //   try {
  //     const token = localStorage.getItem("authToken");
  //     const response = await axios.get(`${ApiUrl}/forms/DisplayEmpTab`, {
  //       params: data,
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     commit("DEMERIT_FORM", response.data); // Assuming response.data is an array of records
  //   } catch (error) {
  //     console.error("ERROR", error);
  //     throw error;
  //   }
  // },

  ////////////////////////////////////////

  //////////////AUDIT//////////////////////////////

  async disTab({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${ApiUrl}/incident-report/DisplayTab`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit("GET_FORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disAreaTab({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayAreaTab`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_AREA", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disRequestAccess({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayRequestAccess`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_ACCESS", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disDivTab({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayDivisionTab`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_DIV", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disSubjectTab({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplaySubjectTab`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_SUBJECTFORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disRiskChildTab({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayRiskChildTab`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_RISKCHILDFORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disRiskTab({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayRiskTab`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_ALLRISKFORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disDomainCode({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DomainCodeForm`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_RISKFORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disQAs({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${ApiUrl}/incident-report/DisplayQA`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit("GET_QA", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disFilterDivision({ commit }) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayDivision`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_Division", response.data);
    } catch (error) {
      console.error("Failed to display Division:", error);
      throw error;
    }
  },

  async addSubjectDetails({ commit }, riskdata) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}/incident-report/AddSubjectDetails`,
        riskdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("AUDIT_FORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async addRiskChild({ commit }, riskChilddata) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}/incident-report/AddRiskChilds`,
        riskChilddata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("AUDIT_FORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async addRiskDomain({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}/incident-report/addRiskDomains`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_RISKFORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async addRiskDictionary({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}/incident-report/AddRiskDic`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_RISKFORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async addDepartmentContent({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}/incident-report/addDeptContent`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_RISKFORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async addEditDeptContent({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}/incident-report/addDeptEditContent`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_RISKFORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async addAreaContent({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}/incident-report/addContentArea`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_DIV", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async RemoveAreaContent({ commit }, payload) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `${ApiUrl}/incident-report/RemoveContentArea`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_AREA", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async addRequestAccess({ commit }, payload) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}/incident-report/addRequest`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_ACCESS", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async RemoveRequestAccess({ commit }, payload) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `${ApiUrl}/incident-report/RemoveRequest`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_ACCESS", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async AddAud({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}/incident-report/AddRemarks`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("ADD_FORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async disNote({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${ApiUrl}/incident-report/DisplayNote`,
        {
          params: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("AUDIT_FORM", response.data);
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  },

  async putEdNote({ commit }, payload) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${ApiUrl}/incident-report/EditNote`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("AUDIT_FORM", response.data);
    } catch (error) {
      console.error("Error updating status:", error);
      throw error;
    }
  },

  async putNote({ commit }, data) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `${ApiUrl}/incident-report/DeletedNote`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("AUDIT_FORM", response.data);
    } catch (error) {
      console.error("Error updating status:", error);
      throw error;
    }
  },

  async putauditIR({ commit }, payload) {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `${ApiUrl}/incident-report/PutauditStatus`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("GET_FORM", response.data);
    } catch (error) {
      console.error("Error updating status:", error.response); // Log the full error response
      throw error;
    }
  },

  ////////////////////////////////////////
};
