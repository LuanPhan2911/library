<script>
import { useUserSchema } from "@/hooks/useUserSchema";
import AuthService from "@/services/AuthService";
import { Form, Field, ErrorMessage } from "vee-validate";
import { onMounted, reactive } from "vue";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";

export default {
  name: "LoginView",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    const { isAuth } = useAuth();
    const toast = useToast();
    const { getSchema } = useUserSchema();
    const userSchema = getSchema(["email", "password"]);
    const router = useRouter();
    const user = reactive({
      email: "",
      password: "",
    });
    onMounted(() => {
      document.title = "Login";
    });

    const onLogin = async () => {
      try {
        let data = await AuthService.login(user);
        if (data) {
          toast.success("Đăng nhập thành công");
          router.back();
        }
      } catch (error) {}
    };

    return { user, userSchema, isAuth, onLogin };
  },
};
</script>
<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-6 my-3 col-md-8">
        <div class="card shadow animate__animated animate__bounceInDown">
          <div class="card-header">
            <h3 class="text-center text-primary">Đăng nhập</h3>
          </div>
          <div class="card-body">
            <Form @submit="onLogin" :validation-schema="userSchema">
              <div class="mb-3 row">
                <label for="email" class="col-sm-3 col-form-label">Email</label>
                <div class="col-sm-9">
                  <Field
                    class="form-control"
                    name="email"
                    type="email"
                    v-model="user.email"
                  />

                  <ErrorMessage name="email" class="text-danger" />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="password" class="col-sm-3 col-form-label"
                  >Mật khẩu</label
                >
                <div class="col-sm-9">
                  <Field
                    class="form-control"
                    name="password"
                    type="password"
                    v-model="user.password"
                  />

                  <ErrorMessage name="password" class="text-danger" />
                </div>
              </div>
              <div class="mb-3 d-flex justify-content-center">
                <button class="btn btn-primary px-5 d-block" type="submit">
                  Đăng nhập
                </button>
              </div>
              <div class="mb-3">
                <p class="text-center">
                  Bạn chưa có tài khoản?
                  <router-link
                    :to="{ name: 'register' }"
                    class="link-primary text-decoration-none"
                    >Đăng ký</router-link
                  >
                </p>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
