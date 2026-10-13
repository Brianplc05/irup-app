<template>
  <div id="q-app" style="position: relative; z-index: 1">
    <div style="height: 100%; width: 100%" class="q-pa-lg">
      <q-card class="dashboard-header" style="border: 2px solid #e0e0e0">
        <q-card-section class="row items-start no-wrap">
          <div class="icon-wrapper">
            <q-icon name="dashboard" size="35px" color="primary" />
          </div>

          <div class="q-ml-md text-left">
            <div class="text-h5 text-weight-medium text-primary text-uppercase">
              Dashboard
            </div>

            <div class="text-grey-7 q-mt-xs">
              Welcome to the Incident Reporting & Unified Platform (IRUP)
              Dashboard!
            </div>

            <div class="accent-line q-mt-sm"></div>
          </div>
        </q-card-section>
      </q-card>

      <q-card bordered flat class="q-mt-md">
        <q-card-section class="dashboard-row">
          <!-- INCIDENT STATUS - 35% -->
          <div class="incident-status-panel">
            <div class="dashboard-panel q-pa-sm">
              <div
                class="text-h5 text-weight-medium text-primary text-uppercase text-center q-pt-sm"
              >
                CAPA IMPLEMENTATION RATE
              </div>

              <div class="text-grey-7 q-mt-xs q-pa-sm">
                <p>
                  This section shows the percentage of Corrective and Preventive
                  Actions (CAPA) that have been implemented based on the
                  reported incidents. It provides an overview of the
                  organization’s progress in addressing identified issues and
                  ensuring that appropriate actions are completed.
                </p>

                <p class="q-mt-md">
                  For more detailed information about the incidents and their
                  corresponding CAPA actions, you may click
                  <strong>“Download Incident Reports”</strong>.
                </p>

                <q-btn
                  flat
                  rounded
                  push
                  @click="downloadIncidentContent"
                  :ripple="{ center: true }"
                  icon="add_card"
                  label="DOWNLOAD INCIDENT REPORTS"
                  class="q-pa-sm bg-accent"
                  color="black"
                  style="width: 280px; border-radius: 10px"
                >
                  <q-dialog v-model="downloadIR" persistent>
                    <q-card style="width: 1800px; max-width: 90vw">
                      <q-card-section
                        class="row items-center justify-between bg-primary text-white"
                      >
                        <div
                          class="text-h5 text-weight-medium text-white text-uppercase text-center"
                        >
                          GENERATE INCIDENT REPORT DETAILS
                        </div>

                        <q-btn
                          dense
                          flat
                          icon="close"
                          v-close-popup
                          @click="this.downloadIR = false"
                        >
                          <q-tooltip>Close</q-tooltip>
                        </q-btn>
                      </q-card-section>

                      <q-separator></q-separator>

                      <q-card-section class="q-ma-md">
                        <div class="row q-col-gutter-md justify-start">
                          <div class="col-12 col-md-4 col-lg-2">
                            <q-select
                              outlined
                              v-model="selectedMonth"
                              :options="monthOption"
                              option-label="label"
                              option-value="value"
                              emit-value
                              map-options
                              label="Month"
                            />
                          </div>

                          <div class="col-12 col-md-4 col-lg-2">
                            <q-input
                              outlined
                              v-model="inputedYear"
                              label="Year"
                              inputmode="numeric"
                              maxlength="4"
                              :error="yearError"
                              error-message="Please enter numbers only."
                              @update:model-value="validateYear"
                            />
                          </div>

                          <div class="col-12 col-md-4 col-lg-2">
                            <q-btn
                              flat
                              rounded
                              push
                              @click="filterIncidentContent()"
                              :ripple="{ center: true }"
                              label="FILTER INCIDENT REPORTS"
                              class="q-pa-sm q-mt-sm bg-accent"
                              color="black"
                              style="width: 250px; border-radius: 10px"
                            />
                          </div>
                        </div>

                        <q-table
                          flat
                          bordered
                          :rows="displayFilteredData"
                          :columns="disFilterColumns"
                          color="primary"
                          row-key="iRNo"
                          :rows-per-page-options="[10]"
                        >
                          <template v-slot:top-right>
                            <q-btn
                              flat
                              rounded
                              push
                              class="q-pa-sm bg-primary"
                              color="white"
                              icon-right="archive"
                              label="EXPORT TO CSV"
                              no-caps
                              @click="exportTable"
                              style="width: 200px; border-radius: 10px"
                            />
                          </template>

                          <template v-slot:body-cell-subjectDate="props">
                            <q-td :props="props">
                              {{ FormatDate(props.row.subjectDate) }}
                            </q-td>
                          </template>

                          <template v-slot:body-cell-dateTimeCreated="props">
                            <q-td :props="props">
                              {{ FormatDate(props.row.dateTimeCreated) }}
                            </q-td>
                          </template>

                          <template v-slot:body-cell-dateTimeRCA="props">
                            <q-td :props="props">
                              {{ FormatDate(props.row.dateTimeRCA) }}
                            </q-td>
                          </template>

                          <template
                            v-slot:body-cell-actionCorrectiveDate1="props"
                          >
                            <q-td :props="props">
                              {{ FormatDate(props.row.actionCorrectiveDate1) }}
                            </q-td>
                          </template>

                          <template
                            v-slot:body-cell-actionCorrectiveDate2="props"
                          >
                            <q-td :props="props">
                              {{ FormatDate(props.row.actionCorrectiveDate2) }}
                            </q-td>
                          </template>

                          <template
                            v-slot:body-cell-actionCorrectiveDate3="props"
                          >
                            <q-td :props="props">
                              {{ FormatDate(props.row.actionCorrectiveDate3) }}
                            </q-td>
                          </template>

                          <template
                            v-slot:body-cell-actionCorrectiveDate4="props"
                          >
                            <q-td :props="props">
                              {{ FormatDate(props.row.actionCorrectiveDate4) }}
                            </q-td>
                          </template>

                          <template
                            v-slot:body-cell-actionCorrectiveDate5="props"
                          >
                            <q-td :props="props">
                              {{ FormatDate(props.row.actionCorrectiveDate5) }}
                            </q-td>
                          </template>

                          <template v-slot:no-data>
                            <div class="text-center text-grey-7 q-pa-md">
                              No incident reports found for the selected month
                              and year.
                            </div>
                          </template>
                        </q-table>
                      </q-card-section>
                    </q-card>
                  </q-dialog>
                </q-btn>
              </div>
            </div>
          </div>

          <!-- REPORTABLE INCIDENT - 65% -->
          <div class="reportable-incident-panel">
            <div class="dashboard-panel">
              <div
                class="text-h5 text-weight-medium text-primary text-uppercase text-center q-pt-sm"
              >
                INCIDENT STATUS
              </div>

              <StackedGraph
                :options="incidentStatusChartOptions"
                :series="incidentStatusSeries"
                class="q-mt-xs"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>

      <q-card bordered flat class="q-mt-md">
        <q-card-section class="dashboard-row">
          <!-- CLOSURE -->
          <div class="closure-panel">
            <div class="dashboard-panel q-pa-sm">
              <div
                class="text-h5 text-weight-medium text-primary text-uppercase text-center"
              >
                INCIDENT CLOSURE TURNAROUND TIME (TAT)
              </div>

              <div class="text-grey-7 text-center q-mt-xs q-pa-sm">
                <p>
                  Measures the average time taken to close an incident from the
                  date it was reported.
                </p>
              </div>

              <BarClosureGraph :data="disCountClosureTaT" />
            </div>
          </div>

          <!-- REPORTABLE -->
          <div class="reported-panel">
            <div class="dashboard-panel q-pa-sm">
              <div
                class="text-h5 text-weight-medium text-primary text-uppercase text-center"
              >
                REPORTABLE INCIDENTS
              </div>

              <div class="text-grey-7 text-center q-mt-xs q-pa-sm">
                <p>
                  Any unusual, unplanned, or disruptive event, whether actual or
                  potential, that poses or may pose a significant risk to the
                  organization as defined by this policy.
                </p>
              </div>

              <PieGraph :data="disCountRep" />
            </div>
          </div>
        </q-card-section>
      </q-card>

      <q-card bordered flat class="q-mt-md">
        <q-card-section class="dashboard-row">
          <!-- DEPARTMENT INVOLVED -->
          <div class="reported-panel">
            <div class="dashboard-panel q-pa-sm">
              <div
                class="text-h5 text-weight-medium text-primary text-uppercase text-center"
              >
                INCIDENTS PER DEPARTMENT
              </div>

              <div class="text-grey-7 text-center q-mt-xs q-pa-sm">
                <p>
                  Displays the number of reported incidents categorized by
                  department.
                </p>
              </div>

              <PieDepartmentGraph :data="disCountDepartmentInvolved" />
            </div>
          </div>

          <!-- AGING -->
          <div class="aging-panel">
            <div class="dashboard-panel q-pa-sm">
              <div
                class="text-h5 text-weight-medium text-primary text-uppercase text-center"
              >
                AVERAGE AGING OF OPEN INCIDENTS (DAYS)
              </div>

              <div class="text-grey-7 text-center q-mt-xs q-pa-sm">
                <p>
                  Measures the average number of days that incidents have
                  remained open and unresolved.
                </p>
              </div>

              <BarAgingGraph :data="disCountAgingTaT" />
            </div>
          </div>
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
import Stacked from "../components/Charts/StackedGraph.vue";
import Pie from "../components/Charts/PieGraph.vue";
import PieDepartment from "src/components/Charts/PieDepartment.vue";
import BarClosureTaT from "src/components/Charts/BarClosureTaT.vue";
import BarAgingTaT from "src/components/Charts/BarAgingTaT.vue";
import { mapGetters } from "vuex";
import { exportFile } from "quasar";

