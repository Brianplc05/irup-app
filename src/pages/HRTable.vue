<template>
  <div id="q-app" style="position: relative; z-index: 1">
    <div style="height: 100%; width: 100%" class="q-pa-lg">
      <q-card class="dashboard-header" style="border: 2px solid #e0e0e0">
        <q-card-section class="row items-center no-wrap">
          <div class="row items-center no-wrap">
            <div class="icon-wrapper">
              <q-icon name="chrome_reader_mode" size="35px" color="primary" />
            </div>

            <div class="q-ml-md text-left">
              <div
                class="text-h5 text-weight-medium text-primary text-uppercase"
              >
                HUMAN RESOURCES MODULE
              </div>

              <div class="text-grey-7 q-mt-xs">
                Welcome to the Incident Reporting & Unified Platform (IRUP)
                Human Resources!
              </div>

              <div class="accent-line q-mt-sm"></div>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <q-card class="dashboard-header q-mt-md q-pa-sm" flat bordered>
        <q-card-section
          v-if="loading"
          class="fixed-full flex flex-center column q-gutter-md"
          style="background-color: rgba(255, 255, 255, 0.7); z-index: 9999"
        >
          <q-spinner-ball size="150px" color="primary" />
          <div class="text-subtitle1 text-primary">Please wait...</div>
        </q-card-section>

        <q-card-section style="border: 2px solid #e0e0e0">
          <q-toolbar
            class="bg-grey-1"
            style="border: 2px solid #f0f2f5; border-radius: 10px"
          >
            <q-tabs
              v-model="hrTab"
              shrink
              stretch
              class="bg-grey-1 text-dark q-pa-xs"
              active-color="black"
              indicator-color="transparent"
            >
              <q-tab
                name="reportable"
                stack
                style="width: 350px"
                :class="{ 'active-tab': hrTab === 'reportable' }"
              >
                <template v-slot:default>
                  <div class="column items-center q-mr-md">
                    <div>Reportable Incident</div>
                  </div>
                </template>
              </q-tab>

              <q-tab
                name="hrReferral"
                stack
                style="width: 350px"
                :class="{ 'active-tab': hrTab === 'hrReferral' }"
              >
                <template v-slot:default>
                  <div class="column items-center q-pa-sm q-mr-md">
                    <div>Human Resources (HR) Referral</div>
                  </div>
                </template>
              </q-tab>
            </q-tabs>
          </q-toolbar>

          <q-tab-panels v-model="hrTab" animated class="tab-panels-bordered">
            <q-tab-panel name="reportable">
              <q-card-section class="row items-center justify-end q-gutter-sm">
                <!-- SEARCH -->
                <q-input
                  v-model="searchRepQuery"
                  label="SEARCH"
                  dense
                  outlined
                  class="search-input"
                >
                  <template v-slot:append>
                    <q-icon name="search" color="info" />
                  </template>
                </q-input>

                <!-- FILTER -->
                <q-btn-dropdown
                  color="secondary"
                  :label="selectedAreaValue?.division || 'FILTER AREA'"
                  split
                  class="filter-btn"
                >
                  <q-list>
                    <q-item
                      v-for="option in areaValueOptions"
                      :key="option.divisionCode"
                      clickable
                      @click="selectArea(option)"
                    >
                      <q-item-section>{{ option.division }}</q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </q-card-section>

              <hrRepComponentsTable
                v-show="showTable"
                :items="filteredRepDisAll"
                :pagination="{ rowsPerPage: 8 }"
                :columns="disRepColumns"
                style="border-collapse: collapse; border-radius: 10px"
                :loading="loading"
              />
            </q-tab-panel>

            <q-tab-panel name="hrReferral">
              <q-card-section class="row items-center justify-end q-gutter-sm">
                <!-- SEARCH -->
                <q-input
                  v-model="searchRefQuery"
                  label="SEARCH"
                  dense
                  outlined
                  class="search-input"
                >
                  <template v-slot:append>
                    <q-icon name="search" color="info" />
                  </template>
                </q-input>

                <!-- FILTER -->
                <q-btn-dropdown
                  color="secondary"
                  :label="selectedAreaValue?.division || 'FILTER AREA'"
                  split
                  class="filter-btn"
                >
                  <q-list>
                    <q-item
                      v-for="option in areaValueOptions"
                      :key="option.divisionCode"
                      clickable
                      @click="selectArea(option)"
                    >
                      <q-item-section>{{ option.division }}</q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </q-card-section>

              <hrRefComponentsTable
                v-show="showTable"
                :items="filteredRefDisAll"
                :pagination="{ rowsPerPage: 8 }"
                :columns="disRefColumns"
                :hrStats="hrStats"
                :disCod="disCod"
                :disSpeOF="disSpeOF"
                :Occurrences="Occurrences"
                :Penalty="Penalty"
                style="border-collapse: collapse"
                :loading="loading"
              />
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>
      </q-card>
    </div>
  </div>

  <img
    src="../assets/BGCORE.png"
    style="
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
    "
  />
