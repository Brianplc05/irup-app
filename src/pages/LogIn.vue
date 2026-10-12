<template>
  <q-layout>
    <q-page-container>
      <q-page class="login-page row items-center justify-center">
        <div class="row full-width" style="min-height: 100vh">
          <div class="col-md-7 gt-sm flex flex-center">
            <img src="../assets/Login-Admin.png" class="dashboard-image" />
          </div>

          <div class="col-12 col-md-5 flex flex-center q-pa-xl">
            <div class="login-card">
              <div class="text-center">
                <div class="welcome-title">Welcome Back!</div>

                <div class="welcome-subtitle">
                  This site is for admin members to report every progress of
                  information that has been obtained.
                </div>
              </div>

              <q-form class="q-mt-md" @submit.prevent="login">
                <q-input
                  outlined
                  v-model="EmployeeCode"
                  label="Employee Number"
                  class="q-mb-md"
                >
                  <template v-slot:prepend>
                    <q-icon name="person" class="q-pa-sm" />
                  </template>
                </q-input>

                <q-input
                  outlined
                  v-model="WebPassword"
                  label="Password"
                  :type="showPassword ? 'text' : 'password'"
                >
                  <template v-slot:prepend>
                    <q-icon name="lock"></q-icon>
                  </template>
                  <template v-slot:append>
                    <q-icon
                      name="visibility"
                      v-if="!showPassword"
                      @click="showPassword = true"
                    ></q-icon>
                    <q-icon
                      name="visibility_off"
                      v-else
                      @click="showPassword = false"
                    ></q-icon>
                  </template>
                </q-input>

                <q-btn
                  class="login-btn full-width q-mt-lg"
                  label="Log In"
                  icon="login"
                  unelevated
                  type="submit"
                />
              </q-form>
              <div class="version">Version 2.0 • © 2026 IRMS</div>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      EmployeeCode: "",
      WebPassword: "",
      showPassword: false,
    };
  },

  computed: {
    ...mapGetters({ getUser: "ApplyStore/getUser" }),
  },

  methods: {
    async login() {
      try {
        // trim para kahit may spaces lang
        const emp = this.EmployeeCode?.trim();
        const pass = this.WebPassword?.trim();

        // 🔴 EARLY VALIDATION (undefined / empty / null)
        if (!emp || !pass) {
          this.$q.notify({
            color: "negative",
            position: "top",
            message: "PLEASE ENTER BOTH EMPLOYEE NUMBER AND PASSWORD",
            icon: "report_problem",
            timeout: 2000,
          });
          return;
        }

        const logs = {
          EmployeeCode: emp,
          WebPassword: pass,
        };

        const response = await this.$store.dispatch("ApplyStore/Login", logs);

        this.$router.push("/auth-loading");
      } catch (error) {
        this.$q.notify({
          color: "negative",
          position: "top",
          message: "INCORRECT EMPLOYEE NUMBER & PASSWORD",
          icon: "report_problem",
          timeout: 2000,
        });
      }
    },

    validateNOTE() {
      return this.EmployeeCode && this.WebPassword;
    },
  },
};
</script>

<style scoped>
.login-page {
  background: #f9fcfd;
}

.login-card {
  width: 100%;
  max-width: 520px;
  background: white;
  border-radius: 10px;
  padding: 45px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
  animation: fadeUp 0.5s;
  border-bottom: 1em solid #ffc619;
  border-top: 1em solid #003566;
}

.logo {
  width: 200px;
  margin-bottom: 20px;
}

.system-title {
  font-size: 1rem;
  font-weight: 600;
  color: #06648b;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 5px;
}

.welcome-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #002562;
}

.welcome-subtitle {
  margin-top: 5px;
  font-size: 1rem;
  color: #6b7280;
  line-height: 1.7;
}

.login-input .q-field__control {
  height: 56px;
  border-radius: 10px;
}

.login-input.q-field--focused .q-field__control {
  box-shadow: 0 0 0 3px rgba(6, 100, 139, 0.15);
}

.login-btn {
  height: 54px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
  background: #f8a501;
  color: white;
  transition: 0.25s;
  box-shadow: 0 10px 25px rgba(248, 165, 1, 0.35);
}

.login-btn:hover {
  background: #f9cf11;
  transform: translateY(-2px);
}

.dashboard-image {
  max-width: 85%;
  animation: fadeUp 0.8s;
}

.version {
  margin-top: 40px;
  text-align: center;
  color: #9ca3af;
  font-size: 13px;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
