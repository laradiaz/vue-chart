<template>
  <div class="wrapper">
    <h3>Agenda de Reservas</h3>
    <div id="visualization"></div>
  </div>
</template>

<script>
import { Timeline } from "vis-timeline/standalone";
export default {
  data() {
    return {
      timeline: undefined,
      items: [
        { id: 1, content: "Alvarado, Eduardo Alfonso", start: "2020-12-04, 09:30:00", end: "2020-12-04, 10:30:00" },
        { id: 2, content: "Acuña López, Juliana", start: "2020-12-04, 11:00:00", end: "2020-12-04, 12:30:00" },
        { id: 3, content: "Arenales, Ingrid Lorena", start: "2020-12-04, 12:30:00", end: "2020-12-04, 13:30:00" },
        { id: 4, content: "Barreto ruíz, Aldana", start: "2020-12-04, 13:30:00", end: "2020-12-04, 16:00:00" },
        { id: 5, content: "Buitrado Lozano, Daniel Esteban", start: "2020-12-04, 16:30:00", end: "2020-12-04, 17:30:00" },
        { id: 6, content: "Delgado, Ángel David", start: "2020-12-04, 17:30:00", end: "2020-12-04, 19:00:00" },
      ],
      groups: [
        {
          id: [0, 1, 2, 3 , 4, 5, 6,],
          content: "",
        },
      ],

      dataLoaded: null,
    };
  },
  async mounted() {
    await this.dataLoaded;

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
    const { min, max } = timeline.getItemRange();
    a0 = 10;
    a100 = moment.duration(moment(max).diff(moment(min))).asMilliseconds();
    distance = (a100 - a0) / 100;

    timeline.on("rangechanged", function ({ start, end }) {
      console.log(start.toString(), end.toString());
      start = moment(start);
      end = moment(end);
      const duration = moment.duration(end.diff(start));
      const mins = duration.asMilliseconds();
    });
  },
  watch() {
    this.$store.state.accounts();
  },
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