export default {
  components: {
    StackedGraph: Stacked,
    PieGraph: Pie,
    PieDepartmentGraph: PieDepartment,
    BarClosureGraph: BarClosureTaT,
    BarAgingGraph: BarAgingTaT,
  },

  data() {
    return {
      displayIncidentStatus: [],
      downloadIR: false,

      selectedMonth: null,
      inputedYear: null,
      yearError: false,

      monthOption: [
        { label: "All Months", value: 0 },
        { label: "January", value: 1 },
        { label: "February", value: 2 },
        { label: "March", value: 3 },
        { label: "April", value: 4 },
        { label: "May", value: 5 },
        { label: "June", value: 6 },
        { label: "July", value: 7 },
        { label: "August", value: 8 },
        { label: "September", value: 9 },
        { label: "October", value: 10 },
        { label: "November", value: 11 },
        { label: "December", value: 12 },
      ],

      displayFilteredData: [],

      disFilterColumns: [
        {
          name: "IRNo",
          label: "IRNUMBER",
          align: "left",
          field: "iRNo",
        },
        {
          name: "dept_Desc",
          label: "PRIMARY DEPARTMENT INVOLVED",
          align: "left",
          field: "dept_Desc",
        },
        {
          name: "subject",
          label: "REPORTABLE INCIDENT",
          align: "left",
          field: "subjectName",
        },
        {
          name: "subjectSpecificExam",
          label: "PARTICULAR INCIDENT",
          align: "left",
          field: "subjectSpecificExam",
        },
        {
          name: "subjectDate",
          label: "INCIDENT DATE",
          align: "left",
          field: "subjectDate",
        },
        {
          name: "dateTimeCreated",
          label: "DATE REPORTED",
          align: "left",
          field: "dateTimeCreated",
        },
        {
          name: "dateTimeRCA",
          label: "DATE OF RCA/CA",
          align: "left",
          field: "dateTimeRCA",
        },
        {
          name: "actionCorrective1",
          label: "ACTION 1 DETAILS",
          align: "left",
          field: "actionCorrective1",
        },
        {
          name: "actionCorrectiveDate1",
          label: "ACTION 1 DONE",
          align: "left",
          field: "actionCorrectiveDate1",
        },
        {
          name: "actionCorrective2",
          label: "ACTION 2 DETAILS",
          align: "left",
          field: "actionCorrective2",
        },
        {
          name: "actionCorrectiveDate2",
          label: "ACTION 2 DONE",
          align: "left",
          field: "actionCorrectiveDate2",
        },
        {
          name: "actionCorrective3",
          label: "ACTION 3 DETAILS",
          align: "left",
          field: "actionCorrective3",
        },
        {
          name: "actionCorrectiveDate3",
          label: "ACTION 3 DONE",
          align: "left",
          field: "actionCorrectiveDate3",
        },
        {
          name: "actionCorrective4",
          label: "ACTION 4 DETAILS",
          align: "left",
          field: "actionCorrective4",
        },
        {
          name: "actionCorrectiveDate4",
          label: "ACTION 4 DONE",
          align: "left",
          field: "actionCorrectiveDate4",
        },
        {
          name: "actionCorrective5",
          label: "ACTION 5 DETAILS",
          align: "left",
          field: "actionCorrective5",
        },
        {
          name: "actionCorrectiveDate5",
          label: "ACTION 5 DONE",
          align: "left",
          field: "actionCorrectiveDate5",
        },
      ],

      disCountRep: [],
      disCountClosureTaT: [],
      disCountAgingTaT: [],
      disCountDepartmentInvolved: [],
    };
  },

  computed: {
    ...mapGetters({
      getCountInstatus: "ApplyStore/getCountInstatus",
      getFilteredData: "ApplyStore/getFilteredData",
      getCountRep: "ApplyStore/getCountRep",
      getCountClosureTaT: "ApplyStore/getCountClosureTaT",
      getCountAgingTaT: "ApplyStore/getCountAgingTaT",
      getCountDepartmentInvolved: "ApplyStore/getCountDepartmentInvolved",
    }),

    /* INCIDENT STATUS */
    incidentStatusSeries() {
      const data = Array.isArray(this.displayIncidentStatus)
        ? this.displayIncidentStatus
        : [];

      return [
        {
          name: "WITHOUT RCA/CA",
          data: data.map((item) => Number(item["wITHOUT RCA/CA"]) || 0),
        },
        {
          name: "WITH RCA/CA AS OF TO DATE",
          data: data.map(
            (item) => Number(item["wITH RCA/CA AS OF TO DATE"]) || 0
          ),
        },
        {
          name: "RESOLVED AS OF TO DATE",
          data: data.map((item) => Number(item["rESOLVED AS OF TO DATE"]) || 0),
        },
      ];
    },

    incidentStatusChartOptions() {
      const data = Array.isArray(this.displayIncidentStatus)
        ? this.displayIncidentStatus
        : [];

      return {
        chart: {
          type: "bar",
          height: 350,
          stacked: true,
          toolbar: {
            show: true,
          },
          zoom: {
            enabled: true,
          },
        },

        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
            borderRadiusApplication: "end",

            dataLabels: {
              total: {
                enabled: true,
                style: {
                  fontSize: "13px",
                  fontWeight: 900,
                },
              },
            },
          },
        },

        xaxis: {
          categories: data.map((item) => item.mONTH),
        },

        yaxis: {
          min: 0,
          labels: {
            formatter: (val) => Math.round(val),
          },
        },

        legend: {
          position: "top",
          horizontalAlign: "center",
          offsetY: 0,
          fontSize: "12px",
          itemMargin: {
            horizontal: 8,
            vertical: 0,
          },
        },

        fill: {
          opacity: 1,
        },

        dataLabels: {
          enabled: false,
        },
      };
    },
  },

  created() {
    this.getCountIncidentStats();
    this.getCountReportable();
    this.getCountClosure();
    this.getCountAging();
    this.getCountDepartmentInv();
  },

  methods: {
    FormatDate(dateValue) {
      if (!dateValue) {
        return "";
      }

      const date = new Date(dateValue);

      if (isNaN(date.getTime())) {
        return "";
      }

      const options = {
        year: "numeric",
        month: "long",
        day: "2-digit",
      };

      return date.toLocaleDateString("en-US", options).toUpperCase();
    },

    async getCountIncidentStats() {
      try {
        await this.$store.dispatch("ApplyStore/displayCountIncidentStatus");

        this.displayIncidentStatus = this.getCountInstatus;
      } catch (error) {
        console.error("Error getting insert:", error);
      }
    },

    validateYear(val) {
      this.yearError = /[^0-9]/.test(val);
    },

    downloadIncidentContent() {
      this.downloadIR = true;
    },

    async filterIncidentContent() {
      try {
        const payload = {
          month: this.selectedMonth,
          year: this.inputedYear,
        };

        await this.$store.dispatch(
          "ApplyStore/displayCAPAIncidentStatus",
          payload
        );

        this.displayFilteredData = this.getFilteredData;
      } catch (error) {
        console.error("Error loading risk details:", error);
      }
    },

    /* ================================
      CSV EXPORT
    ================================ */

    wrapCsvValue(val, formatFn, row) {
      let formatted = formatFn !== void 0 ? formatFn(val, row) : val;

      formatted =
        formatted === void 0 || formatted === null ? "" : String(formatted);

      // Escape double quotes
      formatted = formatted.split('"').join('""');

      return `"${formatted}"`;
    },

    exportTable() {
      // Get current columns
      const columns = this.disFilterColumns;

      // Get current filtered rows
      const rows = this.displayFilteredData;

      // Create CSV content
      const content = [
        // COLUMN HEADERS
        columns.map((col) => this.wrapCsvValue(col.label)).join(","),

        // ROW DATA
        ...rows.map((row) =>
          columns
            .map((col) =>
              this.wrapCsvValue(
                typeof col.field === "function"
                  ? col.field(row)
                  : row[col.field === void 0 ? col.name : col.field],

                col.format,

                row
              )
            )
            .join(",")
        ),
      ].join("\r\n");

      // Export CSV using Quasar
      const status = exportFile("incident_report.csv", content, "text/csv");

      // Browser download error
      if (status !== true) {
        this.$q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning",
        });
      } else {
        this.$q.notify({
          message: "Incident report exported successfully.",
          color: "positive",
          icon: "check_circle",
        });
      }
    },

    /* ================================
      REPORTABLE INCIDENT COUNT
    ================================ */

    async getCountReportable() {
      try {
        await this.$store.dispatch("ApplyStore/displayCountReport");
        this.disCountRep = this.getCountRep;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    /* ================================
      CLOSURE TAT COUNT
    ================================ */

    async getCountClosure() {
      try {
        await this.$store.dispatch("ApplyStore/displayCountClosureTAT");
        this.disCountClosureTaT = this.getCountClosureTaT;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    /* ================================
      AGING TAT COUNT
    ================================ */

    async getCountAging() {
      try {
        await this.$store.dispatch("ApplyStore/displayCountAgingTAT");
        this.disCountAgingTaT = this.getCountAgingTaT;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    /* ================================
      DEPARTMENT INVOLVED COUNT
    ================================ */

    async getCountDepartmentInv() {
      try {
        await this.$store.dispatch("ApplyStore/displayCountDepartmentInvolved");
        this.disCountDepartmentInvolved = this.getCountDepartmentInvolved;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
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

/* //////   DASHBOARD  ////// */
.dashboard-row {
  display: flex;
  width: 100%;
  align-items: flex-start;
  gap: 16px;
  box-sizing: border-box;
}

.incident-status-panel {
  flex: 0 0 calc(35% - 8px);
}

.reportable-incident-panel {
  flex: 0 0 calc(65% - 8px);
}

.dashboard-panel {
  width: 100%;
  border: 2px solid #e0e0e0;
  box-sizing: border-box;
}

/* ////////// Q-TABLE STYLES ////////// */
.q-table td,
.q-table th {
  border: 0.5px solid #ccc;
}

.q-table th {
  background-color: #0f4d91;
  color: #fff;
}

/* //////   REPORTABLE   ////// */
.dashboard-row {
  display: flex;
  gap: 16px;
  width: 100%;
}

.reported-panel,
.closure-panel,
.aging-panel {
  flex: 1;
  min-width: 0;
}

.dashboard-panel {
  width: 100%;
  min-height: 200px;
}
</style>