</template>

<script>
import hrRepComponents from "src/components/HRRepTables.vue";
import hrRefComponents from "src/components/HRRefTables.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      loading: true,
      showTable: false,
      hrTab: "reportable", // default active tab

      disRepAll: [],
      disRefAll: [],
      disEmployees: [],
      disRefColumns: [
        {
          name: "viewIR",
          label: "INCIDENT REPORT DETAILS",
          align: "left",
          field: "id",
        },
        { name: "IRNo", label: "IRNUMBER", align: "left", field: "iRNo" },
        {
          name: "departmentNumber",
          label: "INCIDENT RESPONDER (DEPARTMENT)",
          align: "left",
          field: "department_Description",
        },
        {
          name: "subject",
          label: "SUBJECT OF THE INCIDENT",
          align: "left",
          field: "subjectName",
        },
        {
          name: "topic",
          label: "TOPIC",
          align: "left",
          field: "subjectTopic",
        },
        { name: "QA", label: "QA IN-CHARGE", align: "left", field: "id" },
        {
          name: "hrReferral",
          label: "HR REFERRAL",
          align: "left",
          field: "hrReferral,",
        },
        {
          name: "divisionCode",
          label: "AREA",
          align: "left",
          field: "divisionCode",
        },
        // { name: 'qaref', label: 'HR EVALUATION', align: 'left', field: 'QAReferral,' },
        // {
        //   name: "financialLia",
        //   label: "PECUNIARY LIABILITY",
        //   align: "left",
        //   field: "id",
        // },
        // { name: 'demerit', label: 'EMPLOYEE OFFENSE RECORD', align: 'left', field: 'id' },
        // {
        //   name: "hrnotes",
        //   label: "HUMAN RESOURCES(HR) NOTE",
        //   align: "left",
        //   field: "newHRNote",
        // },
        // { name: "hrstatus", label: "STATUS", align: "left", field: "hRStatus" },
        // { name: 'rcastatus', label: 'RCA SUBMITTED', align: 'left', field: 'RCA'},
        // { name: 'hrdisAct', label: 'NTE REQUIRED', align: 'left', field: 'HRDicipAction' },
      ],

      disRepColumns: [
        {
          name: "viewIR",
          label: "INCIDENT REPORT DETAILS",
          align: "left",
          field: "id",
        },
        { name: "IRNo", label: "IRNUMBER", align: "left", field: "iRNo" },
        {
          name: "departmentNumber",
          label: "INCIDENT RESPONDER (DEPARTMENT)",
          align: "left",
          field: "department_Description",
        },
        {
          name: "subject",
          label: "SUBJECT OF THE INCIDENT",
          align: "left",
          field: "subjectName",
        },
        {
          name: "topic",
          label: "TOPIC",
          align: "left",
          field: "subjectTopic",
        },
        {
          name: "divisionCode",
          label: "AREA",
          align: "left",
          field: "divisionCode",
        },
      ],

      hrStats: [
        { label: "OPEN", value: true },
        { label: "CLOSED", value: false },
      ],

      Occurrences: [
        { label: "1ST", value: "1ST" },
        { label: "2ND", value: "2ND" },
        { label: "3RD", value: "3RD" },
        { label: "4TH", value: "4TH" },
        { label: "5TH", value: "5TH" },
      ],

      Penalty: [
        { label: "VERBAL WARNING", value: "VERBAL WARNING" },
        { label: "WRITTEN WARNING", value: "WRITTEN WARNING" },
        { label: "SUSPENSION", value: "SUSPENSION" },
        { label: "DISMISSAL", value: "DISMISSAL" },
      ],

      disCod: [],
      disSpeOF: [],
      date: new Date(),
      selectedStatus: null,
      searchRefQuery: "",
      DisciplineCode: null,
      PenaltiesCode: null,

      searchRepQuery: "",
      selectedAreaValue: { division: "ALL", divisionCode: null },
      selectedRepStatus: null,

      areaValueOptions: [
        { division: "ALL", divisionCode: null },
        { division: "ACADEME", divisionCode: "ACD-01" },
        { division: "ADMIN", divisionCode: "ADM-03" },
        { division: "HOSPITAL", divisionCode: "HST-02" },
      ],
    };
  },

  computed: {
    ...mapGetters({
      getForm: "ApplyStore/getForm",
      getHR: "ApplyStore/getHR",
      departments: "ApplyStore/departments",
      // employees: "ApplyStore/employees",
    }),

    filteredRefDisAll() {
      const { disRefAll, selectedStatus, selectedAreaValue, searchRefQuery } =
        this;
      let filteredData = [...disRefAll];
      if (selectedStatus && typeof selectedStatus === "object") {
        const { value: statusValue } = selectedStatus;
        filteredData = filteredData.filter(
          (item) => item.HRStatus === statusValue
        );
      }

      if (selectedAreaValue && selectedAreaValue.divisionCode) {
        filteredData = filteredData.filter(
          (item) => item.divisionCode === selectedAreaValue.divisionCode
        );
      }

      if (searchRefQuery && typeof searchRefQuery === "string") {
        const query = searchRefQuery.toLowerCase();
        filteredData = filteredData.filter((item) =>
          Object.values(item).some(
            (val) =>
              typeof val === "string" && val.toLowerCase().includes(query)
          )
        );
      }
      return filteredData;
    },

    filteredRepDisAll() {
      const {
        disRepAll,
        selectedRepStatus,
        selectedAreaValue,
        searchRepQuery,
      } = this;
      let filteredData = [...disRepAll];
      if (selectedRepStatus && typeof selectedRepStatus === "object") {
        const { value: statusValue } = selectedRepStatus;
        filteredData = filteredData.filter(
          (item) => item.HRStatus === statusValue
        );
      }

      if (selectedAreaValue && selectedAreaValue.divisionCode) {
        filteredData = filteredData.filter(
          (item) => item.divisionCode === selectedAreaValue.divisionCode
        );
      }

      if (searchRepQuery && typeof searchRepQuery === "string") {
        const query = searchRepQuery.toLowerCase();
        filteredData = filteredData.filter((item) =>
          Object.values(item).some(
            (val) =>
              typeof val === "string" && val.toLowerCase().includes(query)
          )
        );
      }
      return filteredData;
    },
  },

  components: {
    hrRepComponentsTable: hrRepComponents,
    hrRefComponentsTable: hrRefComponents,
  },

  mounted() {
    setTimeout(() => {
      this.showTable = true;
      this.disRefAll;
      this.disRepAll;
      this.loading = false;
    }, 3000);
  },

  mounted() {
    // 🔹 Initial delay (3 seconds)
    setTimeout(() => {
      this.showTable = true;
      this.disRefAll;
      this.disRepAll;
      this.loading = false;
    }, 3000);

    // 🔹 Auto fetch every 60 seconds
    this.interval = setInterval(() => {
      this.getHRRepInc();
      this.getHRRefInc();
    }, 60000);
  },

  created() {
    this.getHRRepInc();
    this.getHRRefInc();
    // this.getCod();
    // this.getSpeOf();
    // this.getEmployees();
  },

  methods: {
    // async getEmployees() {
    //   try {
    //     await this.$store.dispatch("ApplyStore/Employees");
    //     this.disEmployees = this.employees;
    //   } catch (error) {
    //     console.error("Error displaying data:", error);
    //   }
    // },

    // async getCod() {
    //   try {
    //     await this.$store.dispatch("ApplyStore/codedis");
    //     this.disCod = this.getForm;
    //   } catch (error) {
    //     console.error("Error inserting data:", error);
    //   }
    // },

    // async getSpeOf() {
    //   try {
    //     await this.$store.dispatch("ApplyStore/speOfdis");
    //     this.disSpeOF = this.getForm;
    //   } catch (error) {
    //     console.error("Error inserting data:", error);
    //   }
    // },

    async getHRRepInc() {
      try {
        await this.$store.dispatch("ApplyStore/disHRRep");
        this.disRepAll = this.getHR;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    async getHRRefInc() {
      try {
        await this.$store.dispatch("ApplyStore/disHRRef");
        this.disRefAll = this.getForm;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    search() {},

    async selectStatus(option) {
      this.selectedStatus = option;
    },

    selectArea(option) {
      this.selectedAreaValue = option;
    },
  },
};
</script>

<style>
/* //////////////////// HEADER //////////////////// */

.dashboard-header {
  width: 100%;
  border-radius: 8px;
  background: #ffffff;
  text-align: left;
}

.icon-wrapper {
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: rgba(2, 64, 137, 0.08);
}

.accent-line {
  width: 60px;
  height: 3px;
  background: #024089;
  border-radius: 2px;
}

.active-tab {
  background-color: #ffc619; /* mint green */
  font-weight: bold;
  color: black;
  border-radius: 10px;
}

/* //////////////////// /////////// //////////////////// */

.my-card {
  height: 500px;
  width: 100%;
  margin-bottom: 25px;
}
.filtertab {
  background-color: #0f4d91;
  font-weight: bold;
  border: 0.1em solid #f3f4f7;
  box-shadow: 0 4px 8px rgba(243, 238, 238, 0.1);
  font-style: Arial Black;
}
.IRHHText {
  font-weight: bold;
  font-style: roboto;
  font-family: Arial Black;
  display: flex;
  color: #ffc619;
  font-size: 35px;
  justify-content: center;
}

/* ///////////////////////////////////////TABLE////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.table-with-border {
  border-bottom: 2em solid hsl(220, 22%, 81%);
  border-collapse: collapse;
  margin-top: 25px;
}
.q-table-container {
  border-radius: 5px;
  overflow: hidden;
}
.q-table td,
.q-table th {
  padding: 8px;
  border: 0.5px solid #ccc;
  text-align: center;
  max-width: 300px; /* Set a maximum width for cells */
  word-wrap: break-word; /* Enable word wrapping */
  white-space: normal; /* Allow the text to wrap to the next line */
}
.q-table th {
  background-color: #0f4d91;
  color: #fff;
}
.q-table tbody tr:nth-child(odd) {
  background-color: #f4f4f4;
  padding: 8px;
}
.q-table button {
  height: 30px; /* Set your desired height */
  width: 80px; /* Set your desired width */
  border-radius: 5px;
  margin: 0;
  padding: 0;
}

/* ///////////////////////////////////////HRIR///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.custom-item-section {
  border: 1px solid #ccc; /* Border style */
  border-radius: 1px; /* Border radius */
  padding: 5px; /* Optional padding */
}
.HRVDia {
  background-image: url("../assets/BGCORE.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #f4f7fc;
  padding-top: 20px;
  padding-bottom: 40px;
  min-height: 100vh;
}

.formseparatorYellow {
  background-color: #ffc619;
  height: 2px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.formseparatorBlue {
  background-color: #6b7c93;
  height: 2px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.formseparatorWhite {
  background-color: #fff;
  height: 2px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.contentFormHR {
  border: 2px solid #f0f2f5;
  margin-left: auto;
  margin-right: auto;
  border-radius: 25px;
  padding: 20px;
  background-color: #ffffff;
  width: 1100px;
  height: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.HRFixDesign {
  width: 99.5%;
  margin: 5px;
  font-size: 15px;
  background-color: #ffffff;
}

.HRDes1 {
  font-size: 15px;
  border: 0.1em solid #ffffff;
}

.HRDes {
  font-size: 15px;
  border: 0.1em solid #ffffff;
}

.HRFileDes {
  padding: 8px;
  margin-top: 5px;
  font-size: 15px;
  border: 0.1em solid #003566;
  background-color: #e3f2fd;
}

/*
.HRVHead {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 85px;
  width: 100%;
  border: 0.2em solid #f3f4f7;
  background-color: #003566;
  border: 0.6em solid #d5d7da;
}
.HRVText {
  font-weight: bold;
  font-style: roboto;
  display: flex;
  flex: 1;
  color: #ffc619;
  font-size: 25px;
}
.HRVBC {
  display: flex;
}
.HRVList {
  height: 15%;
  width: 100%;
  border: 0.1em solid #cacaca;
  background-color: #003566;
}
.HRVGT {
  font-weight: bold;
  display: flex;
  color: #ffc619;
  font-size: 20px;
  justify-content: center;
}

.HRDesContent {
  border: 0.1em solid #cacaca;
  margin-top: 5px;
}
.HRDesign {
  width: 70%;
  margin: 5px;
  font-size: 15px;
  background-color: #ffffff;
}
.HRDesign2 {
  width: 25%;
  margin: 5px;
  font-size: 15px;
  background-color: #ffffff;
}
.HRDes {
  padding: 8px;
  margin-top: 5px;
  width: 98%;
  font-size: 15px;
  border: 0.1em solid #ffffff;
}
.HRFileDes {
  padding: 8px;
  margin-top: 5px;
  font-size: 15px;
  border: 0.1em solid #003566;
  background-color: #e3f2fd;
}
.HRIRND {
  font-weight: bold;
  display: flex;
  color: #ffc619;
  font-size: 20px;
  justify-content: center;
}
.HRFixDesign {
  width: 99.5%;
  margin: 5px;
  font-size: 15px;
  background-color: #ffffff;
}
.HRDes1 {
  padding: 8px;
  margin: 5px;
  font-size: 15px;
  border: 0.1em solid #ffffff;
}
.HRlist {
  height: 30%;
  width: 100%;
  margin-top: 15px;
  border: 0.1em solid #cacaca;
  background-color: #003566;
} */
/* ///////////////////////////////////////HRDISACTION ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.HRDA {
  height: 75px;
  border: 0.2em solid #f3f4f7;
  background-color: #003566;
  border: 0.6em solid #d5d7da;
}
.HRDAText {
  font-weight: bold;
  font-style: roboto;
  display: flex;
  color: #ffc619;
  font-size: 25px;
  justify-content: center;
}

/* ///////////////////////////////////////DEMERIT///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.HRDE {
  width: 500px;
  background-color: #ffffff;
  border: 0.2em solid #f3f4f7;
  font-weight: bold;
  font-style: Arial Black;
}
.HRDHead {
  height: 70px;
  border: 0.2em solid #f3f4f7;
  background-color: #003566;
  border: 0.6em solid #d5d7da;
}
.HRDText {
  font-weight: bold;
  font-style: roboto;
  display: flex;
  color: #ffc619;
  font-size: 25px;
  justify-content: center;
}
.HRDEH {
  width: 100%;
  border: 0.1em solid #cacaca;
  background-color: #003566;
  height: 40px;
  padding: 1px;
  display: flex;
  align-items: center;
}
.HRDEHText {
  font-weight: bold;
  color: #ffc619;
  margin-left: 20px;
  font-size: 18px;
  flex: 1;
  justify-content: center;
}

/* ///////////////////////////////////////HRNOTE///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.HRNT {
  background-color: #ffffff;
  height: 320px;
  width: 560px;
  border: 0.2em solid #f3f4f7;
}
.HRNHead {
  height: 70px;
  border: 0.2em solid #f3f4f7;
  background-color: #003566;
  border: 0.6em solid #d5d7da;
}
.HRNText {
  font-weight: bold;
  font-style: roboto;
  display: flex;
  flex: 1;
  color: #ffc619;
  font-size: 25px;
}

/* ///////////////////////////////////////HRSTATUS///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.HRHS {
  height: 85px;
  border: 0.2em solid #f3f4f7;
  background-color: #003566;
  border: 0.6em solid #d5d7da;
}
.HRHSTest {
  font-weight: bold;
  font-style: roboto;
  display: flex;
  color: #ffc619;
  font-size: 25px;
  justify-content: center;
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.spinner {
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 100px;
  margin-left: 45%;
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.non-transparent-dialog {
  background-color: white; /* Change to the desired background color */
}

.centered-card {
  width: 450px;
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #003566;
  border: 0.6em solid #d5d7da;
}

.spinner-container {
  display: flex;
  flex-direction: column;
  color: #dfe8f0;
  align-items: center;
}

.please-wait {
  margin-top: 10px;
  font-style: roboto;
  font-weight: bold;
  font-size: 20px;
  color: #ffc619;
  display: flex;
}
</style>
