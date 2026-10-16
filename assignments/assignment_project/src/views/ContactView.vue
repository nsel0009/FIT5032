<template>
    <div class="container-block">
      <section class="container-section">
        <div>
          <h1>Add A New Booking</h1>
          <p>View the calendar to see the available sessions, then select a session to book.</p>
        </div>
        <div>
        <form ref="form" @submit.prevent="sendEmail">
          <label class="form-label">Name</label>
          <input class="form-control" type="text" name="name">
          <label class="form-label">Email</label>
          <input class="form-control" type="email" name="email">
          <label class="form-label">Message</label>
          <textarea class="form-control" name="message"></textarea>
            <button type="submit" value="Send">
              Send
            </button>
        </form>
        </div>
      </section>
    </div>
</template>

<script>
import emailjs from '@emailjs/browser';

export default {
  methods: {
    sendEmail() {
      emailjs
        .sendForm(
          'service_79bj1gb',
          'template_qo83k2z',
          this.$refs.form,
          {
            publicKey: 'NCKUB6EMXc6Xb-Uwn',
          }
        )
        .then(
          () => {
            console.log('SUCCESS!');
          },
          (error) => {
            console.log('FAILED...', error.text);
          },
        );
    },
  },
};
</script>

<style scoped>
.container-block {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1,
h2, h3, p {
  color: #333;
}
h1 {
  text-align: center;
}

.form-control, .form-select, .error-message, .text-danger {
  padding: 10px 10px;
  margin: 5px 0;
  border-radius: 5px;
  width: 100%;
  box-sizing:
  border-box;
  color: black;
  background-color: #f4f4f4;
}

.form-label{
  padding: 10px 10px;
  margin: 5px 0;
  border-radius: 5px;
  width: 100%;
  color: black;
}

.container-section {
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.message {
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
}

.success {
  background-color: #e7faf3;
  color: #42b883;
  border: 1px solid #42b883;
}

.highlight {
  background-color: #42b883;
}

code {
  background-color: #e0e0e0;
  padding: 2px 5px;
  border-radius: 4px;
  font-family: "Courier New", Courier, monospace;
}

ul {
  list-style-type: none;
  padding: 0;
  color: black;
}
li {
  background-color: #f0f0f0;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  color: black;
}

:deep(.column-text) {
  background-color: #f0f0f0;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  color: black;
}

:deep(.p-paginator) {
  background-color: #f0f0f0;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  color: black;
}

:deep(.p-paginator .p-paginator-page),
:deep(.p-paginator .p-paginator-icon) {
  color: black;
}

:deep(.p-inputtext) {
  background-color: #f0f0f0;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  color: black;
}

</style>
