<script>
import CommentService from "@/services/CommentService";
import { computed, ref } from "vue";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "vue-toast-notification";

export default {
  name: "CommentCreate",
  props: ["parent", "commentable"],
  emits: ["sent"],
  setup(props, { emit }) {
    const { user, isAuth } = useAuth();
    const toast = useToast();
    const parent = computed(() => props.parent);
    const commentable = computed(() => props.commentable);
    const comment = ref({
      message: "",
      parent: {},
      commentable: {},
    });
    const send = async () => {
      if (!comment.value.message) {
        toast.error("Nội dung bình luận không thể để trống!");
        return;
      }
      comment.value.parent = parent.value;
      comment.value.commentable = commentable.value;
      let data = await CommentService.create(comment.value);
      if (data) {
        comment.value.message = "";
        emit("sent");
      }
      try {
      } catch (error) {}
    };
    return { user, isAuth, comment, send };
  },
};
</script>
<template>
  <div class="py-2" v-if="isAuth">
    <div class="row">
      <div class="col-auto">
        <img :src="user.avatar" class="avatar rounded-circle" />
      </div>
      <div class="col">
        <div class="text-primary text-capitalize fw-bold align-items-center">
          {{ user.name }}
        </div>
      </div>
      <div class="col-12 my-2">
        <div class="card-body">
          <textarea
            rows="2"
            class="form-control"
            placeholder="Nhập bình luận của bạn..."
            v-model="comment.message"
          ></textarea>
        </div>
        <div class="d-flex justify-content-end mt-2">
          <button class="btn btn-primary" @click="send">
            <i class="bi bi-send"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="text-danger mb-2">
      Cần đăng nhập để bình luận
      <router-link
        :to="{ name: 'login' }"
        class="link-primary text-decoration-none"
      >
        Đăng nhập</router-link
      >
    </div>
  </div>
</template>
<style scoped>
.avatar {
  width: 50px;
  height: 50px;
}
</style>
