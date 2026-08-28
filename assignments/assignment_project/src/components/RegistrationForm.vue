<template>

    <div class="container-block mt-5">

      <div class="row">
        <div class="col-md-8 offset-md-2">
          <h1 class="text-center">Register Your Account</h1>
          <form @submit.prevent="submitForm">
            <table style="width: 100%;">
              <tr>
                <td>
                  <label for="firstname" class="form-label">First Name</label>
                </td>
                <td>
                  <label for="lastname" class="form-label">Last Name</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" class="form-control" id="firstname"
                  @blur="() => validateFirstname(true)"
                  @input="() => validateFirstname(false)"
                  v-model="formData.firstname" />
                  <div v-if="errors.firstname" class="text-danger">{{ errors.firstname }}</div>
                </td>
                <td>
                  <input type="text" class="form-control" id="lastname"
                  @blur="() => validateLastname(true)"
                  @input="() => validateLastname(false)"
                  v-model="formData.lastname" />
                  <div v-if="errors.lastname" class="text-danger">{{ errors.lastname }}</div>
                </td>
              </tr>
              <tr>
                <td>
                  <label for="username" class="form-label">Username</label>
                </td>
                <td>
                  <label for="email" class="form-label">Email</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" class="form-control" id="username"
                  @blur="() => validateUsername(true)"
                  @input="() => validateUsername(false)"
                  v-model="formData.username" />
                  <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
                </td>
                <td>
                  <input type="email" class="form-control" id="email"
                  @blur="() => validateEmail(true)"
                  @input="() => validateEmail(false)"
                  v-model="formData.email" />
                  <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
                </td>
              </tr>
              <tr>
                <td>
                  <label for="password" class="form-label">Password</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="password" class="form-control" id="password"
                  @blur="() => validatePassword(true)"
                  @input="() => validatePassword(false)"
                  v-model="formData.password" />
                  <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
                </td>
              </tr>
              <tr>
                <td>
                  <label for="gender" class="form-label">Gender</label>
                </td>
                <td>
                  <label for="status" class="form-label">Status</label>
                </td>
              </tr>
              <tr>
                <td>
                  <select class="form-select" id="gender"
                  @blur="() => validateReason(true)"
                  @input="() => validateReason(false)"
                  v-model="formData.gender">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <div v-if="errors.gender" class="text-danger">{{ errors.gender }}</div>
                </td>
                <td>
                  <select class="form-select" id="status"
                  @blur="() => validateStatus(true)"
                  @input="() => validateStatus(false)"
                  v-model="formData.status">
                    <option value="active">Active</option>
                    <option value="disabled">Disabled</option>
                  </select>
                  <div v-if="errors.status" class="text-danger">{{ errors.status }}</div>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <label for="reason" class="form-label">Reason for joining</label>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <textarea class="form-control" id="reason" rows="3"
                  @blur="() => validateReason(true)"
                  @input="() => validateReason(false)"
                  v-model="formData.reason"></textarea>
                  <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="btn-container">
                    <button type="submit" class="custom-btn-primary">Submit</button>
                    <button type="button" class="custom-btn-secondary" @click="clearForm">Clear</button>
                  </div>
                </td>
              </tr>
            </table>

            <br />
          </form>
        </div>
      </div>

      <div class="w-full">
        <DataTable :value="submittedCards" tableStyle="min-width: 50rem">
          <Column class="column-text" field="firstname" header ="First Name" />
          <Column class="column-text" field="lastname" header ="Last Name" />
          <Column class="column-text" field="username" header ="Username" />
          <Column class="column-text" field="email" header ="Email" />
          <Column class="column-text" field="password" header ="Password" />
          <Column class="column-text" field="gender" header ="Gender" />
          <Column class="column-text" field="status" header ="Status" />
          <Column class="column-text" field="reason" header ="Reason" />
        </DataTable>
      </div>

    </div>

</template>

<script setup>

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import { ref } from 'vue';

const formData = ref({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    status: '',
    reason: '',
    gender: ''
});

const submittedCards = ref([]);

const submitForm = () => {
  validateFirstname(true);
  validateLastname(true);
  validateUsername(true);
  validateEmail(true);
  validatePassword(true);
  validateGender(true);
  validateStatus(true);
  validateReason(true);
  if (!errors.value.firstname && !errors.value.lastname && !errors.value.username && !errors.value.password && !errors.value.gender && !errors.value.status && !errors.value.reason) {
    submittedCards.value.push({...formData.value});
    clearForm();
  }
};

