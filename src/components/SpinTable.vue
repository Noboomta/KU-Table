<template>
  <div>
    <img src="../assets/table.png" alt="" class="loader z-50 opacity-80">
    <div class="
      loader-wrapper lmask
    ">
    </div>
  </div>
</template>

<script>
export default {
  name: 'spinTable'
}
    /*z-10 h-screen w-full bg-tranparent masked */
// center w-72 spin
</script>

<style>

div.masked {
    position: relative;
}

div.masked:before {
    
    position:absolute;
    content: "";
    width: 100%;
    height: 100%;
    background-color: rgba(70, 70, 70, 0.7);
    background-color: transparent;
}


</style>