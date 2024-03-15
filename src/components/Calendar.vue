<script setup>
  import getDaysInMonth from "../core/helpers/createDays.js";
  import {ref} from "vue";
  const renderComponent = ref(true);

  const locale = ref(false)
  let year = new Date(Date.now()).getFullYear()

  const ru = ['Пн', "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
  const en = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  let days = en

  let month = new Date(Date.now()).getMonth()
  let day_current = {
    month,
    day: new Date(Date.now()).getDate()
  }
  let data = getDaysInMonth(year, month, locale.value ? 'ru' : 'en', day_current)
  let monthName = data[data.length - 1].month.toUpperCase()

  const rerender = () => {
    renderComponent.value = false
    data = getDaysInMonth(year, month, locale.value ? 'ru' : 'en', day_current)
    renderComponent.value = true
  }

  const changeLanguage = () => {
    locale.value = !locale.value
    if(locale.value){
      days = ru
    } else {
      days = en
    }
    renderComponent.value = false
    data = getDaysInMonth(year, month, locale.value ? 'ru' : 'en', day_current)
    monthName = data[data.length - 1].month.toUpperCase()
    renderComponent.value = true
  }

  const changeMonth = () => {
    renderComponent.value = false
    if (month === 11){
      month = 0
      year = year + 1
    } else {
      month = month + 1
    }
    data = getDaysInMonth(year, month, locale.value ? 'ru' : 'en', day_current)
    monthName = data[data.length - 1].month.toUpperCase()
    renderComponent.value = true
  }
  const changeMonthDown = () => {
    renderComponent.value = false
    if(month === 0){
      month = 11
      year = year -1
    } else {
      month = month - 1
    }
    data = getDaysInMonth(year, month, locale.value ? 'ru' : 'en', day_current)
    monthName = data[data.length - 1].month.toUpperCase()
    renderComponent.value = true
  }
</script>

<template>
  <div>
    {{day_current.day}}.{{day_current.month + 1}}.{{year}}
    <div class="calendar">
      <div class="lang">
        <button @click="changeLanguage">Русский</button>
        <button @click="changeLanguage">English</button>
      </div>
      <div class="top">
        <svg @click="changeMonthDown" style="transform: rotate(180deg)" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"/></svg>
        <div v-if="renderComponent">
          {{monthName}} {{year}}
        </div>
        <svg @click="changeMonth" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"/></svg>
      </div>
      <div class="days" v-if="renderComponent">
        <div class="day" v-for="day in days">{{ day }}</div>
      </div>
      <div class="day_container" >
        <div class="day" v-if="renderComponent" v-for="day in data" @click="() => {
          day_current.month = day.monthIndex
          day_current.day = day.date
          rerender()
        }">
          <div v-bind:class="{static: day.current}">
            {{day.date}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .calendar {
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 24px;
    width: 251px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
    .lang {
      width: 100%;
      display: flex;
      padding-bottom: 10px;
      justify-content: space-around;
      button {
        background: none;
        border: none;
        color: grey;
        cursor: pointer;
      }
    }
    .day_container {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: 3px;
      .day {
        width: 30px;
        height: 30px;
        font-size: 12px;
        color: black;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        .static {
          width: 100%;
          height: 100%;
          border: 1px solid black;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    .days{
      display: flex;
      gap: 3px;
      .day {
        width: 30px;
        height: 30px;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .top {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      svg {
        cursor: pointer;
      }
    }
  }
</style>