const clearForm = () => {
    formData.value = {
        username: '',
        password: '',
        reason: '',
        gender: ''
    };
};

const errors = ref({
  username: null,
  password: null,
  resident: null,
  gender: null,
  reason: null,
})

const validateFirstname = (blur) => {
  const nameMaxLimit = 20;
  const nameMinLimit = 3;

  if (formData.value.username.length > nameMaxLimit) {
    if (blur) errors.value.username = `Username must be no more than ${nameMaxLimit} characters long.`;
  } else if (formData.value.username.length < nameMinLimit) {
    if (blur) errors.value.username = `Username must be at least ${nameMinLimit} characters long.`;
  } else {
    errors.value.username = null;
  }
}

const validateLastname = (blur) => {
  const nameMaxLimit = 30;
  const nameMinLimit = 2;

  if (formData.value.username.length > nameMaxLimit) {
    if (blur) errors.value.username = `Username must be no more than ${nameMaxLimit} characters long.`;
  } else if (formData.value.username.length < nameMinLimit) {
    if (blur) errors.value.username = `Username must be at least ${nameMinLimit} characters long.`;
  } else {
    errors.value.username = null;
  }
}

const validateUsername = (blur) => {
  const nameMaxLimit = 20;
  const nameMinLimit = 3;

  if (formData.value.username.length > nameMaxLimit) {
    if (blur) errors.value.username = `Username must be no more than ${nameMaxLimit} characters long.`;
  } else if (formData.value.username.length < nameMinLimit) {
    if (blur) errors.value.username = `Username must be at least ${nameMinLimit} characters long.`;
  } else {
    errors.value.username = null;
  }
}

const validateEmail = (blur) => {
  const nameMaxLimit = 50;
  const nameMinLimit = 3;

  if (formData.value.email.length > nameMaxLimit) {
    if (blur) errors.value.email = `Email must be no more than ${nameMaxLimit} characters long.`;
  } else if (formData.value.email.length < nameMinLimit) {
    if (blur) errors.value.email = `Email must be at least ${nameMinLimit} characters long.`;
  } else {
    errors.value.email = null;
  }
}


const validatePassword = (blur) => {

  const password = formData.value.password;
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (formData.value.password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`;
  } else if (!hasUppercase) {
    if (blur) errors.value.password = "Password must contain at least one uppercase letter.";
  } else if (!hasLowercase) {
    if (blur) errors.value.password = "Password must contain at least one lowercase letter.";
  } else if (!hasNumber) {
    if (blur) errors.value.password = "Password must contain at least one number.";
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = "Password must contain at least one special character.";
  } else {
    errors.value.password = null;
  }
}

const validateGender = (blur) => {
  if (!formData.value.gender) {
    if (blur) errors.value.gender = "Gender must be selected from the options above"
  } else {
    errors.value.gender = null;
  }
}

const validateStatus = (blur) => {
  if (!formData.value.status) {
    if (blur) errors.value.status = "Status must be selected from the options above"
  } else {
    errors.value.status = null;
  }
}

const validateReason = (blur) => {
  if (formData.value.reason.length < 10) {
    if (blur) errors.value.reason = "Reason must be at least 10 characters"
  } else if (formData.value.reason.length > 256) {
    if (blur) errors.value.reason = "Reason must be no more than 256 characters"
  } else {
    errors.value.reason = null;
  }
}

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

  td {
    width: 50%;
  }

  .form-control, .form-select, .form-label, .error-message, .text-danger {
    padding: 10px 10px;
    margin: 5px 0;
    border-radius: 5px;
    width: 100%;
    box-sizing:
    border-box;
    color: black;
  }

  .container-section {
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

   .card {
   border: 1px solid #ccc;
   border-radius: 10px;
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
   }
   .card-header {
   background-color: #275FDA;
   color: white;
   padding: 10px;
   border-radius: 10px 10px 0 0;
   }
   .list-group-item {
   padding: 10px;
   }

   :deep(.column-text) {
    background-color: #f0f0f0;
    padding: 10px;
    margin: 5px 0;
    border-radius: 5px;
    color: black;
  }

  .custom-btn-primary {
    background-color: #5dfff2; /* Vue Green */
    color: black;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
  }
  .custom-btn-primary:hover {
    background-color: #22514d;
    color: white;
  }

    .custom-btn-secondary {
    background-color: #acacac; /* Vue Green */
    color: black;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
  }
  .custom-btn-secondary:hover {
    background-color: #3d3d3d;
    color: white;
  }

  .btn-container {
    display: flex;
  }

</style>
