<template>
  <div class="axios"></div>
</template>
<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    return {
      pageData: {}
    };
  },
  mounted: function() {
    this.init();
    // this.concurrent();
  },
  methods: {
    init: function() {
      let axios1 = axios.create({
        baseURL: "https://api.apiopen.top",
        timeout: 2000,
        url: "/getJoke",
        method: "get",
        params: {
          page: 1,
          count: 2,
          type: "video"
        }
      });
      axios1
        .get()
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    concurrent: function() {
      axios
        .all([
          axios.get(
            "https://api.apiopen.top/getJoke?page=1&count=2&type=video"
          ),
          axios.get("https://api.apiopen.top/getSingleJoke?sid=28654780")
        ])
        .then(
          axios.spread((res1, res2) => {
            console.log(res1, res2);
          })
        );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
