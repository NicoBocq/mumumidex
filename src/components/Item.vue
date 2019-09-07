<template>
    <div class="item">
      <div class="rank">
        {{rank}}
      </div>
      <div class="city">
        {{item.location.name}}<br />
        <!-- <span class="localtime">{{ item.location.localtime }}</span> -->
      </div>
      <div class="humidex">
        {{ getHumidex(item) }}
      </div>
      <div class="tempsuite">
        <div class="temp">
          <font-awesome-icon icon="thermometer-empty" />
          {{item.current.temp_c}}°
        </div>
        <div class="humidity">
          <!-- <v-icon>fas fa-tint</v-icon> -->
          <font-awesome-icon icon="tint" />
          {{item.current.humidity}}%
        </div>
      </div> 
    </div>
</template>


<script>
export default {
    name: 'Item',
    props: ['item','getHumidex','rank'],
}
</script>   

<style scoped>
.items > div {
  margin-bottom:1rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  border-radius: 0.3rem;
  color: #FFF;
}

.rank {
  text-align: center;
}

.city {
  text-align: left;
}

.data {
  padding: 0.5rem;
}

.tempsuite {
  text-align: left;
  font-size:0.9em;
}

.humidex {
  font-size:2em;
  font-weight:900;
  padding: 0.5rem;
}

.localtime {
  font-size:0.9rem;
}
</style>