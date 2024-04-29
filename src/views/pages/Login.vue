<template>
  <div class="wrapper min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CAlert
                  show
                  color="success"
                  v-if="hasAuthenticationSucceed === true"
                >
                  <strong>Login Success!</strong> You will be redirected
                </CAlert>

                <CAlert
                  show
                  color="danger"
                  v-if="hasAuthenticationSucceed === false"
                >
                  <strong>Login failed!</strong> Username or Password wrong
                </CAlert>

                <CForm @submit.prevent="onSubmitLogin">
                  <h1>Login</h1>
                  <p class="text-body-secondary">Sign In to your account</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      type="email"
                      required="required"
                      v-model:model-value="username"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Password"
                      type="password"
                      required="required"
                      v-model:model-value="password"
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <CButton type="submit" color="primary" class="px-4"> Login </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard class="text-white bg-primary py-5" style="width: 44%">
              <CCardBody class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <CButton color="light" variant="outline" class="mt-3">
                    Register Now!
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import apiClient from "@/service/api.client.service";
import { createAuthCheckApiService } from "@/service/auth-check.api.service.factory";

export default {
  name: "Login",
  data() {
    return {
      username: null,
      password: null,
      hasAuthenticationSucceed: null,
      authCheckApiService: null,
    };
  },
  created() {
    this.authCheckApiService = createAuthCheckApiService();
    this.authCheckApiService
      .authCheck()
      .then(() => {
        this.$router.push({ name: "Home" });
      });
  },
  methods: {
    onSubmitLogin() {
      apiClient
        .post("login", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          const { token } = response.data;
          localStorage.setItem("accessToken", token);

          this.hasAuthenticationSucceed = true;
          this.$router.go();
        })
        .catch(() => {
          this.hasAuthenticationSucceed = false;
        });
    },
  },
};
</script>
