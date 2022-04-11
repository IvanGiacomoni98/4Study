<template>
  <div class="container-fluid" id="cosafacciamo">
    <div
      class="row mt-2 pb-3 d-none d-sm-block"
      id="rigaesterna"
      height="200px"
    >
      <div class="col-12">
        <center>
          <div class="col-6">
            <!-- messaggio iniziale-->
            <div class="card text-black mt-5 bg-warning">
              <div class="card-body">
                <div class="row">
                  <div class="col">
                    <h1 class="display-4 mt-5"><b>Welcome on 4Study!</b></h1>
                  </div>

                  <div class="col">
                    <p class="lead">
                      The purpose of 4Study is to support and increase
                      relationships between students, also remotely. 
                      
                    <h5>
                      <router-link to="/registration">Sign up</router-link>
                    </h5>
                    <p><router-link to="/login">Log in </router-link>
                    </p>
                  </div>
                   </div>
                   <hr>
                  <div class="row mt-5 pb-5">
                    <div class="col">
                      <img src="../assets/studio.jpg" height=120><hr>
                        Find a study group in your area according to a specific
                        subject, this will help all the users to find people to study 
                        together in order to avoid to be alone.
                      </div>

                     <div class="col">
                      <img src="../assets/share.png" height=120>
                      <hr>
                      <p>
                        Sharing notes and documents related to specific subject in order to allow
                        all students to have access to the best possible materials.
                        </p>
                      </div>
                      <div class="col">
                      <img src="../assets/language.png" height=120>
                      <hr>
                      <p>
                        Give the possibility to students to improve their
                        language skills by using a chat.
                        </p>
                      </div>
                      <div class="col">
                      <img src="../assets/biblioteca.png" height=120>
                      <hr>
                      <p>
                        Find a study room, a library or a coworking space to study with other people
                        </p>
                      </div>
                  </div>
                
              

                 
                </div>
              </div>
            </div>
        </center>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
      rc: false,
    };
  },
  beforeMount() {},
};
</script>


<style scoped>
.card {
  -webkit-box-shadow: 0px 1px 8px 3px rgba(0, 0, 0, 0.44);
  -moz-box-shadow: 0px 1px 8px 3px rgba(0, 0, 0, 0.44);
  box-shadow: 0px 1px 8px 3px rgba(0, 0, 0, 0.44);
}
</style>