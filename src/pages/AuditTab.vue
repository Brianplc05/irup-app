<template>
  <div id="q-app" style="position: relative; z-index: 1">
    <div style="height: 100%; width: 100%" class="q-pa-lg">
      <!-- HEADER -->
      <q-card class="dashboard-header" style="border: 2px solid #e0e0e0">
        <q-card-section class="row items-center no-wrap">
          <div class="row items-center no-wrap">
            <div class="icon-wrapper">
              <q-icon name="assessment" size="35px" color="primary" />
            </div>

            <div class="q-ml-md text-left">
              <div
                class="text-h5 text-weight-medium text-primary text-uppercase"
              >
                REPORT MODULE
              </div>

              <div class="text-grey-7 q-mt-xs">
                Welcome to the Incident Reporting & Unified Platform (IRUP)
                Report Module!
              </div>

              <div class="accent-line q-mt-sm"></div>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <q-card-section
        v-if="loading"
        class="fixed-full flex flex-center column q-gutter-md"
        style="background-color: rgba(255, 255, 255, 0.7); z-index: 9999"
      >
        <q-spinner-ball size="150px" color="primary" />
        <div class="text-subtitle1 text-primary">Please wait...</div>
      </q-card-section>

      <!-- MAIN CARD -->
      <q-card
        class="dashboard-header q-mt-md q-pa-sm"
        style="border: 2px solid #e0e0e0"
      >
        <q-card-section style="border: 2px solid #e0e0e0">
          <div class="filter-section">
            <div class="report-section">
              <div
                class="text-h5 text-weight-medium text-primary text-uppercase"
              >
                INCIDENT REPORT HISTORY
              </div>

              <div class="text-grey-7 text-weight-medium">
                Total Incident Report :
                <q-badge
                  class="q-pa-sm text-bold"
                  outline
                  color="primary"
                  style="font-size: 15px"
                >
                  {{ totalReport }}
                </q-badge>
              </div>
            </div>

            <q-space />

            <div class="filter-section">
              <q-input
                v-model="searchQuery"
                label="SEARCH"
                dense
                outlined
                class="search-input"
              >
                <template v-slot:append>
                  <q-icon name="search" color="info" />
                </template>
              </q-input>

              <q-btn-dropdown
                color="secondary"
                :label="selectedArea?.division || 'FILTER AREA'"
                split
                class="filter-btn"
              >
                <q-list>
                  <q-item
                    v-for="option in areaOptions"
                    :key="option.divisionCode"
                    clickable
                    @click="selectArea(option)"
                  >
                    <q-item-section>
                      {{ option.division }}
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>

              <q-btn-dropdown
                color="secondary"
                :label="selectedStatus?.label || 'FILTER STATUS'"
                split
                class="filter-btn"
              >
                <q-list>
                  <q-item
                    v-for="option in qaStats"
                    :key="option.value"
                    clickable
                    @click="selectStatus(option)"
                  >
                    <q-item-section>
                      {{ option.label }}
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
          </div>

          <div
            class="q-mt-md"
            style="border: 2px solid #e0e0e0; border-radius: 10px"
          >
            <AuditTables
              v-show="showTable"
              :items="filteredDisAll"
              :columns="disColumns"
              :rows-per-page-options="[10]"
              :loading="loading"
              flat
              bordered
              class="my-custom-scroll"
              style="border-radius: 10px"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>

  <!-- BACKGROUND -->
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
import AuditTables from "../components/AuditTable.vue";
import { mapGetters } from "vuex";

export default {
  components: { AuditTables },

  data() {
    return {
      disAllDetails: [],
      disAllDiv: [],
      selectedArea: { division: "ALL", divisionCode: null },
      selectedStatus: null,
      searchQuery: "",
      loading: true,
      showTable: false,

      disColumns: [
        { name: "viewIR", label: "INCIDENT REPORT DETAILS", align: "left" },
        { name: "IRNo", label: "IR NUMBER", align: "left", field: "iRNo" },
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

      areaOptions: [
        { division: "ALL", divisionCode: null },
        { division: "ACADEME", divisionCode: "ACD-01" },
        { division: "ADMIN", divisionCode: "ADM-03" },
        { division: "HOSPITAL", divisionCode: "HST-02" },
      ],

      qaStats: [
        { label: "OPEN", value: true },
        { label: "CLOSED", value: false },
      ],
    };
  },

  computed: {
    ...mapGetters({
      getForm: "ApplyStore/getForm",
      division: "ApplyStore/division",
    }),

    filteredDisAll() {
      const { disAllDetails, selectedStatus, selectedArea, searchQuery } = this;

      let filteredData = [...disAllDetails];

      // ✅ STATUS FILTER
      if (selectedStatus && typeof selectedStatus === "object") {
        const { value: statusValue } = selectedStatus;
        filteredData = filteredData.filter(
          (item) => item.qAStatus === statusValue
        );
      }

      // ✅ AREA FILTER (SKIP IF ALL)
      if (selectedArea && selectedArea.divisionCode) {
        filteredData = filteredData.filter(
          (item) => item.divisionCode === selectedArea.divisionCode
        );
      }

      // ✅ SEARCH FILTER
      if (searchQuery && typeof searchQuery === "string") {
        const query = searchQuery.toLowerCase();
        filteredData = filteredData.filter((item) =>
          Object.values(item).some(
            (val) =>
              typeof val === "string" && val.toLowerCase().includes(query)
          )
        );
      }

      return filteredData;
    },

    totalReport() {
      return this.filteredDisAll.length;
    },
  },

  mounted() {
    // 🔹 Initial delay (3 seconds)
    setTimeout(() => {
      this.showTable = true;
      this.disAllDetails;
      this.loading = false;
    }, 3000);

    // 🔹 Auto fetch every 60 seconds
    this.interval = setInterval(() => {
      this.getInc();
    }, 60000);
  },

  created() {
    this.getInc();
    this.getDivision();
  },

  methods: {
    async getInc() {
      try {
        await this.$store.dispatch("ApplyStore/disTab");
        this.disAllDetails = this.getForm;
      } catch (error) {
        console.error("Error loading incidents:", error);
      }
    },

    async getDivision() {
      try {
        await this.$store.dispatch("ApplyStore/disFilterDivision");
        this.disAllDiv = this.division;
      } catch (error) {
        console.error("Error loading division:", error);
      }
    },

    search() {},

    selectStatus(option) {
      this.selectedStatus = option;
    },

    selectArea(option) {
      this.selectedArea = option;
    },
  },
};
</script>

<style>
/* ////////////////////  HEADER  /////////////////// */

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

/* //////////////////// FILTER & SEARCH /////////////////// */

.filter-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 30px;
  flex-wrap: wrap;
}

.report-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.report-total {
  display: flex;
  align-items: center;
  font-size: 16px;
}

.filter-section {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  flex-wrap: wrap;
}

.search-input {
  width: 600px;
  border-radius: 10px;
}

.filter-btn {
  width: 180px;
  border-radius: 10px;
}

/* //////////////////// TABLE /////////////////// */
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
</style>
