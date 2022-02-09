<template>
  <div id="app">
    <form @submit.prevent="senddata">
      <div class="form-group">
        <h1>Unos</h1>
        <label for="exampleInput1">Id</label>
        <input type="text" class="form-control" v-model="id" />
      </div>
      <div class="form-group" style="margin-top: 20px">
        <label for="exampleInput3">Encrypt</label>
        <input type="text" class="form-control" v-model="encrypt" />
      </div>
      <button type="submit" class="btn btn-primary" style="margin-top: 20px">
        Pošalji
      </button>
    </form>
    <form @submit.prevent="checkdata">
      <div class="form-group">
        <h1>Provjera</h1>
        <label for="exampleInput2">Id</label>
        <input type="text" class="form-control" v-model="id2" />
      </div>
      <div class="form-group" style="margin-top: 20px">
        <label for="exampleInput4">Provjera enkripcije</label>
        <input type="text" class="form-control" v-model="encrypt2" />
      </div>
      <button type="submit" class="btn btn-primary" style="margin-top: 20px">
        Pošalji
      </button>
    </form>
    <div v-if="errorMessage1" class="alert alert-danger">
      <strong>Ups!</strong>
      Podaci nisu ispravno upisani ili ne postoje
    </div>
    <div v-if="!errorMessage1" class="alert alert-success">
      <strong>Sve OK</strong>
    </div>
  </div>
</template>
<script>
import { createdata } from "@/services";
export default {
  name: "beginning",
  data() {
    return {
      id: "",
      encrypt: "",
      id2: "",
      encrypt2: "",
      errorMessage: "",
      errorMessage1: '',
    };
  },
  methods: {
    async senddata() {
      let a = {
        id: this.id,
        encrypt: this.encrypt,
      };
      try {
        await createdata.data(a).then(()=>{
          this.id=''
          this.encrypt=''
        })
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
    async checkdata() {
      let a = {
        id: this.id2,
        encrypt: this.encrypt2,
      };
      this.errorMessage1=''
      try {
        await createdata.check(a);
      } catch (error) {
          this.errorMessage1 = error.message;
      }
    },
  },
};
</script>