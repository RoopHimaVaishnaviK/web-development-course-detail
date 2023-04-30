<template>
  <div class="course-accordion">
    <div class="course-header" @click="toggleAccordion">
      <font-awesome-icon icon="book" />
      {{ course.course_name }} ({{ course.course_number }})
    </div>
    <div class="course-details" v-show="isOpen">
      <p><font-awesome-icon icon="map-marker-alt" /> Course Name: {{ course.course_name }}</p>
      <p><font-awesome-icon icon="map-marker-alt" /> Course Number: {{ course.course_number }}</p>
      <p><font-awesome-icon icon="chalkboard-teacher" /> Lecturer: {{ course.lecturer }}</p>
      <p><font-awesome-icon icon="map-marker-alt" /> Location: {{ course.location }}</p>
      <p><font-awesome-icon icon="graduation-cap" /> Credits: {{ course.credits }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CourseAccordion',
  props: {
    course: Object,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleAccordion() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<!-- ... (previous code) ... -->

<style scoped>
.course-accordion {
  width: 50%;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 1em;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.course-accordion:hover {
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  transform: translateY(-3px);
}

.course-header {
  padding: 1em;
  cursor: pointer;
  font-weight: bold;
  background-color: #3498db;
  color: #ffffff;
  border-radius: 10px 10px 0 0;
  transition: background-color 0.3s;
}

.course-header:hover {
  background-color: #2980b9;
}

.course-details {
  padding: 1em;
  border-top: 1px solid #ccc;
  background-color: #f5f5f5;
}

.course-details i {
  margin-right: 5px;
}
</style>

