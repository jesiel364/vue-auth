<template>
  <v-card>
    <v-container fluid>
      <v-row>


        <v-col cols="12">
          <v-autocomplete
            v-model="values"
            
            :items="titles[0]"
            density="compact"
            label="Compact"
          ></v-autocomplete>
        </v-col>

      <small v-for='item in titles'>{{item.titulo}}</small>

      </v-row>
    </v-container>
  </v-card>
</template>

<script>


  export default {
    data: () => ({
      items: ['foo', 'bar', 'fizz', 'buzz'],
      values: 'foo',
      value: null,
    }),

    props: {
      titles: Object,
    }

  }
</script>