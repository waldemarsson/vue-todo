<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

body {
  margin: 0;
  padding: 0;
}

.btn {
  border-radius: 5px;
  border: none;
  cursor: pointer;
  color: white;
  font-weight: bold;
  background-color: grey;
  font-size: 0.75rem;

  &:hover {
    background-color: rgb(98, 98, 98);
  }

  &--delete {
    color: rgb(200, 0, 0);
  }

  &--delete-big {
    font-size: 2rem;
  }

  &--handle-input {
    height: 100%;
    width: 4rem;
    margin: 0;
    padding: 0;
    border-radius: 0;
    font-weight: normal;
  }

  &--add {
    font-size: 1.5rem;
    margin-top: 1rem;
    height: 50px;
    width: 350px;
    background-color: lightgreen;
    color: black;

    &:hover {
      background-color: rgb(104, 218, 104);
    }
  }
}

.input {
  flex-grow: 1;
  height: 100%;
  width: 100%;
  border: 0;
  text-indent: 0.5rem;
  margin: 0;
  padding: 0;
}

hr {
  margin-bottom: 0;
}

ul {
  margin: 0;
  padding: 0;
}
</style>
