<template>
  <div class="courses-container">
    <h1>Courses</h1>
    <CourseAccordion
      v-for="course in courses"
      :key="course.course_number"
      :course="course"
    />
  </div>
</template>

<script>
import axios from 'axios';
import CourseAccordion from './CourseAccordion.vue';

export default {
  name: 'CourseList',
  components: {
    CourseAccordion,
  },
  data() {
    return {
      courses: [],
    };
  },
  async created() {
    const response = await axios.get(
      'https://vaishnavi-node.onrender.com/api'
    );
    this.courses = response.data;
    console.log(this.courses)
  },
};
</script>

<!-- ... (previous code) ... -->

<style scoped>
.courses-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2c3e50;
  min-height: 100vh;
  padding: 2rem 0;
}

h1 {
  color: #ffffff;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}
</style>

