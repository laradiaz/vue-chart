<template>
  <div class="wrapper">
    <h3>Agenda de Reservas</h3>
    <div id="visualization"></div>
  </div>
</template>

<script>
import { Timeline } from "vis-timeline/standalone";
import {mapGetters} from "vuex";
import moment from 'moment';

export default {
  data() {
    return {
      timeline: undefined,
    };
  },
  computed: {
    items() {
      return this.getAccounts;
      console.log("getAccounts")
    },
    ...mapGetters (["getAccounts"])
  },
  async mounted() {
    await this.accounts;
    
    const options = {
      orientation: "top",
      itemsAlwaysDraggable: true,
      timeAxis: { scale: "hour", step: 1 },
      zoomMax: 150000000,
      minHeight: "400px",
      start: "2020-12-03",
    };
    const container = document.getElementById("visualization");
    this.timeline = new Timeline(container, this.items, options);
    const { min, max } = this.timeline.getItemRange();

    const a0 = 10;
    const a100 = moment.duration(moment(max).diff(moment(min))).asMilliseconds();
    const distance = (a100 - a0) / 100;

    this.timeline.on("rangechanged", function ({ start, end }) {
      console.log(start.toString(), end.toString());
      start = moment(start);
      end = moment(end);
      const duration = moment.duration(end.diff(start));
      const mins = duration.asMilliseconds();
    });

    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'newAccount') {
        this.timeline.setItems(state.accounts);
        this.timeline.redraw();
      }
    });
  }
};
</script>
<style>
.vis-time-axis .vis-grid.vis-odd {
  background: #f5f5f5;
}
.vis-time-axis .vis-grid.vis-saturday,
.vis-time-axis .vis-grid.vis-sunday {
  background: gray;
}
.vis-time-axis .vis-text.vis-saturday,
.vis-time-axis .vis-text.vis-sunday {
  color: white;
}
.vis-item {
  background-color: #fff48c;
  border-color: #fff48c;
  color: black;
  border-left-width: 3px;
  border-left-style: solid;
  font-weight: 500;
  opacity: 0.8;
  font-size: 13px;
  height: 55px;
}
.vis-h0 .vis-h01 .vis-h15 .vis-h16 {
  color: blue !important;
  height: 100px;
  text-align: center;
}

h3 {
  font-family: "Montserrat", sans-serif;
  text-align: left;
  font-size: 20px;
  margin-bottom: 25px;
}
</style>