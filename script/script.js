
const App = {
  async created() {
    // Get Infos Prochain lancement
    const response = await fetch("https://api.spacexdata.com/v5/launches/next");
    const data = await response.json();
    const dateNow = Date.now();
    const dateNowSec = dateNow / 1000;
    // D*Formater date
    const utcDate = new Date(data.date_utc);
    const timeZone = utcDate.getTimezoneOffset;
    const localDate = new Date(utcDate - timeZone);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    console.log(utcDate.toLocaleDateString('fr-FR', options));
    // Affiche résultat
    this.nextFireDate = utcDate.toLocaleDateString('fr-FR', options);
    this.countdown = data.date_unix - Math.round(dateNowSec)
  },
  data() {
    return {
      nextFireDate: null,
      countdown: 0
    }
  },
  mounted() {
    setInterval(() => {
      this.countdown = this.countdown -1
    }, 1000)
  }

}

Vue.createApp(App).mount('#app')
