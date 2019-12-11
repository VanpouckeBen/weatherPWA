<template>
  <div class="hello">
    <div class="c-weater" v-if="weater">
      <img
        class="c-weater__image"
        :src="require(`../assets/icons/${weater.list[0].weather[0].main}.svg`)"
      />

      <h1 class="c-weater__temp">
        {{ weater.list[0].main.temp | formatNumber }}°
      </h1>
      <div class="c-weater__city-name">
        {{ weater.city.name }}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25.456"
          height="25.456"
          viewBox="0 0 25.456 25.456"
        >
          <path
            id="Path_1"
            data-name="Path 1"
            d="M7.5,0,15,21,7.5,13.5,0,21Z"
            transform="translate(14.849) rotate(45)"
            fill="#fff"
          />
        </svg>
      </div>
      <div class="c-weater__time">Now</div>
      <div class="c-forcast" v-if="showForecast">
        <div
          v-for="item in weater.list"
          v-bind:key="item.dt"
          class="c-forcast__container"
        >
          <img
            class="c-forcast__image"
            :src="require(`../assets/icons/${item.weather[0].icon}.svg`)"
          />

          <div class="c-forcast__temp">{{ item.main.temp | formatNumber }}</div>
          <div class="c-forcast__humidity">
            {{ item.main.humidity }}
          </div>
        </div>
      </div>
      <svg
        @click="toogleForCast()"
        class="c-weater__hamburger"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g id="Menu" transform="translate(-49 -737)">
          <rect
            id="Rectangle_4"
            data-name="Rectangle 4"
            class="cls-1"
            width="27"
            height="2"
            rx="1"
            transform="translate(49 737)"
          />
          <rect
            id="Rectangle_5"
            data-name="Rectangle 5"
            class="cls-1"
            width="27"
            height="2"
            rx="1"
            transform="translate(49 744)"
          />
          <rect
            id="Rectangle_6"
            data-name="Rectangle 6"
            class="cls-1"
            width="19"
            height="2"
            rx="1"
            transform="translate(49 751)"
          />
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "Weater",
  created() {
    if (!("geolocation" in navigator)) {
      this.errorStr = "Geolocation is not available.";
      return;
    }
    // get position
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.gettingLocation = false;

        this.$store.dispatch("GetWeather", pos.coords);
      },
      err => {
        this.gettingLocation = false;
        this.errorStr = err.message;
      }
    );

    // this.$store.dispatch("GetWeather", this.location.coords);
  },
  computed: {
    weater: function() {
      let data = this.$store.getters.getWeater;

      if (data) {
        let weaterType = data.list[0].weather[0].main;
        let weaterTypeColor = getComputedStyle(
          document.documentElement
        ).getPropertyValue(`--global-${weaterType}`);

        document
          .querySelector("html")
          .style.setProperty("--global-weater", weaterTypeColor);
      }

      return data;
    }
  },
  props: {
    msg: String
  },
  methods: {
    toogleForCast: function() {
      this.showForecast = !this.showForecast;
    }
  },
  data: function() {
    return {
      gettingLocation: false,
      errorStr: null,

      showForecast: false,

      location: {
        coords: {
          latitude: 50.8028925,
          longitude: 3.2095744
        }

        // coords: {
        //   latitude: 36.5820167,
        //   longitude: -117.891846
        // }

        // coords: {
        //  latitude: -1.3030364,
        //  longitude: 36.7771858
        // }

        // coords: {
        //  latitude: -33.867888,
        //  longitude: 151.2012157
        // }
      }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/styles/settings/global.scss";
.c-forcast {
  display: flex;
  align-items: center;
  overflow: scroll;
}
.c-forcast__container {
  margin-right: 3rem;
  margin-bottom: 40px;
}
.c-forcast__image {
  height: 30px;
}

.c-forcast__temp {
  font-size: 29px;

  &::after {
    content: "°";
  }
}

.c-forcast__humidity {
  font-size: 12px;

  &::after {
    content: "%";
  }
}
.c-weater {
  margin: 0 40px;
  position: relative;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.c-weater__image {
  width: 150%;
  position: absolute;
  top: -10%;
  right: -50%;
}
.c-weater__temp {
  margin-top: auto;
  --global-weater: $global-rain;
  font-size: 110px;
  font-weight: 300;
}
.c-weater__city-name {
  font-size: 34px;
  font-weight: 300;
}

.c-weater__time {
  font-size: 23px;
  margin-bottom: 53px;
}
.c-weater__hamburger {
  height: 24px;
  fill: $global-text-color;

  width: 24px;
  margin-bottom: 60px;
}
</style>
