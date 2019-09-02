<template>
    <div id="komunikat">
        <div id="tresc">
            <span>{{komunikat}}</span>
            <button style="background-color:green" @click="tak">TAK</button>
            <button style="background-color:red" @click="nie">NIE</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "komunikatTN",
        props: {
            komunikat: String
        },
        methods: {
            tak () {
                this.$emit("tak");
            },
            nie () {
                this.$emit("nie");
            }
        }
    };
</script>

<style lang="less" scoped>
#komunikat {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  width: 450px;
  height: 200px;
  background-color: blueviolet;
  color: black;
  text-align: center;
  #tresc {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    button {
      height: 50px;
      width: 100px;
      margin-right: 10px;
      position: relative;
      color:black;
      border-radius:3px;
    }
    span {
      font-size: 25px;
      display: block;
      padding: 2vh;
    }
  }
}
</style>
