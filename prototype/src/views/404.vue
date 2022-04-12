<template>
 
<div class="container-fluid " >
    <div class="card-body">
    <div class="row mt-5">
        <div class="col">
            <h1>404 NOT FOUND !</h1>
        </div>
    </div>

    </div>
</div>
</template>

<script>

export default {
  name: 'Page404',

  mounted()
  {
    setTimeout(this.cambiaPagina,5000)
    document.body.setAttribute("style","background: linear-gradient( to right, #f5dd42,  #ffc107);")
   
  },
  methods:
  {
      cambiaPagina: function()
      {
        document.body.setAttribute("style","background: linear-grad background: linear-gradient(to right, #f0f0f0, #ffffff);")
        this.$router.push('/login')
      }

  }

}
</script>


<style scoped>




</style>

