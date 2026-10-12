<template>
  <div id="q-app" style="position: relative; z-index: 1">
    <div style="height: 100%; width: 100%" class="q-pa-lg">
      <q-card
        class="dashboard-header"
        style="border: 2px solid #e0e0e0"
        v-if="loggedInUser.AreaCode === null"
      >
        <q-card-section class="row items-center no-wrap">
          <!-- LEFT SIDE -->
          <div class="row items-center no-wrap">
            <div class="icon-wrapper">
              <q-icon name="dashboard" size="35px" color="primary" />
            </div>

            <div class="q-ml-md text-left">
              <div
                class="text-h5 text-weight-medium text-primary text-uppercase"
              >
                QUALITY ASSURANCE MODULE
              </div>

              <div class="text-grey-7 q-mt-xs">
                Welcome to the Incident Reporting & Unified Platform (IRUP)
                Quality Assurance!
              </div>

              <div class="accent-line q-mt-sm"></div>
            </div>
          </div>

          <!-- RIGHT SIDE BUTTONS -->
          <div class="row items-center q-gutter-sm q-ml-auto">
            <q-btn
              flat
              rounded
              push
              @click="reportableContent"
              :ripple="{ center: true }"
              icon="add_card"
              label="REPORTABLE INCIDENT"
              class="q-pa-sm bg-accent"
              color="black"
              style="width: 250px; border-radius: 10px"
            >
              <q-dialog maximized v-model="FullContent" persistent>
                <div class="ReportDialog">
                  <q-card class="contentFormReport">
                    <q-card-section
                      class="q-mb-sm row items-center justify-between"
                    >
                      <div
                        class="text-secondary text-weight-bold"
                        style="font-size: 25px; color: #002b5c"
                      >
                        INCIDENT & RISK REGISTRY
                      </div>

                      <q-btn
                        flat
                        icon="close"
                        style="
                          color: #003566;
                          background-color: rgba(22, 110, 204, 0.1);
                        "
                        @click="FullContent = false"
                        v-close-popup
                      >
                        <q-tooltip class="bg-info text-white">
                          Close Form
                        </q-tooltip>
                      </q-btn>
                    </q-card-section>

                    <q-separator class="formseparatorBlue" />

                    <q-card-section>
                      <q-toolbar class="bg-white q-pa-sx q-pt-md">
                        <q-tabs
                          v-model="reporttab"
                          shrink
                          stretch
                          inline-label
                          class="bg-white q-mb-md"
                          style="width: fit-content; margin: auto"
                          indicator-color="transparent"
                        >
                          <q-tab
                            stack
                            :class="[
                              'Reporttab-equal',
                              getTabClass('repIncident'),
                            ]"
                            name="repIncident"
                            label="REPORTABLE INCIDENT"
                            icon="analytics"
                            style="width: 350px; border-radius: 10px"
                            class="q-mx-sm"
                          />
                          <q-tab
                            stack
                            :class="[
                              'Reporttab-equal',
                              getTabClass('repChild'),
                            ]"
                            name="repChild"
                            label="PARTICULAR INCIDENT"
                            icon="assignment"
                            style="width: 350px; border-radius: 10px"
                            class="q-mx-sm"
                          />
                          <q-tab
                            stack
                            :class="[
                              'Reporttab-equal',
                              getTabClass('repUniverse'),
                            ]"
                            name="repUniverse"
                            label="RISK UNIVERSE"
                            icon="assignment"
                            style="width: 350px; border-radius: 10px"
                            class="q-mx-sm"
                          />
                        </q-tabs>
                        <q-space />
                      </q-toolbar>

                      <q-tab-panels
                        v-model="reporttab"
                        animated
                        class="q-mt-md"
                      >
                        <q-tab-panel
                          name="repIncident"
                          style="border: 2px solid #e0e0e0"
                        >
                          <div class="row items-center justify-between q-mb-md">
                            <q-space />

                            <q-input
                              v-model="searchReportable"
                              label="SEARCH "
                              dense
                              outlined
                              rounded
                            >
                              <template v-slot:append>
                                <q-icon name="search" color="info" />
                              </template>
                            </q-input>

                            <q-btn
                              flat
                              rounded
                              push
                              icon="add_card"
                              label="Add Reportable Incident"
                              class="buttonYellowDesign bg-accent text-black shadow-2 q-ml-md"
                              style="
                                border-radius: 10px;
                                width: 295px;
                                text-transform: none;
                              "
                              @click="subjectIncident"
                              :ripple="{ center: true }"
                            />

                            <q-dialog persistent v-model="SubIncident">
                              <q-card class="QAReportable">
                                <q-card-section
                                  class="q-mb-sm row items-center justify-center"
                                >
                                  <div
                                    class="text-secondary text-weight-bold"
                                    style="font-size: 25px; color: #002b5c"
                                  >
                                    ADD REPORTABLE INCIDENT
                                  </div>
                                </q-card-section>

                                <q-separator class="formseparatorBlue" />

                                <q-card-section class="q-gutter-md q-ma-sx">
                                  <q-input
                                    rounded
                                    outlined
                                    v-model="SubjectName"
                                    label-slot
                                  >
                                    <template v-slot:label
                                      >REPORTABLE INCIDENT NAME
                                      <span class="text-red">*</span></template
                                    >
                                  </q-input>

                                  <q-input
                                    rounded
                                    outlined
                                    type="textarea"
                                    v-model="SubjectReptDescription"
                                    label-slot
                                  >
                                    <template v-slot:label
                                      >REPORTABLE INCIDENT DEFINITION
                                      <span class="text-red">*</span></template
                                    >
                                  </q-input>

                                  <div class="row q-gutter-xxl; justify-center">
                                    <q-btn
                                      flat
                                      rounded
                                      push
                                      label="CANCEL"
                                      class="buttonCancelDesign text-info"
                                      @click="onCancelRisk"
                                    />

                                    <q-btn
                                      flat
                                      rounded
                                      push
                                      label="SAVE"
                                      class="buttonSaveDesign bg-accent text-black"
                                      @click="submitRisk"
                                    />
                                  </div>
                                </q-card-section>
                              </q-card>
                            </q-dialog>

                            <q-dialog v-model="waiting" persistent maximized>
                              <div
                                class="fullscreen flex flex-center column q-gutter-md"
                                style="background-color: rgba(0, 0, 0, 0.85)"
                              >
                                <q-spinner-ios size="150px" color="white" />

                                <div
                                  class="text-center text-subtitle1 text-white"
                                >
                                  Doing something.
                                  <br />
                                  <span class="text-italic text-accent"
                                    >Please wait...</span
                                  >
                                </div>
                              </div>
                            </q-dialog>
                          </div>

                          <div>
                            <q-scroll-area style="height: 670px">
                              <q-markup-table class="custom-q-table">
                                <thead>
                                  <tr>
                                    <th
                                      v-for="column in disSubColumns"
                                      :key="column.name"
                                      class="custom-header"
                                    >
                                      {{ column.label }}
                                    </th>
                                  </tr>
                                </thead>

                                <tbody>
                                  <tr
                                    v-for="row in filteredDisSub"
                                    :key="row.id"
                                  >
                                    <td
                                      v-for="column in disSubColumns"
                                      :key="column.name"
                                      class="custom-cell"
                                    >
                                      {{ row[column.field] }}
                                    </td>
                                  </tr>
                                </tbody>
                              </q-markup-table>
                            </q-scroll-area>
                          </div>
                        </q-tab-panel>

                        <q-tab-panel
                          name="repChild"
                          style="border: 2px solid #e0e0e0"
                        >
                          <div class="row items-center justify-between q-mb-md">
                            <q-space></q-space>

                            <q-input
                              v-model="searchRiskChild"
                              label="SEARCH "
                              dense
                              outlined
                              rounded
                            >
                              <template v-slot:append>
                                <q-icon name="search" color="info" />
                              </template>
                            </q-input>

                            <q-btn
                              flat
                              rounded
                              push
                              icon="add_card"
                              label="Add Reportable Children"
                              class="buttonYellowDesign bg-accent text-black shadow-2 q-ml-md"
                              style="
                                border-radius: 10px;
                                width: 295px;
                                text-transform: none;
                              "
                              @click="incidentChildren"
                              :ripple="{ center: true }"
                            />

                            <q-dialog persistent v-model="ChilIncident">
                              <q-card class="QAReportableChi">
                                <q-card-section
                                  class="q-mb-sm row items-center justify-center"
                                >
                                  <div
                                    class="text-secondary text-weight-bold"
                                    style="font-size: 25px; color: #002b5c"
                                  >
                                    ADD PARTICULAR INCIDENT
                                  </div>
                                </q-card-section>

                                <q-separator class="formseparatorBlue" />

                                <q-card-section class="q-gutter-md q-ma-sx">
                                  <q-select
                                    rounded
                                    outlined
                                    use-input
                                    clearable
                                    v-model="SubjectCode"
                                    :options="disAllSubject"
                                    label="REPORTABLE INCIDENT"
                                    emit-value
                                    map-options
                                    :option-value="(option) => option"
                                    :option-label="
                                      (option) => option.subjectName
                                    "
                                  />

                                  <q-input
                                    autogrow
                                    rounded
                                    outlined
                                    v-model="SubjectSpecificExam"
                                    label-slot
                                  >
                                    <template v-slot:label
                                      >PARTICULAR INCIDENT NAME
                                      <span class="text-red">*</span></template
                                    >
                                  </q-input>

                                  <!-- RISK DOMAIN -->
                                  <q-select
                                    rounded
                                    outlined
                                    use-input
                                    clearable
                                    v-model="SubjectRiskCode"
                                    label-slot
                                    :options="disAllDomain"
                                    emit-value
                                    map-options
                                    :option-value="(option) => option"
                                    :option-label="
                                      (option) => option.riskDomain
                                    "
                                    @update:model-value="filterSubDomain"
                                  >
                                    <template v-slot:label>
                                      RISK DOMAIN
                                      <span class="text-red">*</span>
                                    </template>
                                  </q-select>

                                  <!-- RISK SUB-DOMAIN -->
                                  <q-select
                                    rounded
                                    outlined
                                    use-input
                                    clearable
                                    v-model="SubjectRiskSubCode"
                                    label-slot
                                    :options="filteredSubDomains"
                                    emit-value
                                    map-options
                                    :option-value="(option) => option"
                                    :option-label="(option) => option.risk"
                                  >
                                    <template v-slot:label>
                                      RISK SUB-DOMAIN
                                      <span class="text-red">*</span>
                                    </template>
                                  </q-select>

                                  <div class="row q-gutter-xxl; justify-center">
                                    <q-btn
                                      flat
                                      rounded
                                      push
                                      label="CANCEL"
                                      class="buttonCancelDesign text-info"
                                      @click="onCancelRiskChil"
                                    />

                                    <q-btn
                                      flat
                                      rounded
                                      push
                                      label="SAVE"
                                      class="buttonSaveDesign bg-accent text-black"
                                      @click="submitRiskChild()"
                                    />
                                  </div>
                                </q-card-section>
                              </q-card>
                            </q-dialog>
                          </div>

                          <div>
                            <q-scroll-area style="height: 670px">
                              <q-markup-table class="custom-q-table">
                                <thead>
                                  <tr>
                                    <th
                                      v-for="column in disRiskChildColumns"
                                      :key="column.name"
                                      class="custom-header"
                                    >
                                      {{ column.label }}
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    v-for="row in filteredDisRiskChild"
                                    :key="row.id"
                                  >
                                    <td
                                      v-for="column in disRiskChildColumns"
                                      :key="column.name"
                                      class="custom-cell"
                                    >
                                      {{ row[column.field] }}
                                    </td>
                                  </tr>
                                </tbody>
                              </q-markup-table>
                            </q-scroll-area>
                          </div>
                        </q-tab-panel>

                        <q-tab-panel
                          name="repUniverse"
                          style="border: 2px solid #e0e0e0"
                        >
                          <div class="row items-center justify-between q-mb-md">
                            <q-space></q-space>

                            <q-input
                              v-model="searchRiskUni"
                              label="SEARCH "
                              dense
                              outlined
                              rounded
                            >
                              <template v-slot:append>
                                <q-icon name="search" color="info" />
                              </template>
                            </q-input>

                            <q-btn
                              flat
                              rounded
                              push
                              icon="add_card"
                              label="Add Risk Domain"
                              class="buttonYellowDesign bg-accent text-black shadow-1 q-ml-md"
                              style="
                                border-radius: 10px;
                                width: 195px;
                                text-transform: none;
                              "
                              @click="incidentRiskUni()"
                              :ripple="{ center: true }"
                            >
                              <q-dialog persistent v-model="UniIncident">
                                <q-card class="QARiskDomain">
                                  <q-card-section
                                    class="q-mb-sm row items-center justify-center"
                                  >
                                    <div
                                      class="text-secondary text-weight-bold"
                                      style="font-size: 25px; color: #002b5c"
                                    >
                                      ADD RISK DOMAIN
                                    </div>
                                  </q-card-section>

                                  <q-separator class="formseparatorBlue" />

                                  <q-card-section class="q-gutter-md q-ma-sx">
                                    <q-input
                                      rounded
                                      outlined
                                      v-model="RiskDomain"
                                      label-slot
                                    >
                                      <template v-slot:label
                                        >RISK DOMIAN NAME
                                        <span class="text-red"
                                          >*</span
                                        ></template
                                      >
                                    </q-input>

                                    <div
                                      class="row q-gutter-xxl; justify-center"
                                    >
                                      <q-btn
                                        flat
                                        rounded
                                        push
                                        label="CANCEL"
                                        class="buttonCancelDesign text-info"
                                        @click="onCancelRisUni"
                                      />

                                      <q-btn
                                        flat
                                        rounded
                                        push
                                        label="SAVE"
                                        class="buttonSaveDesign bg-accent text-black"
                                        @click="submitRiskUni()"
                                      />
                                    </div>
                                  </q-card-section>
                                </q-card>
                              </q-dialog>

                              <q-dialog
                                v-model="itemWaitDomain"
                                persistent
                                maximized
                              >
                                <div
                                  class="fullscreen flex flex-center column q-gutter-md"
                                  style="background-color: rgba(0, 0, 0, 0.85)"
                                >
                                  <q-spinner-ios size="150px" color="white" />

                                  <div
                                    class="text-center text-subtitle1 text-white"
                                  >
                                    Performing the required action.
                                    <br />
                                    <span class="text-italic text-accent"
                                      >Please wait...</span
                                    >
                                  </div>
                                </div>
                              </q-dialog>
                            </q-btn>

                            <q-btn
                              flat
                              rounded
                              push
                              icon="add_card"
                              label="Add Risk Sub-Domain"
                              class="buttonYellowDesign bg-accent text-black shadow-1 q-ml-sm"
                              style="
                                border-radius: 10px;
                                width: 235px;
                                text-transform: none;
                              "
                              @click="incidentRiskSub()"
                              :ripple="{ center: true }"
                            />

                            <q-dialog persistent v-model="RiskSubIncident">
                              <q-card class="QARiskSubDomain">
                                <q-card-section
                                  class="q-mb-sm row items-center justify-center"
                                >
                                  <div
                                    class="text-secondary text-weight-bold"
                                    style="font-size: 25px; color: #002b5c"
                                  >
                                    ADD RISK SUB-DOMAIN
                                  </div>
                                </q-card-section>

                                <q-separator class="formseparatorBlue" />

                                <q-card-section class="q-gutter-md q-ma-sx">
                                  <q-select
                                    rounded
                                    outlined
                                    use-input
                                    clearable
                                    v-model="DomainRisk"
                                    label-slot
                                    :options="disAllDomain"
                                    emit-value
                                    map-options
                                    :option-value="(option) => option"
                                    :option-label="
                                      (option) => option.riskDomain
                                    "
                                  >
                                    <template v-slot:label>
                                      DOMAIN NAME
                                      <span class="text-red">*</span>
                                    </template>
                                  </q-select>

                                  <q-input
                                    rounded
                                    outlined
                                    v-model="RiskSub"
                                    label-slot
                                  >
                                    <template v-slot:label
                                      >SUB-DOMAIN NAME
                                      <span class="text-red">*</span></template
                                    >
                                  </q-input>

                                  <q-input
                                    rounded
                                    outlined
                                    type="textarea"
                                    v-model="RiskSubDescription"
                                    label-slot
                                  >
                                    <template v-slot:label
                                      >SUB-DOMAIN DEFINITION
                                      <span class="text-red">*</span></template
                                    >
                                  </q-input>
                                </q-card-section>

                                <div class="row q-gutter-xxl; justify-center">
                                  <q-btn
                                    flat
                                    rounded
                                    push
                                    label="CANCEL"
                                    class="buttonCancelDesign text-info"
                                    @click="onCancelRiskSub"
                                  />

                                  <q-btn
                                    flat
                                    rounded
                                    push
                                    label="SAVE"
                                    class="buttonSaveDesign bg-accent text-black"
                                    @click="submitRiskSub"
                                  />
                                </div>
                              </q-card>
                            </q-dialog>
                          </div>

                          <div>
                            <q-scroll-area style="height: 670px">
                              <q-markup-table class="custom-q-table">
                                <thead>
                                  <tr>
                                    <th
                                      v-for="column in disColumnRiskUni"
                                      :key="column.name"
                                      class="custom-header"
                                    >
                                      {{ column.label }}
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    v-for="row in filteredDisRiskUni"
                                    :key="row.id"
                                  >
                                    <td
                                      v-for="column in disColumnRiskUni"
                                      :key="column.name"
                                      class="custom-cell"
                                    >
                                      {{ row[column.field] }}
                                    </td>
                                  </tr>
                                </tbody>
                              </q-markup-table>
                            </q-scroll-area>
                          </div>
                        </q-tab-panel>
                      </q-tab-panels>
                    </q-card-section>
                  </q-card>
                </div>
              </q-dialog>
            </q-btn>

            <q-btn
              flat
              rounded
              push
              @click="departmentContent"
              :ripple="{ center: true }"
              icon="diversity_3"
              label="ACCESS MANAGEMENT"
              class="q-pa-sm bg-accent"
              color="black"
              style="width: 250px; border-radius: 10px"
            >
              <q-dialog maximized v-model="FullDepartmentContent" persistent>
                <div class="ReportDialog">
                  <q-card class="contentFormReport">
                    <q-card-section
                      class="q-mb-sm row items-center justify-between"
                    >
                      <div
                        class="text-secondary text-weight-bold"
                        style="font-size: 25px; color: #002b5c"
                      >
                        ACCESS MANAGEMENT
                      </div>

                      <q-btn
                        flat
                        icon="close"
                        style="
                          color: #003566;
                          background-color: rgba(22, 110, 204, 0.1);
                        "
                        @click="FullContent = false"
                        v-close-popup
                      >
                        <q-tooltip class="bg-info text-white">
                          Close Form
                        </q-tooltip>
                      </q-btn>
                    </q-card-section>

                    <q-separator class="formseparatorBlue" />

                    <q-card-section>
                      <q-toolbar class="bg-white q-pa-sx q-pt-md">
                        <q-tabs
                          v-model="depttab"
                          shrink
                          stretch
                          inline-label
                          class="bg-white q-mb-md"
                          style="width: fit-content; margin: auto"
                          indicator-color="transparent"
                        >
                          <q-tab
                            stack
                            :class="[
                              'Depttab-equal',
                              getTabDeptClass('deptHead'),
                            ]"
                            name="deptHead"
                            label="DEPARTMENTS HEADS"
                            icon="group"
                            style="width: 350px; border-radius: 10px"
                            class="q-mx-sm"
                          />

                          <q-tab
                            stack
                            :class="[
                              'Depttab-equal',
                              getTabDeptClass('deptArea'),
                            ]"
                            name="deptArea"
                            label="AREA ASSIGNMENT"
                            icon="groups"
                            style="width: 350px; border-radius: 10px"
                            class="q-mx-sm"
                          />

                          <q-tab
                            stack
                            :class="[
                              'Depttab-equal',
                              getTabDeptClass('deptRequest'),
                            ]"
                            name="deptRequest"
                            label="REQUEST ACCESS"
                            icon="diversity_3"
                            style="width: 350px; border-radius: 10px"
                            class="q-mx-sm"
                          />
                        </q-tabs>
                        <q-space />
                      </q-toolbar>

                      <q-tab-panels v-model="depttab" animated class="q-mt-md">
                        <q-tab-panel
                          name="deptHead"
                          style="border: 2px solid #e0e0e0"
                        >
                          <div class="row items-center justify-between q-mb-md">
                            <q-space />

                            <q-input
                              v-model="searchDeptHead"
                              label="SEARCH "
                              dense
                              outlined
                              rounded
                              class="q-ml-md"
                            >
                              <template v-slot:append>
                                <q-icon name="search" color="info" />
                              </template>
                            </q-input>

                            <q-btn
                              flat
                              rounded
                              push
                              @click="AddDepartmentContent"
                              :ripple="{ center: true }"
                              icon="add"
                              label="ADD DEPARTMENT HEADS"
                              class="bg-accent text-black text-bold text-center q-ma-sm shadow-2"
                              style="width: 250px; border-radius: 10px"
                            >
                              <q-dialog v-model="AddDepartment" persistent>
                                <q-card class="QADepartment">
                                  <q-card-section
                                    class="q-mb-sm row items-center justify-center"
                                  >
                                    <div
                                      class="text-secondary text-weight-bold"
                                      style="font-size: 25px; color: #002b5c"
                                    >
                                      ADD DEPARTMENT
                                    </div>
                                  </q-card-section>

                                  <q-separator class="formseparatorBlue" />

                                  <q-card-section class="q-gutter-md q-ma-sx">
                                    <q-select
                                      rounded
                                      outlined
                                      use-input
                                      clearable
                                      v-model="DeptName"
                                      :options="disAllDeptList"
                                      label="DEPARTMENT NAME"
                                      @filter="FilterDeptFn"
                                      emit-value
                                      map-options
                                      :option-value="(option) => option"
                                      :option-label="
                                        (option) => option.dESCRIPTION
                                      "
                                    />

                                    <q-select
                                      rounded
                                      outlined
                                      use-input
                                      clearable
                                      v-model="EmployeeDeptCode"
                                      :options="disEmployeeName"
                                      label="EMPLOYEE NAME"
                                      @filter="filterEmpFn"
                                      emit-value
                                      map-options
                                      :option-value="(option) => option"
                                      :option-label="
                                        (option) => option.fullName
                                      "
                                    />
                                  </q-card-section>

                                  <div class="row q-gutter-xxl; justify-center">
                                    <q-btn
                                      flat
                                      rounded
                                      push
                                      label="CANCEL"
                                      class="buttonCancelDesign text-info"
                                      @click="onCancelAddDept"
                                    />

                                    <q-btn
                                      flat
                                      rounded
                                      push
                                      label="SAVE"
                                      class="buttonSaveDesign bg-accent text-black"
                                      @click="submitAddDept()"
                                    />
                                  </div>
                                </q-card>
                              </q-dialog>

                              <q-dialog
                                v-model="itemLoading"
                                persistent
                                maximized
                              >
                                <div
                                  class="fullscreen flex flex-center column q-gutter-md"
                                  style="background-color: rgba(0, 0, 0, 0.85)"
                                >
                                  <q-spinner-ios size="150px" color="white" />

                                  <div
                                    class="text-center text-subtitle1 text-white"
                                  >
                                    Performing the required action.
                                    <br />
                                    <span class="text-italic text-accent"
                                      >Please wait...</span
                                    >
                                  </div>
                                </div>
                              </q-dialog>
                            </q-btn>
                          </div>

                          <div>
                            <q-scroll-area style="height: 670px">
                              <q-markup-table class="custom-q-table">
                                <thead>
                                  <tr>
                                    <th
                                      v-for="column in disColumnHead"
                                      :key="column.name"
                                      class="custom-header"
                                    >
                                      {{ column.label }}
                                    </th>
                                  </tr>
                                </thead>

                                <tbody>
                                  <tr
                                    v-for="row in filteredDisAllHead"
                                    :key="row.id"
                                  >
                                    <td
                                      v-for="column in disColumnHead"
                                      :key="column.name"
                                      class="custom-cell"
                                    >
                                      <template v-if="column.field === 'id'">
                                        <q-btn
                                          flat
                                          rounded
                                          push
                                          @click="editDeptHead(row)"
                                          :ripple="{ center: true }"
                                          icon="edit_document"
                                          class="buttonYellowDesign bg-accent text-black shadow-3"
                                          style="
                                            border-radius: 10px;
                                            width: 70px;
                                          "
                                        >
                                          <q-tooltip class="bg-info text-white">
                                            Edit Head Details
                                          </q-tooltip>
                                        </q-btn>

                                        <q-dialog
                                          v-model="EditDepartment"
                                          persistent
                                        >
                                          <q-card class="QADepartment">
                                            <q-card-section
                                              class="q-mb-sm row items-center justify-center"
                                            >
                                              <div
                                                class="text-secondary text-weight-bold"
                                                style="
                                                  font-size: 25px;
                                                  color: #002b5c;
                                                "
                                              >
                                                EDIT DEPARTMENT
                                              </div>
                                            </q-card-section>

                                            <q-separator
                                              class="formseparatorBlue"
                                            />

                                            <q-card-section
                                              style="display: none"
                                            >
                                              {{ selectedDeptId }}
                                            </q-card-section>

                                            <q-card-section
                                              class="q-gutter-md q-ma-sx"
                                            >
                                              <q-input
                                                rounded
                                                outlined
                                                v-model="currentDeptDetails"
                                                label="DEPARTMENT NAME"
                                                disable
                                              />

                                              <q-select
                                                rounded
                                                outlined
                                                use-input
                                                clearable
                                                v-model="EmployeeDeptCode"
                                                :options="disEmployeeName"
                                                @filter="filterEmpFn"
                                                label="EMPLOYEE NAME"
                                                emit-value
                                                map-options
                                                :option-value="
                                                  (option) => option
                                                "
                                                :option-label="
                                                  (option) => option.fullName
                                                "
                                              />
                                            </q-card-section>

                                            <div
                                              class="row q-gutter-xxl justify-center"
                                            >
                                              <q-btn
                                                flat
                                                rounded
                                                push
                                                label="CANCEL"
                                                @click="onCancelEditDept"
                                                class="buttonCancelDesign text-info"
                                              />

                                              <q-btn
                                                flat
                                                rounded
                                                push
                                                label="SAVE"
                                                class="buttonSaveDesign bg-accent text-black"
                                                @click="submitEditDept()"
                                              />
                                            </div>
                                          </q-card>
                                        </q-dialog>
                                      </template>

                                      <template v-else>
                                        {{ row[column.field] }}
                                      </template>
                                    </td>
                                  </tr>
                                </tbody>
                              </q-markup-table>
                            </q-scroll-area>
                          </div>
                        </q-tab-panel>

                        <q-tab-panel
                          name="deptArea"
                          style="border: 2px solid #e0e0e0"
                        >
                          <div class="row items-center justify-between q-mb-md">
                            <q-space />

                            <q-input
                              v-model="searchArea"
                              label="SEARCH "
                              dense
                              outlined
                              rounded
                              class="q-ml-md"
                            >
                              <template v-slot:append>
                                <q-icon name="search" color="info" />
                              </template>
                            </q-input>

                            <q-btn
                              flat
                              rounded
                              push
                              @click="AddAreaAssignee"
                              :ripple="{ center: true }"
                              icon="add"
                              label="ADD AREA ASSIGNEE"
                              class="bg-accent text-black text-bold text-center q-ma-sm shadow-2"
                              style="width: 230px; border-radius: 10px"
                            />

                            <q-dialog v-model="AddAreaAss" persistent>
                              <q-card class="QADepartment">
                                <q-card-section
                                  class="q-mb-sm row items-center justify-center"
                                >
                                  <div
                                    class="text-secondary text-weight-bold"
                                    style="font-size: 25px; color: #002b5c"
                                  >
                                    ADD AREA ASSIGNEE
                                  </div>
                                </q-card-section>

                                <q-separator class="formseparatorBlue" />

                                <q-card-section class="q-gutter-md q-ma-sx">
                                  <q-select
                                    rounded
                                    outlined
                                    use-input
                                    clearable
                                    v-model="DivisionAreaCode"
                                    :options="disAllDiv"
                                    label="AREA"
                                    emit-value
                                    map-options
                                    :option-value="(option) => option"
                                    :option-label="(option) => option.division"
                                  />

                                  <q-select
                                    rounded
                                    outlined
                                    use-input
                                    clearable
                                    v-model="EmployeeAreaCode"
                                    :options="disEmployeeName"
                                    label="EMPLOYEE NAME"
                                    @filter="filterEmpFn"
                                    emit-value
                                    map-options
                                    :option-value="(option) => option"
                                    :option-label="(option) => option.fullName"
                                  />
                                </q-card-section>

                                <div class="row q-gutter-xxl; justify-center">
                                  <q-btn
                                    flat
                                    rounded
                                    push
                                    label="CANCEL"
                                    class="buttonCancelDesign text-info"
                                    @click="onCancelAddArea"
                                  />

                                  <q-btn
                                    flat
                                    rounded
                                    push
                                    label="SAVE"
                                    class="buttonSaveDesign bg-accent text-black"
                                    @click="submitAddArea()"
                                  />
                                </div>
                              </q-card>
                            </q-dialog>

                            <q-dialog
                              v-model="itemAreaLoading"
                              persistent
                              maximized
                            >
                              <div
                                class="fullscreen flex flex-center column q-gutter-md"
                                style="background-color: rgba(0, 0, 0, 0.85)"
                              >
                                <q-spinner-ios size="150px" color="white" />

                                <div
                                  class="text-center text-subtitle1 text-white"
                                >
                                  Performing the required action.
                                  <br />
                                  <span class="text-italic text-accent"
                                    >Please wait...</span
                                  >
                                </div>
                              </div>
                            </q-dialog>
                          </div>

                          <div>
                            <q-markup-table class="custom-q-table">
                              <thead>
                                <tr>
                                  <th
                                    v-for="column in disColumnArea"
                                    :key="column.name"
                                    class="custom-header"
                                  >
                                    {{ column.label }}
                                  </th>
                                </tr>
                              </thead>

                              <tbody>
                                <tr v-for="row in filterDisArea" :key="row.id">
                                  <td
                                    v-for="column in disColumnArea"
                                    :key="column.name"
                                    class="custom-cell"
                                  >
                                    <template v-if="column.field === 'action'">
                                      <q-btn
                                        flat
                                        rounded
                                        push
                                        @click="removeAreaAssignee(row.id)"
                                        :ripple="{ center: true }"
                                        icon="delete"
                                        class="buttonRedDesign bg-red text-black shadow-3"
                                        style="border-radius: 10px; width: 70px"
                                      >
                                        <q-tooltip class="bg-info text-white">
                                          Edit Area Details
                                        </q-tooltip>
                                      </q-btn>

                                      <q-dialog
                                        v-model="RemoveAssignee"
                                        persistent
                                      >
                                        <q-card class="QAArea">
                                          <q-card-section
                                            class="q-mb-sm row items-center justify-center"
                                          >
                                            <div
                                              class="text-secondary text-weight-bold"
                                              style="
                                                font-size: 25px;
                                                color: #002b5c;
                                              "
                                            >
                                              REMOVE AREA ASSIGNEE
                                            </div>
                                          </q-card-section>

                                          <q-separator
                                            class="formseparatorBlue"
                                          />

                                          <q-card-section>
                                            <div
                                              class="text-dark text-subtitle1 q-mb-sx text-center"
                                            >
                                              Would you like to remove the area
                                              assignee?
                                            </div>
                                          </q-card-section>

                                          <div
                                            class="row q-gutter-xxl; justify-center"
                                          >
                                            <q-btn
                                              flat
                                              rounded
                                              push
                                              label="No"
                                              class="buttonCancelDesign text-info"
                                              @click="onCancelRemoveArea"
                                            />

                                            <q-btn
                                              flat
                                              rounded
                                              push
                                              label="Yes"
                                              class="buttonSaveDesign bg-accent text-black"
                                              @click="submitRemoveArea()"
                                            />
                                          </div>
                                        </q-card>
                                      </q-dialog>
                                    </template>

                                    <template v-else>
                                      {{ row[column.field] }}
                                    </template>
                                  </td>
                                </tr>
                              </tbody>
                            </q-markup-table>
                          </div>
                        </q-tab-panel>

                        <q-tab-panel
                          name="deptRequest"
                          style="border: 2px solid #e0e0e0"
                        >
                          <div class="row items-center justify-between q-mb-md">
                            <q-space />

                            <q-input
                              v-model="searchRequest"
                              label="SEARCH "
                              dense
                              outlined
                              rounded
                              class="q-ml-md"
                            >
                              <template v-slot:append>
                                <q-icon name="search" color="info" />
                              </template>
                            </q-input>

                            <q-btn
                              flat
                              rounded
                              push
                              @click="AddRequestAccess"
                              :ripple="{ center: true }"
                              icon="add"
                              label="ADD REQUEST ACCESS"
                              class="bg-accent text-black text-bold text-center q-ma-sm shadow-2"
                              style="width: 250px; border-radius: 10px"
                            />

                            <q-dialog v-model="AddReqAccess" persistent>
                              <q-card class="QADepartment">
                                <q-card-section
                                  class="q-mb-sm row items-center justify-center"
                                >
                                  <div
                                    class="text-secondary text-weight-bold"
                                    style="font-size: 25px; color: #002b5c"
                                  >
                                    ADD REQUEST ACCESS
                                  </div>
                                </q-card-section>

                                <q-separator class="formseparatorBlue" />

                                <q-card-section class="q-gutter-md q-ma-sx">
                                  <q-select
                                    rounded
                                    outlined
                                    use-input
                                    clearable
                                    v-model="RequestDeptCode"
                                    :options="disAllHead"
                                    label="DEPARTMENT NAME"
                                    @filter="FilterRequestFn"
                                    emit-value
                                    map-options
                                    :option-value="(option) => option"
                                    :option-label="(option) => option.dept_Desc"
                                  />

                                  <q-select
                                    rounded
                                    outlined
                                    use-input
                                    clearable
                                    v-model="RequestEmployeeCode"
                                    :options="disEmployeeName"
                                    label="EMPLOYEE NAME"
                                    @filter="filterEmpFn"
                                    emit-value
                                    map-options
                                    :option-value="(option) => option"
                                    :option-label="(option) => option.fullName"
                                  />
                                </q-card-section>

                                <div class="row q-gutter-xxl; justify-center">
                                  <q-btn
                                    flat
                                    rounded
                                    push
                                    label="CANCEL"
                                    class="buttonCancelDesign text-info"
                                    @click="onCancelAddRequest"
                                  />

                                  <q-btn
                                    flat
                                    rounded
                                    push
                                    label="SAVE"
                                    class="buttonSaveDesign bg-accent text-black"
                                    @click="submitAddRequest()"
                                  />
                                </div>
                              </q-card>
                            </q-dialog>

                            <q-dialog
                              v-model="itemLoadingReqAccess"
                              persistent
                              maximized
                            >
                              <div
                                class="fullscreen flex flex-center column q-gutter-md"
                                style="background-color: rgba(0, 0, 0, 0.85)"
                              >
                                <q-spinner-ios size="150px" color="white" />

                                <div
                                  class="text-center text-subtitle1 text-white"
                                >
                                  Performing the required action.
                                  <br />
                                  <span class="text-italic text-accent"
                                    >Please wait...</span
                                  >
                                </div>
                              </div>
                            </q-dialog>
                          </div>

                          <div>
                            <q-markup-table class="custom-q-table">
                              <thead>
                                <tr>
                                  <th
                                    v-for="column in disColumnRequestAccess"
                                    :key="column.name"
                                    class="custom-header"
                                  >
                                    {{ column.label }}
                                  </th>
                                </tr>
                              </thead>

                              <tbody>
                                <tr
                                  v-for="row in filterRequestAccess"
                                  :key="row.id"
                                >
                                  <td
                                    v-for="column in disColumnRequestAccess"
                                    :key="column.name"
                                    class="custom-cell"
                                  >
                                    <template v-if="column.field === 'action'">
                                      <q-btn
                                        flat
                                        rounded
                                        push
                                        @click="removeAccess(row.id)"
                                        :ripple="{ center: true }"
                                        icon="delete"
                                        class="buttonRedDesign bg-red text-black shadow-3"
                                        style="border-radius: 10px; width: 70px"
                                      >
                                        <q-tooltip class="bg-info text-white">
                                          Remove Request
                                        </q-tooltip>
                                      </q-btn>

                                      <q-dialog
                                        v-model="RemoveRequestAccess"
                                        persistent
                                      >
                                        <q-card class="QAArea">
                                          <q-card-section
                                            class="q-mb-sm row items-center justify-center"
                                          >
                                            <div
                                              class="text-secondary text-weight-bold"
                                              style="
                                                font-size: 25px;
                                                color: #002b5c;
                                              "
                                            >
                                              REMOVE REQUEST ACCESS
                                            </div>
                                          </q-card-section>

                                          <q-separator
                                            class="formseparatorBlue"
                                          />

                                          <q-card-section>
                                            <div
                                              class="text-dark text-subtitle1 q-mb-sx text-center"
                                            >
                                              Do you want to remove the
                                              requested access?
                                            </div>
                                          </q-card-section>

                                          <div
                                            class="row q-gutter-xxl; justify-center"
                                          >
                                            <q-btn
                                              flat
                                              rounded
                                              push
                                              label="No"
                                              class="buttonCancelDesign text-info"
                                              @click="onCancelRemoveAccess"
                                            />

                                            <q-btn
                                              flat
                                              rounded
                                              push
                                              label="Yes"
                                              class="buttonSaveDesign bg-accent text-black"
                                              @click="submitRemoveAccess()"
                                            />
                                          </div>
                                        </q-card>
                                      </q-dialog>
                                    </template>

                                    <template v-else>
                                      {{ row[column.field] }}
                                    </template>
                                  </td>
                                </tr>
                              </tbody>
                            </q-markup-table>
                          </div>
                        </q-tab-panel>
                      </q-tab-panels>
                    </q-card-section>
                  </q-card>
                </div>
              </q-dialog>
            </q-btn>
          </div>
        </q-card-section>
      </q-card>

      <q-card
        class="dashboard-header"
        style="border: 2px solid #e0e0e0"
        v-if="loggedInUser.AreaCode !== null"
      >
        <q-card-section class="row items-center no-wrap">
          <div class="row items-center no-wrap">
            <div class="icon-wrapper">
              <q-icon name="dashboard" size="35px" color="primary" />
            </div>

            <div class="q-ml-md text-left">
              <div
                class="text-h5 text-weight-medium text-primary text-uppercase"
              >
                AREA ASSIGNEE MODULE
              </div>

              <div class="text-grey-7 q-mt-xs">
                Welcome to the Incident Reporting & Unified Platform (IRUP) Area
                Assignee!
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

      <q-card
        class="dashboard-header q-mt-md q-pa-sm"
        style="border: 2px solid #e0e0e0"
      >
        <q-card-section style="border: 2px solid #e0e0e0">
          <!-- HEADER / FILTERS -->
          <div class="filter-row">
            <!-- LEFT -->
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

            <!-- RIGHT -->
            <div class="filter-section">
              <!-- SEARCH -->
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

              <!-- FILTER AREA -->
              <q-btn-dropdown
                v-if="loggedInUser.AreaCode === null"
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

              <!-- FILTER STATUS -->
              <q-btn-dropdown
                v-if="loggedInUser.AreaCode === null"
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

          <!-- TABLE -->
          <div class="q-table-scroll-wrapper q-mt-md">
            <QATables
              v-show="showTable"
              :items="riskGradingItem"
              :columns="disColumnsRiskGrading"
              :getInc="getInc"
              :getQAForm="getQAForm"
              :disDept="disDept"
              :rcaStats="rcaStats"
              :qaStats="qaStats"
              :lostStatus="lostStatus"
              :loading="loading"
              :rows-per-page-options="[5]"
              flat
              bordered
              class="my-custom-scroll"
              style="border-radius: 10px"
            />
          </div>
        </q-card-section>
      </q-card>

      <q-card
        class="dashboard-header q-mt-md q-pa-sm"
        style="border: 2px solid #e0e0e0"
      >
        <q-card-section style="border: 2px solid #e0e0e0">
          <q-toolbar class="bg-white">
            <div class="text-left">
              <div
                class="text-h5 text-weight-medium text-primary text-uppercase"
              >
                RISK GRADING
              </div>

              <div class="text-grey-7 q-mt-xs">
                Determines the severity and priority of identified risks.
              </div>
            </div>

            <q-space />

            <q-tabs
              v-model="Riskgrandingtab"
              shrink
              stretch
              inline-label
              class="bg-grey-1 q-mb-md text-dark q-pa-xs shadow-2"
              style="border-radius: 30px; width: fit-content; margin: auto"
              active-color="black"
              indicator-color="transparent"
            >
              <q-tab
                name="veryLow"
                label="Very Low Risk"
                :class="['tab-equal', getRiskTabClass('veryLow')]"
                @click="viewRiskGradingDetails(1)"
              >
                <q-badge color="primary" class="q-ma-sm">
                  {{ veryLowRiskItemsCount }}
                </q-badge>
              </q-tab>

              <q-tab
                name="low"
                label="Low Risk"
                :class="['tab-equal', getRiskTabClass('low')]"
                @click="viewRiskGradingDetails(2)"
              >
                <q-badge color="primary" class="q-ma-sm">
                  {{ lowRiskItemsCount }}
                </q-badge>
              </q-tab>

              <q-tab
                name="moderate"
                label="Moderate Risk"
                :class="['tab-equal', getRiskTabClass('moderate')]"
                @click="viewRiskGradingDetails(3)"
              >
                <q-badge color="primary" class="q-ma-sm">
                  {{ moderateRiskItemsCount }}
                </q-badge>
              </q-tab>

              <q-tab
                name="high"
                label="High Risk"
                :class="['tab-equal', getRiskTabClass('high')]"
                @click="viewRiskGradingDetails(4)"
              >
                <q-badge color="primary" class="q-ma-sm">
                  {{ highRiskItemsCount }}
                </q-badge>
              </q-tab>

              <q-tab
                name="veryHigh"
                label="Very High Risk"
                :class="['tab-equal', getRiskTabClass('veryHigh')]"
                @click="viewRiskGradingDetails(5)"
              >
                <q-badge color="primary" class="q-ma-sm">
                  {{ veryHighRiskItemsCount }}
                </q-badge>
              </q-tab>
            </q-tabs>
          </q-toolbar>

          <q-tab-panels v-model="Riskgrandingtab" animated class="q-mt-md">
            <q-tab-panel name="veryLow">
              <q-card-section
                v-if="isLoadingRiskGrade"
                class="column flex-center q-pa-xl"
                style="height: 600px"
              >
                <q-spinner size="90px" color="primary" />
                <div class="q-mt-md text-primary text-weight-medium">
                  Loading Details...
                </div>
              </q-card-section>

              <QATablesRisk
                v-show="showTable"
                :items="veryLowRiskItems"
                :columns="disColumnsVLRisk"
                :getInc="getInc"
                :rcaStats="rcaStats"
                :loading="loading"
                :rows-per-page-options="[15]"
                style="border-radius: 10px"
                v-else
              />
            </q-tab-panel>

            <q-tab-panel name="low">
              <q-card-section
                v-if="isLoadingRiskGrade"
                class="column flex-center q-pa-xl"
                style="height: 600px"
              >
                <q-spinner size="90px" color="primary" />
                <div class="q-mt-md text-primary text-weight-medium">
                  Loading Details...
                </div>
              </q-card-section>

              <QATablesRisk
                v-show="showTable"
                :items="lowRiskItems"
                :columns="disColumnsVLRisk"
                :getInc="getInc"
                :rcaStats="rcaStats"
                :loading="loading"
                :rows-per-page-options="[15]"
                style="border-radius: 10px"
                v-else
              />
            </q-tab-panel>

            <q-tab-panel name="moderate">
              <q-card-section
                v-if="isLoadingRiskGrade"
                class="column flex-center q-pa-xl"
                style="height: 600px"
              >
                <q-spinner size="90px" color="primary" />
                <div class="q-mt-md text-primary text-weight-medium">
                  Loading Details...
                </div>
              </q-card-section>

              <QATables
                v-show="showTable"
                :items="moderateRiskItems"
                :columns="disColumns"
                :getInc="getInc"
                :getQAForm="getQAForm"
                :disDept="disDept"
                :rcaStats="rcaStats"
                :qaStats="qaStats"
                :lostStatus="lostStatus"
                :loading="loading"
                :rows-per-page-options="[15]"
                style="border-radius: 10px"
                v-else
              />
            </q-tab-panel>

            <q-tab-panel name="high">
              <q-card-section
                v-if="isLoadingRiskGrade"
                class="column flex-center q-pa-xl"
                style="height: 600px"
              >
                <q-spinner size="90px" color="primary" />
                <div class="q-mt-md text-primary text-weight-medium">
                  Loading Details...
                </div>
              </q-card-section>

              <QATables
                v-show="showTable"
                :items="highRiskItems"
                :columns="disColumns"
                :getInc="getInc"
                :getQAForm="getQAForm"
                :disDept="disDept"
                :rcaStats="rcaStats"
                :qaStats="qaStats"
                :lostStatus="lostStatus"
                :loading="loading"
                :rows-per-page-options="[15]"
                style="border-radius: 10px"
                v-else
              />
            </q-tab-panel>

            <q-tab-panel name="veryHigh">
              <q-card-section
                v-if="isLoadingRiskGrade"
                class="column flex-center q-pa-xl"
                style="height: 600px"
              >
                <q-spinner size="90px" color="primary" />
                <div class="q-mt-md text-primary text-weight-medium">
                  Loading Details...
                </div>
              </q-card-section>

              <QATables
                v-show="showTable"
                :items="veryHighRiskItems"
                :columns="disColumns"
                :getInc="getInc"
                :getQAForm="getQAForm"
                :disDept="disDept"
                :rcaStats="rcaStats"
                :qaStats="qaStats"
                :lostStatus="lostStatus"
                :loading="loading"
                :rows-per-page-options="[15]"
                style="border-radius: 10px"
                v-else
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
import QATab from "../components/QATable.vue";
import QATabRisk from "../components/QATableRiskG.vue";

import { mapGetters } from "vuex";

export default {
  data() {
    return {
      loading: true,
      showTable: false,
      FullContent: false,
      FullDepartmentContent: false,
      selectedStatus: null,
      selectedArea: { divisionCode: "ALL", division: "ALL" },
      searchQuery: "",
      disAllQA: [],
      disAllHead: [],
      disDept: [],
      disAllUni: [],
      selectedRiskUni: null,
      searchRiskUni: "",

      disColumns: [
        {
          name: "viewIR",
          label: "INCIDENT REPORT DETAILS",
          align: "left",
          field: "id",
        },
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
        // { name: "QA", label: "QA IN-CHARGE", align: "left", field: "id" },
        {
          name: "rcaStat",
          label: "DEPARTMENT INVOLVED",
          align: "left",
          field: "rCA_Status",
        },
        // {
        //   name: "involvedDept",
        //   label: "DEPARTMENT INVOLVED",
        //   align: "left",
        //   field: "id",
        // },
        {
          name: "rcadetails",
          label: "ROOT CAUSE ANALYSIS (RCA) DETAILS",
          align: "left",
          field: "id",
        },
        {
          name: "rcastatus",
          label: "RCA SUBMISSION STATUS",
          align: "left",
          field: "rCA",
        },
        {
          name: "actionitems",
          label: "RCA ITEM COMPLETIONS",
          align: "left",
          field: "id",
        },
        // { name: "remarks", label: "STATUS", align: "left", field: "id" },
        {
          name: "qastatus",
          label: "QA SIGN OFF ",
          align: "left",
          field: "qAStatus",
        },
        {
          name: "hrReferral",
          label: "HR REFERRAL",
          align: "left",
          field: "hrReferral,",
        },
      ],

      disColumnHead: [
        {
          name: "deptDesc",
          label: "DEPARTMENT NAME",
          align: "left",
          field: "dept_Desc",
        },
        {
          name: "fullName",
          label: "EMPLOYEE NAME",
          align: "left",
          field: "fullName",
        },
        {
          name: "editHead",
          label: "ACTION",
          align: "left",
          field: "id",
        },
      ],

      disColumnRiskUni: [
        {
          name: "riskCode",
          label: "RISK CODE",
          align: "left",
          field: "riskCode",
        },
        {
          name: "risk",
          label: "RISK SUB-DOMAIN",
          align: "left",
          field: "risk",
        },
        {
          name: "domainCode",
          label: "RISK DOMAIN",
          align: "left",
          field: "riskDomain",
        },
        {
          name: "riskDes",
          label: "RISK DESCRIPTION",
          align: "left",
          field: "riskDescription",
        },
      ],

      rcaStats: [
        { label: "PENDING", value: "1" },
        { label: "SUBMITTED", value: "0" },
        { label: "NOT APPLICABLE", value: "3" },
      ],

      qaStats: [
        { label: "OPEN", value: true },
        { label: "CLOSED", value: false },
      ],

      lostStatus: [
        { label: "YES", value: "1" },
        { label: "NO", value: "2" },
      ],

      pagination: {
        page: 1,
        rowsPerPage: 5,
      },

      disColumnsRiskGrading: [
        {
          name: "viewIR",
          label: "INCIDENT REPORT DETAILS",
          align: "left",
          field: "id",
        },
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
          name: "riskGrading",
          label: "RISK GRADING",
          align: "left",
          field: "riskGrading",
        },
        {
          name: "isReject",
          label: "REJECT",
          align: "left",
          field: "isReject",
        },
      ],

      Riskgrandingtab: "veryLow",

      disColumnsVLRisk: [
        {
          name: "viewIR",
          label: "INCIDENT REPORT DETAILS",
          align: "left",
          field: "id",
        },
        { name: "IRNo", label: "IR UMBER", align: "left", field: "iRNo" },
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
          name: "deptInvolved",
          label: "DEPARTMENT INVOLVED",
          align: "left",
          field: "id",
        },
        {
          name: "actionitem",
          label: "ACTIONS SUBMISSION STATUS",
          align: "left",
          field: "id",
        },
        {
          name: "actionitemscompletion",
          label: "ACTION ITEM COMPLETIONS",
          align: "left",
          field: "id",
        },
        // { name: "remarks", label: "STATUS", align: "left", field: "id" },
        {
          name: "qastatus",
          label: "QA SIGN OFF ",
          align: "left",
          field: "qAStatus",
        },
      ],
      reporttab: "repIncident",
      depttab: "deptHead",

      disAllSubject: [],

      disSubColumns: [
        {
          name: "subjectcode",
          label: "REPORTABLE INCIDENT CODE",
          align: "left",
          field: "subjectCode",
        },
        {
          name: "subject",
          label: "REPORTABLE INCIDENT",
          align: "left",
          field: "subjectName",
        },
        {
          name: "subjectDescription",
          label: "REPORTABLE INCIDENT DEFINITION",
          align: "left",
          field: "subjectReptDescription",
        },
        // { name: "qa", label: "QA IN-CHARGE", align: "left", field: "qAName" },
      ],
      searchReportable: "",
      searchDeptHead: "",
      selectedSubject: null,

      disAllRiskChild: [],

      disRiskChildColumns: [
        {
          name: "subjectchilcode",
          label: "PARTICULAR INCIDENT CODE",
          align: "left",
          field: "subjectChilCode",
        },
        {
          name: "subjectspecexam",
          label: "PARTICULAR INCIDENT NAME",
          align: "left",
          field: "subjectSpecificExam",
        },
        {
          name: "subject",
          label: "REPORTABLE INCIDENT",
          align: "left",
          field: "subjectName",
        },
        {
          name: "riskDom",
          label: "RISK DOMAIN NAME",
          align: "left",
          field: "riskDomain",
        },
        {
          name: "riskSubDom",
          label: "RISK SUB-DOMAIN NAME",
          align: "left",
          field: "riskSubDomain",
        },
      ],
      searchRiskChild: "",
      selectedRiskChild: null,
      SubIncident: false,
      SubjectName: "",
      SubjectRiskCode: "",
      SubjectRiskSubCode: "",
      SubjectReptDescription: "",
      waiting: false,
      ChilIncident: false,
      SubjectCode: null,
      SubjectSpecificExam: "",
      SubjectReptChilDescription: "",

      UniIncident: false,
      RiskDomain: "",
      itemWaitDomain: false,

      RiskSubIncident: false,
      DomainRisk: "",
      RiskSub: "",
      RiskSubDescription: "",
      filteredSubDomains: [],
      AddDepartment: false,
      disAllDeptList: [],
      disEmployeeName: [],
      DeptName: "",
      EmployeeDeptCode: "",
      EditDepartment: false,
      selectedDeptId: null,
      selectedDeptCode: null,
      itemLoading: false,

      AddAreaAss: false,
      EmployeeAreaCode: "",
      disAllDiv: [],
      DivisionAreaCode: "",
      disAllArea: [],
      searchArea: "",
      disColumnArea: [
        {
          name: "areaAssignee",
          label: "AREA ASSIGNEE",
          align: "left",
          field: "fullName",
        },
        {
          name: "division",
          label: "AREA",
          align: "left",
          field: "division",
        },
        {
          name: "editArea",
          label: "ACTION",
          align: "left",
          field: "action",
        },
      ],
      RemoveAssignee: false,
      itemAreaLoading: false,
      searchRequest: "",
      AddReqAccess: false,
      RequestDeptCode: "",
      RequestEmployeeCode: "",
      itemLoadingReqAccess: false,
      disRequestAccess: [],
      disColumnRequestAccess: [
        {
          name: "fullName",
          label: "EMPLOYEE NAME",
          align: "left",
          field: "fullName",
        },
        {
          name: "department",
          label: "DEPARTMENT NAME",
          align: "left",
          field: "department",
        },
        {
          name: "editArea",
          label: "ACTION",
          align: "left",
          field: "action",
        },
      ],

      RemoveRequestAccess: false,
      selectedID: "",
      disAllRiskGrade: [],
      isLoadingRiskGrade: false,
    };
  },

  computed: {
    ...mapGetters({
      loggedInUser: "ApplyStore/getUser",
      getQAForm: "ApplyStore/getQAForm",
      departments: "ApplyStore/departments",
      deptList: "ApplyStore/deptList",
      division: "ApplyStore/division",
      getQA: "ApplyStore/getQA",
      getDiv: "ApplyStore/getDiv",
      getSubject: "ApplyStore/getSubject",
      getRiskChild: "ApplyStore/getRiskChild",
      getRisk: "ApplyStore/getRisk",
      getHead: "ApplyStore/getHead",
      getEmployee: "ApplyStore/getEmployee",
      getRiskUni: "ApplyStore/getRiskUni",
      getRiskSub: "ApplyStore/getRiskSub",
      getArea: "ApplyStore/getArea",
      getAccess: "ApplyStore/getAccess",
    }),

    filteredDisAll() {
      const { disAllQA, selectedStatus, selectedArea, searchQuery } = this;

      let filteredData = [...disAllQA];

      if (selectedStatus && typeof selectedStatus === "object") {
        const { value: statusValue } = selectedStatus;
        filteredData = filteredData.filter(
          (item) => item.qAStatus === statusValue
        );
      }

      if (
        selectedArea &&
        typeof selectedArea === "object" &&
        selectedArea.divisionCode !== "ALL"
      ) {
        const { divisionCode: areaValue } = selectedArea;
        filteredData = filteredData.filter(
          (item) => item.divisionCode === areaValue
        );
      }

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

    filteredDisSub() {
      const { disAllSubject, selectedSubject, searchReportable } = this;
      let filteredSub = [...disAllSubject];

      if (selectedSubject && typeof selectedSubject === "object") {
        const { domainCode: statusValue } = selectedSubject;
        filteredSub = filteredSub.filter(
          (item) => item.domainCode === statusValue
        );
      }

      if (searchReportable && typeof searchReportable === "string") {
        const query = searchReportable.toLowerCase();
        filteredSub = filteredSub.filter((item) =>
          Object.values(item).some(
            (val) =>
              typeof val === "string" && val.toLowerCase().includes(query)
          )
        );
      }
      return filteredSub;
    },

    filteredDisAllHead() {
      const { disAllHead, searchDeptHead } = this;

      let filtered = [...disAllHead];

      if (typeof searchDeptHead === "string" && searchDeptHead.trim()) {
        const query = searchDeptHead.toLowerCase();

        filtered = filtered.filter((item) =>
          Object.values(item || {}).some(
            (val) =>
              typeof val === "string" && val.toLowerCase().includes(query)
          )
        );
      }

      return filtered;
    },

    filteredDisRiskChild() {
      const { disAllRiskChild, selectedRiskChild, searchRiskChild } = this;
      let filteredRiskChild = [...disAllRiskChild];

      if (selectedRiskChild && typeof selectedRiskChild === "object") {
        const { subjectCode: statusValue } = selectedRiskChild;
        filteredRiskChild = filteredRiskChild.filter(
          (item) => item.subjectCode === statusValue
        );
      }

      if (searchRiskChild && typeof searchRiskChild === "string") {
        const query = searchRiskChild.toLowerCase();
        filteredRiskChild = filteredRiskChild.filter((item) =>
          Object.values(item).some(
            (val) =>
              typeof val === "string" && val.toLowerCase().includes(query)
          )
        );
      }
      return filteredRiskChild;
    },

    filteredDisRiskUni() {
      const { disAllUni, selectedRiskUni, searchRiskUni } = this;
      let filteredRiskUni = [...disAllUni];

      if (selectedRiskUni && typeof selectedRiskUni === "object") {
        const { domainCode: statusValue } = selectedRiskUni;
        filteredRiskUni = filteredRiskUni.filter(
          (item) => item.domainCode === statusValue
        );
      }

      if (searchRiskUni && typeof searchRiskUni === "string") {
        const query = searchRiskUni.toLowerCase();
        filteredRiskUni = filteredRiskUni.filter((item) =>
          Object.values(item).some(
            (val) =>
              typeof val === "string" && val.toLowerCase().includes(query)
          )
        );
      }
      return filteredRiskUni;
    },

    filterDisArea() {
      const { disAllArea, searchArea } = this;
      if (!searchArea || typeof searchArea !== "string") {
        return disAllArea;
      }
      const query = searchArea.toLowerCase();
      return disAllArea.filter((item) =>
        Object.values(item).some(
          (val) => typeof val === "string" && val.toLowerCase().includes(query)
        )
      );
    },

    filterRequestAccess() {
      const { disRequestAccess, searchRequest } = this;
      if (!searchRequest || typeof searchRequest !== "string") {
        return disRequestAccess;
      }
      const query = searchRequest.toLowerCase();
      return disRequestAccess.filter((item) =>
        Object.values(item).some(
          (val) => typeof val === "string" && val.toLowerCase().includes(query)
        )
      );
    },

    areaOptions() {
      return [{ divisionCode: "ALL", division: "ALL" }, ...this.disAllDiv];
    },

    riskGradingItem() {
      return this.filteredDisAll.filter((item) => item.riskGrading === 0);
    },

    totalReport() {
      return this.filteredDisAll.filter((item) => item.riskGrading == 0).length;
    },

    veryLowRiskItems() {
      return this.disAllRiskGrade;
    },

    lowRiskItems() {
      return this.disAllRiskGrade;
    },

    moderateRiskItems() {
      return this.disAllRiskGrade;
    },

    highRiskItems() {
      return this.disAllRiskGrade;
    },

    veryHighRiskItems() {
      return this.disAllRiskGrade;
    },

    // veryLowRiskItemsCount() {
    //   let count = this.filteredDisAll.filter((item) => item.riskGrading === 1);
    //   if (this.selectedStatus && typeof this.selectedStatus === "object") {
    //     count = count.filter(
    //       (item) => item.qAStatus === this.selectedStatus.value
    //     );
    //   }
    //   return count.length;
    // },

    // lowRiskItemsCount() {
    //   let count = this.filteredDisAll.filter((item) => item.riskGrading === 2);
    //   if (this.selectedStatus && typeof this.selectedStatus === "object") {
    //     count = count.filter(
    //       (item) => item.qAStatus === this.selectedStatus.value
    //     );
    //   }
    //   return count.length;
    // },

    // moderateRiskItemsCount() {
    //   let count = this.filteredDisAll.filter((item) => item.riskGrading === 3);
    //   if (this.selectedStatus && typeof this.selectedStatus === "object") {
    //     count = count.filter(
    //       (item) => item.qAStatus === this.selectedStatus.value
    //     );
    //   }
    //   return count.length;
    // },

    // highRiskItemsCount() {
    //   let count = this.filteredDisAll.filter((item) => item.riskGrading === 4);
    //   if (this.selectedStatus && typeof this.selectedStatus === "object") {
    //     count = count.filter(
    //       (item) => item.qAStatus === this.selectedStatus.value
    //     );
    //   }
    //   return count.length;
    // },

    // veryHighRiskItemsCount() {
    //   let count = this.filteredDisAll.filter((item) => item.riskGrading === 5);
    //   if (this.selectedStatus && typeof this.selectedStatus === "object") {
    //     count = count.filter(
    //       (item) => item.qAStatus === this.selectedStatus.value
    //     );
    //   }
    //   return count.length;
    // },

    veryLowRiskItemsCount() {
      return this.filterByRisk(1);
    },

    lowRiskItemsCount() {
      return this.filterByRisk(2);
    },

    moderateRiskItemsCount() {
      return this.filterByRisk(3);
    },

    highRiskItemsCount() {
      return this.filterByRisk(4);
    },

    veryHighRiskItemsCount() {
      return this.filterByRisk(5);
    },

    currentDeptDetails() {
      return this.getDeptDetails(this.selectedDeptCode);
    },
  },

  mounted() {
    // 🔹 Initial delay (3 seconds)
    setTimeout(() => {
      this.showTable = true;
      this.disAllQA;
      this.loading = false;
    }, 3000);

    // 🔹 Auto fetch every 60 seconds
    this.interval = setInterval(() => {
      this.getInc();
    }, 60000);

    this.viewRiskGradingDetails(1);
  },

  components: {
    QATables: QATab,
    QATablesRisk: QATabRisk,
  },

  created() {
    this.getInc();
    this.getDet();
    this.getSubjecttab();
    this.getRiskchildtab();
    this.getDomainOption();
    this.getDepHead();
    this.getRiskUniverse();
    this.getDepartmentList();
    this.getEmployeeList();
    this.getDivision();
    this.getAreaDetails();
    this.getRequestAccess();
  },

  methods: {
    async getDet() {
      try {
        await this.$store.dispatch("ApplyStore/departmentsEmail");
        this.disDept = this.departments;
      } catch (error) {
        console.error("Error displaying data:", error);
      }
    },

    async getInc() {
      try {
        await this.$store.dispatch("ApplyStore/disIncQA");
        this.disAllQA = this.getQAForm;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    async getDepHead() {
      try {
        await this.$store.dispatch("ApplyStore/disHead");
        this.disAllHead = this.getHead;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    async getRiskUniverse() {
      try {
        await this.$store.dispatch("ApplyStore/disUniverse");
        this.disAllUni = this.getRiskUni;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    async getDivision() {
      try {
        await this.$store.dispatch("ApplyStore/disDivision");
        this.disAllDiv = this.division;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    async getAreaDetails() {
      try {
        await this.$store.dispatch("ApplyStore/disAreaTab");
        this.disAllArea = this.getArea;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    async getRequestAccess() {
      try {
        await this.$store.dispatch("ApplyStore/disRequestAccess");
        this.disRequestAccess = this.getAccess;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    search() {},

    async selectStatus(option) {
      this.selectedStatus = option;
    },

    async selectArea(option) {
      this.selectedArea = option;
    },

    getRiskTabClass(tabName) {
      return this.Riskgrandingtab === tabName ? `${tabName}-active` : "";
    },

    getTabClass(tabName) {
      return this.reporttab === tabName
        ? "Reporttab-active"
        : "Reporttab-inactive";
    },

    getTabDeptClass(tabName) {
      return this.depttab === tabName ? "Depttab-active" : "Depttab-inactive";
    },

    getDeptDetails(value) {
      const found = this.disAllHead.find(
        (opt) => String(opt.deptCode) === String(value)
      );
      return found ? found.dept_Desc : "";
    },

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async viewRiskGradingDetails(riskgrade) {
      try {
        this.isLoadingRiskGrade = true;

        const payload = {
          Riskgrade: riskgrade,
        };

        await this.$store.dispatch("ApplyStore/disRiskGrading", payload);
        this.disAllRiskGrade = this.getQAForm;

        // ensure minimum 3 seconds loading
        await new Promise((resolve) => setTimeout(resolve, 3000));
      } catch (error) {
        console.error("Error fetching action items:", error);
      } finally {
        this.isLoadingRiskGrade = false;
      }
    },

    reportableContent() {
      this.FullContent = true;
    },

    async getSubjecttab() {
      try {
        await this.$store.dispatch("ApplyStore/disSubjectTab");
        this.disAllSubject = this.getSubject;
      } catch (error) {
        console.error("Error Displaying data:", error);
      }
    },

    async getRiskchildtab() {
      try {
        await this.$store.dispatch("ApplyStore/disRiskChildTab");
        this.disAllRiskChild = this.getRiskChild;
      } catch (error) {
        console.error("Error Displaying data:", error);
      }
    },

    async getDomainOption() {
      try {
        await this.$store.dispatch("ApplyStore/disDomainCode");
        this.disAllDomain = this.getRisk;
      } catch (error) {
        console.error("Error Displaying data:", error);
      }
    },

    async getDepartmentList() {
      try {
        await this.$store.dispatch("ApplyStore/departmentList");
        this.disAllDeptList = this.deptList;
      } catch (error) {
        console.error("Error Displaying data:", error);
      }
    },

    async getEmployeeList() {
      try {
        await this.$store.dispatch("ApplyStore/disEmployeeList");
        this.disEmployeeName = this.getEmployee;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    subjectIncident() {
      this.SubIncident = true;
    },

    onCancelRisk() {
      this.SubjectName = "";
      this.SubjectReptDescription = "";
      this.SubIncident = false;
    },

    async submitRisk() {
      try {
        this.waiting = true;

        const riskdata = {
          SubjectName: this.SubjectName,
          SubjectReptDescription: this.SubjectReptDescription,
        };

        this.onCancelRisk();

        await this.$store.dispatch("ApplyStore/addSubjectDetails", riskdata);

        setTimeout(() => {
          this.getSubjecttab();
          this.waiting = false;
        }, 2000);
        this.$q.notify({
          color: "green-8",
          position: "top",
          message: "SUCCESS ADDING RISK",
          icon: "check",
          iconColor: "white",
          timeout: 3000,
          progress: true,
        });
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    filterSubDomain(selectedDomain) {
      if (!selectedDomain) {
        this.filteredSubDomains = [];
        this.SubjectRiskSubCode = null;
        return;
      }

      // filter subdomains that match the selected domain’s riskDomain
      this.filteredSubDomains = this.disAllUni.filter(
        (sub) => sub.riskDomain === selectedDomain.riskDomain
      );

      // reset selected subdomain if not part of the new filtered list
      if (
        this.SubjectRiskSubCode &&
        !this.filteredSubDomains.includes(this.SubjectRiskSubCode)
      ) {
        this.SubjectRiskSubCode = null;
      }
    },

    incidentChildren() {
      this.ChilIncident = true;
    },

    onCancelRiskChil() {
      this.SubjectCode = "";
      this.SubjectSpecificExam = "";
      this.SubjectRiskCode = "";
      this.SubjectRiskSubCode = "";
      this.ChilIncident = false;
    },

    async submitRiskChild() {
      try {
        this.itemWaitDomain = true;

        const riskChilddata = {
          SubjectCode: this.SubjectCode ? this.SubjectCode.subjectCode : null,
          SubjectSpecificExam: this.SubjectSpecificExam,
          SubjectRiskCode: this.SubjectRiskCode.domainCode,
          SubjectRiskSubCode: this.SubjectRiskSubCode.riskCode,
        };
        this.onCancelRiskChil();
        await this.$store.dispatch("ApplyStore/addRiskChild", riskChilddata);
        setTimeout(() => {
          this.getRiskchildtab();
          this.itemWaitDomain = false;
        }, 2000);
        this.$q.notify({
          color: "green-8",
          position: "top",
          message: "SUCCESS ADDING REPORTABLE CHILDREN",
          icon: "check",
          iconColor: "white",
          timeout: 3000,
          progress: true,
        });
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    filterByRisk(riskLevel) {
      let filtered = this.filteredDisAll.filter(
        (item) => item.qAStatus === true
      );
      if (this.selectedStatus && typeof this.selectedStatus === "object") {
        filtered = filtered.filter(
          (item) => item.qAStatus === this.selectedStatus.value
        );
      }
      filtered = filtered.filter((item) => item.riskGrading === riskLevel);
      return filtered.length;
    },

    departmentContent() {
      this.FullDepartmentContent = true;
    },

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    incidentRiskUni() {
      this.UniIncident = true;
    },

    onCancelRisUni() {
      this.RiskDomain = "";
      this.UniIncident = false;
    },

    async submitRiskUni() {
      try {
        this.itemWaitDomain = true;
        const data = {
          RiskDomain: this.RiskDomain,
        };
        this.onCancelRisUni();
        await this.$store.dispatch("ApplyStore/addRiskDomain", data);
        setTimeout(() => {
          this.getRiskUniverse();
          this.itemWaitDomain = false;
        }, 2000);
        this.$q.notify({
          color: "green-8",
          position: "top",
          message: "SUCCESS ADDING RISK DOMAIN",
          icon: "check",
          iconColor: "white",
          timeout: 3000,
          progress: true,
        });
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    incidentRiskSub() {
      this.RiskSubIncident = true;
    },

    onCancelRiskSub() {
      (this.DomainRisk = ""),
        (this.RiskSub = ""),
        (this.RiskSubDescription = ""),
        (this.RiskSubIncident = false);
    },

    async submitRiskSub() {
      try {
        this.itemWaitDomain = true;
        const data = {
          DomainRisk: this.DomainRisk.domainCode,
          RiskSub: this.RiskSub,
          RiskSubDescription: this.RiskSubDescription,
        };
        this.onCancelRiskSub();
        await this.$store.dispatch("ApplyStore/addRiskSubDomain", data);
        setTimeout(() => {
          this.getRiskUniverse();
          this.itemWaitDomain = false;
        }, 2000);
        this.$q.notify({
          color: "green-8",
          position: "top",
          message: "SUCCESS ADDING RISK DOMAIN",
          icon: "check",
          iconColor: "white",
          timeout: 3000,
          progress: true,
        });
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    AddDepartmentContent() {
      this.AddDepartment = true;
    },

    onCancelAddDept() {
      this.AddDepartment = false;
      this.DeptName = "";
      this.EmployeeDeptCode = "";
    },

    async submitAddDept() {
      try {
        this.itemLoading = true;
        const data = {
          DeptCode: this.DeptName.cODE,
          EmployeeDeptCode: this.EmployeeDeptCode.employeeCode,
        };
        this.onCancelAddDept();
        await this.$store.dispatch("ApplyStore/addDepartmentContent", data);
        setTimeout(() => {
          this.getDepHead();
          this.itemLoading = false;
        }, 2000);
        this.$q.notify({
          color: "green-8",
          position: "top",
          message: "SUCCESS ADDING RISK DOMAIN",
          icon: "check",
          iconColor: "white",
          timeout: 3000,
          progress: true,
        });
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    FilterDeptFn(val, update) {
      if (val === "") {
        update(() => {
          this.disAllDeptList = this.deptList;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.disAllDeptList = this.deptList.filter((option) => {
          return option.dESCRIPTION.toLowerCase().indexOf(needle) > -1;
        });
      });
    },

    filterEmpFn(val, update) {
      if (val === "") {
        update(() => {
          this.disEmployeeName = this.getEmployee;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.disEmployeeName = this.getEmployee.filter((option) => {
          return option.fullName.toLowerCase().indexOf(needle) > -1;
        });
      });
    },

    editDeptHead(row) {
      this.selectedDeptId = row.id;
      this.selectedDeptCode = row.deptCode;
      this.EditDepartment = true;
    },

    onCancelEditDept() {
      this.EditDepartment = false;
      this.EmployeeDeptCode = "";
      this.selectedDeptId = "";
    },

    async submitEditDept() {
      try {
        this.itemLoading = true;
        const data = {
          Id: this.selectedDeptId,
          EmployeeCode: this.EmployeeDeptCode.employeeCode,
        };
        this.onCancelEditDept();
        await this.$store.dispatch("ApplyStore/addEditDeptContent", data);
        setTimeout(() => {
          this.getDepHead();
          this.itemLoading = false;
        }, 2000);
        this.$q.notify({
          color: "green-8",
          position: "top",
          message: "SUCCESS EDITING",
          icon: "check",
          iconColor: "white",
          timeout: 3000,
          progress: true,
        });
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    AddAreaAssignee() {
      this.AddAreaAss = true;
    },

    onCancelAddArea() {
      this.AddAreaAss = false;
      this.EmployeeAreaCode = "";
      this.DivisionAreaCode = "";
    },

    async submitAddArea() {
      try {
        this.itemAreaLoading = true;
        const data = {
          EmployeeAreaCode: this.EmployeeAreaCode.employeeCode,
          DivisionAreaCode: this.DivisionAreaCode.divisionCode,
        };
        this.onCancelAddArea();
        await this.$store.dispatch("ApplyStore/addAreaContent", data);
        setTimeout(() => {
          this.getAreaDetails();
          this.itemAreaLoading = false;
        }, 2000);
        this.$q.notify({
          color: "green-8",
          position: "top",
          message: "SUCCESS ADDING AREA ASSIGNEE",
          icon: "check",
          iconColor: "white",
          timeout: 3000,
          progress: true,
        });
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    removeAreaAssignee(Id) {
      this.selectedId = Id;
      this.RemoveAssignee = true;
    },

    onCancelRemoveArea() {
      this.RemoveAssignee = false;
    },

    async submitRemoveArea() {
      try {
        this.itemAreaLoading = true;
        const payload = { Id: this.selectedId, isActive: false };
        this.onCancelRemoveArea();
        await this.$store.dispatch("ApplyStore/RemoveAreaContent", payload);
        setTimeout(() => {
          this.getAreaDetails();
          this.itemAreaLoading = false;
        }, 2000);
        this.$q.notify({
          color: "green-8",
          position: "top",
          message: "SUCCESS REMOVE AREA ASSIGNEE",
          icon: "check",
          iconColor: "white",
          timeout: 3000,
          progress: true,
        });
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    FilterRequestFn(val, update) {
      if (val === "") {
        update(() => {
          this.disAllHead = this.getHead;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.disAllHead = this.getHead.filter((option) => {
          return option.dept_Desc.toLowerCase().indexOf(needle) > -1;
        });
      });
    },

    AddRequestAccess() {
      this.AddReqAccess = true;
    },

    onCancelAddRequest() {
      this.AddReqAccess = false;
    },

    async submitAddRequest() {
      this.AddReqAccess = false;
      this.itemLoadingReqAccess = true;
      try {
        const payload = {
          RequestDeptCode: this.RequestDeptCode.deptCode,
          RequestEmployeeCode: this.RequestEmployeeCode.employeeCode,
        };
        await this.$store.dispatch("ApplyStore/addRequestAccess", payload);
        setTimeout(() => {
          this.getRequestAccess();
          this.itemLoadingReqAccess = false;
        }, 2000);
        this.$q.notify({
          color: "green-8",
          position: "top",
          message: "SUCCESS ADDING REQUEST ACCESS",
          icon: "check",
          iconColor: "white",
          timeout: 3000,
          progress: true,
        });
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    removeAccess(Id) {
      this.selectedID = Id;
      this.RemoveRequestAccess = true;
    },

    onCancelRemoveAccess() {
      this.RemoveRequestAccess = false;
    },

    async submitRemoveAccess() {
      this.itemLoadingReqAccess = true;
      try {
        const payload = { Id: this.selectedID, isActive: false };
        this.onCancelRemoveAccess();
        await this.$store.dispatch("ApplyStore/RemoveRequestAccess", payload);
        setTimeout(() => {
          this.getRequestAccess();
          this.itemLoadingReqAccess = false;
        }, 2000);
        this.$q.notify({
          color: "green-8",
          position: "top",
          message: "SUCCESS REMOVING REQUEST ACCESS",
          icon: "check",
          iconColor: "white",
          timeout: 3000,
          progress: true,
        });
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

/* ///////////////////////////////////////QAHEADER//////////////////////////////////// */
.my-card {
  height: 500px;
  width: 100%;
  margin-bottom: 25px;
}

.filtertab {
  background-color: #0f4d91;
  font-weight: bold;
}

.IRQHText {
  font-weight: bold;
  font-style: roboto;
  font-family: Arial Black;
  display: flex;
  color: #ffc619;
  font-size: 35px;
  justify-content: center;
}

.IRRiskGrading {
  font-weight: bold;
  font-style: roboto;
  font-family: Arial Black;
  color: #ffc619;
  font-size: 25px;
  width: 30%;
  margin-right: 10px;
  background-color: #083d73;
}

.spinner {
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 100px;
  margin-bottom: 45%;
  margin-left: 45%;
}

/* Retain the table styles */
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

/* ///////////////////////////////////////IRDETAILS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.buttonYellowDesign {
  font-size: 15px;
  box-shadow: #000000;
  border-radius: 20px;
  font-weight: bold;
  border: 2px solid #ffc412;
}

.buttonRedDesign {
  font-size: 15px;
  box-shadow: #000000;
  border-radius: 20px;
  font-weight: bold;
  border: 2px solid red;
}

.custom-item-section {
  border: 1px solid #ffffff; /* Border style */
  border-radius: 1px; /* Border radius */
}

/* .QADialog {
  background-image: url("../assets/BGCORE.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #f4f7fc;
  padding-top: 20px;
  padding-bottom: 40px;
  min-height: 100vh;
} */

.QADialog {
  background-color: #2f5d80;
  padding-top: 20px;
  padding-bottom: 40px;
  min-height: 100vh;
}
.contentFormQA {
  border: 2px solid #f0f2f5;
  margin-left: auto;
  margin-right: auto;
  border-radius: 25px;
  padding: 20px;
  background-color: #ffffff;
  width: 1200px;
  height: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.ReportDialog {
  background-image: url("../assets/BGCORE.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #f4f7fc;
  padding-top: 20px;
  padding-bottom: 40px;
  min-height: 100vh;
}
.contentFormReport {
  border: 2px solid #f0f2f5;
  margin-left: auto;
  margin-right: auto;
  border-radius: 25px;
  padding: 20px;
  background-color: #ffffff;
  width: 1500px;
  height: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.contentFormQARCA {
  border: 2px solid #f0f2f5;
  margin-left: auto;
  margin-right: auto;
  border-radius: 25px;
  padding: 20px;
  background-color: #ffffff;
  width: 1200px;
  height: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.sepBanFootIncident {
  background-color: #6b7c93;
  height: 2px;
  margin-top: 10px;
  margin-bottom: 15px;
}

.QADesign {
  width: 70%;
  margin: 5px;
  font-size: 15px;
  background-color: #ffffff;
}
.QADesign2 {
  width: 25%;
  margin: 5px;
  font-size: 15px;
  background-color: #ffffff;
}
.QAFixDesign {
  width: 99.5%;
  margin: 5px;
  font-size: 15px;
  background-color: #ffffff;
}
.QAIRND {
  font-weight: bold;
  display: flex;
  color: #ffc619;
  font-size: 20px;
  justify-content: center;
}
.QAIR {
  height: 85px;
  border: 0.2em solid #f3f4f7;
  background-color: #003566;
  border: 0.6em solid #d5d7da;
}

.QADes {
  font-size: 15px;
  border: 0.1em solid #ffffff;
}

.QAFileDes {
  padding: 8px;
  margin-top: 5px;
  font-size: 15px;
  border: 0.1em solid #003566;
  background-color: #e3f2fd;
}

.QADes1 {
  font-size: 15px;
  border: 0.1em solid #ffffff;
}
.QAText {
  font-weight: bold;
  font-style: roboto;
  display: flex;
  color: #ffc619;
  font-size: 30px;
  justify-content: center;
}
.QATitlelist {
  height: 40%;
  width: 100%;
  padding: 8px;
  border: 0.1em solid #cacaca;
  background-color: #003566;
}
.QACTTitlelist {
  height: 40%;
  width: 100%;
  padding: 8px;
  border: 0.1em solid #f3f4f7;
  background-color: #f3f4f7;
}

.QAlist {
  height: 30%;
  width: 100%;
  margin-top: 15px;
  border: 0.1em solid #cacaca;
  background-color: #003566;
}
.QATextlist {
  font-weight: bold;
  display: flex;
  color: #ffc619;
  font-size: 22px;
  justify-content: center;
}
.QACTTextlist {
  font-weight: bold;
  display: flex;
  color: #003566;
  font-size: 22px;
  justify-content: center;
}

.QAaaTitlelist {
  height: 40%;
  width: 100%;
  padding: 8px;
  border: 0.1em solid #cacaca;
  background-color: #003566;
}

.buttonCancelDesign {
  color: #166ecc;
  background-color: rgba(22, 110, 204, 0.1);
  font-size: 15px;
  font-weight: bold;
  margin: 5px;
  box-shadow: #000000;
  border-radius: 20px;
  width: 130px;
  border: 2px solid #166ecc;
}

.buttonSaveDesign {
  border-color: #ffc412;
  font-size: 15px;
  margin: 5px;
  box-shadow: #000000;
  border-radius: 20px;
  font-weight: bold;
  width: 130px;
  border: 2px solid #ffc412;
}
/* ///////////////////////////////////////QA INCHARGE////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
.QAIC {
  height: 230px;
  width: 430px;
  background-color: #ffffff;
  border: 0.2em solid #f3f4f7;
}
.QAICHead {
  height: 65px;
  border: 0.2em solid #f3f4f7;
  background-color: #003566;
  border: 0.5em solid #d5d7da;
}
.QAICText {
  font-weight: bold;
  font-style: roboto;
  display: flex;
  color: #ffc619;
  font-size: 25px;
  justify-content: center;
}
/* ///////////////////////////////////////RCA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.QADeptIn {
  height: 600px;
  width: 550px;
}
.footer-actions {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: white; /* or any color to match the card */
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  border-top: 0.2em solid #d5d7da;
}
.q-card-section {
  flex: 1;
  overflow-y: auto;
}
.QADHead {
  height: 85px;
  border: 0.2em solid #f3f4f7;
  background-color: #003566;
  border: 0.6em solid #d5d7da;
}
.QADText {
  font-weight: bold;
  font-style: roboto;
  display: flex;
  color: #ffc619;
  font-size: 25px;
  justify-content: center;
}
.QADTestlist {
  font-weight: bold;
  display: flex;
  color: #0054a6;
  font-size: 18px;
  justify-content: center;
  margin-left: 10px;
}
.QADLay {
  padding: 5px;
  margin-top: 5px;
  font-size: 15px;
  background-color: #e3f2fd;
}
.QACon {
  background-color: #ffffff;
  height: 380px; /* You can adjust the units based on your preference, 'vw' for viewport width */
  width: 550px;
  border: 0.2em solid #f3f4f7;
}
.QAHeadCon {
  height: 20%;
  width: 100%;
  border: 0.2em solid #f3f4f7;
  background-color: #003566;
  border: 0.6em solid #d5d7da;
}
.QACText {
  font-weight: bold;
  font-style: roboto;
  display: flex;
  flex: 1;
  color: #ffc619;
  font-size: 25px;
}

/* ///////////////////////////////////////RCA Submitted////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
.IRND {
  font-weight: bold;
  display: flex;
  color: #fff;
  font-size: 20px;
  justify-content: left;
  margin-left: 15px;
}

.QARCA {
  height: 75px;
  border: 0.2em solid #f3f4f7;
  background-color: #003566;
  border: 0.6em solid #d5d7da;
}
.QARText {
  font-weight: bold;
  font-style: roboto;
  display: flex;
  color: #ffc619;
  font-size: 25px;
  justify-content: center;
}
.QCRCA {
  background-color: #ffffff;
  height: 350px; /* You can adjust the units based on your preference, 'vw' for viewport width */
  width: 550px;
  border: 0.2em solid #f3f4f7;
}

.CompletionStatus {
  background-color: #ffffff;
  height: 220px; /* You can adjust the units based on your preference, 'vw' for viewport width */
  width: 550px;
  border: 0.2em solid #f3f4f7;
}

.RiskCompletion {
  background-color: #ffffff;
  height: 530px; /* You can adjust the units based on your preference, 'vw' for viewport width */
  width: 550px;
  border: 0.2em solid #f3f4f7;
}

.DoneStatus {
  background-color: #ffffff;
  height: 250px; /* You can adjust the units based on your preference, 'vw' for viewport width */
  width: 550px;
  border: 0.2em solid #f3f4f7;
}

.QCRHead {
  height: 80px;
  border: 0.2em solid #f3f4f7;
  background-color: #003566;
  border: 0.6em solid #d5d7da;
}
.QCRText {
  font-weight: bold;
  font-style: roboto;
  display: flex;
  flex: 1;
  color: #ffc619;
  font-size: 25px;
}

/* ///////////////////////////////////////RCA APPROVED////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.QCRCApproved {
  background-color: #ffffff;
  height: 460px; /* You can adjust the units based on your preference, 'vw' for viewport width */
  border: 0.2em solid #f3f4f7;
}
.QAPApproved {
  height: 75px;
  border: 0.2em solid #f3f4f7;
  background-color: #003566;
  border: 0.6em solid #d5d7da;
}
.QAPText {
  font-weight: bold;
  font-style: roboto;
  display: flex;
  color: #ffc619;
  font-size: 25px;
}
.QAPTestlist {
  font-weight: bold;
  display: flex;
  color: #ffc619;
  font-size: 20px;
  justify-content: center;
  margin-left: 10px;
}
.QAPLay {
  height: 35px;
  width: 100%;
  margin-top: 10px;
  border: 0.1em solid #cacaca;
  background-color: #003566;
}

.action-item {
  margin-top: 8px;
  display: flex;
  align-items: center;
  margin-left: 20px;
}

/* ///////////////////////////////////////QA RECOMMENDATION////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.QARECOM {
  background-color: #ffffff;
  height: 200px; /* You can adjust the units based on your preference, 'vw' for viewport width */
  width: 30%;
  border: 0.2em solid #f3f4f7;
}
.QAREC {
  height: 70px;
  border: 0.2em solid #f3f4f7;
  background-color: #003566;
  border: 0.6em solid #d5d7da;
}
.QARECText {
  font-weight: bold;
  font-style: roboto;
  display: flex;
  color: #ffc619;
  font-size: 25px;
  justify-content: center;
}
.acfooter-actions {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: white; /* or any color to match the card */
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  border-top: 0.2em solid #d5d7da;
}

/* ///////////////////////////////////////ACTION ITEMS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.QAACT {
  background-color: #ffffff;
  border: 0.2em solid #f3f4f7;
}
.QAACTHead {
  height: 75px;
  border: 0.2em solid #f3f4f7;
  background-color: #003566;
  border: 0.6em solid #d5d7da;
}
.QAACText {
  font-weight: bold;
  font-style: roboto;
  display: flex;
  color: #ffc619;
  font-size: 25px;
  justify-content: center;
}
.QAACTABLE {
  background-color: #f3f4f7;
  border-radius: 60px; /* Border radius */
  border-left: 2em solid #003566;
  border-right: 2em solid #003566;
  padding: 20px; /* Optional padding */
  font-size: 5px;
  font-style: Arial Black;
  width: 50%;
}
.QAACTabtext {
  font-size: 15px;
}

.QAACStatus {
  height: 75px;
  border: 0.2em solid #f3f4f7;
  background-color: #003566;
  border: 0.6em solid #d5d7da;
}
.QAACSText {
  font-weight: bold;
  font-style: roboto;
  display: flex;
  color: #ffc619;
  font-size: 25px;
  justify-content: center;
}

/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

/* ///////////////////////////////////////QA STATUS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.QAStatus {
  height: 75px;
  border: 0.2em solid #f3f4f7;
  background-color: #003566;
  border: 0.6em solid #d5d7da;
}
.QASText {
  font-weight: bold;
  font-style: roboto;
  display: flex;
  color: #ffc619;
  font-size: 25px;
  justify-content: center;
}

/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

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
  justify-content: center;
  align-items: center;
}
.green-text {
  color: green;
}
.red-text {
  color: red;
}

/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.QAReportable {
  height: 410px;
  width: 550px;
}

.QAReportableChi {
  height: 470px;
  width: 550px;
}

.QARiskDomain {
  height: 250px;
  width: 450px;
}

.QARiskSubDomain {
  height: 480px;
  width: 550px;
}

.QADepartment {
  height: 320px;
  width: 550px;
}

.QAArea {
  height: 220px;
  width: 550px;
}

/* //////////////////////////////////////////////////////////////////////////////////////RISK GRADING ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.QARiskG {
  height: 270px;
  width: 550px;
}

.QARiskGPOP {
  height: 240px;
  width: 550px;
}

.QARiskGVER {
  height: 240px;
  width: 550px;
}

.QARiskGrade {
  height: 75px;
  border: 0.2em solid #f3f4f7;
  background-color: #003566;
  border: 0.6em solid #d5d7da;
}
.QARiskGradeText {
  font-weight: bold;
  font-style: roboto;
  display: flex;
  color: #ffc619;
  font-size: 25px;
  justify-content: center;
}

/* .q-tab--active {
  background-color: #f4f6f8 !important;
  font-size: 18px;
} */
.disAll {
  border-left: 0.5px solid #ececec;
  border-right: 0.5px solid #ececec;
  border-top: 0.5px solid #ececec;
  border-bottom: none; /* or border-bottom: 0; */
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  background-color: #ececec;
  color: black;
  font-size: larger;
  font-weight: bold;
  font-style: roboto;
  margin-top: 20px;
  width: 10%;
  margin-right: 10px;
}
.disVeryLow {
  font-size: larger;
  border: 0.5px solid #c5e0b4;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  background-color: #c5e0b4;
  color: black;
  font-weight: bold;
  font-style: roboto;
  margin-top: 10px;
  width: 10%;
  margin-right: 10px;
}
.disLow {
  font-size: larger;
  border: 0.5px solid #94d047;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  background-color: #94d047;
  color: black;
  font-weight: bold;
  font-style: roboto;
  margin-top: 10px;
  width: 10%;
  margin-right: 10px;
}
.disModerate {
  font-size: larger;
  border: 0.5px solid #fafb05;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  background-color: #fafb05;
  color: black;
  font-weight: bold;
  font-style: roboto;
  margin-top: 10px;
  width: 10%;
  margin-right: 10px;
}
.disVeryHigh {
  font-size: larger;
  border: 0.5px solid #fac200;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  background-color: #fac200;
  color: black;
  font-weight: bold;
  font-style: roboto;
  margin-top: 10px;
  width: 10%;
  margin-right: 10px;
}
.disHigh {
  font-size: larger;
  border: 0.5px solid #ec3c39;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  background-color: #ec3c39;
  color: black;
  font-weight: bold;
  font-style: roboto;
  margin-top: 10px;
  width: 10%;
  margin-right: 10px;
}

.custom-badge {
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
}
.relative {
  position: relative; /* Ensure the q-tab is the reference for absolute positioning */
}

/* ///////////////////////////////////////ACTION ITEM DETAILS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.QCRTG {
  background-color: #ffffff;
  height: 460px; /* You can adjust the units based on your preference, 'vw' for viewport width */
  border: 0.2em solid #f3f4f7;
}
.QARTG {
  height: 75px;
  border: 0.2em solid #f3f4f7;
  background-color: #003566;
  border: 0.6em solid #d5d7da;
}
.QARTGText {
  font-weight: bold;
  font-style: roboto;
  display: flex;
  color: #ffc619;
  font-size: 25px;
}
.QARTGTestlist {
  font-weight: bold;
  display: flex;
  color: #ffc619;
  font-size: 20px;
  justify-content: center;
  margin-left: 10px;
}
.QARTGLay {
  height: 35px;
  width: 100%;
  margin-top: 10px;
  border: 0.1em solid #cacaca;
  background-color: #003566;
}

/* ///////////////////////////////////////ACTION ITEM DETAILS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.QAACTVL {
  background-color: #ffffff;
  height: 460px; /* You can adjust the units based on your preference, 'vw' for viewport width */
  border: 0.2em solid #f3f4f7;
}
.QAACTVLHEAD {
  height: 75px;
  border: 0.2em solid #f3f4f7;
  background-color: #003566;
  border: 0.6em solid #d5d7da;
}
.QAACTVLText {
  font-weight: bold;
  font-style: roboto;
  display: flex;
  color: #ffc619;
  font-size: 25px;
}
.actionfooter {
  background-color: #ffc619;
  padding: 10px;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top: 1px solid rgb(245, 245, 245);
}

.my-tabs {
  background-color: #002b5c; /* deep navy for container */
  border: 2px solid #002b5c;
}

.tab-item {
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #ffc107; /* gold text/icons for inactive */
  transition: background-color 0.3s, color 0.3s;
}

.tab-item.q-tab--active {
  background-color: #ffc107; /* gold background when active */
  color: #002b5c; /* navy text/icons when active */
  border-radius: 10px 10px 0 0; /* rounded top for active */
}

.tab-equal {
  width: 180px;
  text-align: center;
  justify-content: center;
  border-radius: 10px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Active tab background colors */
.veryLow-active {
  background-color: #c6e0b3; /* mint green */
  color: black;
}

.low-active {
  background-color: #92d14f; /* light green */
  color: black;
}

.moderate-active {
  background-color: #ffff01; /* yellow */
  color: black;
}

.high-active {
  background-color: #febf02; /* orange */
  color: white;
}

.veryHigh-active {
  background-color: #fe0000; /* red */
  color: white;
}

.QAModuleDiag {
  background-color: #2f5d80;
  padding-top: 20px;
  padding-bottom: 40px;
  min-height: 100vh;
}

.contentFormQAModule {
  border: 2px solid #f0f2f5;
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
  padding: 20px;
  background-color: #ffffff;
  width: 1200px;
  height: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.contentActionFormModule {
  border: 2px solid #f0f2f5;
  margin-left: auto;
  margin-right: auto;
  border-radius: 25px;
  padding: 20px;
  background-color: #ffffff;
  width: 1600px;
  height: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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

.QAConfirmAction {
  height: 240px;
  width: 500px;
}

.Reporttab-equal {
  width: 150px;
  justify-content: center;
  text-align: center;
  border-radius: 30px;
  transition: background-color 0.3s ease, color 0.3s ease;
  cursor: pointer;
}

/* Active tab */
.Reporttab-equal.Reporttab-active {
  background-color: #0054a6; /* info */
  color: white;
}

/* Inactive tab */
.Reporttab-equal.Reporttab-inactive {
  background-color: #e0e0e0; /* light gray */
  color: #003566; /* primary */
}

/* Optional hover for inactive */
.Reporttab-equal.Reporttab-inactive:hover {
  background-color: #d5d5d5; /* a bit darker gray */
}

.Depttab-equal {
  width: 150px;
  justify-content: center;
  text-align: center;
  border-radius: 30px;
  transition: background-color 0.3s ease, color 0.3s ease;
  cursor: pointer;
}

/* Active tab */
.Depttab-equal.Depttab-active {
  background-color: #0054a6; /* info */
  color: white;
}

/* Inactive tab */
.Depttab-equal.Depttab-inactive {
  background-color: #e0e0e0; /* light gray */
  color: #003566; /* primary */
}

/* Optional hover for inactive */
.Depttab-equal.Depttab-inactive:hover {
  background-color: #d5d5d5; /* a bit darker gray */
}

/* ///////////////////////////////////////QA STATUS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.QARejectStatus {
  height: 370px;
  width: 500px;
}
</style>
